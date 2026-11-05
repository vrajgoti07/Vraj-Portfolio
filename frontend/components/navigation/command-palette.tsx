"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import {
  FileText,
  Sun,
  Moon,
  Copy,
  Check,
  FolderGit2,
  ExternalLink,
  Search,
  MessageSquare,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";
import { PROJECTS } from "@/content/projects";
import { SITE_CONFIG } from "@/content/site";

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
      if (e.key === "Escape" && open) {
        onOpenChange(false);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, onOpenChange]);

  const runCommand = (command: () => void) => {
    onOpenChange(false);
    command();
  };

  const toggleTheme = () => {
    const current = document.documentElement.getAttribute("data-theme") || "dark";
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("vg-theme", next);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(SITE_CONFIG.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
      className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-bg-primary/80 backdrop-blur-md"
      onClick={() => onOpenChange(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[620px] rounded-xl border border-border-subtle bg-bg-surface shadow-2xl overflow-hidden flex flex-col font-sans"
      >
        <Command className="w-full flex flex-col">
          {/* Search Input */}
          <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border-hairline">
            <Search className="w-4 h-4 text-text-muted shrink-0" />
            <Command.Input
              autoFocus
              placeholder="Type a command, project, or section..."
              className="w-full bg-transparent text-sm text-text-primary placeholder:text-text-muted focus:outline-none"
            />
            <kbd className="px-1.5 py-0.5 rounded bg-bg-elevated border border-border-hairline font-mono text-[10px] text-text-muted">
              ESC
            </kbd>
          </div>

          {/* List Area */}
          <Command.List className="max-h-[360px] overflow-y-auto p-2 font-mono text-xs">
            <Command.Empty className="p-4 text-center text-text-muted text-xs font-mono">
              No matching commands found.
            </Command.Empty>

            {/* Navigation Group */}
            <Command.Group heading="Navigation" className="text-text-muted text-[10px] uppercase tracking-widest px-2 py-1.5">
              <Command.Item
                onSelect={() => runCommand(() => router.push("/#work"))}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer hover:bg-bg-elevated hover:text-accent text-text-primary transition-colors"
              >
                <FolderGit2 className="w-3.5 h-3.5 text-accent" />
                <span>01. Featured Work</span>
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => router.push("/#ask"))}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer hover:bg-bg-elevated hover:text-accent text-text-primary transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-accent" />
                <span>02. Ask Vraj (AI Assistant)</span>
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => router.push("/#about"))}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer hover:bg-bg-elevated hover:text-accent text-text-primary transition-colors"
              >
                <span>03. About &amp; Background</span>
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => router.push("/#contact"))}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer hover:bg-bg-elevated hover:text-accent text-text-primary transition-colors"
              >
                <span>04. Contact &amp; Inquiry</span>
              </Command.Item>
            </Command.Group>

            {/* Projects Group */}
            <Command.Group heading="Case Studies" className="text-text-muted text-[10px] uppercase tracking-widest px-2 py-1.5 mt-2">
              {PROJECTS.map((project) => (
                <Command.Item
                  key={project.slug}
                  onSelect={() => runCommand(() => router.push(`/work/${project.slug}`))}
                  className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer hover:bg-bg-elevated hover:text-accent text-text-primary transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-accent text-[10px] font-bold">[{project.index}]</span>
                    <span className="font-sans font-medium text-xs">{project.title}</span>
                  </div>
                  <span className="text-[10px] text-text-muted uppercase">{project.role}</span>
                </Command.Item>
              ))}
            </Command.Group>

            {/* Actions Group */}
            <Command.Group heading="Quick Actions" className="text-text-muted text-[10px] uppercase tracking-widest px-2 py-1.5 mt-2">
              <Command.Item
                onSelect={() => runCommand(toggleTheme)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer hover:bg-bg-elevated hover:text-accent text-text-primary transition-colors"
              >
                <Sun className="w-3.5 h-3.5 text-accent" />
                <span>Toggle Dark / Light Theme</span>
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(copyEmail)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer hover:bg-bg-elevated hover:text-accent text-text-primary transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-accent" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Copy Email ({SITE_CONFIG.email})</span>
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => window.open(SITE_CONFIG.resumeUrl, "_blank"))}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer hover:bg-bg-elevated hover:text-accent text-text-primary transition-colors"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Open Resume (PDF)</span>
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => window.open(SITE_CONFIG.socials.github, "_blank"))}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer hover:bg-bg-elevated hover:text-accent text-text-primary transition-colors"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>Open GitHub Profile</span>
                <ExternalLink className="w-3 h-3 text-text-muted ml-auto" />
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => window.open(SITE_CONFIG.socials.linkedin, "_blank"))}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer hover:bg-bg-elevated hover:text-accent text-text-primary transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open LinkedIn Profile</span>
              </Command.Item>
            </Command.Group>
          </Command.List>

          {/* Palette Footer */}
          <div className="px-4 py-2 border-t border-border-hairline bg-bg-surface-elevated/40 flex items-center justify-between text-[10px] font-mono text-text-muted">
            <span>Navigation: ↑ ↓ Enter</span>
            <span>Close: ESC</span>
          </div>
        </Command>
      </div>
    </div>
  );
}

