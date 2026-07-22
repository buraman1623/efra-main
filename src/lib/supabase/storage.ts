import { createClient } from "@/lib/supabase/client";

export const PRODUCT_IMAGES_BUCKET = "product-images";



const MAX_MODEL_BYTES = 20 * 1024 * 1024; // 20 MB
const ALLOWED_MODEL_TYPES = new Set(["model/gltf-binary", "application/octet-stream", "model/glb", "model/gtlf+json"]);

export async function uploadProductModel(file: File, folder = "models") {
  if (!ALLOWED_MODEL_TYPES.has(file.type) && !file.name.toLowerCase().endsWith('.glb')) {
    throw new Error("Please upload a .glb 3D model file.");
  }
  if (file.size > MAX_MODEL_BYTES) {
    throw new Error("3D model must be 20 MB or smaller.");
  }

  const supabase = createClient();
  const ext = file.name.split('.').pop() || 'glb';
  const path = `${folder}/${Date.now()}-${sanitizeFileName(file.name.replace(/\.[^.]+$/, ''))}.${ext}`;

  const { error } = await supabase.storage
    .from("product-models")
    .upload(path, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type || "application/octet-stream",
    });

  if (error) {
    throw new Error(error.message || "3D model upload failed.");
  }

  return getPublicStorageUrl("product-models", path);
}

// Duplicate export removed

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

function sanitizeFileName(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9.\-_]/g, "-")
    .replace(/-+/g, "-");
}

export function getPublicStorageUrl(bucket: string, path: string) {
  const supabase = createClient();
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}

export async function uploadProductImage(file: File, folder = "uploads") {
  if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
    throw new Error("Please upload a JPEG, PNG, WebP, or GIF image.");
  }
  if (file.size > MAX_IMAGE_BYTES) {
    throw new Error("Image must be 5 MB or smaller.");
  }

  const supabase = createClient();
  const ext = file.name.split(".").pop() || "jpg";
  const path = `${folder}/${Date.now()}-${sanitizeFileName(
    file.name.replace(/\.[^.]+$/, "")
  )}.${ext}`;

  const { error } = await supabase.storage
    .from(PRODUCT_IMAGES_BUCKET)
    .upload(path, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type,
    });

  if (error) {
    throw new Error(error.message || "Image upload failed.");
  }

  return getPublicStorageUrl(PRODUCT_IMAGES_BUCKET, path);
}

export async function deleteStorageObjectByUrl(url: string | null | undefined) {
  if (!url) return;

  try {
    const parsed = new URL(url);
    const marker = `/object/public/${PRODUCT_IMAGES_BUCKET}/`;
    const index = parsed.pathname.indexOf(marker);
    if (index === -1) return;

    const path = decodeURIComponent(
      parsed.pathname.slice(index + marker.length)
    );
    if (!path) return;

    const supabase = createClient();
    await supabase.storage.from(PRODUCT_IMAGES_BUCKET).remove([path]);
  } catch {
    // Non-blocking cleanup
  }
}

export async function deleteStorageObjectsByUrls(
  urls: Array<string | null | undefined>
) {
  const uniqueUrls = [...new Set(urls.filter(Boolean) as string[])];
  await Promise.all(uniqueUrls.map((url) => deleteStorageObjectByUrl(url)));
}
