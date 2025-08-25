import { FAQAccordion } from "@/components/sections/FAQAccordion";

export default function Contact() {
  return (
    <div className="container-px mx-auto max-w-3xl py-10">
      <h1 className="text-3xl font-bold">Contact</h1>
      {/* Intro text and direct contact details removed per request */}

      <form className="mt-6 grid gap-4">
        <input aria-label="Name" placeholder="Name" className="h-11 px-4 rounded-xl border border-black/10 dark:border-white/20 bg-white/80 dark:bg-neutral-900/70" />
        <input aria-label="Email" placeholder="Email" type="email" className="h-11 px-4 rounded-xl border border-black/10 dark:border-white/20 bg-white/80 dark:bg-neutral-900/70" />
        <textarea aria-label="Message" placeholder="Message" className="min-h-[120px] p-4 rounded-xl border border-black/10 dark:border-white/20 bg-white/80 dark:bg-neutral-900/70" />
        <button type="submit" className="h-11 px-6 rounded-full bg-black text-white dark:bg-white dark:text-black">Send</button>
      </form>

      {/* Social links and response time removed per request */}

      <div className="mt-10 max-w-3xl">
        <FAQAccordion
          items={[
            { q: "What should I include in a message?", a: "A short goal, any deadlines, and links/screenshots. For Seat Maker, add device and iOS version." },
            { q: "Do you take on new tutoring students?", a: "Yes—limited spots. Share the student’s level and preferred schedule." },
            { q: "Do you do events or workshops?", a: "Yes. I run short sessions for students and talks for parent groups." },
          ]}
        />
      </div>
    </div>
  );
} 