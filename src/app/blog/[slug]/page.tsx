import Link from "next/link"
import { BLOG_POSTS } from "@/content/posts"
import { CTABanner } from "@/components/shared/CTABanner"

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }))
}

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug)
  if (!post) return <div>Post not found</div>

  return (
    <div>
      <article className="bg-background py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4">
          <span className="inline-block rounded-sm bg-accent px-2 py-0.5 text-xs font-medium text-accent-foreground">{post.category}</span>
          <h1 className="mt-4 text-3xl font-bold text-foreground md:text-4xl">{post.title}</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })} · {post.author}
          </p>
          <div className="prose mt-8 max-w-none text-foreground">
            <p className="text-lg leading-relaxed">{post.excerpt}</p>
            <p>Caring for an aging parent is one of the most important and challenging journeys a family can face. This guide covers practical strategies, emotional support, and resources to help you navigate this transition with confidence and compassion.</p>
            <p>From understanding your loved one&apos;s evolving needs to finding the right level of professional support, every family&apos;s path is unique. The key is starting the conversation early and building a care plan that respects everyone&apos;s wishes.</p>
          </div>
          <div className="mt-10 border-t border-border pt-6">
            <Link href="/blog" className="text-sm font-medium text-primary hover:underline">← Back to Blog</Link>
          </div>
        </div>
      </article>
      <CTABanner />
    </div>
  )
}
