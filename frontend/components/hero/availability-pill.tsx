"use client";

import { motion } from "framer-motion";

export function AvailabilityPill() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-border-hairline bg-bg-surface/80 backdrop-blur-sm w-fit group hover:border-accent/40 transition-colors"
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
      </span>
      <span className="font-mono text-xs uppercase tracking-wider text-text-primary">
        Open to internships and junior roles
      </span>
      <span
        title="Placeholder from Master Prompt"
        className="font-mono text-[10px] text-accent/80 border border-accent/20 rounded px-1.5 py-0.5 tracking-tight hidden sm:inline"
      >
        TODO(vraj): confirm status
      </span>
    </motion.div>
  );
}

