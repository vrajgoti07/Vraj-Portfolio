"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function IntroLoader() {
  const [visible, setVisible] = useState(true);
  const [typedText, setTypedText] = useState("");
  const targetText = "VRAJ GOTI";

  useEffect(() => {
    // Skip if user prefers reduced motion or already saw loader this session
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hasSeen = sessionStorage.getItem("vg-intro-seen");

    if (prefersReducedMotion || hasSeen) {
      setVisible(false);
      return;
    }

    let charIndex = 0;
    const typeInterval = setInterval(() => {
      if (charIndex < targetText.length) {
        setTypedText(targetText.slice(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        // Pause briefly after typing before splitting curtain
        setTimeout(() => {
          dismiss();
        }, 350);
      }
    }, 60);

    const handleKeyDown = () => dismiss();
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearInterval(typeInterval);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const dismiss = () => {
    setVisible(false);
    try {
      sessionStorage.setItem("vg-intro-seen", "true");
    } catch {}
  };

  return (
    <AnimatePresence>
      {visible && (
        <div
          role="dialog"
          aria-label="Welcome to Vraj Goti's Portfolio"
          aria-modal="true"
          onClick={dismiss}
          className="fixed inset-0 z-50 flex items-center justify-center cursor-pointer select-none"
        >
          {/* Left Curtain */}
          <motion.div
            initial={{ x: "0%" }}
            exit={{ x: "-100%" }}
            transition={{
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute top-0 left-0 w-1/2 h-full bg-[#0B0B0C] border-r border-white/5"
          />

          {/* Right Curtain */}
          <motion.div
            initial={{ x: "0%" }}
            exit={{ x: "100%" }}
            transition={{
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute top-0 right-0 w-1/2 h-full bg-[#0B0B0C] border-l border-white/5"
          />

          {/* Monospaced text typing in center */}
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative z-10 flex items-center gap-2 font-mono text-xs sm:text-sm uppercase tracking-[0.3em] text-[#ECE9E2]"
          >
            <span>{typedText}</span>
            <span className="w-2 h-4 bg-[#C8FF3D] animate-pulse" />
          </motion.div>

          {/* Skip prompt hint */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.3 }}
            className="absolute bottom-8 font-mono text-[10px] tracking-widest text-[#8C8A84] uppercase z-10"
          >
            Click or press any key to skip
          </motion.span>
        </div>
      )}
    </AnimatePresence>
  );
}

