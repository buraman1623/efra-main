import type { ProductCategory, Product, ProductSpecs } from "@/types";
import { getCategoryImage, getProductImage, models } from "@/lib/assets/images";

type StaticCategory = Omit<ProductCategory, "created_at" | "updated_at">;
type StaticProduct = Omit<Product, "created_at" | "updated_at">;

const now = new Date().toISOString();

export const staticCategories: StaticCategory[] = [
  {
    id: "cat-mining",
    slug: "mining-mineral-processing",
    name_en: "Mining & Mineral Processing Machinery",
    name_am: "የማዕድን እና mineral processing machinery",
    description_en:
      "Heavy-duty extraction and mineral processing equipment for Ethiopian mining operations.",
    description_am: null,
    image_url: getCategoryImage("mining-mineral-processing"),
    parent_id: null,
    sort_order: 1,
    is_active: true,
  },
  {
    id: "cat-agriculture",
    slug: "agricultural-machinery",
    name_en: "Agricultural Machinery & Implements",
    name_am: "የግብርና machinery & implements",
    description_en:
      "High-performance tractors, tillage equipment, and modern farming solutions.",
    description_am: null,
    image_url: getCategoryImage("agricultural-machinery"),
    parent_id: null,
    sort_order: 2,
    is_active: true,
  },
  {
    id: "cat-industrial",
    slug: "industrial-machinery",
    name_en: "Other Industrial Machinery",
    name_am: "ሌሎች industrial machinery",
    description_en:
      "Custom industrial machinery, mechanical components, and specialised sector equipment.",
    description_am: null,
    image_url: getCategoryImage("industrial-machinery"),
    parent_id: null,
    sort_order: 3,
    is_active: true,
  },
  {
    id: "cat-gold-washing",
    slug: "gold-washing-systems",
    name_en: "Gold Washing Systems",
    name_am: null,
    description_en:
      "Small-scale and industrial gold washing systems for mineral extraction.",
    description_am: null,
    image_url: getCategoryImage("gold-washing-systems"),
    parent_id: "cat-mining",
    sort_order: 1,
    is_active: true,
  },
  {
    id: "cat-crushers",
    slug: "industrial-crushers",
    name_en: "Industrial Crushers",
    name_am: null,
    description_en: "GCM Series crushers categorised by capacity sizes.",
    description_am: null,
    image_url: getCategoryImage("industrial-crushers"),
    parent_id: "cat-mining",
    sort_order: 2,
    is_active: true,
  },
  {
    id: "cat-ball-mills",
    slug: "fine-grinding-mills",
    name_en: "Fine Grinding Mills",
    name_am: null,
    description_en: "Industrial ball mills for fine grinding operations.",
    description_am: null,
    image_url: getCategoryImage("fine-grinding-mills"),
    parent_id: "cat-mining",
    sort_order: 3,
    is_active: true,
  },
  {
    id: "cat-tractors",
    slug: "tractors-primary-tillage",
    name_en: "Tractors & Primary Tillage",
    name_am: null,
    description_en:
      "High-performance utility tractors and heavy-duty disc ploughs.",
    description_am: null,
    image_url: getCategoryImage("tractors-primary-tillage"),
    parent_id: "cat-agriculture",
    sort_order: 1,
    is_active: true,
  },
  {
    id: "cat-secondary-tillage",
    slug: "secondary-tillage",
    name_en: "Secondary Tillage & Field Prep",
    name_am: null,
    description_en:
      "Disc harrows, replacement disk plates, and row-crop ridgers.",
    description_am: null,
    image_url: getCategoryImage("secondary-tillage"),
    parent_id: "cat-agriculture",
    sort_order: 2,
    is_active: true,
  },
];

function product(
  id: string,
  categoryId: string,
  slug: string,
  model: string,
  name: string,
  description: string,
  specs: ProductSpecs,
  options?: { featured?: boolean; sort?: number; modelUrl?: string }
): StaticProduct {
  return {
    id,
    category_id: categoryId,
    slug,
    model_number: model,
    name_en: name,
    name_am: null,
    description_en: description,
    description_am: null,
    specs,
    image_url: getProductImage(model),
    gallery_urls: [getProductImage(model)],
    model_url: options?.modelUrl ?? models.placeholder,
    is_featured: options?.featured ?? false,
    is_active: true,
    sort_order: options?.sort ?? 0,
  };
}

export const staticProducts: StaticProduct[] = [
  product(
    "prod-gwm-01",
    "cat-gold-washing",
    "gwm-01-gold-washing-system",
    "GWM-01",
    "Small-Scale Gold Washing System",
    "Compact gold washing system designed for small-scale mining operations across Ethiopia.",
    {
      capacity: "Small-scale",
      application: "Artisanal & small-scale gold mining",
      power_source: "Diesel/Electric hybrid",
      water_consumption: "Low",
      mobility: "Portable",
    },
    { featured: true, sort: 1, modelUrl: models.placeholder }
  ),
  product(
    "prod-gwm-02",
    "cat-gold-washing",
    "gwm-02-gold-washing-system",
    "GWM-02",
    "Industrial-Scale Gold Washing System",
    "High-capacity industrial gold washing system for large-scale mineral extraction.",
    {
      capacity: "Industrial-scale",
      application: "Commercial gold mining operations",
      power_source: "Industrial diesel",
      water_consumption: "Medium-High",
      mobility: "Stationary/Modular",
    },
    { featured: true, sort: 2 }
  ),
  product(
    "prod-gcm-01",
    "cat-crushers",
    "gcm-01-industrial-crusher",
    "GCM-01",
    "GCM-01 Industrial Crusher",
    "Entry-level industrial crusher for medium-capacity stone and ore processing.",
    {
      series: "GCM",
      capacity_tph: "30-50",
      feed_size_mm: "400",
      output_size_mm: "20-50",
      motor_power_kw: "75",
    },
    { sort: 1, modelUrl: models.crusher }
  ),
  product(
    "prod-gcm-02",
    "cat-crushers",
    "gcm-02-industrial-crusher",
    "GCM-02",
    "GCM-02 Industrial Crusher",
    "Mid-range industrial crusher for high-volume mining operations.",
    {
      series: "GCM",
      capacity_tph: "50-100",
      feed_size_mm: "500",
      output_size_mm: "20-50",
      motor_power_kw: "110",
    },
    { sort: 2, modelUrl: models.crusher }
  ),
  product(
    "prod-gcm-03",
    "cat-crushers",
    "gcm-03-industrial-crusher",
    "GCM-03",
    "GCM-03 Industrial Crusher",
    "Heavy-duty crusher for large-scale mineral processing plants.",
    {
      series: "GCM",
      capacity_tph: "100-200",
      feed_size_mm: "600",
      output_size_mm: "20-80",
      motor_power_kw: "160",
    },
    { sort: 3, modelUrl: models.crusher }
  ),
  product(
    "prod-gcm-04",
    "cat-crushers",
    "gcm-04-industrial-crusher",
    "GCM-04",
    "GCM-04 Industrial Crusher",
    "Maximum capacity industrial crusher for enterprise mining operations.",
    {
      series: "GCM",
      capacity_tph: "200-350",
      feed_size_mm: "750",
      output_size_mm: "20-100",
      motor_power_kw: "250",
    },
    { sort: 4, modelUrl: models.crusher }
  ),
  product(
    "prod-bm-01",
    "cat-ball-mills",
    "ball-mill-01",
    "BM-01",
    "Industrial Ball Mill — Model 01",
    "Compact industrial ball mill for fine grinding in small processing plants.",
    {
      type: "Ball Mill",
      capacity_tph: "1-3",
      drum_diameter_m: "1.2",
      motor_power_kw: "15",
    },
    { sort: 1, modelUrl: models.ballMill }
  ),
  product(
    "prod-bm-02",
    "cat-ball-mills",
    "ball-mill-02",
    "BM-02",
    "Industrial Ball Mill — Model 02",
    "Mid-capacity ball mill for standard mineral processing operations.",
    {
      type: "Ball Mill",
      capacity_tph: "3-8",
      drum_diameter_m: "1.8",
      motor_power_kw: "37",
    },
    { sort: 2, modelUrl: models.ballMill }
  ),
  product(
    "prod-bm-03",
    "cat-ball-mills",
    "ball-mill-03",
    "BM-03",
    "Industrial Ball Mill — Model 03",
    "High-capacity ball mill for industrial-scale fine grinding.",
    {
      type: "Ball Mill",
      capacity_tph: "8-15",
      drum_diameter_m: "2.4",
      motor_power_kw: "75",
    },
    { sort: 3, modelUrl: models.ballMill }
  ),
  product(
    "prod-tr-80",
    "cat-tractors",
    "utility-tractor-80hp",
    "TR-80",
    "High-Performance Utility Tractor",
    "80HP utility tractor engineered for Ethiopian agricultural conditions.",
    {
      horsepower: "80 HP",
      drive: "4WD",
      transmission: "16F+8R",
      lift_capacity_kg: "2500",
      application: "General farming & tillage",
    },
    { featured: true, sort: 1, modelUrl: models.tractor }
  ),
  product(
    "prod-dp-hd",
    "cat-tractors",
    "heavy-disc-plough",
    "DP-HD",
    "Heavy-Duty Disc Plough",
    "Robust disc plough for primary tillage in hard soils.",
    {
      discs: "3-5",
      disc_diameter_mm: "660",
      working_width_m: "1.2-2.0",
      weight_kg: "450",
      application: "Primary tillage",
    },
    { sort: 2 }
  ),
  product(
    "prod-dh-24",
    "cat-secondary-tillage",
    "disc-harrow-24",
    "DH-24",
    "Disc Harrow — 24 Disc",
    "High-durability disc harrow for secondary tillage and field preparation.",
    {
      discs: "24",
      working_width_m: "2.4",
      disc_diameter_mm: "560",
      weight_kg: "680",
      application: "Secondary tillage",
    },
    { sort: 1 }
  ),
  product(
    "prod-rcr-01",
    "cat-secondary-tillage",
    "row-crop-ridger",
    "RCR-01",
    "Row-Crop Ridger",
    "Precision row-crop ridger for modern farming operations.",
    {
      rows: "2-4",
      working_width_m: "1.6-3.2",
      ridger_type: "Adjustable",
      application: "Row crop preparation",
    },
    { sort: 2 }
  ),
];

export const catalogTimestamp = now;
