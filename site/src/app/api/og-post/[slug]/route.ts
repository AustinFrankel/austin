import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

const size = { width: 1200, height: 630 };

function pickGradient(seed: string): [string, string] {
  const palettes: [string, string][] = [
    ["#0ea5e9", "#22d3ee"],
    ["#6366f1", "#a78bfa"],
    ["#10b981", "#34d399"],
    ["#f59e0b", "#fbbf24"],
    ["#ef4444", "#f97316"],
  ];
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return palettes[h % palettes.length];
}

function pickEmoji(slug: string) {
  const map: Record<string, string> = {
    seat: "🪑",
    maker: "📱",
    code: "💻",
    lab: "🧪",
    assist: "🧰",
    teach: "📚",
    bbyo: "🫶",
    music: "🎹",
    swift: "🦅",
    ux: "✨",
  };
  for (const [k, e] of Object.entries(map)) if (slug.includes(k)) return e;
  return "🌟";
}

export async function GET(req: NextRequest, ctx: { params: { slug: string } }) {
  const slug = ctx.params.slug ?? "post";
  const title = decodeURIComponent(req.nextUrl.searchParams.get("title") ?? slug.replace(/-/g, " "));
  const [c1, c2] = pickGradient(slug + title);
  const emoji = pickEmoji(slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: `radial-gradient(800px 500px at 20% 20%, ${c2}22, transparent 60%), linear-gradient(135deg, ${c1}, ${c2})`,
          color: "#fff",
          fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto",
        }}
      >
        <div
          style={{
            width: 1060,
            height: 530,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: 48,
            borderRadius: 28,
            background: "rgba(0,0,0,0.18)",
            boxShadow: "0 40px 140px rgba(0,0,0,0.25) inset, 0 10px 40px rgba(0,0,0,0.25)",
          }}
        >
          <div style={{ fontSize: 84, lineHeight: 1 }}>{emoji}</div>
          <div style={{ fontSize: 56, fontWeight: 800, lineHeight: 1.2 }}>{title}</div>
          <div style={{ fontSize: 22, opacity: 0.9 }}>Austin Frankel — Notes on apps, teaching, and community</div>
        </div>
      </div>
    ),
    { ...size }
  );
}


