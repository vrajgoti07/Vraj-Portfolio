"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { SITE_CONFIG } from "@/content/site";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    website_honeypot: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    // Basic client validation
    if (!formData.name.trim() || formData.name.length < 2) {
      setStatus("error");
      setErrorMessage("Please enter a valid name (at least 2 characters).");
      return;
    }
    if (!formData.email.includes("@")) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    if (formData.message.trim().length < 10) {
      setStatus("error");
      setErrorMessage("Message must be at least 10 characters long.");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to send message.");
      }

      setStatus("success");
      setFormData({ name: "", email: "", message: "", website_honeypot: "" });
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Failed to send. Please use direct email below."
      );
    }
  };

  return (
    <form suppressHydrationWarning onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
      {/* Honeypot field (hidden from genuine users) */}
      <input
        type="text"
        name="website_honeypot"
        value={formData.website_honeypot}
        onChange={(e) => setFormData({ ...formData, website_honeypot: e.target.value })}
        tabIndex={-1}
        autoComplete="off"
        className="sr-only"
        aria-hidden="true"
        suppressHydrationWarning
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="font-mono text-xs uppercase tracking-wider text-text-muted">
            Your Name *
          </label>
          <input
            id="name"
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Jane Doe"
            disabled={status === "loading"}
            suppressHydrationWarning
            className="w-full px-4 py-3 rounded-lg border border-border-hairline bg-bg-surface text-xs sm:text-sm text-text-primary placeholder:text-text-muted/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-all"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="font-mono text-xs uppercase tracking-wider text-text-muted">
            Your Email *
          </label>
          <input
            id="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="jane@company.com"
            disabled={status === "loading"}
            suppressHydrationWarning
            className="w-full px-4 py-3 rounded-lg border border-border-hairline bg-bg-surface text-xs sm:text-sm text-text-primary placeholder:text-text-muted/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-all"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="font-mono text-xs uppercase tracking-wider text-text-muted">
          Your Message *
        </label>
        <textarea
          id="message"
          required
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Tell me about your project, team, or opportunity..."
          disabled={status === "loading"}
          suppressHydrationWarning
          className="w-full px-4 py-3 rounded-lg border border-border-hairline bg-bg-surface text-xs sm:text-sm text-text-primary placeholder:text-text-muted/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-all resize-none"
        />
      </div>

      {/* Inline Feedback Banners */}
      {status === "error" && (
        <div className="p-3 rounded-lg bg-red-950/40 border border-red-500/30 flex items-center gap-2 text-xs text-red-200 font-mono">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {status === "success" && (
        <div className="p-4 rounded-lg bg-accent/10 border border-accent/40 flex flex-col gap-2 font-mono text-xs text-text-primary">
          <div className="flex items-center gap-2 text-accent font-semibold">
            <CheckCircle2 className="w-4 h-4" />
            <span>Message sent successfully!</span>
          </div>
          <p className="text-text-muted text-[11px]">
            Thank you for reaching out. Vraj will respond to your email as soon as possible.
          </p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
        <button
          type="submit"
          suppressHydrationWarning
          disabled={status === "loading"}
          className="px-6 py-3 rounded font-mono text-xs uppercase tracking-wider font-semibold bg-accent text-accent-contrast hover:bg-accent/90 transition-all flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-50"
        >
          <span>{status === "loading" ? "Dispatching..." : "Send Message"}</span>
          <Send className="w-3.5 h-3.5" />
        </button>

        <span className="font-mono text-[11px] text-text-muted">
          Or dispatch via{" "}
          <a
            href={`mailto:${SITE_CONFIG.email}?subject=Hello%20Vraj`}
            className="text-text-primary underline hover:text-accent"
          >
            direct mailto
          </a>
        </span>
      </div>
    </form>
  );
}

