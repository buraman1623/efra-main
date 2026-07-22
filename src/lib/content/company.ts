import type { CompanyInfo, NavItem, Service } from "@/types";

export const company: CompanyInfo = {
  name: "Efra Business Group",
  legalName: "Efra Business Group One Member PLC",
  industry: "Heavy Equipment & Industrial Machinery",
  yearEstablished: "2015",
  headOffice:
    "Anfo 105 Square, Melka Nono Woreda, Melka Gefersa Sub-City, Sheger City, Oromia, Ethiopia",
  contactPerson: "Ashu",
  phone: "+251911674126",
  whatsapp: "+251911674126",
  email: "ashenafiandualem25@gmail.com",
  businessHours: "Mon–Fri: 8am–5pm · Sat: 9am–1pm · Sun: Closed",
  mission:
    "To empower Ethiopia's mining and agricultural sectors by supplying tailored, high-performance machinery, reliable local engineering, and exceptional after-sales support that solves our partners' real operational challenges.",
  vision:
    "To become East Africa's leading industrial machinery partner, recognised for driving domestic production, reducing import dependency, and modernising the region's core industries through strategic global and local partnerships.",
};

export const services: Service[] = [
  {
    slug: "equipment-procurement-sales",
    name: "Equipment Procurement & Sales",
    description:
      "End-to-end sourcing, distribution, and direct sales of heavy-duty mining and agricultural machinery tailored for Ethiopian operations.",
    icon: "truck",
  },
  {
    slug: "technical-maintenance-repairs",
    name: "Technical Maintenance & Repairs",
    description:
      "On-site commissioning and preventive maintenance for heavy-duty mining equipment with readily available spare parts inventory.",
    icon: "wrench",
  },
  {
    slug: "installation-commissioning",
    name: "On-Site Installation & Commissioning",
    description:
      "Professional installation and commissioning services ensuring your machinery operates at peak performance from day one.",
    icon: "settings",
  },
];

export const uspPoints = [
  {
    title: "Import Substitution & Local Production",
    description:
      "Prioritizing and scaling domestic manufacturing to reduce import dependency and support the local economy.",
  },
  {
    title: "Solution-Driven Engineering",
    description:
      "Machinery tailored to solve the specific operational challenges faced by Ethiopian miners and farmers.",
  },
  {
    title: "Comprehensive After-Sales Support",
    description:
      "Competitive pricing, premium build quality, extended warranties, and readily available spare parts.",
  },
  {
    title: "Customer-Centric Philosophy",
    description:
      "Long-term partnerships built on deep technical analysis and market accessibility wherever clients operate.",
  },
];

export const mainNavigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  {
    label: "Machinery & Equipment",
    href: "/products",
    children: [
      { label: "Mining Equipment", href: "/products/mining-mineral-processing" },
      { label: "Agricultural Machinery", href: "/products/agricultural-machinery" },
      { label: "Industrial Machinery", href: "/products/industrial-machinery" },
    ],
  },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Maintenance & Repairs", href: "/services/technical-maintenance-repairs" },
      { label: "Installation & Commissioning", href: "/services/installation-commissioning" },
      { label: "Equipment Procurement", href: "/services/equipment-procurement-sales" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

export const footerNavigation = {
  products: [
    { label: "Gold Washing Systems", href: "/products/gold-washing-systems" },
    { label: "Industrial Crushers", href: "/products/industrial-crushers" },
    { label: "Ball Mills", href: "/products/fine-grinding-mills" },
    { label: "Tractors & Tillage", href: "/products/tractors-primary-tillage" },
  ],
  services: [
    { label: "Maintenance & Repairs", href: "/services/technical-maintenance-repairs" },
    { label: "Installation", href: "/services/installation-commissioning" },
    { label: "Procurement & Sales", href: "/services/equipment-procurement-sales" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Request a Quote", href: "/contact?tab=quote" },
    { label: "FAQ", href: "/faq" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "Sitemap", href: "/sitemap" },
  ],
};

export const brandColors = {
  primary: "#000000",
  secondary: "#E05B2B",
  accent: "#FA834E",
  surface: "#35302C",
  border: "#4E4742",
  hover: "#9B3311",
} as const;

export const seoDefaults = {
  title: "Industrial & Agricultural Machinery Supplier | Efra Business Group",
  description:
    "Discover reliable mining equipment, gold washing systems, and agricultural machinery in Ethiopia. Tailored engineering solutions with complete local after-sales support. Request a quote today.",
  siteUrl: "https://efrabusinessgroup.com",
  ogImage: "/og-default.jpg",
} as const;
