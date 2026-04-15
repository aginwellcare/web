import Link from "next/link"
import { notFound } from "next/navigation"
import { CTABanner } from "@/components/shared/CTABanner"
import postsData from "@/content/posts.json"

export function generateStaticParams() {
  return postsData.map((p) => ({ slug: p.slug }))
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = postsData.find((p) => p.slug === slug)
  if (!post) notFound()

  return (
    <div>
      <article className="bg-background py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4">
          <span className="inline-block rounded-sm bg-accent px-2 py-0.5 text-xs font-medium text-accent-foreground">{post.category}</span>
          <h1 className="mt-4 text-3xl font-bold text-foreground md:text-4xl">{post.title}</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })} &middot; {post.author}
          </p>
          <div className="mt-8 space-y-4 text-base leading-relaxed text-foreground">
            {post.content.split("\n\n").map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-10 border-t border-border pt-6">
            <Link href="/blog" className="text-sm font-medium text-primary hover:underline">&larr; Back to Blog</Link>
          </div>
        </div>
      </article>
      <CTABanner />
    </div>
  )
}
