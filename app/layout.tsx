import type { Metadata, Viewport } from "next";
import { Geist_Mono, Inter, Sora } from "next/font/google";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { SmoothScroll } from "@/components/motion";
import { Toaster } from "@/components/ui/sonner";
import { site } from "@/content/site";

import "./globals.css";

/** Body copy — the same face the reference site uses. */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

/** Headings — geometric and wide, to match the logo's letterforms. */
const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  keywords: [
    "game studio",
    "mobile games",
    "game publisher",
    "game development",
    "Velquo",
  ],
  authors: [{ name: site.name }],
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: site.url,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#0c2430",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${sora.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/*
          Motion renders its `initial` state into the server HTML, which means
          a visitor with JavaScript disabled would be left staring at elements
          stuck at opacity 0. This forces every animated wrapper visible in
          that case.
        */}
        <noscript>
          <style>{`[data-motion]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="bg-brand text-brand-ink focus:ring-brand-ink sr-only rounded-full px-4 py-2 text-sm font-semibold focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100]"
        >
          Skip to content
        </a>

        <SmoothScroll>
          <Navbar />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </SmoothScroll>

        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
