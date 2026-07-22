"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  MAX_PRODUCT_IMAGES,
  MIN_PRODUCT_IMAGES,
  productSchema,
  type ProductFormData,
} from "@/lib/validation/schemas";
import { createClient } from "@/lib/supabase/client";
import {
  deleteStorageObjectByUrl,
  uploadProductImage,
  uploadProductModel,
} from "@/lib/supabase/storage";
import { slugify } from "@/lib/utils";
import { Button, Input, Textarea } from "@/components/ui";
import type { Product, ProductCategory, ProductSpecs } from "@/types";

interface ProductFormProps {
  categories: Pick<
    ProductCategory,
    "id" | "name_en" | "slug" | "parent_id"
  >[];
  product?: Product;
}

type SpecRow = { key: string; value: string };
type ProductImageItem = { url: string; isMain: boolean };

function specsToRows(specs: ProductSpecs | null | undefined): SpecRow[] {
  const entries = Object.entries(specs ?? {});
  if (entries.length === 0) return [{ key: "", value: "" }];
  return entries.map(([key, value]) => ({
    key,
    value: value == null ? "" : String(value),
  }));
}

function rowsToSpecs(rows: SpecRow[]): ProductSpecs {
  const specs: ProductSpecs = {};
  for (const row of rows) {
    const key = row.key.trim();
    if (!key) continue;
    specs[key] = row.value.trim();
  }
  return specs;
}

function emptyToNull(value?: string) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

function productToImages(product?: Product): ProductImageItem[] {
  if (!product) return [];

  const images: ProductImageItem[] = [];
  if (product.image_url) {
    images.push({ url: product.image_url, isMain: true });
  }

  for (const url of product.gallery_urls ?? []) {
    if (url && url !== product.image_url) {
      images.push({ url, isMain: false });
    }
  }

  return images;
}

function imagesToFormValues(images: ProductImageItem[]) {
  const main = images.find((image) => image.isMain);
  return {
    image_url: main?.url ?? "",
    gallery_urls: images.filter((image) => !image.isMain).map((image) => image.url),
  };
}

export function ProductForm({ categories, product }: ProductFormProps) {
  const router = useRouter();
  const isEditing = Boolean(product);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState<ProductImageItem[]>(() =>
    productToImages(product)
  );
  const [specRows, setSpecRows] = useState<SpecRow[]>(() =>
    specsToRows(product?.specs)
  );
  const [slugTouched, setSlugTouched] = useState(isEditing);

  const initialImageValues = useMemo(
    () => imagesToFormValues(productToImages(product)),
    [product]
  );

  const categoryOptions = useMemo(() => {
    const parents = categories.filter((c) => !c.parent_id);
    const children = categories.filter((c) => c.parent_id);
    const options: { id: string; label: string }[] = [];

    for (const parent of parents) {
      const kids = children.filter((c) => c.parent_id === parent.id);
      if (kids.length === 0) {
        options.push({ id: parent.id, label: parent.name_en });
      } else {
        for (const kid of kids) {
          options.push({
            id: kid.id,
            label: `${parent.name_en} → ${kid.name_en}`,
          });
        }
      }
    }

    for (const category of categories) {
      if (!options.some((o) => o.id === category.id)) {
        options.push({ id: category.id, label: category.name_en });
      }
    }

    return options;
  }, [categories]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      category_id: product?.category_id ?? categoryOptions[0]?.id ?? "",
      slug: product?.slug ?? "",
      model_number: product?.model_number ?? "",
      name_en: product?.name_en ?? "",
      name_am: product?.name_am ?? "",
      description_en: product?.description_en ?? "",
      description_am: product?.description_am ?? "",
      specs: product?.specs ?? {},
      image_url: initialImageValues.image_url,
      gallery_urls: initialImageValues.gallery_urls,
      model_url: product?.model_url ?? "",
      is_featured: product?.is_featured ?? false,
      is_active: product?.is_active ?? true,
      sort_order: product?.sort_order ?? 0,
    },
  });

  const nameEn = watch("name_en");

  useEffect(() => {
    if (!slugTouched && nameEn) {
      setValue("slug", slugify(nameEn), { shouldValidate: true });
    }
  }, [nameEn, slugTouched, setValue]);

  useEffect(() => {
    const { image_url, gallery_urls } = imagesToFormValues(images);
    setValue("image_url", image_url, { shouldValidate: true });
    setValue("gallery_urls", gallery_urls, { shouldValidate: true });
  }, [images, setValue]);

  function syncImages(next: ProductImageItem[]) {
    if (next.length > 0 && !next.some((image) => image.isMain)) {
      next[0] = { ...next[0], isMain: true };
    }
    setImages(next);
  }

  async function handleImagesChange(fileList: FileList | null) {
    if (!fileList?.length) return;

    setSubmitError(null);

    const remaining = MAX_PRODUCT_IMAGES - images.length;
    if (remaining <= 0) {
      setSubmitError(`Maximum ${MAX_PRODUCT_IMAGES} images allowed.`);
      return;
    }

    const files = Array.from(fileList).slice(0, remaining);
    if (files.length < fileList.length) {
      setSubmitError(
        `Only ${remaining} more image${remaining === 1 ? "" : "s"} can be added (max ${MAX_PRODUCT_IMAGES}).`
      );
    }

    setUploading(true);

    try {
      const folder = product?.id ?? "drafts";
      const uploadedUrls: string[] = [];

      for (const file of files) {
        uploadedUrls.push(await uploadProductImage(file, folder));
      }

      syncImages([
        ...images,
        ...uploadedUrls.map((url) => ({ url, isMain: false })),
      ]);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Image upload failed."
      );
    } finally {
      setUploading(false);
    }
  }

  function setMainImage(url: string) {
    syncImages(
      images.map((image) => ({
        ...image,
        isMain: image.url === url,
      }))
    );
  }

  async function handleModelUpload(file?: File) {
    if (!file) return;
    setSubmitError(null);
    setUploading(true);
    try {
      const folder = product?.id ?? "drafts";
      const url = await uploadProductModel(file, folder);
      setValue("model_url", url, { shouldValidate: true });
      if (isEditing && product) {
        const supabase = createClient();
        const { error } = await supabase
          .from("products")
          .update({ model_url: url })
          .eq("id", product.id);
        if (error) {
          console.error("Failed to update model_url:", error);
        }
      }
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Model upload failed.");
    } finally {
      setUploading(false);
    }
  }

  async function removeImage(url: string) {
    const next = images.filter((image) => image.url !== url);
    if (next.length > 0 && !next.some((image) => image.isMain)) {
      next[0] = { ...next[0], isMain: true };
    }
    syncImages(next);
    await deleteStorageObjectByUrl(url);
  }

  async function onSubmit(data: ProductFormData) {
    setSubmitError(null);
    const supabase = createClient();
    const specs = rowsToSpecs(specRows);
    const { image_url, gallery_urls } = imagesToFormValues(images);

    const payload = {
      category_id: data.category_id,
      slug: data.slug.trim(),
      model_number: data.model_number.trim(),
      name_en: data.name_en.trim(),
      name_am: emptyToNull(data.name_am),
      description_en: emptyToNull(data.description_en),
      description_am: emptyToNull(data.description_am),
      specs,
      image_url: emptyToNull(image_url),
      gallery_urls,
      model_url: emptyToNull(data.model_url),
      is_featured: data.is_featured,
      is_active: data.is_active,
      sort_order: data.sort_order,
    };

    if (isEditing && product) {
      const { error } = await supabase
        .from("products")
        .update(payload)
        .eq("id", product.id);

      if (error) {
        setSubmitError(error.message || "Could not update product.");
        return;
      }
    } else {
      const { error } = await supabase.from("products").insert(payload);
      if (error) {
        setSubmitError(error.message || "Could not create product.");
        return;
      }
    }

    router.push("/admin/products");
    router.refresh();
  }

  const imageCount = images.length;
  const imageError = errors.image_url?.message;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Basic Information Section */}
      <section className="rounded-brand-xl border border-glass-border bg-black/40 backdrop-blur-md p-6 space-y-6 shadow-2xl">
        <div className="flex items-center gap-2.5 border-b border-glass-border pb-4">
          <div className="w-2.5 h-2.5 rounded-full bg-brand-amber" />
          <h2 className="text-base font-semibold text-white">General Information</h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="md:col-span-2 space-y-1.5">
            <label
              htmlFor="category_id"
              className="block text-xs font-semibold uppercase tracking-wider text-brand-muted"
            >
              Category
            </label>
            <div className="relative">
              <select
                id="category_id"
                className="w-full appearance-none rounded-brand-md border border-glass-border bg-black/50 px-4 py-2.5 text-sm font-medium text-white shadow-inner transition-colors hover:border-white/20 focus:border-brand-amber focus:outline-none focus:ring-1 focus:ring-brand-amber"
                {...register("category_id")}
              >
                <option value="" className="bg-neutral-900 text-white">Select a category</option>
                {categoryOptions.map((option) => (
                  <option key={option.id} value={option.id} className="bg-neutral-900 text-white">
                    {option.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-brand-muted">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            {errors.category_id && (
              <p className="text-xs text-red-400 mt-1">
                {errors.category_id.message}
              </p>
            )}
          </div>

          <Input
            label="Product Name (English)"
            placeholder="GCM-02 Industrial Crusher"
            error={errors.name_en?.message}
            className="bg-black/50 border-glass-border focus:border-brand-amber text-white placeholder:text-brand-muted/50 text-sm"
            {...register("name_en")}
          />
          <Input
            label="Product Name (Amharic)"
            placeholder="Optional"
            error={errors.name_am?.message}
            className="bg-black/50 border-glass-border focus:border-brand-amber text-white placeholder:text-brand-muted/50 text-sm"
            {...register("name_am")}
          />
          <Input
            label="Model Number"
            placeholder="GCM-02"
            error={errors.model_number?.message}
            className="bg-black/50 border-glass-border focus:border-brand-amber text-white placeholder:text-brand-muted/50 text-sm font-mono"
            {...register("model_number")}
          />
          <Input
            label="Slug"
            placeholder="gcm-02-industrial-crusher"
            hint="Used in the product URL"
            error={errors.slug?.message}
            className="bg-black/50 border-glass-border focus:border-brand-amber text-white placeholder:text-brand-muted/50 text-sm font-mono"
            {...register("slug", {
              onChange: () => setSlugTouched(true),
            })}
          />
        </div>
      </section>

      {/* Descriptions Section */}
      <section className="rounded-brand-xl border border-glass-border bg-black/40 backdrop-blur-md p-6 space-y-6 shadow-2xl">
        <div className="flex items-center gap-2.5 border-b border-glass-border pb-4">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-400" />
          <h2 className="text-base font-semibold text-white">Descriptions</h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <Textarea
            label="Description (English)"
            rows={5}
            error={errors.description_en?.message}
            className="bg-black/50 border-glass-border focus:border-brand-amber text-white placeholder:text-brand-muted/50 text-sm leading-relaxed"
            {...register("description_en")}
          />
          <Textarea
            label="Description (Amharic)"
            rows={5}
            error={errors.description_am?.message}
            className="bg-black/50 border-glass-border focus:border-brand-amber text-white placeholder:text-brand-muted/50 text-sm leading-relaxed"
            {...register("description_am")}
          />
        </div>
      </section>

      {/* Specifications Section */}
      <section className="rounded-brand-xl border border-glass-border bg-black/40 backdrop-blur-md p-6 space-y-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-glass-border pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <h2 className="text-base font-semibold text-white">Specifications</h2>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              setSpecRows((rows) => [...rows, { key: "", value: "" }])
            }
            className="border-glass-border bg-white/5 hover:bg-white/10 text-brand-muted hover:text-white text-xs"
          >
            + Add Spec
          </Button>
        </div>

        <div className="space-y-3">
          {specRows.map((row, index) => (
            <div key={index} className="grid gap-3 md:grid-cols-[1fr_1fr_auto] items-center">
              <input
                className="h-10 rounded-brand-md border border-glass-border bg-black/50 px-3.5 text-sm font-medium text-white placeholder:text-brand-muted/50 focus:border-brand-amber focus:outline-none focus:ring-1 focus:ring-brand-amber"
                placeholder="Key (e.g. Capacity)"
                value={row.key}
                onChange={(e) => {
                  const next = [...specRows];
                  next[index] = { ...next[index], key: e.target.value };
                  setSpecRows(next);
                }}
              />
              <input
                className="h-10 rounded-brand-md border border-glass-border bg-black/50 px-3.5 text-sm font-medium text-white placeholder:text-brand-muted/50 focus:border-brand-amber focus:outline-none focus:ring-1 focus:ring-brand-amber"
                placeholder="Value (e.g. 150-250 TPH)"
                value={row.value}
                onChange={(e) => {
                  const next = [...specRows];
                  next[index] = { ...next[index], value: e.target.value };
                  setSpecRows(next);
                }}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() =>
                  setSpecRows((rows) =>
                    rows.length === 1
                      ? [{ key: "", value: "" }]
                      : rows.filter((_, i) => i !== index)
                  )
                }
                className="text-red-400 hover:text-red-300 hover:bg-red-500/10 text-xs px-3"
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* Media Upload Section */}
      <section className="rounded-brand-xl border border-glass-border bg-black/40 backdrop-blur-md p-6 space-y-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-glass-border pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-purple-400" />
            <h2 className="text-base font-semibold text-white">Media Assets</h2>
          </div>
          <span
            className={`text-xs font-mono font-medium ${
              imageCount < MIN_PRODUCT_IMAGES
                ? "text-amber-400"
                : "text-brand-muted"
            }`}
          >
            {imageCount} / {MAX_PRODUCT_IMAGES} images
          </span>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-brand-md border border-glass-border bg-black/20">
            <div>
              <p className="text-sm font-medium text-white">Product Gallery</p>
              <p className="text-xs text-brand-muted mt-0.5">
                Upload {MIN_PRODUCT_IMAGES} to {MAX_PRODUCT_IMAGES} images (JPEG, PNG, WebP, GIF, max 5MB).
              </p>
            </div>
            <label className="cursor-pointer">
              <span className="inline-flex items-center px-4 py-2 rounded-brand-md bg-white/5 hover:bg-white/10 border border-glass-border text-xs font-semibold text-white transition-all">
                Choose Files
              </span>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                multiple
                disabled={uploading || isSubmitting || imageCount >= MAX_PRODUCT_IMAGES}
                onChange={(e) => {
                  void handleImagesChange(e.target.files);
                  e.target.value = "";
                }}
                className="hidden"
              />
            </label>
          </div>

          {images.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {images.map((image) => (
                <div
                  key={image.url}
                  className={`relative overflow-hidden rounded-brand-md border bg-black/50 ${
                    image.isMain
                      ? "border-brand-amber ring-1 ring-brand-amber/50"
                      : "border-glass-border"
                  }`}
                >
                  <div className="aspect-[4/3] relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={image.url}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                    {image.isMain && (
                      <span className="absolute left-2 top-2 rounded-md bg-brand-amber px-2 py-0.5 text-[10px] font-bold text-black uppercase tracking-wider">
                        Main Image
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between gap-2 border-t border-glass-border bg-black/60 p-2 backdrop-blur-sm">
                    {!image.isMain ? (
                      <button
                        type="button"
                        onClick={() => setMainImage(image.url)}
                        className="text-xs text-brand-muted hover:text-white transition-colors"
                      >
                        Set as main
                      </button>
                    ) : (
                      <span className="text-xs text-brand-amber font-medium">Primary</span>
                    )}
                    <button
                      type="button"
                      onClick={() => void removeImage(image.url)}
                      disabled={uploading || isSubmitting}
                      className="text-xs text-red-400 hover:text-red-300 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex aspect-[16/5] items-center justify-center rounded-brand-md border border-dashed border-glass-border bg-black/20 text-xs text-brand-muted">
              No images uploaded yet. Please add at least {MIN_PRODUCT_IMAGES} image.
            </div>
          )}

          {uploading && (
            <p className="text-xs text-brand-amber font-mono animate-pulse">
              Uploading media file…
            </p>
          )}
          {imageError && (
            <p className="text-xs text-red-400" role="alert">
              {imageError}
            </p>
          )}

          <div className="pt-4 border-t border-glass-border space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-brand-muted">
              3D Interactive Model (.GLB)
            </label>
            <div className="flex items-center gap-3">
              <input
                type="file"
                accept=".glb"
                disabled={uploading || isSubmitting}
                onChange={(e) => void handleModelUpload(e.target.files?.[0])}
                className="block w-full text-xs text-brand-muted file:mr-4 file:rounded-brand-md file:border-0 file:bg-white/10 file:px-3 file:py-2 file:text-xs file:font-semibold file:text-white hover:file:bg-white/20 disabled:opacity-50"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Controls & Configuration */}
      <section className="rounded-brand-xl border border-glass-border bg-black/40 backdrop-blur-md p-6 space-y-6 shadow-2xl">
        <div className="flex items-center gap-2.5 border-b border-glass-border pb-4">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
          <h2 className="text-base font-semibold text-white">Display & Status</h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-3 items-center">
          <Input
            label="Sort Order"
            type="number"
            min={0}
            error={errors.sort_order?.message}
            className="bg-black/50 border-glass-border focus:border-brand-amber text-white text-sm font-mono"
            {...register("sort_order")}
          />
          <label className="flex items-center gap-3 cursor-pointer pt-3 sm:pt-6">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-glass-border bg-black/50 text-brand-amber focus:ring-brand-amber focus:ring-offset-0"
              {...register("is_featured")}
            />
            <span className="text-sm font-medium text-white">Featured Product</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer pt-3 sm:pt-6">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-glass-border bg-black/50 text-brand-amber focus:ring-brand-amber focus:ring-offset-0"
              {...register("is_active")}
            />
            <span className="text-sm font-medium text-white">Active (Public)</span>
          </label>
        </div>
      </section>

      {submitError && (
        <div className="rounded-brand-md bg-red-500/10 border border-red-500/20 p-4 text-xs text-red-400" role="alert">
          {submitError}
        </div>
      )}

      {/* Form Actions */}
      <div className="flex items-center gap-3 pt-2">
        <Button
          type="submit"
          isLoading={isSubmitting || uploading}
          className="bg-brand-amber hover:bg-brand-amber/90 text-black font-semibold text-sm px-6 py-2.5 transition-all"
        >
          {isEditing ? "Save Changes" : "Create Product"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/products")}
          className="border-glass-border bg-white/5 hover:bg-white/10 text-brand-muted hover:text-white text-sm py-2.5"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}