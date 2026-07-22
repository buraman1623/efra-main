# Efra Business Group — Project Manifest

> Generated during Phase 1. Single source of truth for routes, assets, schema, and build strategy.

---

## Company Profile

| Field | Value |
|---|---|
| **Company** | Efra Business Group |
| **Legal Name** | Efra Business Group One Member PLC |
| **Industry** | Heavy Equipment & Industrial Machinery |
| **Established** | 2015 |
| **Head Office** | Anfo 105 Square, Melka Nono Woreda, Sheger City, Oromia, Ethiopia |
| **Contact** | Ashu · 0911674126 · ashenafiandualem25@gmail.com |
| **Languages** | English (primary), Amharic (secondary) |
| **CTA** | Request a Quote |

---

## Brand System

### Colors

| Token | Hex | Usage |
|---|---|---|
| `brand-primary` | `#000000` | Backgrounds, headings |
| `brand-secondary` | `#E05B2B` | Primary CTA, accents |
| `brand-accent` | `#FA834E` | Hover states, highlights |
| `brand-surface` | `#35302C` | Cards, elevated sections |
| `brand-border` | `#4E4742` | Borders, dividers |
| `brand-hover` | `#9B3311` | Deep accent / hover |

### Typography

| Role | Font | Tailwind Class |
|---|---|---|
| Headings | Montserrat | `font-heading` |
| Body | Inter | `font-body` |

### Motion Tokens

| Token | Value | Usage |
|---|---|---|
| `ease-brand-in` | `cubic-bezier(0.16, 1, 0.3, 1)` | Enter animations |
| `ease-brand-out` | `cubic-bezier(0.7, 0, 0.84, 0)` | Exit animations |
| `ease-brand-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Playful interactions |
| `duration-fast` | 200ms | Micro-interactions |
| `duration-normal` | 300ms | Standard transitions |
| `duration-slow` | 500ms | Page transitions |

---

## Directory Map

```
src/
├── app/
│   ├── (public)/          # Public-facing pages (Phase 2)
│   │   ├── page.tsx       # Home
│   │   ├── about/
│   │   ├── products/
│   │   ├── services/
│   │   ├── contact/
│   │   └── not-found.tsx
│   ├── (auth)/            # Authentication (Phase 3)
│   │   └── login/
│   ├── (admin)/admin/     # CMS Dashboard (Phase 3)
│   │   ├── page.tsx       # Dashboard
│   │   ├── products/
│   │   ├── quotes/
│   │   ├── media/
│   │   └── settings/
│   ├── layout.tsx         # Root layout + fonts
│   └── globals.css        # CSS variables + utilities
├── components/
│   ├── ui/                # Atomic design tokens ✅
│   ├── product/           # ProductModelViewer, ProductCard, SpecTable (Phase 2)
│   └── layout/            # Header, Footer, Breadcrumbs (Phase 2)
├── lib/
│   ├── supabase/          # Client + Server Supabase helpers ✅
│   ├── validation/        # Zod schemas ✅
│   ├── assets/            # Central image manifest ✅
│   ├── content/           # Static company content from Data.txt ✅
│   └── utils.ts           # cn(), formatters ✅
└── types/
    ├── index.ts           # Application types ✅
    └── database.ts        # Supabase-generated types ✅
```

---

## Route Map

### Public Routes (Phase 2)

| Route | Page | Status |
|---|---|---|
| `/` | Home | Placeholder |
| `/about` | About Us | Planned |
| `/products` | Product Catalog | Planned |
| `/products/[category]` | Category Listing | Planned |
| `/products/[category]/[slug]` | Product Detail | Planned |
| `/services` | Services Overview | Planned |
| `/services/[slug]` | Individual Service | Planned |
| `/contact` | Contact + RFQ Form | Planned |
| `/faq` | FAQ | Planned |
| `/privacy` | Privacy Policy | Planned |
| `/terms` | Terms & Conditions | Planned |
| `/cookies` | Cookie Policy | Planned |
| `/sitemap` | HTML Sitemap | Planned |

### Auth Routes (Phase 3)

| Route | Page | Status |
|---|---|---|
| `/login` | Google OAuth Portal | Placeholder |

### Admin Routes (Phase 3)

| Route | Page | Status |
|---|---|---|
| `/admin` | Dashboard | Placeholder |
| `/admin/products` | Product CRUD | Planned |
| `/admin/quotes` | Quote Management | Planned |
| `/admin/media` | Media Library | Planned |
| `/admin/settings` | System Settings | Planned |

### SEO / System Routes (Phase 2)

| Route | Handler | Status |
|---|---|---|
| `/sitemap.xml` | Dynamic sitemap | Planned |
| `/robots.txt` | Robots directives | Planned |

---

## Database Schema

### Tables

| Table | Purpose | RLS |
|---|---|---|
| `profiles` | User profiles extending auth.users | Own profile read/update; admin reads all |
| `product_categories` | Hierarchical product categories | Public read (active); admin write |
| `products` | Machinery catalog with JSONB specs | Public read (active); admin write |
| `testimonials` | Client testimonials | Public read (active); admin write |
| `quote_requests` | RFQ submissions | Public insert; admin read/update |
| `watchlist_items` | User favorites | User-scoped CRUD |
| `recently_viewed` | Browsing history | User-scoped CRUD |

### Seed Data (from Data.txt)

**Categories:**
- Mining & Mineral Processing Machinery
  - Gold Washing Systems (GWM-01, GWM-02)
  - Industrial Crushers (GCM-01 through GCM-04)
  - Fine Grinding Mills (BM-01, BM-02, BM-03)
- Agricultural Machinery & Implements
  - Tractors & Primary Tillage (TR-80, DP-HD)
  - Secondary Tillage (DH-24, RCR-01)
- Other Industrial Machinery

**Total seed products:** 13 models

---

## Asset Manifest Strategy

All media is centralized in `src/lib/assets/images.ts`.

| Asset Type | Strategy | Source |
|---|---|---|
| Hero banners | Unsplash industrial photography | `images.hero.*` |
| Category thumbnails | Unsplash by category keyword | `images.categories.*` |
| Product photos | Unsplash mapped by model number | `images.products.*` |
| Service illustrations | Unsplash industrial scenes | `images.services.*` |
| 3D Models | Placeholder .glb files | `models.*` |
| Logo | Client-provided assets | `/logo/` directory |
| OG Images | Dynamic generation (Phase 2) | `images.placeholders.ogDefault` |

### Placeholder URL Pattern

```
https://images.unsplash.com/photo-{id}?auto=format&fit=crop&w={width}&q=80
```

Helper functions:
- `getProductImage(modelNumber)` — resolves product image by model
- `getCategoryImage(slug)` — resolves category thumbnail by slug
- `getServiceImage(slug)` — resolves service image by slug

---

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js (App Router) | 15.x |
| UI | React | 19.x |
| Styling | Tailwind CSS | 3.4.x |
| Animation | Framer Motion | 11.x |
| 3D | React Three Fiber + Drei | 8.x / 9.x |
| Backend | Supabase (Postgres + Auth) | 2.x |
| Validation | React Hook Form + Zod | 7.x / 3.x |
| Deployment | Vercel | — |

---

## Environment Variables

See `.env.example` for required variables:

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
NEXT_PUBLIC_SITE_URL
```

---

## Phase Roadmap

| Phase | Scope | Status |
|---|---|---|
| **Phase 1** | Foundations, DB schema, design tokens, manifest | ✅ Complete |
| **Phase 2** | Public pages, R3F viewer, SEO handlers | Pending |
| **Phase 3** | Admin CMS, OAuth, middleware, delivery report | Pending |

---

## Navigation Structure (from Data.txt)

```
Home
About Us
Machinery & Equipment ▾
  ├── Mining Equipment
  ├── Agricultural Machinery
  └── Industrial Machinery
Services ▾
  ├── Maintenance & Repairs
  ├── Installation & Commissioning
  └── Equipment Procurement
Contact                    [Request a Quote →]
```

---

## Services (from Data.txt)

1. **Equipment Procurement & Sales** — Sourcing, distribution, direct sales
2. **Technical Maintenance & Repairs** — On-site commissioning, preventive maintenance
3. **On-Site Installation & Commissioning** — Professional setup and performance tuning

---

## Key USPs (from Data.txt)

1. Import Substitution & Local Production
2. Solution-Driven Engineering
3. Comprehensive After-Sales Support
4. Customer-Centric Philosophy
