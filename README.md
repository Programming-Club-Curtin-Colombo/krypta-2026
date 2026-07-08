# KRYPTA 2026

> **Knowledge, Research & Yielding Parallel Technologies Arena**

The official public landing page for **KRYPTA 2026** — a premier multi-track hackathon competition organized by the **Programming Club of Curtin University Colombo**.

[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)](https://krypta2026.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-38bdf8?logo=tailwindcss)](https://tailwindcss.com)

---

## Overview

This repository contains the **Coming Soon / Event Announcement** landing page for KRYPTA 2026. It is designed as a production-quality starter that establishes the event's identity and allows for seamless future expansion as the event details are confirmed.

---

## Technology Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion |
| Icons | Lucide React |
| Theme | next-themes |
| Fonts | Space Grotesk (headings), Inter (body) via `next/font` |
| Linting | ESLint (Next.js config) |
| Formatting | Prettier |
| Deployment | Vercel |

---

## Project Structure

```
krypta-2026/
├── public/
│   ├── logo/               # Drop PNG logo assets here (see logo/README.md)
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── globals.css     # Full design system (tokens, light/dark mode)
│   │   ├── layout.tsx      # Root layout: fonts, SEO metadata, JSON-LD, ThemeProvider
│   │   ├── page.tsx        # Home page — section composition
│   │   ├── robots.ts       # robots.txt generation
│   │   ├── sitemap.ts      # sitemap.xml generation
│   │   └── manifest.ts     # PWA manifest generation
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   ├── providers/
│   │   │   └── ThemeProvider.tsx
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── AboutSection.tsx
│   │   │   ├── VisionSection.tsx
│   │   │   ├── WhatToExpectSection.tsx
│   │   │   ├── CompetitionFocusSection.tsx
│   │   │   ├── WhyParticipateSection.tsx
│   │   │   ├── TimelineSection.tsx
│   │   │   ├── OrganizedBySection.tsx
│   │   │   └── StayUpdatedSection.tsx
│   │   └── ui/
│   │       ├── AnimatedSection.tsx
│   │       └── ThemeToggle.tsx
│   └── lib/
│       └── utils.ts        # cn() — Tailwind class merging utility
├── .env.example            # Environment variable template
├── .prettierrc
├── next.config.ts
├── tsconfig.json
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
git clone https://github.com/Programming-Club-Curtin-Colombo/krypta-2026.git
cd krypta-2026
npm install
```

### Environment Setup

```bash
cp .env.example .env.local
# Edit .env.local with your actual values if needed
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm run start
```

### Linting

```bash
npm run lint
npx tsc --noEmit   # TypeScript strict check
```

---

## Adding Logo Assets

The official KRYPTA 2026 logo is placed in `public/logo/`.

| File | Usage |
|---|---|
| `krypta-logo.png` | Full wordmark (used on both light and dark backgrounds) |
| `krypta-icon-192.png` | PWA icon 192×192 |
| `krypta-icon-512.png` | PWA icon 512×512 |

See [`public/logo/README.md`](./public/logo/README.md) for full usage instructions.

---

## Connecting the Email Form

The **Stay Updated** section (`src/components/sections/StayUpdatedSection.tsx`) is UI-only. Search for `// TODO` to find the integration point and wire it to your preferred backend (e.g., Resend, Mailchimp, Loops, or a custom API route).

---

## Deployment

This site is configured for deployment on **Vercel**.

1. Push to your GitHub repository.
2. Connect the repository to a new Vercel project.
3. Set `NEXT_PUBLIC_SITE_URL` in Vercel's Environment Variables dashboard.
4. Deploy.

The `sitemap.xml`, `robots.txt`, and `manifest.webmanifest` are auto-generated at build time by Next.js App Router file conventions.

---

## Future Pages

The following pages are planned for future expansion. The sitemap already contains commented-out entries for each:

- `/about` — Full About page
- `/tracks` — Competition tracks detail
- `/schedule` — Event schedule
- `/sponsors` — Sponsors showcase
- `/judges` — Judges panel
- `/faq` — Frequently Asked Questions
- `/register` — Registration portal
- `/workshops` — Workshop listing
- `/rules` — Competition rules
- `/contact` — Contact form

---

## License

© 2026 Programming Club — Curtin University Colombo. All rights reserved.
