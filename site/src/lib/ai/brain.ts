export type BrainDoc = {
  id: string;
  title: string;
  url: string;
  text: string;
  tags?: string[];
};

import { allPosts } from "../blog";
import { AUTHOR, LINKS } from "../site.config";

const STOPWORDS = new Set(
  [
    "the","a","an","and","or","but","if","to","of","in","on","for","with","as","is","are","be","it","that","this","those","these","you","your","i","we","our","at","by","from","about","into","out","up","down","over","under","then","so","than","too","very","can","will","just","not"
  ]
);

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

// Build documents from posts and key site facts
const docs: BrainDoc[] = [
  ...allPosts.map((p) => ({
    id: p.slug,
    title: p.title,
    url: `/blog/${p.slug}`,
    text: `${p.title}. ${p.description}. ${stripHtml(p.html)}`,
    tags: p.tags,
  })),
  {
    id: "about-austin",
    title: "About Austin",
    url: "/about",
    text: `${AUTHOR.name} is a student entrepreneur from ${AUTHOR.location}. He created Seat Maker, a drag-and-drop seating-chart app. Contact: ${AUTHOR.email} ${AUTHOR.phone}. Programs include CodeLab and Code Assist. Links: ${LINKS.seatMakerSite} ${LINKS.seatMakerInstagram}.`,
  },
  {
    id: "seat-maker",
    title: "Seat Maker",
    url: "/ventures/seat-maker",
    text: `Seat Maker is an iOS app that helps plan seating with drag-and-drop, profiles, layouts, notes, constraints, and instant sharing. App Store: ${LINKS.appStore}. Instagram: ${LINKS.seatMakerInstagram}.`,
  },
];

// Index
const termToDocFreq = new Map<string, number>();
const docTermFreq = new Map<string, Map<string, number>>();
const tokenCache = new Map<string, string[]>();

function tokenize(s: string): string[] {
  if (tokenCache.has(s)) return tokenCache.get(s)!;
  const toks = s
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOPWORDS.has(t));
  tokenCache.set(s, toks);
  return toks;
}

for (const d of docs) {
  const tf = new Map<string, number>();
  const seen = new Set<string>();
  for (const tok of tokenize(d.text)) {
    tf.set(tok, (tf.get(tok) ?? 0) + 1);
    if (!seen.has(tok)) {
      termToDocFreq.set(tok, (termToDocFreq.get(tok) ?? 0) + 1);
      seen.add(tok);
    }
  }
  docTermFreq.set(d.id, tf);
}

const N = docs.length;

function idf(term: string): number {
  const df = termToDocFreq.get(term) ?? 0.5; // smoothing
  return Math.log((N + 1) / (df + 1)) + 1; // 1.. range
}

function scoreDoc(query: string, docId: string): number {
  const qTokens = tokenize(query);
  const tf = docTermFreq.get(docId)!;
  let score = 0;
  for (const qt of qTokens) {
    const f = tf.get(qt) ?? 0;
    if (f > 0) score += (1 + Math.log(f)) * idf(qt);
  }
  return score;
}

function topK(query: string, k = 4): BrainDoc[] {
  const scored = docs
    .map((d) => ({ d, s: scoreDoc(query, d.id) }))
    .filter((x) => x.s > 0)
  .sort((a, b) => b.s - a.s)
    .slice(0, k)
    .map((x) => x.d);
  return scored.length > 0 ? scored : docs.slice(0, k);
}

export function answerQuestion(question: string): { answer: string; sources: BrainDoc[] } {
  const sources = topK(question, 4);
  const intro = `Here’s the short answer:`;
  const bullets = sources.slice(0, 3).map((s) => `- ${s.title}: ${s.url}`).join("\n");

  const seatCta = question.toLowerCase().includes("seat") || question.toLowerCase().includes("app")
    ? `\nIf you’re planning an event, try Seat Maker on the App Store (${LINKS.appStore}) or DM ${LINKS.seatMakerInstagram} for tips.`
    : "";

  const summary = sources
    .map((s) => s.text.slice(0, 360))
    .join(" ")
    .slice(0, 1200);

  const shortSummary = summary.slice(0, 280);
  const answer = [intro, shortSummary, seatCta, "\nUseful links:", bullets].join("\n\n");
  return { answer, sources };
} 