import { JsonLd } from "@/components/JsonLd";
import { AUTHOR, LINKS } from "@/lib/site.config";

export function PersonJsonLd() {
  return (
    <JsonLd
      json={{
        "@context": "https://schema.org",
        "@type": "Person",
        name: AUTHOR.name,
        url: "https://austinfrankel.info",
        email: AUTHOR.email,
        sameAs: [LINKS.seatMakerInstagram, LINKS.personalInstagram, LINKS.linkedIn],
      }}
    />
  );
} 