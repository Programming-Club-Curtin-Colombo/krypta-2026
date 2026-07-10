import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "node",
    include: ["tests/**/*.test.{ts,tsx}"],
    globals: false,

    // Coverage is activated by passing --coverage on the CLI (e.g. npm run test:ci).
    // Provider: v8 (built into Node, zero extra compilation overhead).
    // Reporters: lcov (for CI tools) + text (for terminal summary).
    coverage: {
      provider: "v8",
      reporter: ["lcov", "text"],
      reportsDirectory: "coverage",
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "src/**/*.d.ts",
        "src/app/api/**",
        "src/app/layout.tsx",
        "src/app/page.tsx",
        "src/app/manifest.ts",
        "src/app/robots.ts",
        "src/app/sitemap.ts",
      ],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

