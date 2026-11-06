"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";

interface NavbarProps {
  onOpenCommandPalette?: () => void;
}

export function Navbar({ onOpenCommandPalette }: NavbarProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <>
      {/* Accessible Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-accent text-accent-contrast font-mono text-xs uppercase tracking-wider rounded font-semibold"
      >
        Skip to main content
      </a>

      <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md bg-bg-primary/80 border-b border-border-hairline transition-colors">
        <div className="max-w-[1280px] mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo mark */}
          <Link
            href="/"
            className="flex items-center gap-2 font-mono text-sm tracking-widest text-text-primary hover:text-accent transition-colors group"
            aria-label="Vraj Goti Home"
          >
            <span className="w-8 h-8 rounded border border-border-subtle flex items-center justify-center font-bold bg-bg-surface group-hover:border-accent group-hover:text-accent transition-all">
              VG
            </span>
            <span className="hidden sm:inline font-mono text-xs text-text-muted tracking-wider uppercase">
              Vraj Goti
            </span>
          </Link>

          {/* Navigation links & actions */}
          <nav aria-label="Main Navigation" className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-6 text-xs font-mono tracking-wider uppercase text-text-muted">
              <Link
                href={isHome ? "#work" : "/#work"}
                className="hover:text-text-primary transition-colors focus-visible:text-accent"
              >
                // 01 Work
              </Link>
              <Link
                href="/ask"
                className={`transition-colors focus-visible:text-accent ${
                  pathname === "/ask" ? "text-accent font-semibold" : "hover:text-text-primary"
                }`}
              >
                // 02 Ask
              </Link>
              <Link
                href={isHome ? "#about" : "/#about"}
                className="hover:text-text-primary transition-colors focus-visible:text-accent"
              >
                // 03 About
              </Link>
              <Link
                href={isHome ? "#contact" : "/#contact"}
                className="hover:text-text-primary transition-colors focus-visible:text-accent"
              >
                // 04 Contact
              </Link>
            </div>

            <div className="flex items-center gap-3">
              {/* Cmd+K trigger pill */}
              <button
                type="button"
                suppressHydrationWarning
                onClick={onOpenCommandPalette}
                className="hidden sm:flex items-center gap-2 px-2.5 py-1.5 rounded border border-border-hairline bg-bg-surface text-text-muted hover:text-text-primary hover:border-border-subtle text-xs font-mono transition-all"
                aria-label="Open Command Palette (Cmd + K)"
              >
                <span className="text-[10px] uppercase tracking-wider">Search</span>
                <kbd className="px-1.5 py-0.5 rounded bg-bg-elevated border border-border-hairline text-[10px] text-accent">
                  ⌘K
                </kbd>
              </button>

              {/* Theme switcher */}
              <ThemeToggle />
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
