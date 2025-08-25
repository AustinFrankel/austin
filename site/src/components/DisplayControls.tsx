"use client";
import { useThemeControls } from "@/components/ThemeProvider";
import type { Accent } from "@/components/ThemeProvider";

const accents = [
  { id: "blue", rgb: "59 130 246" },
  { id: "violet", rgb: "139 92 246" },
  { id: "rose", rgb: "244 63 94" },
  { id: "emerald", rgb: "16 185 129" },
] as const;

export function DisplayControls() {
  const { theme, setTheme, textSize, setTextSize, accent, setAccent } = useThemeControls();
  return (
    <div className="flex items-center gap-3 shrink-0 whitespace-nowrap">
      <div className="flex items-center gap-1 rounded-full border border-black/10 dark:border-white/20 px-2 py-1 shrink-0" role="group" aria-label="Accent colors">
        {accents.map((a) => (
          <button
            key={a.id}
            aria-label={`Accent ${a.id}`}
            aria-pressed={accent === a.id}
            onClick={() => setAccent(a.id as Accent)}
            className={`h-6 w-6 rounded-full ring-1 ${accent === a.id ? "ring-[rgba(var(--accent),1)]" : "ring-black/10 dark:ring-white/20"}`}
            style={{ backgroundColor: `rgb(${a.rgb})` }}
          />
        ))}
      </div>
      <div className="flex items-center rounded-full border border-black/10 dark:border-white/20 overflow-visible shrink-0" role="group" aria-label="Text size">
        {(["s", "m", "l"] as const).map((s) => (
          <button
            key={s}
            aria-pressed={textSize === s}
            onClick={() => setTextSize(s)}
            className={`min-w-[40px] h-8 px-3 text-sm transition-transform duration-300 ${textSize === s ? "bg-black text-white dark:bg-white dark:text-black scale-105" : "bg-transparent hover:scale-105"}`}
          >
            {s === "s" ? "A-" : s === "m" ? "A" : "A+"}
          </button>
        ))}
      </div>
      <button aria-label="Toggle theme" aria-pressed={theme === "dark"} className="h-8 px-3 rounded-full border border-black/10 dark:border-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[rgb(var(--accent))]" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>{theme === "light" ? "Dark" : "Light"}</button>
    </div>
  );
} 