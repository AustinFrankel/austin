import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Austin Frankel | Student Entrepreneur & iOS Developer",
    template: "%s | Austin Frankel",
  },
  description:
    "Austin Frankel — creator of Seat Maker (iOS seating‑chart app), BBYO leader, and coding educator (CodeLab, Code Assist).",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>        
        <header className="sticky top-0 z-40 bg-white/70 backdrop-blur border-b border-black/5">
          <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
            <a href="/" className="font-semibold">Austin Frankel</a>
            <nav className="hidden sm:flex items-center gap-5 text-sm">
              <a href="/about" className="hover:underline">About</a>
              <a href="/ventures" className="hover:underline">Ventures</a>
              <a href="/blog" className="hover:underline">Blog</a>
              <a href="/contact" className="hover:underline">Contact</a>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="mt-24 border-t border-black/5">
          <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-neutral-600">
            © {new Date().getFullYear()} Austin Frankel
          </div>
        </footer>
      </body>
    </html>
  );
}
