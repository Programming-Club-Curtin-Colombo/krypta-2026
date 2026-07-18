# Contributing to KRYPTA 2026

Thank you for contributing to the KRYPTA 2026 website. Please read this guide before opening a Pull Request.

---

## Prerequisites

- **Node.js** 20+
- **npm** 10+
- **Git**

---

## Local Development Setup

```bash
# 1. Clone and enter the repository
git clone https://github.com/Programming-Club-Curtin-Colombo/krypta-2026.git
cd krypta-2026

# 2. Install dependencies
npm install

# 3. Create your local environment file
cp .env.example .env.local
# Edit .env.local and set NEXT_PUBLIC_SITE_URL and any other required values.

# 4. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The page hot-reloads on save.

---

## Branch Naming

All branches must follow this convention:

| Type | Pattern | Example |
|---|---|---|
| Feature | `feat/<short-description>` | `feat/registration-page` |
| Bug fix | `fix/<short-description>` | `fix/navbar-mobile-overflow` |
| Documentation | `docs/<short-description>` | `docs/update-contributing` |
| Refactor | `refactor/<short-description>` | `refactor/hero-section-cleanup` |
| Chore / tooling | `chore/<short-description>` | `chore/update-dependencies` |

---

## Commit Message Format

This project follows [Conventional Commits](https://www.conventionalcommits.org/).

```
<type>(<scope>): <short summary>

[optional body]
```

**Examples:**
```
feat(sections): add sponsors section
fix(navbar): correct mobile menu z-index
docs(readme): add production build instructions
chore(deps): bump framer-motion to 12.1.0
```

---

## Running Checks Locally

Run all checks before submitting a PR. All five must pass for CI to go green:

```bash
# 1. Production build (catches compile-time and Next.js errors)
npm run build

# 2. ESLint
npm run lint

# 3. TypeScript strict type check
npm run type-check

# 4. Unit tests
npm test

# 5. Dependency security audit
npm audit --audit-level=high
```

---

## Pull Request Checklist

Before marking a PR as ready for review, confirm the following:

- [ ] All CI stages pass (Build, Lint, Static, Test, Security)
- [ ] `npm run type-check` exits with code 0
- [ ] No new ESLint warnings or errors introduced
- [ ] For UI changes: screenshots or a screen recording are attached
- [ ] Commit messages follow the Conventional Commits format
- [ ] Branch is up to date with `main`

---

## CI Pipeline

Every PR triggers the Standard CI Pipeline defined in [`.github/workflows/ci.yml`](.github/workflows/ci.yml). The Governance Engine evaluates all five required stages before a merge is permitted.

| Stage | What it runs |
|---|---|
| **Build** | `npm run build` - Next.js production build |
| **Lint** | `npm run lint` + `npm run type-check` |
| **Static** | `ts-prune` (unused exports) + `depcheck` (unused dependencies) |
| **Test** | `npm test` - Vitest unit tests in `tests/` |
| **Security** | `npm audit --audit-level=high` |

---

## Code Style

- Follow the conventions already established in the codebase.
- Components live in `src/components/`. Group by responsibility: `layout/`, `sections/`, `ui/`, `providers/`.
- Use the `cn()` utility from `src/lib/utils.ts` for conditional Tailwind classes.
- Prefer server components for static content; add `"use client"` only when browser APIs or React state are required.
- Do not leave commented-out code. Use version control for history.

---

## Code of Conduct

All contributors are expected to be respectful and professional in every interaction - in issues, PRs, and commit messages. Harassment of any kind will not be tolerated.
