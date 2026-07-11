import { describe, it, expect } from "vitest";
import { cn } from "@/lib/utils";

describe("cn (class name utility)", () => {
  it("merges class strings", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("handles conditional classes", () => {
    expect(cn("base", false && "excluded", "included")).toBe("base included");
  });

  it("resolves Tailwind conflicts in favour of the last class", () => {
    // tailwind-merge should deduplicate conflicting utility classes.
    expect(cn("p-4", "p-8")).toBe("p-8");
  });

  it("returns an empty string for no arguments", () => {
    expect(cn()).toBe("");
  });
});
