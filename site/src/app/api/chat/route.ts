export const runtime = "nodejs"; // use Node runtime for compatibility

type ChatMessage = { role: "system" | "user" | "assistant"; content: string };

import { AUTHOR, LINKS, CANONICAL_URL } from "@/lib/site.config";

export async function POST(req: Request) {
  try {
    const { messages } = (await req.json()) as { messages: ChatMessage[] };
    if (!Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "Invalid request" }), { status: 400 });
    }

    // Prefer Gemini key provided by user
    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "Server missing GEMINI_API_KEY" }), { status: 500 });
    }

    function buildSystemPrompt(): string {
      return [
        `You are Austin Frankel’s assistant for ${CANONICAL_URL}.`,
        `Austin Frankel — born Sep 7, 2007 — is a student entrepreneur and iOS developer from ${AUTHOR.location} (Blind Brook HS ’26).`,
        `Projects: Seat Maker (iOS seating‑chart app: drag‑and‑drop, QR share), CodeLab (small‑group coaching), Code Assist (on‑demand debugging), Homework Helpers (student tutoring), BrightLineInsights (student research). Leadership: BBYO HVR Mazkir. Music: BP_Piano.`,
        `Helpful links: Timeline (${CANONICAL_URL}/timeline), Blog (${CANONICAL_URL}/blog), Ventures (${CANONICAL_URL}/ventures), Contact (${CANONICAL_URL}/contact), App Store (${LINKS.appStore}), Seat Maker site (${LINKS.seatMakerSite}).`,
        `Guidelines: answer directly with specifics; include one helpful link when relevant. If details are missing, infer from context or give a short, useful suggestion. Keep responses short unless asked for more.`,
      ].join(" \n");
    }

    const system: ChatMessage = { role: "system", content: buildSystemPrompt() };

    // Remove any client-sent system prompts and cap history for efficiency
    const sanitizedHistory: ChatMessage[] = messages
      .filter((m) => m && (m.role === "user" || m.role === "assistant"))
      .slice(-10);

    // Map messages to Gemini chat format
    type GeminiPart = { text: string };
    type GeminiContent = { role?: string; parts: GeminiPart[] };
    const historyForGemini: GeminiContent[] = sanitizedHistory.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    async function callGemini(model: string): Promise<{ ok: boolean; text?: string; status?: number; detail?: string }> {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const body = {
        systemInstruction: {
          role: "system",
          parts: [{ text: system.content }],
        },
        contents: historyForGemini,
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 220,
        },
      } satisfies Record<string, unknown>;

      const resp = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!resp.ok) {
        const text = await resp.text();
        return { ok: false, status: resp.status, detail: text.slice(0, 500) };
      }

      type GeminiResponse = {
        candidates?: Array<{
          content?: { parts?: Array<{ text?: string }> };
        }>;
      };
      const data = (await resp.json()) as GeminiResponse;
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
      return { ok: true, text };
    }

    // Try a higher-quality model first, then fall back to flash
    let out = await callGemini("gemini-1.5-pro-latest");
    if (!out.ok) {
      out = await callGemini("gemini-1.5-flash-latest");
    }
    if (!out.ok) {
      return new Response(
        JSON.stringify({ error: "Upstream error", detail: out.detail ?? `status ${out.status}` }),
        { status: 502 }
      );
    }

    const text: string = (out.text ?? "").trim();
    return new Response(JSON.stringify({ text }), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (e: unknown) {
    const err = e as { message?: string } | undefined;
    const msg = typeof err?.message === "string" ? err.message : "Unknown error";
    return new Response(JSON.stringify({ error: "Server error", detail: msg }), { status: 500 });
  }
}


