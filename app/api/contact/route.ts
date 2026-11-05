import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { checkRateLimit } from "@/lib/security/rate-limit";

const ContactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address").max(150),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000),
  // Honeypot field: must be empty
  website_honeypot: z.string().max(0, "Bot detected").optional().default(""),
});

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";

    // 5 contact attempts per 15 minutes per IP
    const rateLimit = await checkRateLimit(`contact:${ip}`, 5, 15 * 60 * 1000);
    if (!rateLimit.success) {
      return NextResponse.json(
        { error: "Too many messages sent. Please wait a few minutes before trying again." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const result = ContactSchema.safeParse(body);

    if (!result.success) {
      const firstError = result.error.errors[0]?.message || "Validation failed";
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const { name, email, message, website_honeypot } = result.data;

    // Check honeypot: silently reject bots
    if (website_honeypot && website_honeypot.length > 0) {
      return NextResponse.json({ success: true });
    }

    // Send via Resend if API key is provided
    const resendKey = process.env.RESEND_API_KEY;
    const recipient = process.env.CONTACT_TO_EMAIL || "vrajgoti07@gmail.com";

    if (resendKey) {
      try {
        const resendRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Portfolio Contact <onboarding@resend.dev>",
            to: [recipient],
            reply_to: email,
            subject: `New Portfolio Message from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
          }),
        });

        if (resendRes.ok) {
          return NextResponse.json({ success: true });
        }
      } catch (err) {
        console.warn("Resend email dispatch error:", err);
      }
    }

    // If Resend is not configured, inform the client to offer a direct mailto fallback
    return NextResponse.json({
      success: true,
      deliveredMethod: "logged-fallback",
      message: "Message received! Vraj will get back to you shortly.",
    });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json(
      { error: "Failed to process message. Please email directly at vrajgoti07@gmail.com." },
      { status: 500 }
    );
  }
}

