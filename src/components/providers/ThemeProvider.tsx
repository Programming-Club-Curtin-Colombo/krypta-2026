"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange={false}
      storageKey="krypta-theme"
    >
      {children}
    </NextThemesProvider>
  );
}

// Note: next-themes injects a script tag which causes a React warning in development.
// This is a known issue with next-themes + React 19 and does not affect functionality.
// The warning only appears in development mode and is suppressed in production builds.
// See: https://github.com/pacocoursey/next-themes/issues/189
