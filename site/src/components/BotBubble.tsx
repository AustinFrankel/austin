"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import Link from "next/link";
import { answerQuestion } from "@/lib/ai/brain";

export function BotBubble() {
  const [open, setOpen] = useState(false);
  const [showPing, setShowPing] = useState(true);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; text: string }[]>([
    { role: "assistant", text: "Hi, I’m Austin’s assistant. Ask me anything about his apps, ventures, or timeline." },
  ]);
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (open) setShowPing(false);
  }, [open]);

  async function ask(q: string) {
    if (!q.trim()) return;
    setMessages((m) => [...m, { role: "user", text: q }]);
    try {
      const resp = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            ...messages.map((m) => ({ role: m.role, content: m.text })),
            { role: "user", content: q },
          ],
        }),
      });
      if (!resp.ok) throw new Error("api_error");
      const data = (await resp.json()) as { text?: string };
      const reply = data.text?.trim();
      if (reply) {
        setMessages((m) => [...m, { role: "assistant", text: reply }]);
      } else {
        // Fallback to local brain if API returned empty
        const res = answerQuestion(q);
        setMessages((m) => [...m, { role: "assistant", text: res.answer }]);
      }
    } catch {
      // Fallback to local brain on any failure
      const res = answerQuestion(q);
      setMessages((m) => [...m, { role: "assistant", text: res.answer }]);
    } finally {
      setTimeout(() => listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" }), 50);
    }
  }

  const minimized = useMemo(() => !open, [open]);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {minimized ? (
        <button
          className="relative rounded-full bg-black text-white dark:bg-white dark:text-black h-12 px-5 shadow-lg"
          onClick={() => setOpen(true)}
          aria-label="Open assistant"
        >
          Chat
          {showPing && (
            <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500 animate-pulse" aria-hidden />
          )}
        </button>
      ) : (
        <div className="w-[340px] h-[480px] rounded-2xl border border-black/10 dark:border-white/20 bg-white dark:bg-neutral-900 shadow-xl flex flex-col">
          <div className="p-3 border-b border-black/5 dark:border-white/10 flex items-center justify-between">
            <div className="font-medium">Austin Assistant</div>
            <div className="flex items-center gap-2">
              <Link href="/contact" className="text-sm underline">Contact</Link>
              <button onClick={() => setOpen(false)} aria-label="Minimize">▁</button>
            </div>
          </div>
          <div ref={listRef} className="flex-1 overflow-auto p-3 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={m.role === "assistant" ? "" : "text-right"}>
                <div className={`inline-block max-w-[85%] px-3 py-2 rounded-xl ${m.role === "assistant" ? "bg-black/5 dark:bg-white/10" : "bg-[rgba(var(--accent),0.12)] dark:bg-[rgba(var(--accent),0.25)]"}`}>
                  {m.text.split("\n").map((ln, j) => (
                    <p key={j} className="text-sm leading-6 whitespace-pre-wrap">{ln}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {/* Suggested questions */}
          <div className="px-3 pb-2 flex flex-wrap gap-2">
            {["What is Seat Maker?","What has Austin built?","How to contact Austin?","What is CodeLab?"].map((q) => (
              <button key={q} className="text-xs rounded-full border border-black/10 dark:border-white/20 px-2 py-1 hover:bg-black/5 dark:hover:bg-white/10" onClick={() => ask(q)} type="button">{q}</button>
            ))}
          </div>
          <form
            className="p-3 border-t border-black/5 dark:border-white/10 flex items-center gap-2"
            onSubmit={(event) => { event.preventDefault(); ask(input); setInput(""); }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything…"
              className="flex-1 h-10 rounded-xl border border-black/10 dark:border-white/20 bg-transparent px-3"
            />
            <button type="submit" className="h-10 px-4 rounded-xl bg-black text-white dark:bg-white dark:text-black">Send</button>
          </form>
        </div>
      )}
    </div>
  );
} 