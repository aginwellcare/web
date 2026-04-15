import Link from "next/link"
import postsData from "@/content/posts.json"

export default function BlogPage() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <h1 className="text-3xl font-bold text-foreground md:text-4xl">Blog</h1>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {postsData.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block rounded-lg border border-border bg-card p-6 transition-all hover:shadow-md"
            >
              <span className="inline-block rounded-sm bg-accent px-2 py-0.5 text-xs font-medium text-accent-foreground">{post.category}</span>
              <h2 className="mt-3 text-lg font-semibold text-foreground group-hover:text-primary">{post.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{post.excerpt}</p>
              <p className="mt-3 text-xs text-muted-foreground">{new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
