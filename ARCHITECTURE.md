# KRYPTA 2026 - Architecture

This document describes the high-level design and architectural decisions of the KRYPTA 2026 landing page project.

## 1. Design Goals

- **Modularity**: Components should be loosely coupled, allowing distinct sections of the landing page to be easily added, modified, or removed as the event lifecycle progresses.
- **Scalability**: The system should seamlessly transition from a "Coming Soon" landing page to a fully-featured event website with multiple routes (e.g., Schedule, Tracks, Registration).
- **Maintainability**: Strict adherence to TypeScript, semantic HTML, and component-driven architecture ensures clean and readable code for current and future maintainers from the Programming Club.
- **Performance**: High Lighthouse scores for performance, accessibility, best practices, and SEO.

## 2. Technology Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Hosting**: [Vercel](https://vercel.com/)

## 3. Core Architecture

The project utilizes the Next.js App Router for server-centric routing and rendering.

### 3.1 App Layer (`src/app/`)
- Handles routing, global layouts, global CSS, and metadata.
- Employs Next.js conventions for `robots.ts`, `sitemap.ts`, and `manifest.ts` to automatically generate SEO assets.
- `opengraph-image.tsx` dynamically generates the OpenGraph image.

### 3.2 Components (`src/components/`)
Separated into logical directories for clear responsibility:
- **`layout/`**: Global UI elements like `Navbar` and `Footer`.
- **`sections/`**: Discrete content blocks for the main page (e.g., `HeroSection`, `AboutSection`). This granular approach allows easy reordering or extraction to separate pages in the future.
- **`ui/`**: Reusable primitives and generic interactive components (e.g., `AnimatedSection`, `ThemeToggle`).
- **`providers/`**: Context providers like `ThemeProvider`.

### 3.3 Design System & Theming
- Tailwind CSS v4 manages the design system through CSS variables defined in `src/app/globals.css`.
- Uses a `prefers-color-scheme` strategy, enhanced by `next-themes` to support manual light/dark mode toggling with `localStorage` persistence (`krypta-theme`).

### 3.4 Animation Strategy
- Animations are handled by `Framer Motion`.
- Wrapped in a reusable `AnimatedSection` component that triggers on scroll (`useInView`).
- Strictly respects `prefers-reduced-motion` for accessibility.

## 4. SEO & Accessibility (A11y)

- **Semantic HTML**: Use of proper `<section>`, `<nav>`, `<article>`, `<header>`, and `<footer>` tags.
- **ARIA Attributes**: `aria-label`, `aria-hidden`, and `aria-live` are applied across interactive elements.
- **Keyboard Navigation**: Focus rings (`:focus-visible`) are styled consistently. A "skip to content" link is implemented in the root layout.
- **Structured Data**: JSON-LD scripts for `Organization` and `Event` schema are injected into the root `<head>`.

## 5. Future Expansion Path

The architecture is built to support iterative development as KRYPTA 2026 approaches:
1. **Dynamic Routes**: Current sections (e.g., `TimelineSection`, `WhatToExpectSection`) can be relocated to dedicated routes (`/schedule`, `/tracks`) when more detail is available.
2. **Data Fetching**: The `StayUpdatedSection` form component is currently client-side and UI-only. It is designed to easily connect to a Next.js API Route (`/api/notify`) when the backend email service is finalized.
3. **Asset Integration**: Placeholder logo components and Partner boxes are structured to be swapped with `next/image` tags once the official PNGs are provided in `public/logo/`.
