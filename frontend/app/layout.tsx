import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { HeaderWithPalette } from "@/components/navigation/header-with-palette";
import { Footer } from "@/components/footer/footer";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vraj Goti — Full-Stack & AI Product Engineer",
  description:
    "Personal portfolio of Vraj Goti, an AI & Full-Stack Developer based in Surat, India. Building high-performance AI-powered products and developer tools that ship.",
  keywords: [
    "Vraj Goti",
    "AI Engineer",
    "Full-Stack Developer",
    "Next.js",
    "React",
    "TypeScript",
    "Voice Agent",
    "Surat",
  ],
  authors: [{ name: "Vraj Goti", url: "https://github.com/vrajgoti07" }],
  creator: "Vraj Goti",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://vrajgoti.dev"
  ),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Vraj Goti — Full-Stack & AI Product Engineer",
    description:
      "Personal portfolio of Vraj Goti. Building high-performance AI-powered products and developer tools that ship.",
    siteName: "Vraj Goti Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vraj Goti — Full-Stack & AI Product Engineer",
    description:
      "Personal portfolio of Vraj Goti. Building high-performance AI-powered products that ship.",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0B0B0C" },
    { media: "(prefers-color-scheme: light)", color: "#F3F0E8" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${instrumentSerif.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        {/* Anti-flash theme script & extension attribute cleaner */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const storedTheme = localStorage.getItem('vg-theme');
                  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  const theme = storedTheme || (prefersDark ? 'dark' : 'light');
                  document.documentElement.setAttribute('data-theme', theme);

                  // Clean extension-injected attributes (Bitwarden, 1Password, McAfee) to avoid hydration mismatch
                  const cleanAttrs = function() {
                    const els = document.querySelectorAll('[fdprocessedid]');
                    for (var i = 0; i < els.length; i++) {
                      els[i].removeAttribute('fdprocessedid');
                    }
                  };
                  cleanAttrs();
                  if (typeof document !== 'undefined') {
                    document.addEventListener('DOMContentLoaded', cleanAttrs, { once: true });
                  }
                } catch (e) {}
              })();
            `,
          }}
        />

        {/* JSON-LD Structured Data Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Vraj Goti",
              jobTitle: "Full-Stack & AI Product Engineer",
              url: process.env.NEXT_PUBLIC_SITE_URL || "https://vrajgoti.dev",
              sameAs: [
                "https://github.com/vrajgoti07",
                "https://linkedin.com/in/vrajgoti",
              ],
              address: {
                "@type": "PostalAddress",
                addressLocality: "Surat",
                addressRegion: "Gujarat",
                addressCountry: "IN",
              },
              knowsAbout: [
                "Artificial Intelligence",
                "Conversational Voice AI",
                "Full-Stack Development",
                "Next.js",
                "React",
                "TypeScript",
                "Python",
                "FastAPI",
              ],
            }),
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className="bg-bg-primary text-text-primary antialiased selection:bg-accent selection:text-accent-contrast"
      >
        <SmoothScroll>
          <ScrollProgress />
          <HeaderWithPalette />
          <main id="main-content" className="min-h-screen pt-16">
            {children}
          </main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}

