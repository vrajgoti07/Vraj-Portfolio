import { describe, it, expect } from "vitest";
import { cn } from "@/lib/utils";

describe("cn utility", () => {
  it("should merge basic class names", () => {
    expect(cn("px-2", "py-1")).toBe("px-2 py-1");
  });

  it("should resolve tailwind conflict correctly", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
  });

  it("should handle conditionals cleanly", () => {
    const isDark = true;
    expect(cn("base-class", isDark && "dark-active", false && "ignored")).toBe(
      "base-class dark-active"
    );
  });
});

