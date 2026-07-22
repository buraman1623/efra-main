/**
 * Central Asset Manifest — Efra Business Group
 * All media references route through this file.
 * Replace placeholder URLs with production assets when available.
 */

const unsplash = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const images = {
  hero: {
    home: `/Images/home 1.jpg`,
    about: `/Images/about 1.png`,
    products: `/Images/product 1.png`,
    services: unsplash("photo-1581092918056-0c4c3acd3789", 1600),
    contact: unsplash("photo-1486406146926-c627a92ad1ab", 1600),
  },

  categories: {
    mining: `/Images/home 5.jpg`,
    agriculture: `/Images/home 6.jpg`,
    industrial: `/Images/home 7.jpg`,
    goldWashing: unsplash("photo-1518544801976-5e8879a05c44", 800),
    crushers: unsplash("photo-1581094794329-c8112a89af12", 800),
    ballMills: unsplash("photo-1581091226033-d5c48150dbaa", 800),
    tractors: `/Images/home 3.png`,
    tillage: unsplash("photo-1625246333195-78d9c38ad449", 800),
  },

  products: {
    "gwm-01": unsplash("photo-1518544801976-5e8879a05c44", 800),
    "gwm-02": unsplash("photo-1578328819058-b69f3a3b0f6b", 800),
    "gcm-01": unsplash("photo-1581094794329-c8112a89af12", 800),
    "gcm-02": unsplash("photo-1581092160562-40aa08e78837", 800),
    "gcm-03": unsplash("photo-1581091226033-d5c48150dbaa", 800),
    "gcm-04": unsplash("photo-1504307651254-35680f356dfd", 800),
    "bm-01": unsplash("photo-1581092918056-0c4c3acd3789", 800),
    "bm-02": unsplash("photo-1504328345606-2c4c243709a0", 800),
    "bm-03": unsplash("photo-1581092162384-898aa43c8710", 800),
    "tr-80": unsplash("photo-1500937386664-56d1dfef3854", 800),
    "dp-hd": unsplash("photo-1625246333195-78d9c38ad449", 800),
    "dh-24": unsplash("photo-1574943326649-89a455704d0b", 800),
    "rcr-01": unsplash("photo-1625246333195-78d9c38ad449", 800),
  },

  services: {
    procurement: unsplash("photo-1504307651254-35680f356dfd", 800),
    maintenance: unsplash("photo-1581092918056-0c4c3acd3789", 800),
    installation: `/Images/services 4.jpg`,
  },

  about: {
    team: `/Images/about 4.jpg`,
    factory: `/Images/home 2.png`,
    partnership: unsplash("photo-1521737711867-e3b97375f902", 800),
  },

  placeholders: {
    product: unsplash("photo-1581094794329-c8112a89af12", 600),
    avatar: unsplash("photo-1472099645785-5658abf4ff4e", 200),
    testimonial: unsplash("photo-1507003211169-0a1dd7228f2d", 200),
    ogDefault: unsplash("photo-1581094794329-c8112a89af12", 1200),
  },

  logo: {
    primary: "/logo/logo.svg",
    icon: "/logo/icon.svg",
    favicon: "/logo/favicon.ico",
  },
} as const;

export const models = {
  placeholder: "/models/placeholder.glb",
  crusher: "/models/placeholder.glb",
  tractor: "/models/placeholder.glb",
  ballMill: "/models/placeholder.glb",
} as const;

export function getProductImage(modelNumber: string): string {
  const key = modelNumber.toLowerCase().replace(/\s+/g, "-") as keyof typeof images.products;
  return images.products[key] ?? images.placeholders.product;
}

export function getCategoryImage(slug: string): string {
  const map: Record<string, string> = {
    "mining-mineral-processing": images.categories.mining,
    "agricultural-machinery": images.categories.agriculture,
    "industrial-machinery": images.categories.industrial,
    "gold-washing-systems": images.categories.goldWashing,
    "industrial-crushers": images.categories.crushers,
    "fine-grinding-mills": images.categories.ballMills,
    "tractors-primary-tillage": images.categories.tractors,
    "secondary-tillage": images.categories.tillage,
  };
  return map[slug] ?? images.placeholders.product;
}

export function getServiceImage(slug: string): string {
  const map: Record<string, string> = {
    "equipment-procurement-sales": images.services.procurement,
    "technical-maintenance-repairs": images.services.maintenance,
    "installation-commissioning": images.services.installation,
  };
  return map[slug] ?? images.placeholders.product;
}
