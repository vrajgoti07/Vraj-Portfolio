"use client";

export function DuotonePortrait() {
  return (
    <div className="relative w-full max-w-[340px] aspect-[4/5] rounded-xl overflow-hidden border border-border-hairline bg-bg-surface group select-none">
      {/* Background Graphic Grid */}
      <div className="absolute inset-0 bg-gradient-to-br from-bg-elevated to-bg-primary" />

      {/* Stylized Vector Portrait Placeholder */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
        {/* Abstract Duotone Monogram Circle */}
        <div className="relative w-28 h-28 rounded-full border-2 border-accent/40 bg-bg-surface flex items-center justify-center mb-4 transition-transform duration-500 group-hover:scale-105">
          <span className="font-display italic text-4xl text-accent">VG</span>
          {/* Subtle Duotone Glow overlay */}
          <div className="absolute inset-0 rounded-full bg-accent/10 mix-blend-color-dodge transition-opacity duration-500 group-hover:opacity-0" />
        </div>

        <span className="font-mono text-xs uppercase tracking-widest text-text-primary font-bold">
          Vraj Goti
        </span>
        <span className="font-mono text-[11px] text-text-muted mt-1">
          Surat, Gujarat, India
        </span>

        {/* TODO Placeholder tag */}
        <span className="mt-4 px-2.5 py-1 rounded border border-accent/30 bg-bg-elevated font-mono text-[10px] text-accent">
          TODO(vraj): replace with portrait photo
        </span>
      </div>

      {/* Hairline Frame Accent */}
      <div className="absolute inset-0 border border-border-hairline group-hover:border-accent/40 transition-colors pointer-events-none rounded-xl" />
    </div>
  );
}

