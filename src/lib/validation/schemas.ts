import { z } from "zod";
import type { Dictionary } from "@/lib/i18n/dictionaries";

export const quoteRequestSchema = z.object({
  full_name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be under 100 characters"),
  company: z.string().max(200).optional().or(z.literal("")),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(9, "Please enter a valid phone number")
    .max(20, "Phone number is too long"),
  whatsapp: z.string().max(20).optional().or(z.literal("")),
  product_id: z.string().uuid().optional().or(z.literal("")),
  product_interest: z.string().max(300).optional().or(z.literal("")),
  message: z
    .string()
    .max(2000, "Message must be under 2000 characters")
    .optional()
    .or(z.literal("")),
});

export type QuoteRequestFormData = z.infer<typeof quoteRequestSchema>;

export const contactFormSchema = z.object({
  full_name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().min(9).max(20),
  subject: z.string().min(3).max(200),
  message: z.string().min(10).max(2000),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

/**
 * Locale-aware version of `quoteRequestSchema`. The public Quote Request
 * form (`QuoteForm.tsx`) uses this so validation errors show in whichever
 * language the visitor currently has selected, sourced from the same
 * `validation.*` dictionary keys used everywhere else on the site.
 */
export function createQuoteRequestSchema(t: Dictionary) {
  return z.object({
    full_name: z
      .string()
      .min(2, t.validation.nameMin)
      .max(100, t.validation.nameMax),
    company: z.string().max(200).optional().or(z.literal("")),
    email: z.string().email(t.validation.emailInvalid),
    phone: z
      .string()
      .min(9, t.validation.phoneMin)
      .max(20, t.validation.phoneMax),
    whatsapp: z.string().max(20).optional().or(z.literal("")),
    product_id: z.string().uuid().optional().or(z.literal("")),
    product_interest: z.string().max(300).optional().or(z.literal("")),
    message: z.string().max(2000).optional().or(z.literal("")),
  });
}

/**
 * Locale-aware version of `contactFormSchema`, used by the public Contact
 * form (`ContactForm.tsx`).
 */
export function createContactFormSchema(t: Dictionary) {
  return z.object({
    full_name: z
      .string()
      .min(2, t.validation.nameMin)
      .max(100, t.validation.nameMax),
    email: z.string().email(t.validation.emailInvalid),
    phone: z
      .string()
      .min(9, t.validation.phoneMin)
      .max(20, t.validation.phoneMax),
    subject: z.string().min(3).max(200),
    message: z.string().min(10).max(2000),
  });
}

export const MIN_PRODUCT_IMAGES = 3;
export const MAX_PRODUCT_IMAGES = 10;

export const productSchema = z
  .object({
    category_id: z.string().uuid("Please select a category"),
    slug: z
      .string()
      .min(2)
      .max(100)
      .regex(/^[a-z0-9-]+$/, "Slug must be lowercase with hyphens"),
    model_number: z.string().min(1).max(50),
    name_en: z.string().min(2).max(200),
    name_am: z.string().max(200).optional().or(z.literal("")),
    description_en: z.string().max(5000).optional().or(z.literal("")),
    description_am: z.string().max(5000).optional().or(z.literal("")),
    specs: z.record(z.union([z.string(), z.number(), z.boolean(), z.null()])),
    image_url: z
      .string()
      .optional()
      .or(z.literal(""))
      .refine((val) => !val || z.string().url().safeParse(val).success, {
        message: "Please provide a valid image URL",
      }),
    gallery_urls: z
      .array(
        z.string().url({ message: "Please provide valid gallery image URLs" })
      )
      .default([]),
    model_url: z
      .string()
      .optional()
      .or(z.literal(""))
      .refine((val) => !val || z.string().url().safeParse(val).success, {
        message: "Please provide a valid model URL",
      }),
    is_featured: z.boolean().default(false),
    is_active: z.boolean().default(true),
    sort_order: z.coerce.number().int().min(0).default(0),
  })
  .superRefine((data, ctx) => {
    const main = data.image_url?.trim() ?? "";
    const gallery = data.gallery_urls ?? [];
    const unique = new Set([
      ...(main ? [main] : []),
      ...gallery.filter((url) => url !== main),
    ]);
    const count = unique.size;

    if (count < MIN_PRODUCT_IMAGES) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Add at least ${MIN_PRODUCT_IMAGES} product images`,
        path: ["image_url"],
      });
    }

    if (count > MAX_PRODUCT_IMAGES) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Maximum ${MAX_PRODUCT_IMAGES} product images allowed`,
        path: ["image_url"],
      });
    }

    if (count >= MIN_PRODUCT_IMAGES && !main) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Select a main image for the product listing",
        path: ["image_url"],
      });
    }
  });

export type ProductFormData = z.infer<typeof productSchema>;

export const productCategorySchema = z.object({
  slug: z
    .string()
    .min(2)
    .max(100)
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase with hyphens"),
  name_en: z.string().min(2).max(200),
  name_am: z.string().max(200).optional().or(z.literal("")),
  description_en: z.string().max(2000).optional().or(z.literal("")),
  description_am: z.string().max(2000).optional().or(z.literal("")),
  image_url: z.string().url().optional().or(z.literal("")),
  parent_id: z.string().uuid().optional().or(z.literal("")),
  sort_order: z.number().int().min(0).default(0),
  is_active: z.boolean().default(true),
});

export type ProductCategoryFormData = z.infer<typeof productCategorySchema>;

export const profileUpdateSchema = z.object({
  full_name: z.string().min(2).max(100).optional(),
  avatar_url: z.string().url().optional().or(z.literal("")),
});

export type ProfileUpdateData = z.infer<typeof profileUpdateSchema>;

export const quoteStatusUpdateSchema = z.object({
  status: z.enum(["new", "contacted", "closed"]),
  admin_notes: z.string().max(2000).optional().or(z.literal("")),
});

export type QuoteStatusUpdateData = z.infer<typeof quoteStatusUpdateSchema>;

export const contactStatusUpdateSchema = z.object({
  status: z.enum(["new", "read", "closed"]),
  admin_notes: z.string().max(2000).optional().or(z.literal("")),
});

export type ContactStatusUpdateData = z.infer<typeof contactStatusUpdateSchema>;
