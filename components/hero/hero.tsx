"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, FileText } from "lucide-react";
import { AvailabilityPill } from "./availability-pill";
import { Constellation } from "./constellation";

export function Hero() {
  const [suratTime, setSuratTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = new Intl.DateTimeFormat("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }).format(now);
      setSuratTime(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const scrollToWork = () => {
    const el = document.getElementById("work");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between px-6 max-w-[1280px] mx-auto w-full pt-8 pb-12">
      {/* 12-column Hero Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center my-auto">
        {/* Left Column (Cols 1-7): Editorial Typography & CTAs */}
        <div className="lg:col-span-7 flex flex-col gap-6 z-10">
          <AvailabilityPill />

          {/* Headline in Instrument Serif with Italic Emphasis */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-5xl sm:text-7xl xl:text-8xl tracking-tight leading-[0.94] text-text-primary"
          >
            I build AI products that{" "}
            <em className="italic font-normal text-accent font-display">ship</em>.
          </motion.h1>

          {/* Subline */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="font-sans text-base sm:text-lg text-text-muted max-w-xl leading-relaxed"
          >
            Full-stack engineer crafting autonomous AI agents, realtime voice systems,
            and robust web software with end-to-end craft.
            <span className="block mt-1 text-xs font-mono text-text-muted/70">
              TODO(vraj): refine one-line positioning statement
            </span>
          </motion.p>

          {/* Primary & Secondary CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <button
              type="button"
              onClick={scrollToWork}
              className="px-6 py-3.5 rounded font-mono text-xs uppercase tracking-wider font-semibold bg-accent text-accent-contrast hover:bg-accent/90 transition-all flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-accent shadow-sm"
            >
              <span>View work</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </button>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded font-mono text-xs uppercase tracking-wider font-semibold border border-border-subtle hover:border-text-primary text-text-primary transition-all flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-accent group"
            >
              <FileText className="w-3.5 h-3.5 text-text-muted group-hover:text-accent transition-colors" />
              <span>Download resume</span>
              <span className="text-[10px] text-accent/80 ml-1 font-normal">
                (TODO)
              </span>
            </a>
          </motion.div>
        </div>

        {/* Right Column (Cols 8-12): Signature Constellation */}
        <div className="lg:col-span-5 w-full flex items-center justify-center">
          <Constellation />
        </div>
      </div>

      {/* Hero Bottom Metadata Row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="w-full pt-10 border-t border-border-hairline flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-text-muted"
      >
        {/* Left: Location & Time */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-lime" />
            <span className="text-text-primary font-medium">Surat, Gujarat, India</span>
          </div>
          <span>•</span>
          <span>{suratTime ? `${suratTime} IST` : "IST"}</span>
        </div>

        {/* Right: Scroll Hint */}
        <div
          onClick={scrollToWork}
          className="flex items-center gap-2 cursor-pointer hover:text-accent transition-colors group"
        >
          <span className="uppercase tracking-widest text-[11px]">
            Scroll to explore
          </span>
          <ArrowDown className="w-3 h-3 group-hover:translate-y-0.5 transition-transform" />
        </div>
      </motion.div>
    </section>
  );
}

