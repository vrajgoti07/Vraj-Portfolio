"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function Footer() {
  const [suratTime, setSuratTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = new Intl.DateTimeFormat("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }).format(now);
      setSuratTime(formatted);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full border-t border-border-hairline bg-bg-surface/50 text-text-muted font-mono text-xs py-10 transition-colors">
      <div className="max-w-[1280px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Built with Next.js & copyright */}
        <div className="flex flex-wrap items-center gap-4 text-center md:text-left">
          <span>© {new Date().getFullYear()} Vraj Goti. All rights reserved.</span>
          <span className="hidden sm:inline text-border-subtle">•</span>
          <span className="text-text-primary">
            Built with Next.js & TypeScript
          </span>
        </div>

        {/* Center: Live Surat, IN Time */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded border border-border-hairline bg-bg-surface">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-lime" />
          <span className="text-text-muted">Surat, IN</span>
          <span className="text-text-primary font-semibold">
            {suratTime || "IST"}
          </span>
        </div>

        {/* Right: Back to top button */}
        <button
          type="button"
          onClick={scrollToTop}
          className="flex items-center gap-2 hover:text-accent transition-colors focus-visible:ring-2 focus-visible:ring-accent rounded px-2 py-1"
          aria-label="Back to top of page"
        >
          <span>Back to top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
}

