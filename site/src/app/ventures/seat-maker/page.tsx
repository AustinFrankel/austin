import { LINKS } from "@/lib/site.config";
import { JsonLd } from "@/components/JsonLd";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { Gallery } from "@/components/sections/Gallery";
import { FAQAccordion } from "@/components/sections/FAQAccordion";

const features = [
  { title: "Build Profiles", description: "Create guest profiles with names, comments, and photos to organize your event seating list effectively." },
  { title: "Export & Share", description: "Share plans instantly via message or QR code so friends, family, or venues can view immediately." },
  { title: "Touch-first editing", description: "Drag guests to tables with haptics and clear feedback on constraints." },
  { title: "Layouts", description: "Arrange rows, rounds, and custom groups with labeling and simple counts." },
  { title: "Notes & constraints", description: "Capture who should sit together or apart and let the planner keep context." },
  { title: "Fast onboarding", description: "Minimal setup so you can ship a layout in minutes." },
];

const faq = [
  { q: "What platforms are supported?", a: "iOS (iPhone)." },
  { q: "What kinds of events?", a: "Mitzvahs, weddings, banquets, school functions, and corporate dinners." },
  { q: "Pricing?", a: "See current details on the App Store listing." },
];

export default function SeatMakerPage() {
  return (
    <div className="container-px mx-auto max-w-5xl py-10">
      <h1 className="text-3xl font-bold">Seat Maker</h1>
      <p className="mt-2 text-neutral-800 dark:text-neutral-300">Seat Maker is a touch‑first seating‑chart app built for families, schools, and small events. Plan layouts quickly with drag‑and‑drop, keep context with guest profiles and notes, and share instantly with a link or QR.</p>

      <div className="mt-6 flex flex-wrap gap-3">
        <a href={LINKS.appStore} target="_blank" rel="noopener" className="rounded-full bg-black text-white dark:bg-white dark:text-black h-11 px-6 inline-flex items-center">Download on the App Store</a>
        <a href={LINKS.seatMakerSite} target="_blank" rel="noopener" className="rounded-full border border-black/10 dark:border-white/20 h-11 px-6 inline-flex items-center">Website</a>
        <a href={LINKS.seatMakerInstagram} target="_blank" rel="noopener" className="rounded-full border border-black/10 dark:border-white/20 h-11 px-6 inline-flex items-center">@seatmakerapp</a>
        <a href={LINKS.mobileAppDailyReview} target="_blank" rel="noopener" className="rounded-full border border-black/10 dark:border-white/20 h-11 px-6 inline-flex items-center">MobileAppDaily Review</a>
        <a href={LINKS.bbyoArticle} target="_blank" rel="noopener" className="rounded-full border border-black/10 dark:border-white/20 h-11 px-6 inline-flex items-center">BBYO feature</a>
      </div>

      <div className="mt-10">
        <FeatureGrid items={features} />
      </div>

      <div className="mt-10">
        <Gallery
          items={[
            { src: "/images/seatmaker-laptop.jpg", alt: "Seat Maker site on laptop" },
            { src: "/images/seatmaker-build-profiles.png", alt: "Build Profiles screenshot" },
            { src: "/images/seatmaker-export-share.png", alt: "Export and Share screenshot" },
          ]}
        />
      </div>

      <div className="mt-10 grid gap-4">
        <h2 className="text-2xl font-semibold">FAQ</h2>
        <FAQAccordion items={faq} />
      </div>

      <div className="fixed bottom-4 left-0 right-0 px-4 sm:hidden">
        <a href={LINKS.appStore} target="_blank" rel="noopener" className="w-full inline-flex justify-center h-12 rounded-full bg-black text-white">Get Seat Maker</a>
      </div>

      <JsonLd
        json={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Seat Maker",
          operatingSystem: "iOS",
          applicationCategory: "Business",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          downloadUrl: LINKS.appStore,
          sameAs: [LINKS.seatMakerSite, LINKS.seatMakerInstagram],
        }}
      />
      <JsonLd
        json={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "/" },
            { "@type": "ListItem", position: 2, name: "Ventures", item: "/ventures" },
            { "@type": "ListItem", position: 3, name: "Seat Maker", item: "/ventures/seat-maker" },
          ],
        }}
      />
    </div>
  );
} 