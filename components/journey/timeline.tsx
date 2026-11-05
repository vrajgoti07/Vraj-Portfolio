"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

interface TimelineEntry {
  year: string;
  role: string;
  institution: string;
  description: string;
  isTodo?: boolean;
}

const TIMELINE_ENTRIES: TimelineEntry[] = [
  {
    year: "2024 — Present",
    role: "Full-Stack & Autonomous AI Systems Focus",
    institution: "Independent Engineering & Open Source",
    description:
      "Engineered Knowledge-AI-Voice-Agent (sub-750ms WebSocket pipeline), multi-agent PR evaluators, and production web applications.",
  },
  {
    year: "2023 — 2024",
    role: "AI & Full-Stack Projects",
    institution: "University / Academic Engineering",
    description:
      "Developed genetic algorithms for NP-hard timetable scheduling and OCR-based compliance tracking with Flutter & Cloud Vision.",
    isTodo: true,
  },
  {
    year: "2022 — 2023",
    role: "Computer Science & Engineering Foundations",
    institution: "Academic Curriculum (Surat, Gujarat, India)",
    description:
      "Deep-dive into Data Structures, Algorithms, Relational Database Modeling, Operating Systems, and Python backend engineering.",
    isTodo: true,
  },
  {
    year: "2021 — 2022",
    role: "Software Development Inception",
    institution: "Exploration & Web Fundamentals",
    description:
      "First web software and algorithmic problem solving. Began open-source contributions on GitHub.",
    isTodo: true,
  },
];

export function Timeline() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 35,
    restDelta: 0.001,
  });

  return (
    <section ref={containerRef} className="w-full border-t border-border-hairline bg-bg-primary py-24 px-6">
      <div className="max-w-[1000px] mx-auto">
        <div className="mb-14">
          <span className="font-mono text-xs uppercase tracking-widest text-accent mb-2 block">
            // Milestones
          </span>
          <h2 className="font-display text-4xl sm:text-6xl text-text-primary tracking-tight">
            Journey &amp; engineering <em className="italic text-accent font-display">path</em>.
          </h2>
        </div>

        {/* Vertical Timeline Track */}
        <div className="relative pl-6 sm:pl-10 flex flex-col gap-12">
          {/* Base hairline track */}
          <div className="absolute top-0 bottom-0 left-[11px] sm:left-[15px] w-[2px] bg-border-hairline" />

          {/* Animated Lime Progress Line */}
          <motion.div
            style={{ scaleY }}
            className="absolute top-0 bottom-0 left-[11px] sm:left-[15px] w-[2px] bg-accent origin-top"
          />

          {TIMELINE_ENTRIES.map((entry, idx) => (
            <div key={idx} className="relative flex flex-col gap-2 group">
              {/* Node indicator */}
              <div className="absolute -left-[30px] sm:-left-[35px] top-1.5 w-3 h-3 rounded-full border-2 border-accent bg-bg-primary group-hover:bg-accent transition-colors z-10" />

              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-xs font-semibold text-accent">
                  {entry.year}
                </span>
                <span className="text-border-subtle">•</span>
                <span className="font-mono text-xs text-text-muted uppercase tracking-wider">
                  {entry.institution}
                </span>
                {entry.isTodo && (
                  <span className="font-mono text-[9px] text-accent/70 border border-accent/20 rounded px-1.5 py-0.2">
                    TODO(vraj): confirm milestone details
                  </span>
                )}
              </div>

              <h3 className="font-display text-2xl text-text-primary">
                {entry.role}
              </h3>

              <p className="font-sans text-xs sm:text-sm text-text-muted leading-relaxed max-w-2xl">
                {entry.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

