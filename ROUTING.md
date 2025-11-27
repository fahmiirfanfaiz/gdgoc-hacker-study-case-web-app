# Routing & Navigation System

## Overview

Aplikasi Bookstar menggunakan Next.js App Router dengan integrasi Navbar dan Breadcrumb yang otomatis menyesuaikan berdasarkan lokasi halaman saat ini.

## Struktur Halaman

```
src/app/
├── page.js           → / (Home)
├── shop/
│   └── page.jsx      → /shop
├── about/
│   └── page.jsx      → /about
├── blog/
│   └── page.jsx      → /blog
├── contact/
│   └── page.jsx      → /contact
└── pages/
    └── page.jsx      → /pages
```

## Cara Kerja

### 1. Navbar (Navigation)

Lokasi: `src/components/ui/Navbar.jsx`

**Navigation Links:**

- Home → `/`
- Shop → `/shop`
- About → `/about`
- Blog → `/blog`
- Contact → `/contact`
- Pages → `/pages`

Navbar menggunakan Next.js `<Link>` component untuk client-side navigation yang cepat tanpa reload halaman.

### 2. Breadcrumbs (Dynamic Path)

Lokasi: `src/components/ui/Breadcrumb.jsx`

Breadcrumb otomatis men-generate path berdasarkan URL:

**Contoh:**

- `/` → Home
- `/shop` → Home > Shop
- `/about` → Home > About
- `/blog` → Home > Blog
- `/contact` → Home > Contact
- `/pages` → Home > Pages

**Cara Kerja:**

1. Menggunakan `usePathname()` hook dari `next/navigation`
2. Split pathname menjadi segments
3. Generate breadcrumb items dengan:
   - `name`: Nama segment (capitalize first letter)
   - `href`: Link ke segment tersebut
   - `active`: Boolean untuk styling segment aktif (font-weight 600) vs inactive (font-weight 400)

### 3. Integrasi di Setiap Halaman

Setiap halaman mengikuti pola yang sama:

```jsx
import Navbar from "@/components/ui/Navbar";
import Breadcrumbs from "@/components/ui/Breadcrumb";

export default function PageName() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Breadcrumbs />

      <main className="container mx-auto px-4 py-12">{/* Page content */}</main>
    </div>
  );
}
```

## User Flow

1. **User membuka halaman Home (`/`)**

   - Navbar: Menampilkan semua navigation links
   - Breadcrumb: Menampilkan "Home" (active)

2. **User klik "Shop" di Navbar**

   - Next.js melakukan client-side navigation ke `/shop`
   - Breadcrumb otomatis update menjadi "Home > Shop"
   - "Shop" ditampilkan dengan font-weight 600 (active)

3. **User klik "About" di Navbar**

   - Next.js melakukan client-side navigation ke `/about`
   - Breadcrumb otomatis update menjadi "Home > About"
   - "About" ditampilkan dengan font-weight 600 (active)

4. **User klik "Home" di Breadcrumb**
   - Kembali ke halaman Home
   - Breadcrumb kembali menampilkan "Home" saja

## Fitur Tambahan

### Mobile Menu

- Navbar memiliki mobile menu (Sheet component dari Shadcn UI)
- Muncul pada layar kecil (< lg breakpoint)
- Menu icon menggunakan Lucide React icons
- Menutup otomatis setelah user klik link

### Styling

- Active breadcrumb: `font-weight: 600`, `text-[#252B42]`
- Inactive breadcrumb: `font-weight: 400`, `text-[#737373]`
- Separator: ChevronRight icon dari Lucide React
- Font: Inter (custom font) untuk semua text

## Best Practices

1. **Konsistensi**: Semua halaman menggunakan struktur yang sama (Navbar + Breadcrumb + Main)
2. **Accessibility**: Menggunakan semantic HTML (`<nav>`, `<main>`, `<ol>`)
3. **SEO**: Breadcrumb membantu search engine memahami struktur website
4. **UX**: User selalu tahu lokasi mereka di website melalui breadcrumb
5. **Performance**: Client-side navigation (no full page reload)

## Development Notes

- Semua halaman menggunakan `"use client"` directive karena menggunakan hooks (`usePathname`)
- Navbar fixed position di setiap halaman
- Breadcrumb responsive (mobile-friendly)
- Tailwind CSS v4 untuk styling
