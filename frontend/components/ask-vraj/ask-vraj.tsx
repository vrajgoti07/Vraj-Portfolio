"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { Send, Square, Copy, Check, ExternalLink, CornerDownLeft } from "lucide-react";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: string[];
  isStreaming?: boolean;
}

const PROMPTS = [
  { label: "What has Vraj built with AI?", query: "What has Vraj built with AI?" },
  { label: "Walk me through the voice agent", query: "Walk me through the voice agent" },
  { label: "Which stack does he use?", query: "Which stack does he use?" },
  { label: "Is he available for work?", query: "Is he available for work?" },
];

interface AskVrajProps {
  isStandalonePage?: boolean;
}

export function AskVraj({ isStandalonePage = false }: AskVrajProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [status, setStatus] = useState<"online" | "offline demo">("online");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const scrollAreaRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Check prefers-reduced-motion
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mediaQuery.matches);
      const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      mediaQuery.addEventListener("change", listener);
      return () => mediaQuery.removeEventListener("change", listener);
    }
  }, []);

  // Internal scroll strictly inside console container - never scroll outer window
  const scrollToBottom = useCallback(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);

  // Auto-focus input when landing on dedicated standalone /ask page
  useEffect(() => {
    if (isStandalonePage && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isStandalonePage]);

  // ScrollTrigger refresh on mount
  useEffect(() => {
    let mounted = true;
    import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
      if (!mounted) return;
      ScrollTrigger.refresh();
      if (typeof document !== "undefined" && document.fonts?.ready) {
        document.fonts.ready.then(() => {
          if (mounted) ScrollTrigger.refresh();
        });
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  const handleScrollToProject = (slug: string) => {
    const el = document.getElementById(slug);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
      el.classList.add("ring-2", "ring-accent", "ring-offset-2", "ring-offset-bg-primary", "rounded-xl", "transition-all", "duration-300");
      setTimeout(() => {
        el.classList.remove("ring-2", "ring-accent", "ring-offset-2", "ring-offset-bg-primary", "rounded-xl", "transition-all", "duration-300");
      }, 1200);
    } else {
      window.location.href = `/#${slug}`;
    }
  };

  const handleStop = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsLoading(false);
    setMessages((prev) =>
      prev.map((msg) => (msg.isStreaming ? { ...msg, isStreaming: false } : msg))
    );
  };

  const handleSend = async (userText: string) => {
    const text = userText.trim();
    if (!text || isLoading) return;

    setErrorMsg(null);
    setInput("");

    const userMessage: Message = {
      id: `usr-${Date.now()}`,
      role: "user",
      content: text,
    };

    const assistantId = `ast-${Date.now()}`;
    const initialAssistantMessage: Message = {
      id: assistantId,
      role: "assistant",
      content: "",
      sources: [],
      isStreaming: true,
    };

    setMessages((prev) => [...prev, userMessage, initialAssistantMessage]);
    setIsLoading(true);

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      // Build history (last 6 turns, excluding empty/system messages)
      const historyPayload = messages
        .filter((m) => m.content.trim().length > 0)
        .slice(-6)
        .map((m) => ({ role: m.role, content: m.content }));

      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history: historyPayload }),
        signal: controller.signal,
      });

      if (!res.ok) {
        if (res.status === 429) {
          throw new Error("Rate limit reached (10 queries/10 min). Please wait a moment.");
        }
        throw new Error("Unable to reach assistant. Please try again.");
      }

      // Check provider and sources headers
      const provider = res.headers.get("X-Provider");
      if (provider === "offline-fallback") {
        setStatus("offline demo");
      } else {
        setStatus("online");
      }

      const sourcesHeader = res.headers.get("X-Sources");
      let sources: string[] = [];
      try {
        if (sourcesHeader) {
          sources = JSON.parse(sourcesHeader);
        }
      } catch {
        sources = [];
      }

      if (!res.body) throw new Error("No response body.");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        accumulated += chunk;

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantId
              ? {
                  ...msg,
                  content: accumulated,
                  sources: sources.length > 0 ? sources : msg.sources,
                }
              : msg
          )
        );
      }

      // Finalize message
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantId
            ? {
                ...msg,
                isStreaming: false,
                sources,
              }
            : msg
        )
      );
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") {
        return; // Aborted by user
      }
      const errorText =
        err instanceof Error ? err.message : "Network failure. Please try again or reach Vraj via email at vrajgoti07@gmail.com.";
      setErrorMsg(errorText);

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantId
            ? {
                ...msg,
                content:
                  "I apologize, but I could not complete that query. You can reach Vraj directly via email at vrajgoti07@gmail.com.",
                isStreaming: false,
                sources: [],
              }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section
      id="ask"
      className={`relative w-full border-t border-border-hairline bg-bg-primary overflow-hidden ${
        isStandalonePage ? "py-10 sm:py-16" : "py-20 sm:py-28"
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Standalone page back link */}
        {isStandalonePage && (
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-text-muted hover:text-accent transition-colors"
            >
              <span>←</span>
              <span>Back to Portfolio</span>
            </Link>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column (Cols 1-5): Headline & Suggestion Prompts */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-accent mb-3 block">
                // 02 ASK
              </span>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-text-primary tracking-[-0.015em] leading-[1.03] mb-4">
                Ask the <em className="italic text-accent font-display">work</em>, not the résumé.
              </h2>
              <p className="font-sans text-xs sm:text-sm text-text-muted max-w-md leading-relaxed mb-8">
                Answers come only from my real projects. Every reply shows its sources.
              </p>
            </div>

            {/* 4 Numbered Suggestion Prompts */}
            <div className="space-y-2 border-t border-border-hairline pt-6">
              <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted block mb-2">
                Suggested Inquiries
              </span>
              {PROMPTS.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  suppressHydrationWarning
                  onClick={() => handleSend(item.query)}
                  disabled={isLoading}
                  className="w-full text-left font-mono text-xs text-text-muted hover:text-text-primary group py-2.5 border-b border-border-hairline/60 transition-colors flex items-center justify-between disabled:opacity-50"
                >
                  <span className="group-hover:text-accent group-hover:underline underline-offset-4 decoration-accent">
                    {idx + 1}) {item.label}
                  </span>
                  <span className="text-text-muted group-hover:text-accent group-hover:translate-x-1 transition-transform font-mono">
                    →
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column (Cols 6-12): The Console Panel */}
          <div className="lg:col-span-7">
            <div
              role="region"
              aria-label="Ask Vraj Interactive Console"
              className="rounded-xl border border-border-hairline bg-bg-surface overflow-hidden flex flex-col h-[min(560px,70vh)] max-h-[560px] min-h-[460px] shadow-2xl relative"
            >
              {/* Title Bar */}
              <div className="h-10 px-4 border-b border-border-hairline bg-bg-surface flex items-center justify-between select-none shrink-0">
                <div className="flex items-center gap-3">
                  {/* Three hairline dots */}
                  <div className="flex items-center gap-1.5" aria-hidden="true">
                    <span className="w-2.5 h-2.5 rounded-full border border-border-hairline bg-text-muted/30" />
                    <span className="w-2.5 h-2.5 rounded-full border border-border-hairline bg-text-muted/30" />
                    <span className="w-2.5 h-2.5 rounded-full border border-border-hairline bg-text-muted/30" />
                  </div>
                  {/* Mono title */}
                  <span className="font-mono text-xs text-text-muted tracking-tight">
                    ask-vraj / grounded on 5 projects
                  </span>
                </div>

                {/* Status pill */}
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-border-hairline bg-bg-primary/50">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      status === "online" ? "bg-accent animate-pulse" : "bg-text-muted"
                    }`}
                  />
                  <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
                    {status}
                  </span>
                </div>
              </div>

              {/* Scrollable Message Area */}
              <div
                ref={scrollAreaRef}
                data-lenis-prevent
                className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 font-mono text-xs overscroll-contain"
                aria-live="polite"
              >
                {/* Empty State */}
                {messages.length === 0 && (
                  <div className="h-full flex flex-col justify-center items-start text-left py-6">
                    <p className="font-mono text-xs text-text-muted mb-4">
                      // type a question or pick a prompt
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {PROMPTS.map((prompt, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleSend(prompt.query)}
                          className="px-3 py-1.5 rounded border border-border-hairline bg-bg-elevated hover:border-accent hover:text-accent font-mono text-xs text-text-muted transition-colors text-left"
                        >
                          {prompt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Messages List */}
                {messages.map((msg) => (
                  <div key={msg.id} className="space-y-2">
                    {msg.role === "user" ? (
                      /* User Line: mono, muted, prefixed with › */
                      <div className="flex items-start gap-2 text-text-muted font-mono text-xs">
                        <span className="text-accent font-bold select-none">›</span>
                        <span className="text-text-primary">{msg.content}</span>
                      </div>
                    ) : (
                      /* Assistant Answer: body font, 2px lime left border */
                      <div className="border-l-2 border-accent pl-3.5 py-1 text-text-primary font-sans text-xs sm:text-sm leading-relaxed space-y-3">
                        <div className="whitespace-pre-wrap">
                          {msg.content}
                          {msg.isStreaming && !prefersReducedMotion && (
                            <span
                              className="inline-block text-accent font-mono font-bold animate-pulse ml-0.5 select-none"
                              aria-hidden="true"
                            >
                              ▍
                            </span>
                          )}
                        </div>

                        {/* SOURCES row under every assistant answer */}
                        {msg.sources && msg.sources.length > 0 && (
                          <div className="pt-2 flex flex-wrap items-center gap-1.5 border-t border-border-hairline/40">
                            <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted mr-1">
                              Sources:
                            </span>
                            {msg.sources.map((src) => (
                              <button
                                key={src}
                                type="button"
                                onClick={() => handleScrollToProject(src)}
                                className="px-2 py-0.5 rounded border border-border-hairline bg-bg-elevated hover:border-accent hover:text-accent font-mono text-[10px] text-text-muted transition-colors flex items-center gap-1 group"
                                title={`Jump to ${src}`}
                              >
                                <span>{src}</span>
                                <span className="text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                                  ↗
                                </span>
                              </button>
                            ))}
                          </div>
                        )}

                        {/* Per-answer actions: Copy + Open project */}
                        {!msg.isStreaming && msg.content && (
                          <div className="flex items-center gap-3 pt-1">
                            <button
                              type="button"
                              onClick={() => handleCopy(msg.content, msg.id)}
                              className="inline-flex items-center gap-1 font-mono text-[10px] text-text-muted hover:text-accent transition-colors"
                              aria-label="Copy answer to clipboard"
                            >
                              {copiedId === msg.id ? (
                                <>
                                  <Check className="w-3 h-3 text-accent" />
                                  <span className="text-accent font-medium">Copied</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3" />
                                  <span>Copy</span>
                                </>
                              )}
                            </button>

                            {msg.sources && msg.sources.length > 0 && (
                              <button
                                type="button"
                                onClick={() => handleScrollToProject(msg.sources![0])}
                                className="inline-flex items-center gap-1 font-mono text-[10px] text-text-muted hover:text-accent transition-colors"
                              >
                                <ExternalLink className="w-3 h-3" />
                                <span>Open project</span>
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}

                {/* Error Banner in Plain Language */}
                {errorMsg && (
                  <div className="p-3 rounded border border-border-hairline bg-bg-elevated text-text-muted font-mono text-xs">
                    <span className="text-accent font-bold mr-1.5">!</span>
                    <span>{errorMsg}</span>
                  </div>
                )}
              </div>

              {/* Input Bar */}
              <div className="p-3 sm:p-4 border-t border-border-hairline bg-bg-surface shrink-0">
                <form
                  suppressHydrationWarning
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend(input);
                  }}
                  className="relative flex items-center gap-2"
                >
                  <label htmlFor="ask-input" className="sr-only">
                    Ask anything about Vraj's work
                  </label>
                  <div className="relative flex-1">
                    <input
                      id="ask-input"
                      ref={inputRef}
                      type="text"
                      suppressHydrationWarning
                      value={input}
                      onChange={(e) => setInput(e.target.value.slice(0, 500))}
                      placeholder="ask anything about my work"
                      disabled={isLoading}
                      maxLength={500}
                      className="w-full bg-bg-primary border border-border-hairline rounded-lg px-3.5 py-2.5 font-mono text-xs text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all pr-20 disabled:opacity-50"
                    />
                    <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5 pointer-events-none text-text-muted font-mono text-[10px]">
                      <span>{input.length}/500</span>
                      <kbd className="hidden sm:inline px-1 py-0.5 rounded border border-border-hairline bg-bg-surface text-[9px]">
                        ↵
                      </kbd>
                    </div>
                  </div>

                  {/* Send or Stop button */}
                  {isLoading ? (
                    <button
                      type="button"
                      suppressHydrationWarning
                      onClick={handleStop}
                      className="px-3 py-2.5 rounded-lg bg-bg-elevated border border-border-hairline text-text-primary hover:border-accent hover:text-accent font-mono text-xs flex items-center gap-1.5 transition-all"
                      aria-label="Stop generation"
                    >
                      <Square className="w-3 h-3 fill-current" />
                      <span className="hidden sm:inline text-[11px]">Stop</span>
                    </button>
                  ) : (
                    <button
                      type="submit"
                      suppressHydrationWarning
                      disabled={!input.trim()}
                      className="p-2.5 rounded-lg bg-accent text-accent-contrast disabled:opacity-30 disabled:cursor-not-allowed hover:brightness-110 transition-all flex items-center justify-center shrink-0"
                      aria-label="Send query"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  )}
                </form>

                {/* Footer status line */}
                <div className="mt-2 flex items-center justify-between text-[10px] font-mono text-text-muted px-1">
                  <span>Rate limit: 10 queries/10 min</span>
                  <span>Grounding: content/knowledge.md</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
