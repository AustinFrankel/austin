export type TimelineData = import("@/components/Timeline").TimelineItem[];

export const timelineData: TimelineData = [
  // Approximate months are marked via approximate: true and ~ in UI
  {
    id: "school-2022",
    title: "Blind Brook High School",
    subtitle: "Class of ’26",
    description: "Started high school; focus on STEM and leadership.",
    category: "school",
    location: "Rye Brook, NY",
    date: "2022-09-01",
    approximate: true,
  },
  {
    id: "music-2022",
    title: "BP_Piano",
    subtitle: "Piano performances",
    description: "Posting arrangements and performing locally.",
    category: "music",
    date: "2022-10-01",
    approximate: true,
  },
  {
    id: "helpers-2023",
    title: "Homework Helpers VP/Marketing",
    description: "Student‑led tutoring and mentorship; built brand and outreach.",
    category: "leadership",
    location: "Rye Brook, NY",
    date: "2023-02-01",
    approximate: true,
  },
  {
    id: "codelab-2023",
    title: "Launched CodeLab + Code Assist",
    description: "Small‑group teaching and on‑demand 1:1 debugging.",
    category: "teaching",
    date: "2023-09-01",
    approximate: true,
  },
  {
    id: "yhi-2023",
    title: "Your Honor Ink",
    description: "Custom apparel and printing for clubs and events.",
    category: "ventures",
    date: "2023-10-01",
    approximate: true,
  },
  {
    id: "bbyo-2024",
    title: "BBYO HVR Mazkir (Communications)",
    description: "Regional teen leadership—communications and programming.",
    category: "leadership",
    date: "2024-03-01",
    approximate: true,
  },
  {
    id: "brightline-2024",
    title: "BrightLineInsights + micro‑ventures",
    description: "Student‑run research and small business experiments.",
    category: "ventures",
    date: "2024-05-01",
    approximate: true,
  },
  {
    id: "athletics-2024",
    title: "Track & Cross‑Country",
    description: "Distance running and team meets.",
    category: "athletics",
    date: "2024-09-01",
    approximate: true,
  },
  {
    id: "swim-2024",
    title: "Swim Instructor & Lifeguard",
    description: "Teaching fundamentals and water safety.",
    category: "teaching",
    date: "2024-06-01",
    approximate: true,
  },
  {
    id: "deca-2024",
    title: "DECA Competition Results",
    description: "Placed at events; applied product and marketing skills.",
    category: "awards",
    date: "2024-12-01",
    approximate: true,
  },
  {
    id: "seatmaker-2025",
    title: "Seat Maker Launch",
    subtitle: "Traction in Events charts",
    description: "Shipped v1 with drag‑and‑drop planning and instant sharing.",
    category: "apps",
    date: "2025-04-01",
    approximate: true,
    metrics: [
      { label: "Downloads", value: 1200 },
      { label: "Sessions", value: 8500 },
    ],
  },
];

export type SearchRecord = {
  href: string;
  title: string;
  category: string;
  description?: string;
  tags?: string[];
};

import { allPosts } from "./blog";

export const searchIndex: SearchRecord[] = [
  { href: "/", title: "Home", category: "Page", description: "Austin Frankel — Student Entrepreneur & iOS Developer" },
  { href: "/about", title: "About", category: "Page" },
  { href: "/ventures", title: "Ventures", category: "Page" },
  { href: "/accomplishments", title: "Accomplishments", category: "Page", tags: ["timeline", "awards"] },
  { href: "/press", title: "Press & Media Kit", category: "Page", tags: ["media", "kit"] },
  { href: "/speaking", title: "Speaking", category: "Page" },
  { href: "/blog", title: "Blog", category: "Page", description: "Posts about Seat Maker, student entrepreneurship, coding, and more" },
  { href: "/contact", title: "Contact", category: "Page" },
  { href: "/ventures/seat-maker", title: "Seat Maker", category: "Venture", tags: ["ios", "app", "events"] },
  { href: "/ventures/codelab", title: "CodeLab", category: "Venture", tags: ["education", "tutoring"] },
  { href: "/ventures/code-assist", title: "Code Assist", category: "Venture", tags: ["coding", "help"] },
  { href: "/ventures/homework-helpers", title: "Homework Helpers", category: "Venture" },
  { href: "/ventures/your-honor-ink", title: "Your Honor Ink", category: "Venture" },
  { href: "/ventures/brightlineinsights", title: "BrightLineInsights", category: "Venture" },
  { href: "/ventures/bp-piano", title: "BP_Piano", category: "Venture", tags: ["music", "piano"] },
  // Blog posts for search (generated)
  ...allPosts.map((p) => ({ href: `/blog/${p.slug}`, title: p.title, category: "Blog", tags: p.tags, description: p.description })),
]; 