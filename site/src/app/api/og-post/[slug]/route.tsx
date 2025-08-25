/* OG image endpoint: simple, readable, and compatible with JSX by using .tsx */
import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") ?? "Post";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
          color: "#111827",
          padding: "60px",
          fontSize: 56,
          fontWeight: 700,
          lineHeight: 1.2,
          textAlign: "center",
        }}
      >
        {title}
      </div>
    ),
    { width: 1200, height: 630 }
  );
}


