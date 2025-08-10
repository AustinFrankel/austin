export const CANONICAL_URL = "https://austinfrankel.info";

export const LINKS = {
  seatMakerSite: "https://seatmakerapp.com",
  seatMakerInstagram: "https://www.instagram.com/seatmakerapp",
  yourHonorInkInstagram: "https://www.instagram.com/yourhonorink",
  bpPianoTikTok: "https://www.tiktok.com/@bp_piano",
  personalInstagram: "https://www.instagram.com/austinfrankel1/",
  linkedIn: "https://www.linkedin.com/in/austin-frankel/",
  appStore: "https://apps.apple.com/us/app/seat-maker/id6748284141",
  codelabSite: "https://sites.google.com/view/codelabprogram/",
  brightlineInsightsSite: "https://www.brightlineinsights.com",
  brightlineInsightsAlt: "https://sites.google.com/view/brightlineinsights/",
  yourHonorInkSite: "https://www.yourhonorink.com/",
  homeworkHelpersSite: "https://sites.google.com/view/homeworkhelpersprogram/",
  mobileAppDailyReview: "https://www.mobileappdaily.com/product-review/seat-maker",
  bbyoArticle: "https://azabbg.bbyo.org/post/how-bbyo-helped-me-build-a-top-ranked-app",
};

export const VENTURES = [
  { slug: "seat-maker", name: "Seat Maker", external: LINKS.seatMakerSite },
  { slug: "codelab", name: "CodeLab", external: LINKS.codelabSite },
  { slug: "code-assist", name: "Code Assist", external: CANONICAL_URL },
  { slug: "homework-helpers", name: "Homework Helpers", external: LINKS.homeworkHelpersSite },
  { slug: "your-honor-ink", name: "Your Honor Ink", external: LINKS.yourHonorInkSite },
  { slug: "brightlineinsights", name: "BrightLineInsights", external: LINKS.brightlineInsightsSite },
  { slug: "bp-piano", name: "BP_Piano", external: LINKS.bpPianoTikTok },
] as const;

export const AUTHOR = {
  name: "Austin Frankel",
  description:
    "Student entrepreneur and iOS developer from Rye Brook, NY. Creator of Seat Maker; BBYO leader; coding educator.",
  location: "Rye Brook, NY (Westchester County)",
  school: "Blind Brook High School ’26",
  email: "austinhfrankel@gmail.com",
  phone: "914-336-7145",
  address: "15 Mark Drive",
}; 