#!/usr/bin/env node
// Generate unique long-form posts (~1000 words) using OpenAI and write to src/lib/generatedPosts.json
// Usage: OPENAI_API_KEY=... node ./scripts/generate_posts_openai.mjs

import fs from 'node:fs/promises';
import path from 'node:path';

const API_KEY = process.env.OPENAI_API_KEY || process.env.OPENAI_APIKEY || process.env.OPENAI_KEY;
if (!API_KEY) {
  console.error('Missing OPENAI_API_KEY');
  process.exit(1);
}

const OUT_PATH = path.resolve(process.cwd(), 'src/lib/generatedPosts.json');

function sanitize(text) {
  return (text || '')
    .replace(/\u0000/g, '')
    .replace(/[\u2014\u2013\u2012\u2011]/g, '-')
    .replace(/\s*-\s*/g, ' - ')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function toSlug(title) {
  return (title || 'post')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

let topics = [
  'Seat Maker onboarding details that reduce time to first value',
  'Thumb reach and one-handed design for iPhone',
  'Haptics that help: subtle feedback patterns I use',
  'Constraint handling for seating charts without frustration',
  'Working with families and schools: what real users taught me',
  'Running CodeLab sessions that build confidence',
  'Code Assist: a playbook for friendly debugging',
  'BBYO leadership habits that transfer to shipping apps',
  'How I balance school and shipping: the weekly rhythm',
  'My SwiftUI component patterns for clarity and reuse',
  'Local analytics and privacy-minded telemetry for indie apps',
  'App Store page experiments that improved conversion',
  'Writing effective release notes as a student developer',
  'Interviewing users: questions that uncover friction',
  'Designing empty states and helpful errors in Seat Maker',
  'Rapid TestFlight cycles in high school',
  'Why I love simple data models',
  'Touch gestures vs. menus: choosing the right interaction',
  'Planning banquets and mitzvahs: real workflows I support',
  'Marketing Seat Maker on Instagram without being spammy',
  'My checklist for demo videos and tutorials',
  'Student entrepreneurship: starting small, learning fast',
  'Tutoring younger learners: what sticks and what doesn’t',
  'Building community programs that actually run',
  'Simple roadmaps: picking one theme per release',
  'Naming things so the UI reads like a sentence',
  'Speed and polish: finding the balance on indie apps',
  'The small details that make drag-and-drop feel right',
  'Notes and constraints: capturing real guest context',
  'Layouts: rounds, rows, and custom groups in Seat Maker',
  'Share flows: QR codes and links that open fast',
  'What I learned from running Homework Helpers',
  'BP_Piano: performing and keeping a creative habit',
  'Teaching Swift to beginners: my favorite sequence',
  'Setting constraints so projects ship before they sprawl',
  'How I structure 1:1 sessions for momentum',
  'Interview notes template I reuse every week',
  'Small wins journal: staying motivated in school',
  'Why reachability beats feature count',
  'Handling photos and avatars efficiently in iOS',
  'Seating rules: together, apart, and table capacities',
  'Creating a brand as a student developer',
  'Community analytics: measuring impact beyond downloads',
  'Helping families plan with less stress',
  'Public speaking: demos for non-technical audiences',
  'What I track each week: a simple dashboard',
  'My favorite iOS libraries and why I keep the list short',
];

// Ensure we have 120+ distinct topics by adding programmatic variations
const TARGET_TOPICS = 120;
if (topics.length < TARGET_TOPICS) {
  const themes = [
    'journey', 'lesson', 'failure to fix', 'week in the life', 'system I rely on', 'small project',
    'community story', 'teaching note', 'shipping log', 'design critique', 'analytics note', 'leadership habit',
  ];
  const subjects = [
    'Seat Maker', 'CodeLab', 'Code Assist', 'Homework Helpers', 'BrightLineInsights', 'BBYO', 'school + shipping',
    'SwiftUI', 'App Store', 'testing', 'onboarding', 'constraints', 'layouts', 'sharing', 'marketing', 'music/BP_Piano'
  ];
  let i = 1;
  while (topics.length < TARGET_TOPICS) {
    const t = `${subjects[topics.length % subjects.length]} — ${themes[(topics.length + i) % themes.length]} #${i}`;
    topics.push(t);
    i += 1;
  }
}

const systemPrompt = [
  'Write as a reflective teen founder and iOS developer (Austin Frankel, Blind Brook HS ’26) but vary the voice and structure per article so it does not echo the same wording across posts.',
  'Tone: clear, practical, candid. Use first-person when telling stories; mix narrative and actionable sections.',
  'Avoid repeating site phrases (e.g., “small, reliable wins”). No boilerplate across posts.',
  'Target length: about 1000 words. Include short section headings and concrete examples.',
  'Draw details from Seat Maker (iOS app), CodeLab & Code Assist (teaching), BBYO leadership, Homework Helpers, and brightlineinsights.com when relevant.',
  'Keep everything true-to-life and useful. Prefer specifics over generalities.',
].join('\n');

async function callOpenAI(title) {
  const url = 'https://api.openai.com/v1/chat/completions';
  const userPrompt = `Write a unique long-form article (~1000 words) titled "${title}" for my personal site. Use headings and concrete examples tied to my projects and community work. No repeated boilerplate; keep every paragraph specific and fresh.`;
  const body = {
    model: 'gpt-4o-mini',
    temperature: 0.6,
    max_tokens: 3000,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ],
  };
  const resp = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`,
    },
    body: JSON.stringify(body),
  });
  if (!resp.ok) {
    const t = await resp.text();
    throw new Error(`OpenAI error ${resp.status}: ${t.slice(0, 400)}`);
  }
  const data = await resp.json();
  const text = data?.choices?.[0]?.message?.content || '';
  return sanitize(text);
}

function mdToHtml(md) {
  const blocks = sanitize(md)
    .split(/\n{2,}/)
    .map((blk) => blk.trim())
    .filter(Boolean);
  return blocks
    .map((blk) => {
      const h = blk.match(/^#+\s*(.*)/);
      if (h) return `<h2>${sanitize(h[1])}</h2>`;
      return `<p>${blk}</p>`;
    })
    .join('\n');
}

async function main() {
  // Allow partial runs for testing via env
  const startIndex = Math.max(0, parseInt(process.env.START_INDEX || '0', 10) || 0);
  const limit = Math.max(0, parseInt(process.env.TOPIC_LIMIT || `${topics.length}`, 10) || topics.length);
  const slice = topics.slice(startIndex, startIndex + limit);
  console.log(`Generating ${slice.length} posts (start=${startIndex}) → ${OUT_PATH}`);

  const out = [];
  for (const title of slice) {
    try {
      const md = await callOpenAI(title);
      const html = mdToHtml(md);
      out.push({
        slug: toSlug(title),
        title: sanitize(title),
        description: sanitize(md.slice(0, 140)),
        tags: [],
        html,
      });
      console.log('Generated:', title);
      // Write incrementally to avoid losing all work on rate limit
      await fs.writeFile(OUT_PATH, JSON.stringify(out, null, 2), 'utf8');
      // Gentle pacing to reduce rate limits
      await new Promise((r) => setTimeout(r, 1500));
    } catch (e) {
      console.warn('Skipped topic due to error:', title, e?.message || e);
    }
  }
  await fs.writeFile(OUT_PATH, JSON.stringify(out, null, 2), 'utf8');
  console.log('Wrote', OUT_PATH);
}

main().catch((e) => { console.error(e); process.exit(1); });


