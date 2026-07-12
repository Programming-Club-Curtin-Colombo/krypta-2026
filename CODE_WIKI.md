# Code Wiki

## 1. Project Overview

This repository is a single-application Next.js website for **KRYPTA 2026**, a public-facing landing page for a multi-track hackathon. It is structured as a server-first App Router project with a small amount of client-side interactivity for animations, theme switching, navigation state, and email signup.

### Primary goals of the codebase

- Present the event brand, positioning, and timeline.
- Provide legal pages for privacy and terms.
- Collect email signups through a server-side proxy route.
- Ship as a fast, SEO-friendly, Vercel-ready static-first web app.

### High-level characteristics

- **Framework:** Next.js 16 with App Router
- **Language:** TypeScript 5
- **UI:** React 19 function components
- **Styling:** Tailwind CSS v4 via CSS variables in `src/app/globals.css`
- **Animation:** Framer Motion
- **Theme system:** `next-themes`
- **Testing:** Vitest
- **Deployment target:** Vercel

## 2. Repository Structure

```text
krypta-2026/
├── public/                    # Static assets: logos, icons, OG image, favicons
├── src/
│   ├── app/                   # App Router routes, layout, metadata routes, API route
│   │   ├── api/subscribe/     # POST /api/subscribe server route
│   │   ├── privacy-policy/    # Privacy policy route
│   │   ├── terms/             # Terms route
│   │   ├── globals.css        # Global styles, tokens, utilities
│   │   ├── layout.tsx         # Root HTML shell, metadata, scripts, theme provider
│   │   ├── page.tsx           # Home route composition
│   │   ├── manifest.ts        # PWA manifest
│   │   ├── robots.ts          # robots.txt
│   │   └── sitemap.ts         # sitemap.xml
│   ├── components/
│   │   ├── layout/            # Navbar and Footer
│   │   ├── providers/         # Theme provider wrapper
│   │   ├── sections/          # Homepage content sections
│   │   └── ui/                # Reusable UI primitives and effects
│   └── lib/
│       └── utils.ts           # Shared helpers
├── tests/
│   └── unit/                  # Unit tests
├── README.md                  # User-facing setup and project intro
├── ARCHITECTURE.md            # Existing architecture notes
├── API.md                     # Existing API notes
├── next.config.ts             # Next.js runtime configuration
├── tsconfig.json              # TypeScript config and path alias
├── vitest.config.ts           # Test and coverage config
└── package.json               # Scripts and dependencies
```

## 3. Architecture Summary

The codebase follows a layered composition model:

1. **Route layer** in `src/app`
   - Declares pages, global layout, metadata, and API handlers.
   - Keeps route files thin and delegates most UI rendering to components.

2. **Section/layout component layer** in `src/components`
   - Holds reusable page sections and navigation/footer chrome.
   - Encapsulates nearly all visual structure and interactivity.

3. **Primitive/UI layer** in `src/components/ui`
   - Provides cross-cutting building blocks such as animation wrappers, theme toggles, and the hero background effect.

4. **Utility layer** in `src/lib`
   - Contains shared helpers used across many components.

5. **Static asset layer** in `public`
   - Supplies logo files, icons, favicon assets, and Open Graph images.

### Architectural style

- **Server-first rendering:** Most route files are server components by default.
- **Selective client interactivity:** Files with `"use client"` are limited to parts that need browser APIs or hooks.
- **Composition over inheritance:** The application is built from function components; there are no runtime classes.
- **Configuration by convention:** Next.js App Router conventions handle metadata, manifest, robots, and sitemap generation.

## 4. Runtime Composition

### Root application flow

`src/app/layout.tsx` is the root shell for every route. It is responsible for:

- Defining global `metadata` for SEO, Open Graph, Twitter cards, icons, canonical URL, and verification tags.
- Generating dynamic viewport settings through `generateViewport()`.
- Loading Google Fonts via `next/font/google`.
- Injecting analytics scripts for Google Analytics and Microsoft Clarity.
- Injecting JSON-LD structured data for the organization and event.
- Rendering the skip link for accessibility.
- Wrapping the application in `ThemeProvider`.

### Home page flow

`src/app/page.tsx` is intentionally thin. It assembles the home page in this order:

1. `Navbar`
2. `HeroSection`
3. `AboutSection`
4. `VisionSection`
5. `WhatToExpectSection`
6. `CompetitionFocusSection`
7. `WhyParticipateSection`
8. `TimelineSection`
9. `OrganizedBySection`
10. `StayUpdatedSection`
11. `Footer`

This makes the landing page easy to reorder, expand, or split into separate pages later.

### Subscription flow

The email signup feature spans both client and server modules:

1. `StayUpdatedSection` collects an email in the browser.
2. The form submits a `POST` request to `/api/subscribe`.
3. `src/app/api/subscribe/route.ts` validates input and checks environment configuration.
4. The route proxies the request to an external submission endpoint using `fetch`.
5. The client renders success or error UI based on the response state.

## 5. Major Module Responsibilities

### `src/app`

| Module | Responsibility |
|---|---|
| `layout.tsx` | Global HTML shell, SEO metadata, analytics scripts, structured data, fonts, theme provider |
| `page.tsx` | Home page composition only |
| `api/subscribe/route.ts` | Server-side email submission proxy |
| `privacy-policy/page.tsx` | Legal privacy page |
| `terms/page.tsx` | Legal terms page |
| `manifest.ts` | PWA metadata route |
| `robots.ts` | Search engine crawl rules |
| `sitemap.ts` | XML sitemap entries |
| `globals.css` | Design tokens, theme variables, layout utility classes, app-wide styling |

### `src/components/layout`

| Module | Responsibility |
|---|---|
| `Navbar.tsx` | Responsive site header, anchor navigation, social links, theme toggle, mobile menu |
| `Footer.tsx` | Footer navigation, legal links, social links, branding |

### `src/components/providers`

| Module | Responsibility |
|---|---|
| `ThemeProvider.tsx` | Adapts `next-themes` for app-wide theme control and persistence |

### `src/components/ui`

| Module | Responsibility |
|---|---|
| `AnimatedSection.tsx` | Reusable scroll-into-view motion wrapper |
| `InteractiveGrid.tsx` | Canvas-based animated hero background with theme awareness and reduced-motion fallback |
| `ThemeToggle.tsx` | Light/dark mode toggle button with hydration guard |

### `src/components/sections`

| Module | Responsibility |
|---|---|
| `HeroSection.tsx` | Main brand statement, CTA buttons, hero animation, event highlights |
| `AboutSection.tsx` | Event description and objectives grid |
| `VisionSection.tsx` | Mission/vision statement card |
| `WhatToExpectSection.tsx` | Feature grid for tracks, workshops, judging, and networking |
| `CompetitionFocusSection.tsx` | Process-oriented step list from problem definition to competition outcomes |
| `WhyParticipateSection.tsx` | Benefits/value proposition grid |
| `TimelineSection.tsx` | Event milestone timeline |
| `OrganizedBySection.tsx` | Organizer branding plus partner placeholders |
| `StayUpdatedSection.tsx` | Email signup form, validation, request lifecycle, and feedback states |

### `src/lib`

| Module | Responsibility |
|---|---|
| `utils.ts` | Shared `cn()` helper for class composition |

## 6. Key Components, Functions, and Types

This repository is built primarily from React function components and exported helper functions. There are no domain model classes or service classes in the runtime code.

### Route-level exports

| Symbol | File | Purpose |
|---|---|---|
| `RootLayout` | `src/app/layout.tsx` | Defines the root document structure and global providers/scripts |
| `metadata` | `src/app/layout.tsx` | Global SEO and social metadata |
| `generateViewport()` | `src/app/layout.tsx` | Produces viewport and `colorScheme` settings, including Samsung Internet handling |
| `HomePage` | `src/app/page.tsx` | Composes the home route from section components |
| `POST(request)` | `src/app/api/subscribe/route.ts` | Handles email submissions and proxies to an external endpoint |
| `manifest()` | `src/app/manifest.ts` | Generates PWA manifest content |
| `robots()` | `src/app/robots.ts` | Generates robots rules |
| `sitemap()` | `src/app/sitemap.ts` | Generates sitemap entries |

### Layout and provider components

| Symbol | File | Purpose |
|---|---|---|
| `Navbar` | `src/components/layout/Navbar.tsx` | Sticky responsive navigation with social links and theme switching |
| `Footer` | `src/components/layout/Footer.tsx` | Footer link groups and branding |
| `ThemeProvider` | `src/components/providers/ThemeProvider.tsx` | Wraps `next-themes` with project-specific configuration |

### Reusable UI primitives

| Symbol | File | Purpose |
|---|---|---|
| `AnimatedSection` | `src/components/ui/AnimatedSection.tsx` | Adds reusable reveal-on-scroll motion behavior |
| `InteractiveGrid` | `src/components/ui/InteractiveGrid.tsx` | Renders animated canvas grid in the hero section |
| `ThemeToggle` | `src/components/ui/ThemeToggle.tsx` | Toggles between light and dark themes |
| `cn()` | `src/lib/utils.ts` | Merges conditional/Tailwind classes via `clsx` and `tailwind-merge` |

### Important internal helper functions

| Symbol | File | Purpose |
|---|---|---|
| `validateEmail(value)` | `src/components/sections/StayUpdatedSection.tsx` | Performs client-side email format validation |
| `handleSubmit(event)` | `src/components/sections/StayUpdatedSection.tsx` | Submits email form data to `/api/subscribe` |
| `getNode(x, y)` | `src/components/ui/InteractiveGrid.tsx` | Safely retrieves a grid node in the canvas simulation |
| `resize()` | `src/components/ui/InteractiveGrid.tsx` | Rebuilds canvas/grid dimensions on viewport changes |
| `draw()` | `src/components/ui/InteractiveGrid.tsx` | Executes the animation loop and renders the grid |

### Notable TypeScript types

| Symbol | File | Purpose |
|---|---|---|
| `FormState` | `src/components/sections/StayUpdatedSection.tsx` | Controls signup UI state: `idle`, `loading`, `success`, `error` |
| `MilestoneStatus` | `src/components/sections/TimelineSection.tsx` | Models timeline badge states |
| `Milestone` | `src/components/sections/TimelineSection.tsx` | Defines milestone card shape |
| `AnimatedSectionProps` | `src/components/ui/AnimatedSection.tsx` | Extends motion div props with animation options |

## 7. Dependency Relationships

### Internal dependency map

```text
layout.tsx
  -> globals.css
  -> ThemeProvider
  -> next/font/google
  -> next/script
  -> next/headers

page.tsx
  -> Navbar
  -> all homepage section components
  -> Footer

Navbar / Footer / sections
  -> cn() from src/lib/utils.ts
  -> Tailwind/CSS variable design system

HeroSection
  -> InteractiveGrid
  -> framer-motion

Many section components
  -> AnimatedSection

ThemeProvider
  -> next-themes

ThemeToggle
  -> next-themes

StayUpdatedSection
  -> fetch("/api/subscribe")

api/subscribe/route.ts
  -> process.env.NEXT_PUBLIC_EMAIL_SUBMISSION_ENDPOINT
  -> external email submission service
```

### External package roles

| Dependency | How it is used |
|---|---|
| `next` | Routing, metadata APIs, images, links, scripts, server responses, font loading |
| `react` / `react-dom` | Component rendering and hooks |
| `framer-motion` | Entry animations, reduced-motion support, in-view detection |
| `next-themes` | Theme state, persistence, and resolution |
| `lucide-react` | Icon set for layout and section cards |
| `clsx` | Conditional class building |
| `tailwind-merge` | Resolves conflicting Tailwind utility classes |
| `class-variance-authority` | Present in dependencies but not currently central to the visible source surface |

### Coupling worth noting

- `Navbar` and `HeroSection` both link to `#stay-updated`, so CTA behavior depends on the existence of `StayUpdatedSection`.
- `InteractiveGrid` depends on theme resolution from `next-themes`, so the hero background reacts to theme changes.
- `StayUpdatedSection` depends on `/api/subscribe`, and that route depends on a correctly configured environment variable.
- Legal pages are relatively isolated and do not depend on the layout/navbar/footer component tree.

## 8. Page and Route Details

### `/`

- Implemented by `src/app/page.tsx`.
- Represents the full landing page.
- Uses section-by-section composition rather than monolithic markup.
- Keeps business logic minimal and presentation logic delegated to components.

### `/privacy-policy`

- Implemented by `src/app/privacy-policy/page.tsx`.
- Standalone legal content route.
- Includes page-specific metadata and structured legal sections.

### `/terms`

- Implemented by `src/app/terms/page.tsx`.
- Standalone legal content route.
- Includes page-specific metadata and a local helper section renderer similar to the privacy page.

### `POST /api/subscribe`

- Implemented by `src/app/api/subscribe/route.ts`.
- Expects JSON with an `email` field.
- Returns a validation error if `email` is missing.
- Returns a server misconfiguration error if the outbound endpoint is missing.
- Proxies non-OK statuses from the external service.
- Attempts to parse the upstream response as JSON and falls back to plain text.

### Metadata routes

| Route | Source | Purpose |
|---|---|---|
| `/manifest.webmanifest` | `src/app/manifest.ts` | PWA metadata |
| `/robots.txt` | `src/app/robots.ts` | Crawl instructions |
| `/sitemap.xml` | `src/app/sitemap.ts` | Search engine sitemap |

## 9. Design System and Frontend Patterns

### Styling approach

- Styling is utility-first via Tailwind CSS v4.
- Color, typography, and surface tokens are centralized in `src/app/globals.css`.
- Components rely on CSS custom properties such as `--color-primary`, `--color-background`, and `--color-border`.

### Theming approach

- `ThemeProvider` uses `next-themes` with `attribute="class"`.
- Default theme follows the system theme.
- User preference is persisted under the `krypta-theme` storage key.
- `ThemeToggle` uses a mount guard to avoid hydration mismatches.

### Animation approach

- Framer Motion is the main animation engine.
- `AnimatedSection` standardizes reveal-on-scroll behavior.
- `HeroSection` uses custom motion variants and respects reduced motion.
- `InteractiveGrid` provides a richer animated effect with a static fallback for reduced-motion users.

### Accessibility patterns

- Global skip link exists in `layout.tsx`.
- Semantic landmarks are used across sections, header, nav, main, and footer.
- Buttons/links include accessible labels where needed.
- Reduced motion is respected in animated components.

## 10. Configuration and Environment

### Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Start local development server |
| `npm run build` | Build production bundle |
| `npm run start` | Serve production build |
| `npm run lint` | Run ESLint |
| `npm run type-check` | Run TypeScript without emit |
| `npm test` | Run Vitest |
| `npm run test:ci` | Run Vitest with CI reporters |
| `npm run test:coverage` | Run coverage |

### Core config files

| File | What it controls |
|---|---|
| `next.config.ts` | Strict mode, `poweredByHeader`, image optimization mode, dev-origin behavior, production console stripping |
| `tsconfig.json` | Strict typing, bundler resolution, `@/*` alias |
| `vitest.config.ts` | Test inclusion rules, alias resolution, coverage behavior |
| `eslint.config.mjs` | Next.js ESLint rules |
| `postcss.config.mjs` | Tailwind/PostCSS integration |

### Environment variables

| Variable | Used by | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | README/deployment guidance | Public canonical site URL for deployment configuration |
| `NEXT_PUBLIC_EMAIL_SUBMISSION_ENDPOINT` | `src/app/api/subscribe/route.ts` | External endpoint for email submissions |

### Configuration note

There is a repository-level inconsistency to be aware of:

- `src/app/api/subscribe/route.ts`, `README.md`, and `API.md` describe `NEXT_PUBLIC_EMAIL_SUBMISSION_ENDPOINT`.
- `.env.example` currently contains `NEXT_PUBLIC_NOTIFY_API_URL` instead.

Anyone deploying or testing the subscribe flow should align these names before relying on the example environment file.

## 11. How to Run the Project

### Prerequisites

- Node.js 20+
- npm 10+

### Local setup

```bash
git clone https://github.com/Programming-Club-Curtin-Colombo/krypta-2026.git
cd krypta-2026
npm install
cp .env.example .env.local
```

If you want the email signup flow to work, define the outbound submission URL in `.env.local` using the variable name expected by the API route:

```env
NEXT_PUBLIC_EMAIL_SUBMISSION_ENDPOINT=https://your-endpoint.example.com
```

### Start development

```bash
npm run dev
```

The application runs at `http://localhost:3000`.

### Production build

```bash
npm run build
npm run start
```

### Verification commands

```bash
npm run lint
npm run type-check
npm test
npm audit --audit-level=high
```

## 12. Testing and Quality Gates

### Current test coverage

- The repository currently includes focused unit tests for `cn()` in `tests/unit/utils.test.ts`.
- Coverage intentionally excludes App Router files such as route entry points and metadata route files.

### CI pipeline responsibilities

The GitHub Actions workflow validates:

- Build correctness
- Linting
- Type checking
- Static analysis
- Unit tests
- Security audit
- Coverage reporting
- Additional governance and artifact checks

## 13. Extension Guidance

This repository is set up to grow from a landing page into a fuller event website. The most likely extension points are:

- Add new routes under `src/app` for pages currently referenced in the sitemap comments, such as `/tracks`, `/schedule`, and `/register`.
- Reuse `AnimatedSection` and existing section card patterns for consistent motion behavior.
- Promote currently homepage-only sections into dedicated pages once content grows.
- Replace partner placeholders in `OrganizedBySection` with real sponsor/partner data and images.
- Expand the API surface with additional routes such as contact or registration handlers.

## 14. Practical Takeaways

- The codebase is small, cleanly segmented, and heavily component-driven.
- `layout.tsx` is the architectural root of the app.
- `page.tsx` is intentionally a composition layer, not a logic-heavy page.
- `StayUpdatedSection` plus `POST /api/subscribe` is the main user interaction flow.
- `AnimatedSection`, `InteractiveGrid`, `ThemeToggle`, and `cn()` are the primary reusable building blocks.
- The biggest operational caveat is the environment variable naming mismatch for the subscribe endpoint.
