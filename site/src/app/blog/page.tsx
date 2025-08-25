import { allPosts } from "@/lib/blog";
import { BlogExplorer } from "@/components/BlogExplorer";
import { FAQAccordion } from "@/components/sections/FAQAccordion";

export default function Blog() {
  return (
    <div className="container-px mx-auto max-w-6xl py-10">
      <h1 className="text-3xl font-bold text-fg">Blog</h1>
      <p className="mt-2 text-muted"><span className="text-bg">Browse posts with search, tag filters, sorting, and compact view. No pagination—just load more.</span></p>
      <div className="mt-6 max-w-3xl">
        <FAQAccordion
          items={[
            { q: "How are posts written?", a: "Mix of hand‑written and long‑form generated notes based on topics I work on." },
            { q: "Can I request a topic?", a: "Yes—use the Contact page with a short description of what you want to learn." },
            { q: "Can I share these posts?", a: "Please do. Link back to the original page." },
          ]}
        />
      </div>
      <BlogExplorer posts={allPosts} />
    </div>
  );
} 