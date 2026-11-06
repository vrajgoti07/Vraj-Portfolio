"use client";

import { useState } from "react";
import { Copy, Check, Mail, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";
import { SITE_CONFIG } from "@/content/site";
import { ContactForm } from "./contact-form";

export function ContactSection() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(SITE_CONFIG.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="w-full border-t border-border-hairline bg-bg-primary py-24 px-6">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-16">
        {/* Giant Serif Header */}
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-accent mb-3 block">
            // 04 Direct Inquiry
          </span>
          <h2 className="font-display text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-[0.93] text-text-primary max-w-4xl">
            Let&apos;s build something{" "}
            <em className="italic text-accent font-display">useful</em>.
          </h2>
        </div>

        {/* 2-Column Grid: Contact Coordinates (Left) & Form (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Coordinates */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <p className="font-sans text-sm sm:text-base text-text-muted leading-relaxed">
              Whether you are looking to collaborate on autonomous AI products, need a high-performance
              full-stack engineer, or want to discuss an internship or junior role, my inbox is open.
            </p>

            {/* Email Card with Click-to-Copy */}
            <div className="p-6 rounded-xl border border-border-hairline bg-bg-surface flex flex-col gap-3">
              <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
                Direct Email (Click to copy)
              </span>

              <button
                type="button"
                onClick={copyEmail}
                suppressHydrationWarning
                className="flex items-center justify-between gap-3 p-3 rounded-lg border border-border-subtle bg-bg-elevated hover:border-accent group transition-all text-left"
                aria-label="Copy email address"
              >
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <Mail className="w-4 h-4 text-accent shrink-0" />
                  <span className="font-mono text-xs sm:text-sm text-text-primary group-hover:text-accent transition-colors truncate">
                    {SITE_CONFIG.email}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 font-mono text-[11px] text-text-muted group-hover:text-accent">
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-accent" />
                      <span className="text-accent font-semibold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </div>
              </button>
            </div>

            {/* Social Links */}
            <div className="flex flex-col gap-3">
              <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
                Network &amp; Profiles
              </span>

              <div className="flex flex-wrap gap-3 font-mono text-xs">
                <a
                  href={SITE_CONFIG.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-lg border border-border-hairline bg-bg-surface hover:border-accent text-text-primary hover:text-accent flex items-center gap-2 transition-all"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>GitHub</span>
                  <ExternalLink className="w-3 h-3 text-text-muted" />
                </a>

                <a
                  href={SITE_CONFIG.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-lg border border-border-hairline bg-bg-surface hover:border-accent text-text-primary hover:text-accent flex items-center gap-2 transition-all"
                >
                  <span>LinkedIn</span>
                  <ExternalLink className="w-3 h-3 text-text-muted" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 rounded-xl border border-border-hairline bg-bg-surface p-6 sm:p-8 shadow-sm">
            <h3 className="font-display text-2xl text-text-primary mb-2">
              Send a direct message
            </h3>
            <p className="font-sans text-xs text-text-muted mb-6">
              Fill out the form below and I will reply within 24 to 48 hours.
            </p>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}

