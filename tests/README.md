# Test Suite

This directory contains the automated tests for the KRYPTA 2026 project.

## Test Runner

Tests are executed with **[Vitest](https://vitest.dev/)**, configured in [`vitest.config.ts`](../vitest.config.ts) at the project root.

## Structure

```
tests/
└── unit/
    └── utils.test.ts    # Tests for src/lib/utils.ts (cn utility)
```

| Directory | Purpose |
|---|---|
| `unit/` | Pure logic tests - no DOM, no network, no Next.js runtime |

Integration and E2E test directories (`integration/`, `e2e/`) will be added as the application grows.

## Running Tests

```bash
# Run all tests once (used by CI)
npm test

# Run in watch mode during development
npx vitest
```

## Writing Tests

- Place new unit tests under `tests/unit/` with the `.test.ts` or `.test.tsx` extension.
- Import from `@/` (mapped to `src/`) - the alias is configured in `vitest.config.ts`.
- Use `describe` / `it` / `expect` from `vitest` directly (no globals - `globals: false`).

```ts
import { describe, it, expect } from "vitest";
import { myUtil } from "@/lib/myUtil";

describe("myUtil", () => {
  it("does the expected thing", () => {
    expect(myUtil("input")).toBe("expected output");
  });
});
```

## Governance

The `test` stage in `.github/workflows/ci.yml` runs `npm test`. It is a **required stage** per `.governance.json` - all tests must pass for a PR to be mergeable.
