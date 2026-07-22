export type UserRole = "user" | "admin";
export type QuoteStatus = "new" | "contacted" | "closed";
export type ContactStatus = "new" | "read" | "closed";

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  role: UserRole;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProductCategory {
  id: string;
  slug: string;
  name_en: string;
  name_am: string | null;
  description_en: string | null;
  description_am: string | null;
  image_url: string | null;
  parent_id: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProductSpecs {
  [key: string]: string | number | boolean | null;
}

export interface Product {
  id: string;
  category_id: string;
  slug: string;
  model_number: string;
  name_en: string;
  name_am: string | null;
  description_en: string | null;
  description_am: string | null;
  specs: ProductSpecs;
  image_url: string | null;
  gallery_urls: string[];
  model_url: string | null;
  is_featured: boolean;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
  // Relationship added for admin queries
  product_categories?: ProductCategory[];
}

export interface ProductWithCategory extends Product {
  category: ProductCategory;
}

export interface Testimonial {
  id: string;
  client_name: string;
  company: string | null;
  content_en: string;
  content_am: string | null;
  rating: number | null;
  image_url: string | null;
  is_active: boolean;
  sort_order: number;
  created_at: string;
}

export interface QuoteRequest {
  id: string;
  product_id: string | null;
  user_id: string | null;
  full_name: string;
  company: string | null;
  email: string;
  phone: string;
  whatsapp: string | null;
  product_interest: string | null;
  message: string | null;
  status: QuoteStatus;
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface QuoteRequestWithProduct extends QuoteRequest {
  product: Product | null;
}

export interface ContactMessage {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: ContactStatus;
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface WatchlistItem {
  id: string;
  user_id: string;
  product_id: string;
  created_at: string;
}

export interface WatchlistItemWithProduct extends WatchlistItem {
  product: Product;
}

export interface RecentlyViewed {
  id: string;
  user_id: string;
  product_id: string;
  viewed_at: string;
}

export interface RecentlyViewedWithProduct extends RecentlyViewed {
  product: Product;
}

export interface CompanyInfo {
  name: string;
  legalName: string;
  industry: string;
  yearEstablished: string;
  headOffice: string;
  contactPerson: string;
  phone: string;
  whatsapp: string;
  email: string;
  businessHours: string;
  mission: string;
  vision: string;
}

export interface Service {
  slug: string;
  name: string;
  description: string;
  icon: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}
