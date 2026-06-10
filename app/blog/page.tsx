import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "./data";

export const metadata: Metadata = {
  title: "博客",
  description: "前端技术文章，关于 React、Next.js、CSS 和 TypeScript。",
};

const tagColors: Record<string, string> = {
  React: "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-400",
  "Next.js": "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-400",
  性能: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400",
  CSS: "bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-400",
  TypeScript: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans">
      <nav className="sticky top-0 z-10 border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            ← 返回首页
          </Link>
          <span className="text-sm font-medium text-zinc-400 dark:text-zinc-500">博客</span>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-16">
        <section className="mb-14">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-3">
            博客文章
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400">
            {posts.length} 篇文章，聊聊 React、Next.js 和前端那些事。
          </p>
        </section>

        <div className="flex flex-col gap-4">
          {posts.map((post, index) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col sm:flex-row sm:items-center gap-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
            >
              <span className="hidden sm:flex items-center justify-center w-10 h-10 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-lg font-bold text-zinc-400 dark:text-zinc-500 shrink-0">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${tagColors[post.tag] ?? "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"}`}
                  >
                    {post.tag}
                  </span>
                </div>
                <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50 group-hover:underline underline-offset-2 mb-1 truncate">
                  {post.title}
                </h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-1">
                  {post.summary}
                </p>
              </div>
              <div className="flex sm:flex-col items-center sm:items-end gap-3 sm:gap-1 shrink-0">
                <span className="text-xs text-zinc-400 dark:text-zinc-600">{post.date}</span>
                <span className="text-xs text-zinc-400 dark:text-zinc-600">{post.readingTime}</span>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <footer className="border-t border-zinc-200 dark:border-zinc-800 mt-16">
        <div className="max-w-4xl mx-auto px-6 py-8 text-center text-sm text-zinc-400 dark:text-zinc-600">
          共 {posts.length} 篇文章
        </div>
      </footer>
    </div>
  );
}
