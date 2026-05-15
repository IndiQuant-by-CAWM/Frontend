import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "IndiQuant | Computational Intelligence Infrastructure",
    template: "%s | IndiQuant",
  },
  description:
    "IndiQuant is a research-first quant intelligence ecosystem building distributed market research infrastructure.",
  metadataBase: new URL("https://indiquantresearch.in"),
  openGraph: {
    title: "IndiQuant",
    description:
      "Institutional quant research ecosystem for collective intelligence, signal processing, and infrastructure-scale experimentation.",
    url: "https://indiquantresearch.in",
    siteName: "IndiQuant",
    type: "website",
  },
  alternates: {
    canonical: "https://indiquantresearch.in",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "IndiQuant",
    url: "https://indiquantresearch.in",
    sameAs: ["https://indiquantresearch.in/team/", "https://indiquantresearch.in/careers/"],
  };

  return (
    <html
      lang="en"
      className={`${plexSans.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-ink text-ink-50">
        <Script
          id="organization-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <div className="pointer-events-none fixed inset-0 z-0 opacity-40 [background-image:radial-gradient(circle_at_1px_1px,var(--color-grid)_1px,transparent_0)] [background-size:28px_28px]" />
        <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_20%_20%,rgba(26,58,109,0.35),transparent_45%),radial-gradient(circle_at_78%_8%,rgba(58,133,173,0.14),transparent_40%),linear-gradient(180deg,#070b10_0%,#070b10_100%)]" />
        <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1440px] flex-col px-4 sm:px-6 lg:px-10">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
