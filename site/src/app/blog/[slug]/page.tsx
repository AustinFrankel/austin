import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { allPosts, getAdjacentPosts } from "@/lib/blog";
import { LikeShare } from "@/components/LikeShare";
import { ViewCounter } from "@/components/ViewCounter";
import { JsonLd } from "@/components/JsonLd";
import { CANONICAL_URL } from "@/lib/site.config";

export function generateStaticParams() {
  return allPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = allPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: { title: post.title, description: post.description },
  };
}

function TableOfContents({ headings }: { headings: { id: string; text: string }[] }) {
  if (!headings || headings.length === 0) return null;
  return (
    <nav className="hidden lg:block">
      <div className="text-sm font-medium">On this page</div>
      <ul className="mt-3 grid gap-1 text-sm">
        {headings.map((h) => (
          <li key={h.id}>
            <a href={`#${h.id}`} className="text-neutral-900 dark:text-neutral-300 hover:underline">
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = allPosts.find((p) => p.slug === slug);
  if (!post) return notFound();
  const headings = post.headings ?? [];
  const { prev, next } = getAdjacentPosts(post.slug);

  return (
    <div className="container-px mx-auto max-w-6xl py-10 grid lg:grid-cols-[1fr_240px] gap-10">
      <article className="prose dark:prose-invert max-w-3xl">
        <h1>{post.title}</h1>
        {/* Images removed sitewide for blog posts per request */}
        <p className="text-neutral-900 dark:text-neutral-300"><span className="text-bg">{post.description}</span></p>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        <div className="mt-6 flex items-center justify-between">
          <LikeShare id={post.slug} title={post.title} />
          <ViewCounter slug={post.slug} />
        </div>
        <div className="mt-10 flex items-center justify-between text-sm">
          {prev ? (
            <Link href={`/blog/${prev.slug}`} className="hover:underline">← {prev.title}</Link>
          ) : <span />}
          {next && (
            <Link href={`/blog/${next.slug}`} className="hover:underline">{next.title} →</Link>
          )}
        </div>
      </article>
      <JsonLd
        json={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.description,
          url: `${CANONICAL_URL}/blog/${post.slug}`,
          mainEntityOfPage: `${CANONICAL_URL}/blog/${post.slug}`,
          author: { "@type": "Person", name: "Austin Frankel" },
        }}
      />
      <JsonLd
        json={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "/" },
            { "@type": "ListItem", position: 2, name: "Blog", item: "/blog" },
            { "@type": "ListItem", position: 3, name: post.title, item: `/blog/${post.slug}` },
          ],
        }}
      />
      <div className="sticky top-28 hidden lg:block">
        <div className="rounded-xl border border-black/10 dark:border-white/20 bg-white/80 dark:bg-neutral-900/70 p-4">
          <TableOfContents headings={headings} />
        </div>
      </div>
    </div>
  );
} 