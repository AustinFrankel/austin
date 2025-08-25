import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header, MobileTabBar } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CANONICAL_URL } from "@/lib/site.config";
import { PersonJsonLd } from "@/app/(schema)/person-jsonld";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ClientProviders } from "@/app/providers.client";
import { BotBubble } from "@/components/BotBubble";
import { GlobalSearch } from "@/components/GlobalSearch";
import { CursorGlowClient } from "@/components/CursorGlowClient";
import { RouteLoader } from "@/components/RouteLoader";
import { HoverGlowClient } from "@/components/HoverGlowClient";
import { PageTransition } from "@/components/PageTransition";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "Austin Frankel | Student Entrepreneur & iOS Developer | Seat Maker App", template: "%s | Austin Frankel" },
  description: "Austin Frankel is a 17-year-old student entrepreneur from Rye Brook, NY. Creator of the Seat Maker iOS app, BBYO regional leader, coding educator (CodeLab, Code Assist), Homework Helpers VP, swim instructor, and pianist (BP_Piano). Blind Brook High School ’26.",
  alternates: { canonical: CANONICAL_URL },
  openGraph: {
    type: "website",
    url: CANONICAL_URL,
    siteName: "Austin Frankel",
    title: "Austin Frankel — Student Entrepreneur & iOS Developer (Rye Brook, NY)",
    description: "Creator of Seat Maker; BBYO leader; coding educator. Ventures: CodeLab, Code Assist, Homework Helpers, Your Honor Ink, BrightLineInsights, BP_Piano.",
    locale: "en_US",
    images: [
      {
        url: `${CANONICAL_URL}/images/austin-headshot.jpeg`,
        width: 1200,
        height: 630,
        alt: "Austin Frankel headshot",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Austin Frankel — Student Entrepreneur & iOS Developer",
    description: "Creator of Seat Maker; BBYO leader; coding educator.",
    images: [`${CANONICAL_URL}/images/austin-headshot.jpeg`],
  },
  other: { hreflang: "en-US" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-grid`}>
        <a href="#content" className="skip-link">Skip to content</a>
        <div className="cursor-glow" aria-hidden="true" />
        <ThemeProvider>
          <Header />
          <PageTransition>
            <main id="content">{children}</main>
          </PageTransition>
          <Footer />
          <PersonJsonLd />
          <BotBubble />
          <GlobalSearch />
        </ThemeProvider>
        <MobileTabBar />
        <div id="feedback-root"></div>
        <ClientProviders />
        <CursorGlowClient />
        <HoverGlowClient />
        <RouteLoader />
      </body>
    </html>
  );
}
