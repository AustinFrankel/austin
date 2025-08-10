#!/usr/bin/env node
// One-time generator: creates unique long-form posts using Gemini and writes to src/lib/generatedPosts.json
// Respects GEMINI_API_KEY from .env.local; run: npm run generate:posts

import fs from 'node:fs/promises';
import path from 'node:path';

const API_KEY = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
if (!API_KEY) {
  console.error('Missing GEMINI_API_KEY');
  process.exit(1);
}

const OUT_PATH = path.resolve(process.cwd(), 'src/lib/generatedPosts.json');

function sanitize(text) {
  return (text || '')
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

const topics = [
  'How I validated Seat Maker with real families',
  'My favorite small wins while building as a student',
  'Teaching Swift to beginners: simple steps that work',
  'What I learned running community programs in school',
  'Shipping fast with a weekly rhythm',
  'Design choices that make drag and drop feel right',
  'Leading BBYO and how it shaped how I ship apps',
  'Balancing school and indie dev without burning out',
];

const systemPrompt = [
  'You write in the voice of Austin Frankel, a student entrepreneur and iOS developer.',
  'Tone: clear, practical, friendly, and specific. Avoid em dashes; prefer simple punctuation.',
  'Each article must be unique, with different structure, examples, and takeaways.',
  'Target length: 700-1000 words. Include short section headings. No filler paragraphs.',
  'Include 2-3 concrete examples tied to Seat Maker, teaching, or leadership.',
].join('\n');

async function callGemini(title) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent?key=${API_KEY}`;
  const userPrompt = `Write a unique long-form article titled "${title}". Follow the system rules.`;
  const body = {
    systemInstruction: { role: 'system', parts: [{ text: systemPrompt }] },
    contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
    generationConfig: { temperature: 0.6, maxOutputTokens: 2048 },
  };
  const resp = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  if (!resp.ok) {
    const t = await resp.text();
    throw new Error(`Gemini error ${resp.status}: ${t.slice(0, 400)}`);
  }
  const data = await resp.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
  return sanitize(text);
}

async function main() {
  const out = [];
  for (const title of topics) {
    try {
      const md = await callGemini(title);
      // Convert markdown-ish paragraphs to simple HTML blocks
      const html = sanitize(md)
        .split(/\n{2,}/)
        .map((blk) => {
          const m = blk.match(/^#+\s*(.*)/);
          if (m) return `<h2>${sanitize(m[1])}</h2>`;
          return `<p>${sanitize(blk)}</p>`;
        })
        .join('\n');
      out.push({
        slug: toSlug(title),
        title: sanitize(title),
        description: sanitize(md.slice(0, 140)),
        tags: [],
        html,
      });
      console.log('Generated:', title);
    } catch (e) {
      console.warn('Skipped topic due to error:', title, e?.message || e);
    }
  }
  await fs.writeFile(OUT_PATH, JSON.stringify(out, null, 2), 'utf8');
  console.log('Wrote', OUT_PATH);
}

main().catch((e) => { console.error(e); process.exit(1); });
