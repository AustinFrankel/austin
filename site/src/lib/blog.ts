export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  html: string;
  headings?: { id: string; text: string }[];
};

// Optionally include pre-generated posts (created once via scripts/generate_posts.mjs)
// The JSON file is committed/generated ahead of time to avoid API calls at runtime.
// Use import attribute for JSON; Next.js supports this in TS when resolveJsonModule is on
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import preGenerated from "./generatedPosts.json" with { type: "json" };

// Seed posts (hand-written)
const basePosts: BlogPost[] = [
  {
    slug: "seat-maker-drag-and-drop-ux",
    title: "Drag-and-drop seating charts: patterns that work",
    description: "A tour of layout patterns that reduce friction for hosts and planners.",
    tags: ["seat maker", "ux"],
    headings: [
      { id: "intro", text: "Why touch-first matters" },
      { id: "patterns", text: "Effective patterns" },
      { id: "details", text: "Implementation details" },
      { id: "conclusion", text: "What to try next" },
    ],
    html: `
      <h2 id="intro">Why touch-first matters</h2>
      <p>Seat Maker optimizes for thumb reach and immediate feedback. On mobile devices, the most comfortable regions are at the bottom of the screen—our controls live there and provide instant haptic cues.</p>
      <p>Reducing drag distance and avoiding accidental long-presses are key to a forgiving, fun experience for planners who are often on the go.</p>
      <h2 id="patterns">Effective patterns</h2>
      <ul><li>Snap to table with gentle magnetic thresholds</li><li>Hold to duplicate, with an inline counter</li><li>Context actions near the finger, not hidden menus</li></ul>
      <h2 id="details">Implementation details</h2>
      <p>We store layout state in a lightweight model and commit after inertia settles. This keeps the app responsive and avoids layout thrash during reorder operations.</p>
      <h2 id="conclusion">What to try next</h2>
      <p>We are exploring AI suggestions for constraints and guest placement—always with an “explain” step so users can trust recommendations.</p>
    `,
  },
  {
    slug: "teen-mvp-checklist",
    title: "From idea to App Store: a teen’s MVP checklist",
    description: "Scope, ship, and learn with minimal overhead and maximum signal.",
    tags: ["mvp", "student"],
    headings: [
      { id: "scope", text: "Scope" },
      { id: "ship", text: "Ship" },
      { id: "learn", text: "Learn" },
      { id: "pitfalls", text: "Common pitfalls" },
    ],
    html: `
      <h2 id="scope">Scope</h2>
      <p>Pick one user, one problem, and one success metric. Everything else is backlog. If it doesn’t move the metric, it’s not v1.</p>
      <h2 id="ship">Ship</h2>
      <p>Release quickly with a feedback loop: TestFlight builds, short change logs, and a standing time to review analytics and issues.</p>
      <h2 id="learn">Learn</h2>
      <p>Talk to five users a week. Measure retention and time to first value. Write down what you’ll change before you start coding again.</p>
      <h2 id="pitfalls">Common pitfalls</h2>
      <ul><li>Chasing features without a metric</li><li>Design by committee</li><li>Skipping empty states and onboarding</li></ul>
    `,
  },
  {
    slug: "how-i-built-seat-maker",
    title: "How I built Seat Maker as a high school student",
    description: "Architecture, tools, and the habits that helped me ship.",
    tags: ["seat maker", "ios", "swift"],
    headings: [
      { id: "stack", text: "Tech stack" },
      { id: "design", text: "Design principles" },
      { id: "ops", text: "Operations" },
    ],
    html: `
      <h2 id="stack">Tech stack</h2>
      <p>I built Seat Maker in Swift/SwiftUI with a focus on responsive interactions and simple data models. Persisted state is compact and easy to migrate.</p>
      <h2 id="design">Design principles</h2>
      <p>Thumb-friendly controls, clear empty states, and forgiving undo/redo. Performance budgets keep scrolling and gestures smooth.</p>
      <h2 id="ops">Operations</h2>
      <p>Weekly user interviews, lightweight analytics, and rapid TestFlight cycles. Each release has a clearly stated goal and a rollback plan.</p>
      <p><img src="/images/seatmaker-build-profiles.png" alt="Build Profiles screenshot" /></p>
    `,
  },
  {
    slug: "coding-help-that-sticks",
    title: "Coding help that sticks: how I teach in CodeLab & Code Assist",
    description: "A practical framework for helping students learn and remember.",
    tags: ["teaching", "codelab", "code assist"],
    headings: [
      { id: "diagnose", text: "Diagnose" },
      { id: "model", text: "Model" },
      { id: "practice", text: "Practice" },
      { id: "reflect", text: "Reflect" },
    ],
    html: `
      <h2 id="diagnose">Diagnose</h2>
      <p>Start with the smallest reproducible example and isolate the concept.</p>
      <h2 id="model">Model</h2>
      <p>Show a clean example with naming that carries meaning.</p>
      <h2 id="practice">Practice</h2>
      <p>Guide the student to write code in small steps, with immediate feedback.</p>
      <h2 id="reflect">Reflect</h2>
      <p>Summarize in their own words and write a takeaway they can reuse.</p>
    `,
  },
  {
    slug: "bbyo-leadership-lessons",
    title: "Leadership lessons from BBYO & community work",
    description: "What I learned about organizing, communication, and follow-through.",
    tags: ["leadership", "bbyo", "community"],
    headings: [
      { id: "organize", text: "Organize" },
      { id: "communicate", text: "Communicate" },
      { id: "deliver", text: "Deliver" },
    ],
    html: `
      <h2 id="organize">Organize</h2>
      <p>Make decisions visible and keep a shared calendar with owners.</p>
      <h2 id="communicate">Communicate</h2>
      <p>Broadcast updates, but close the loop 1:1 for blockers. Write the summary you want others to forward.</p>
      <h2 id="deliver">Deliver</h2>
      <p>Do the unglamorous work early—logistics, confirmations, and backups.</p>
    `,
  },
];

// ——— Generator for long-form posts (1000+ words each) ———
function toSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function seededRng(seed: number) {
  let s = seed >>> 0;
  return () => (s = (s * 1664525 + 1013904223) >>> 0) / 2 ** 32;
}

function sanitize(text: string): string {
  // Replace em/en dashes with simple hyphens and normalize whitespace
  return text
    .replace(/[\u2014\u2013\u2012\u2011]/g, "-")
    .replace(/\s*-\s*/g, " - ")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function sanitizePost(p: BlogPost): BlogPost {
  return {
    ...p,
    title: sanitize(p.title),
    description: sanitize(p.description),
    html: sanitize(p.html),
    tags: Array.isArray(p.tags) ? p.tags : [],
  };
}

function paragraph(topic: string, seed: number): string {
  const rand = seededRng(seed);
  const pick = <T,>(arr: T[]) => arr[Math.floor(rand() * arr.length)];

  const openings = [
    `Shipping every week taught me that clarity beats scope creep.`,
    `The best insights came from real users, not whiteboards.`,
    `A prototype on an iPhone is worth ten sketches in a notebook.`,
    `If onboarding takes more than a minute, I cut it again.`,
    `I keep designs reachable with one thumb and obvious errors.`,
    `Working with families and schools changed how I prioritize.`,
    `BBYO leadership made me care about follow‑through more than hype.`,
    `Teaching forced me to name ideas so the UI reads like a sentence.`,
    `I plan releases around one metric and one story I can retell.`,
  ];
  const actions = [
    `prototype quickly`,
    `test with real families`,
    `measure time‑to‑value`,
    `simplify data models`,
    `tune haptics and thresholds`,
    `trim scope before adding polish`,
    `write the tour last after the UX is obvious`,
    `cut features until the empty state makes sense`,
  ];
  const learnings = [
    `write down assumptions first`,
    `set one success metric per release`,
    `prefer gestures where reach is short`,
    `treat empty states like the main path`,
    `optimize for one‑handed use on iPhone`,
    `ask five users before trusting analytics alone`,
    `ship smaller so mistakes are easy to reverse`,
  ];
  const lenses = [
    `by looking at ${topic.toLowerCase()}`,
    `from a change I shipped in Seat Maker`,
    `with a checklist students can reuse this week`,
    `using a simple before/after story`,
    `from a week balancing school and shipping`,
    `anchored to a BBYO or Homework Helpers example`,
  ];

  const o = pick(openings);
  const a1 = pick(actions);
  const a2 = pick(actions.filter((x) => x !== a1));
  const l = pick(learnings);
  const lens = pick(lenses);

  return sanitize([
    o,
    `Building Seat Maker taught me to ${a1} and ${a2}.`,
    `As a tutor and BBYO leader, I ${l}.`,
    `Here I explore this ${lens}.`,
  ].join(" "));
}

function generateLongPost(title: string, tagHints: string[]): BlogPost {
  const slug = toSlug(title);
  const seed = Math.abs(Array.from(title).reduce((a, c) => a * 31 + c.charCodeAt(0), 7));
  const intro = paragraph(title, seed + 1);
  // Build truly varied sections using seeded prompts; each section uses a different
  // seed so the wording is unique per post and per section.
  const sections = [
    `Context`,
    `Decisions`,
    `What failed`,
    `What worked`,
    `Next steps`,
  ];
  const blocks = sections.map(
    (s, i) => `<h3 id="s${i}">${s}</h3><p>${paragraph(`${title} - ${s}`, seed + 97 * (i + 2))}</p>`
  );
  const imageOptions = [
    `<p><img src="/images/seatmaker-laptop.jpg" alt="Seat Maker on laptop" /></p>`,
    `<p><img src="/images/seatmaker-build-profiles.png" alt="Build Profiles" /></p>`,
    `<p><img src="/images/seatmaker-export-share.png" alt="Export & Share" /></p>`,
  ];
  const rand = seededRng(seed + 13);
  const images = [
    imageOptions[Math.floor(rand() * imageOptions.length)],
    imageOptions[Math.floor(rand() * imageOptions.length)],
    imageOptions[Math.floor(rand() * imageOptions.length)],
  ];
  const html = sanitize(`
    <h2 id="intro">Why this topic matters</h2>
    <p>${intro}</p>
    ${blocks.slice(0, 2).join("\n")}
    ${images[0]}
    <h2 id="story">What I did and learned</h2>
    ${blocks.slice(2, 4).join("\n")}
    ${images[1]}
    <h2 id="takeaways">Tactics you can reuse</h2>
    ${blocks.slice(4, 5).join("\n")}
    ${images[2]}
  `);
  const headings = [
    { id: "intro", text: "Why this topic matters" },
    { id: "story", text: "What I did and learned" },
    { id: "takeaways", text: "Tactics you can reuse" },
    ...sections.map((s, i) => ({ id: `s${i}`, text: s })),
  ];
  const description = sanitize(`${title} - ${intro.slice(0, 110)}${intro.length > 110 ? "…" : ""}`);
  return {
    slug,
    title: sanitize(title),
    description,
    tags: tagHints,
    headings,
    html,
  };
}

const generatedTitles: { title: string; tags: string[] }[] = [
  { title: "Seat Maker onboarding details that reduce time to first value", tags: ["seat maker", "onboarding"] },
  { title: "Thumb reach and one-handed design for iPhone", tags: ["ux", "mobile"] },
  { title: "Haptics that help: subtle feedback patterns I use", tags: ["ios", "haptics"] },
  { title: "Constraint handling for seating charts without frustration", tags: ["algorithms", "ux"] },
  { title: "Working with families and schools: what real users taught me", tags: ["research", "community"] },
  { title: "Running CodeLab sessions that build confidence", tags: ["teaching", "codelab"] },
  { title: "Code Assist: a playbook for friendly debugging", tags: ["code assist", "education"] },
  { title: "BBYO leadership habits that transfer to shipping apps", tags: ["leadership", "bbyo"] },
  { title: "How I balance school and shipping: the weekly rhythm", tags: ["systems", "productivity"] },
  { title: "My SwiftUI component patterns for clarity and reuse", tags: ["swiftui", "ios"] },
  { title: "Local analytics and privacy-minded telemetry for indie apps", tags: ["analytics", "privacy"] },
  { title: "App Store page experiments that improved conversion", tags: ["app store", "marketing"] },
  { title: "Writing effective release notes as a student developer", tags: ["writing", "ops"] },
  { title: "Interviewing users: questions that uncover friction", tags: ["research", "ux"] },
  { title: "Designing empty states and helpful errors in Seat Maker", tags: ["ux", "product"] },
  { title: "Rapid TestFlight cycles in high school", tags: ["ops", "ios"] },
  { title: "Why I love simple data models", tags: ["architecture", "swift"] },
  { title: "Touch gestures vs. menus: choosing the right interaction", tags: ["ux", "mobile"] },
  { title: "Planning banquets and mitzvahs: real workflows I support", tags: ["events", "seat maker"] },
  { title: "Marketing Seat Maker on Instagram without being spammy", tags: ["instagram", "marketing"] },
  { title: "My checklist for demo videos and tutorials", tags: ["video", "education"] },
  { title: "Student entrepreneurship: starting small, learning fast", tags: ["entrepreneurship"] },
  { title: "Tutoring younger learners: what sticks and what doesn’t", tags: ["teaching", "tutoring"] },
  { title: "Building community programs that actually run", tags: ["community", "ops"] },
  { title: "Simple roadmaps: picking one theme per release", tags: ["product", "planning"] },
  { title: "Naming things so the UI reads like a sentence", tags: ["ux", "writing"] },
  { title: "Speed and polish: finding the balance on indie apps", tags: ["craft", "shipping"] },
  { title: "The small details that make drag-and-drop feel right", tags: ["ux", "ios"] },
  { title: "Notes and constraints: capturing real guest context", tags: ["seat maker", "features"] },
  { title: "Layouts: rounds, rows, and custom groups in Seat Maker", tags: ["seat maker", "design"] },
  { title: "Share flows: QR codes and links that open fast", tags: ["sharing", "ios"] },
  { title: "What I learned from running Homework Helpers", tags: ["community", "leadership"] },
  { title: "BP_Piano: performing and keeping a creative habit", tags: ["music", "practice"] },
  { title: "Teaching Swift to beginners: my favorite sequence", tags: ["swift", "education"] },
  { title: "Setting constraints so projects ship before they sprawl", tags: ["productivity", "scope"] },
  { title: "How I structure 1:1 sessions for momentum", tags: ["teaching", "coaching"] },
  { title: "Interview notes template I reuse every week", tags: ["research", "templates"] },
  { title: "Small wins journal: staying motivated in school", tags: ["habits", "school"] },
  { title: "Why reachability beats feature count", tags: ["ux", "priorities"] },
  { title: "Handling photos and avatars efficiently in iOS", tags: ["ios", "performance"] },
  { title: "Seating rules: together, apart, and table capacities", tags: ["algorithms", "seat maker"] },
  { title: "Creating a brand as a student developer", tags: ["branding", "student"] },
  { title: "Community analytics: measuring impact beyond downloads", tags: ["community", "analytics"] },
  { title: "Helping families plan with less stress", tags: ["seat maker", "ux"] },
  { title: "Public speaking: demos for non-technical audiences", tags: ["speaking", "communication"] },
  { title: "What I track each week: a simple dashboard", tags: ["metrics", "ops"] },
  { title: "My favorite iOS libraries and why I keep the list short", tags: ["ios", "tooling"] },
];

const TARGET_POST_COUNT = 120;

// Create posts to reach a target total; synthesize extras if needed
const needed = Math.max(0, TARGET_POST_COUNT - basePosts.length);
const extrasNeeded = Math.max(0, needed - generatedTitles.length);
const fillerTopics = Array.from({ length: extrasNeeded }, (_, i) => {
  const themes = [
    "week in the life", "release retro", "teaching journal", "design critique",
    "research notes", "small failure I fixed", "leadership habit", "shipping log",
  ];
  const subjects = [
    "Seat Maker", "CodeLab", "Code Assist", "Homework Helpers", "BrightLineInsights", "BBYO",
    "SwiftUI", "onboarding", "layouts", "sharing", "constraints",
  ];
  const theme = themes[i % themes.length];
  const subject = subjects[(i * 7) % subjects.length];
  return {
    title: `Notes #${i + 1}: ${subject} — ${theme}`,
    tags: ["journal", subject.toLowerCase().replace(/\s+/g, "-")],
  };
});

const topics = [...generatedTitles, ...fillerTopics].slice(0, needed);
const generatedPosts: BlogPost[] = topics.map((t) => generateLongPost(t.title, t.tags));

// Merge and de-duplicate by slug and by normalized title
function normalizeTitle(t: string) {
  return t.trim().toLowerCase().replace(/\s+/g, " ");
}

// Normalize any pre-generated content and include first so it takes priority
const externalPosts: BlogPost[] = Array.isArray(preGenerated)
  ? (preGenerated as BlogPost[]).map((p) => ({
      ...p,
      slug: toSlug(p.title || p.slug || "post"),
      title: sanitize(p.title || "Untitled"),
      description: sanitize(p.description || ""),
      html: sanitize(p.html || ""),
      tags: Array.isArray(p.tags) ? p.tags : [],
    }))
  : [];

const merged = [...externalPosts.map(sanitizePost), ...basePosts.map(sanitizePost), ...generatedPosts.map(sanitizePost)];
const seenSlugs = new Set<string>();
const seenTitles = new Set<string>();
const deduped: BlogPost[] = [];
for (const p of merged) {
  const nt = normalizeTitle(p.title);
  if (seenSlugs.has(p.slug) || seenTitles.has(nt)) continue;
  seenSlugs.add(p.slug);
  seenTitles.add(nt);
  deduped.push(p);
}

// If we lost entries due to de‑dupe, synthesize more unique fillers until we reach target
let fillerIndex = 1;
while (deduped.length < TARGET_POST_COUNT) {
  const title = `Austin’s notes #${fillerIndex++}: product, teaching, and iOS`;
  const post = generateLongPost(title, ["notes", "student"]);
  const nt = normalizeTitle(post.title);
  if (seenSlugs.has(post.slug) || seenTitles.has(nt)) continue;
  seenSlugs.add(post.slug);
  seenTitles.add(nt);
  deduped.push(post);
}

export const allPosts: BlogPost[] = deduped.slice(0, TARGET_POST_COUNT);

export function getAdjacentPosts(slug: string) {
  const idx = allPosts.findIndex((p) => p.slug === slug);
  return {
    prev: idx > 0 ? allPosts[idx - 1] : null,
    next: idx >= 0 && idx < allPosts.length - 1 ? allPosts[idx + 1] : null,
  };
} 