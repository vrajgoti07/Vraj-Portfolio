"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ExternalLink, ArrowRight } from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";
import { Project } from "@/content/projects";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [borderHighlight, setBorderHighlight] = useState({ x: 50, y: 50, active: false });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    // Only run on fine pointers (desktop mouse)
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Normalize -1 to 1
    const normX = (x / rect.width) * 2 - 1;
    const normY = (y / rect.height) * 2 - 1;

    // Max 5 degrees tilt
    setRotateX(-normY * 5);
    setRotateY(normX * 5);

    setBorderHighlight({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      active: true,
    });
  };

  const handlePointerLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setBorderHighlight((prev) => ({ ...prev, active: false }));
  };

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: rotateX === 0 ? "transform 0.5s ease-out" : "none",
      }}
      className="relative flex flex-col justify-between rounded-xl border border-border-hairline bg-bg-surface p-6 sm:p-8 w-full max-w-full lg:min-w-[420px] lg:max-w-[460px] h-full overflow-hidden group hover:border-border-subtle hover:bg-bg-elevated/40 transition-colors"
    >
      {/* Dynamic Cursor Border Highlight */}
      {borderHighlight.active && (
        <div
          style={{
            background: `radial-gradient(320px circle at ${borderHighlight.x}% ${borderHighlight.y}%, rgba(200, 255, 61, 0.14), transparent 60%)`,
          }}
          className="absolute inset-0 pointer-events-none z-0"
        />
      )}

      {/* Card Header: Index & Abstract Visual Placeholder */}
      <div className="flex flex-col gap-5 z-10">
        <div className="flex items-center justify-between font-mono text-xs text-text-muted">
          <span className="text-accent font-semibold tracking-widest">// {project.index}</span>
          <span className="text-[10px] tracking-wide border border-border-hairline rounded px-2 py-0.5">
            {project.role}
          </span>
        </div>

        {/* Abstract Architectural SVG Art (Placeholder for Real Screenshot) */}
        <div className="relative w-full h-44 rounded-lg border border-border-hairline bg-bg-primary overflow-hidden flex flex-col items-center justify-center p-4 text-center">
          {/* Subtle geometric SVG pattern */}
          <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id={`grid-${project.slug}`} width="24" height="24" patternUnits="userSpaceOnUse">
                <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#C8FF3D" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#grid-${project.slug})`} />
          </svg>

          {/* Center Monogram / Abstract Mark */}
          <div className="relative z-10 w-10 h-10 rounded-full border border-accent/40 bg-bg-surface flex items-center justify-center mb-2">
            <span className="font-mono text-xs font-bold text-accent">{project.index}</span>
          </div>

          <span className="relative z-10 font-mono text-[10px] uppercase tracking-widest text-text-muted">
            {project.tagline}
          </span>

          <span className="absolute bottom-2 right-2 text-[9px] font-mono text-accent/70 bg-bg-surface/90 px-1.5 py-0.5 rounded border border-accent/20">
            TODO(vraj): replace with screenshot
          </span>
        </div>

        {/* Title in Instrument Serif */}
        <h3 className="font-display text-2xl sm:text-3xl text-text-primary tracking-tight leading-snug">
          {project.title}
        </h3>

        {/* Problem Statement */}
        <p className="font-sans text-xs sm:text-sm text-text-muted leading-relaxed line-clamp-2">
          {project.problem}
        </p>

        {/* Outcome */}
        <div className="p-3 rounded-lg border border-border-hairline bg-bg-surface/80 flex items-start gap-2">
          <span className="text-accent text-xs font-bold mt-0.5">↳</span>
          <p className="font-sans text-xs text-text-primary leading-normal">
            {project.outcome}
          </p>
        </div>

        {/* Tech Chips */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.stack.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded font-mono text-[10px] tracking-wide uppercase bg-bg-elevated border border-border-hairline text-text-muted"
            >
              {tech}
            </span>
          ))}
          {project.stack.length > 5 && (
            <span className="px-1.5 py-0.5 rounded font-mono text-[10px] text-text-muted">
              +{project.stack.length - 5}
            </span>
          )}
        </div>
      </div>

      {/* Card Actions Footer */}
      <div className="flex items-center justify-between pt-6 mt-6 border-t border-border-hairline z-10">
        <div className="flex items-center gap-3">
          <a
            href={project.links.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded border border-border-hairline hover:border-accent text-text-muted hover:text-accent transition-colors"
            aria-label={`GitHub Repository for ${project.title}`}
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          {project.links.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded border border-border-hairline hover:border-accent text-text-muted hover:text-accent transition-colors"
              aria-label={`Live Demo for ${project.title}`}
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>

        <Link
          href={`/work/${project.slug}`}
          className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-text-primary hover:text-accent transition-colors group/link font-semibold"
        >
          <span>Case study</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
