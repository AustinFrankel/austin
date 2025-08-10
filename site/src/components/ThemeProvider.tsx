"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

type TextSize = "s" | "m" | "l";

export type Accent = "blue" | "violet" | "rose" | "emerald";

type ThemeContextType = {
  theme: "light" | "dark";
  setTheme: (t: "light" | "dark") => void;
  textSize: TextSize;
  setTextSize: (s: TextSize) => void;
  accent: Accent;
  setAccent: (a: Accent) => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<"light" | "dark">("dark");
  const [textSize, setTextSizeState] = useState<TextSize>("m");
  const [accent, setAccentState] = useState<Accent>("blue");

  useEffect(() => {
    const storedTheme = (localStorage.getItem("theme") as "light" | "dark") || null;
    const storedText = (localStorage.getItem("textSize") as TextSize) || null;
    const storedAccent = (localStorage.getItem("accent") as Accent) || null;
    if (storedTheme) setThemeState(storedTheme);
    else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) setThemeState("dark");
    if (storedText) setTextSizeState(storedText);
    if (storedAccent) setAccentState(storedAccent);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.dataset.textsize = textSize;
    localStorage.setItem("textSize", textSize);
  }, [textSize]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const map1: Record<Accent, string> = {
      blue: "59 130 246",      // blue
      violet: "139 92 246",    // violet
      rose: "244 63 94",       // rose
      emerald: "16 185 129",   // emerald
    };
    const map2: Record<Accent, string> = {
      blue: "139 92 246",      // violet pairs well
      violet: "244 63 94",     // rose
      rose: "139 92 246",      // violet
      emerald: "59 130 246",   // blue
    };
    const map3: Record<Accent, string> = {
      blue: "16 185 129",      // emerald
      violet: "59 130 246",    // blue
      rose: "16 185 129",      // emerald
      emerald: "139 92 246",   // violet
    };
    document.documentElement.style.setProperty("--accent", map1[accent]);
    document.documentElement.style.setProperty("--accent-2", map2[accent]);
    document.documentElement.style.setProperty("--accent-3", map3[accent]);
    localStorage.setItem("accent", accent);
  }, [accent]);

  const value = useMemo(
    () => ({ theme, setTheme: setThemeState, textSize, setTextSize: setTextSizeState, accent, setAccent: setAccentState }),
    [theme, textSize, accent]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useThemeControls() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useThemeControls must be used within ThemeProvider");
  return ctx;
} 