"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS } from "@/content/projects";
import { ProjectCard } from "./project-card";

export function WorkSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 1023px)").matches;

    // Do NOT pin on mobile or when reduced motion is preferred
    if (prefersReducedMotion || isMobile) return;

    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      // Calculate how far track should scroll horizontally dynamically
      const getScrollDistance = () => {
        if (!track) return 0;
        return Math.max(0, track.scrollWidth - window.innerWidth + 120);
      };

      gsap.to(track, {
        x: () => -getScrollDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          pinSpacing: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${getScrollDistance()}`,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    // Refresh ScrollTrigger when section or cards resize
    const resizeObserver = new ResizeObserver(() => {
      ScrollTrigger.refresh();
    });
    resizeObserver.observe(section);
    resizeObserver.observe(track);

    // Refresh after custom web fonts finish rendering
    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });
    }

    return () => {
      resizeObserver.disconnect();
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative w-full border-t border-border-hairline bg-bg-primary overflow-hidden py-16 sm:py-24"
    >
      <div className="max-w-[1280px] mx-auto px-6 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-accent mb-2 block">
            // 01 Selected Work
          </span>
          <h2 className="font-display text-4xl sm:text-6xl text-text-primary tracking-tight">
            Engineered for <em className="italic text-accent font-display">production</em>.
          </h2>
        </div>

        <p className="font-sans text-xs sm:text-sm text-text-muted max-w-md">
          A collection of real-world AI systems, autonomous agents, and full-stack software
          built with rigorous engineering and measurable outcomes.
        </p>
      </div>

      {/* Desktop Horizontal Scroll Track & Mobile Vertical Bento Stack */}
      <div className="w-full">
        <div
          ref={trackRef}
          className="flex flex-col lg:flex-row gap-8 px-6 max-w-[1280px] lg:max-w-none mx-auto lg:pl-[calc((100vw-1280px)/2+24px)] lg:w-max items-stretch"
        >
          {PROJECTS.map((project) => (
            <div key={project.slug} id={project.slug} className="flex">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

