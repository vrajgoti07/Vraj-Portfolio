"use client";

import { useState, useRef, useEffect } from "react";
import { Send, RotateCcw, Copy, Check, Sparkles, AlertCircle } from "lucide-react";
import { SuggestionChips } from "./suggestion-chips";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export function AskVraj() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hello! I am Vraj's portfolio assistant. I am strictly grounded on his confirmed projects, technical stack, and engineering background. Ask me anything below or choose a suggested topic.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

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
    };

    setMessages((prev) => [...prev, userMessage, initialAssistantMessage]);
    setIsLoading(true);

    try {
      // Build history (last 4 turns)
      const historyPayload = messages
        .filter((m) => m.id !== "welcome")
        .slice(-4)
        .map((m) => ({ role: m.role, content: m.content }));

      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history: historyPayload }),
      });

      if (!res.ok) {
        if (res.status === 429) {
          throw new Error("Rate limit reached (10 queries/10 min). Please wait a moment.");
        }
        throw new Error("Unable to reach assistant. Please try again.");
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
            msg.id === assistantId ? { ...msg, content: accumulated } : msg
          )
        );
      }
    } catch (err) {
      const errorText = err instanceof Error ? err.message : "Error contacting assistant.";
      setErrorMsg(errorText);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantId
            ? {
                ...msg,
                content:
                  "I apologize, but I could not complete that query. You can reach Vraj directly via email at vrajgoti07@gmail.com.",
              }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleReset = () => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content:
          "Hello! I am Vraj's portfolio assistant. I am strictly grounded on his confirmed projects, technical stack, and engineering background. Ask me anything below or choose a suggested topic.",
      },
    ]);
    setErrorMsg(null);
  };

  return (
    <section id="ask" className="w-full border-t border-border-hairline bg-bg-surface/40 py-20 px-6">
      <div className="max-w-[1000px] mx-auto flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs uppercase tracking-widest text-accent">
                // 02 Ask Vraj
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="font-mono text-[10px] text-text-muted uppercase border border-border-hairline rounded px-2 py-0.5">
                Grounded AI Assistant
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl text-text-primary tracking-tight">
              Inquire with <em className="italic text-accent font-display">grounded</em> intelligence.
            </h2>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-text-muted hover:text-accent transition-colors self-start sm:self-auto"
            aria-label="Reset conversation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>

        {/* Chat Card Container */}
        <div className="rounded-xl border border-border-hairline bg-bg-surface overflow-hidden flex flex-col shadow-xl">
          {/* Messages Area */}
          <div className="p-6 sm:p-8 flex flex-col gap-5 max-h-[460px] overflow-y-auto">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col gap-1.5 ${
                  m.role === "user" ? "items-end" : "items-start"
                }`}
              >
                <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
                  {m.role === "user" ? "You" : "Assistant"}
                </span>

                <div
                  className={`relative p-4 rounded-xl text-xs sm:text-sm leading-relaxed max-w-[85%] whitespace-pre-wrap ${
                    m.role === "user"
                      ? "bg-accent text-accent-contrast font-medium rounded-tr-none"
                      : "bg-bg-elevated border border-border-hairline text-text-primary rounded-tl-none"
                  }`}
                >
                  {m.content || (isLoading && m.id.startsWith("ast-") && (
                    <span className="inline-flex items-center gap-1.5 text-text-muted font-mono text-xs">
                      <Sparkles className="w-3.5 h-3.5 text-accent animate-spin" />
                      Streaming response...
                    </span>
                  ))}

                  {/* Copy Action for Assistant Messages */}
                  {m.role === "assistant" && m.content && (
                    <button
                      type="button"
                      onClick={() => handleCopy(m.content, m.id)}
                      className="absolute top-3 right-3 p-1 rounded hover:bg-bg-surface text-text-muted hover:text-text-primary transition-colors"
                      aria-label="Copy assistant message"
                    >
                      {copiedId === m.id ? (
                        <Check className="w-3.5 h-3.5 text-accent" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Error Banner */}
          {errorMsg && (
            <div className="px-6 py-2.5 bg-red-950/40 border-t border-red-500/30 flex items-center gap-2 text-xs text-red-200 font-mono">
              <AlertCircle className="w-3.5 h-3.5 shrink-0 text-red-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Suggestions & Input Tray */}
          <div className="p-4 sm:p-6 border-t border-border-hairline bg-bg-surface-elevated/40 flex flex-col gap-4">
            <SuggestionChips onSelect={(prompt) => handleSend(prompt)} disabled={isLoading} />

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(input);
              }}
              className="flex items-center gap-3 relative"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                maxLength={500}
                placeholder="Ask about Vraj's AI projects, stack, or experience..."
                disabled={isLoading}
                className="w-full px-4 py-3 rounded-lg border border-border-subtle bg-bg-surface text-xs sm:text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-all pr-24"
              />

              <div className="absolute right-2 flex items-center gap-2">
                <span className="text-[10px] font-mono text-text-muted hidden sm:inline">
                  {input.length}/500
                </span>
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="p-2 rounded-md bg-accent text-accent-contrast disabled:opacity-40 disabled:pointer-events-none hover:bg-accent/90 transition-all focus-visible:ring-2 focus-visible:ring-accent"
                  aria-label="Send query"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>

            <div className="flex flex-wrap items-center justify-between text-[11px] font-mono text-text-muted">
              <span>Security: 10 queries/10min rate limit · Prompt injection firewall active</span>
              <span>Grounding: content/knowledge.md</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

