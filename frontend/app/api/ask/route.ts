import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { checkRateLimit } from "@/lib/security/rate-limit";
import { sanitizeUserInput } from "@/lib/security/sanitize";
import { streamAIResponse } from "@/lib/ai/adapter";

const RequestSchema = z.object({
  message: z.string().min(1, "Message cannot be empty").max(500, "Message exceeds 500 characters"),
  history: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().max(500),
      })
    )
    .max(6)
    .optional()
    .default([]),
});

export async function POST(req: NextRequest) {
  try {
    // 1. Extract IP for rate limiting
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";

    const rateLimit = await checkRateLimit(ip, 10, 10 * 60 * 1000);
    if (!rateLimit.success) {
      return NextResponse.json(
        {
          error: "Rate limit exceeded. Please wait a few minutes before asking another question.",
        },
        {
          status: 429,
          headers: {
            "Retry-After": "600",
            "X-RateLimit-Limit": String(rateLimit.limit),
            "X-RateLimit-Remaining": "0",
          },
        }
      );
    }

    // 2. Validate request body with Zod
    const json = await req.json();
    const parseResult = RequestSchema.safeParse(json);

    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Invalid request payload format." },
        { status: 400 }
      );
    }

    const { message, history } = parseResult.data;

    // 3. Prompt injection detection and input sanitization
    const sanitization = sanitizeUserInput(message);
    if (!sanitization.isClean) {
      // Neutralize without leaking internals
      const safeRefusal =
        "I am designed to answer questions strictly about Vraj Goti's software engineering projects and technical experience. For other topics or direct inquiries, please contact Vraj at vrajgoti07@gmail.com.";

      const encoder = new TextEncoder();
      const stream = new ReadableStream({
        start(controller) {
          controller.enqueue(encoder.encode(safeRefusal));
          controller.close();
        },
      });

      return new Response(stream, {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "X-Provider": "firewall-refusal",
        },
      });
    }

    // 4. Stream response from AI adapter
    const { stream, provider } = await streamAIResponse(sanitization.sanitized, history);

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "X-Provider": provider,
        "X-RateLimit-Remaining": String(rateLimit.remaining),
      },
    });
  } catch (error) {
    // Generic error response to prevent leaking internal stack traces
    console.error("Ask API error occurred:", error instanceof Error ? error.message : "Unknown");
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}

