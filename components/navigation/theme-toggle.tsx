"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("vg-theme") as "dark" | "light" | null;
    if (stored) {
      setTheme(stored);
      document.documentElement.setAttribute("data-theme", stored);
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const initial = prefersDark ? "dark" : "light";
      setTheme(initial);
      document.documentElement.setAttribute("data-theme", initial);
    }
  }, []);

  const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    const nextTheme = theme === "dark" ? "light" : "dark";

    const updateDOM = () => {
      setTheme(nextTheme);
      document.documentElement.setAttribute("data-theme", nextTheme);
      localStorage.setItem("vg-theme", nextTheme);
    };

    // Use View Transitions API if supported and user doesn't prefer reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || prefersReducedMotion) {
      updateDOM();
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = document.startViewTransition(() => {
      updateDOM();
    });

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ];
      document.documentElement.animate(
        {
          clipPath: clipPath,
        },
        {
          duration: 450,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });
  };

  if (!mounted) {
    return (
      <button
        type="button"
        className="w-9 h-9 flex items-center justify-center rounded-full border border-border-hairline text-text-muted hover:text-text-primary hover:border-border-subtle transition-colors"
        aria-label="Toggle theme"
      >
        <span className="w-4 h-4" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="w-9 h-9 flex items-center justify-center rounded-full border border-border-hairline text-text-muted hover:text-text-primary hover:border-border-subtle transition-colors focus-visible:ring-2 focus-visible:ring-accent"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
    >
      {theme === "dark" ? (
        <Sun className="w-4 h-4 text-accent transition-transform hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 text-accent transition-transform hover:-rotate-12" />
      )}
    </button>
  );
}

