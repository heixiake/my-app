import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { posts } from "./blog/data";

export const metadata: Metadata = {
  title: "我的博客",
  description: "分享前端技术与 Next.js 实战经验",
};

export default function Home() {
  const recentPosts = posts.slice(0, 3);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans">

      <main className="max-w-4xl mx-auto px-6">
        {/* Hero */}
        <section className="py-24 border-b border-zinc-100 dark:border-zinc-800">
          <Image
            src="/next.svg"
            alt="Next.js logo"
            width={120}
            height={24}
            priority
            className="mb-6 dark:invert"
          />
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 text-xs font-medium mb-6">
            Next.js · React · TypeScript
          </div>
          <h1 className="text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-5 leading-tight">
            写代码，
            <br />
            分享所想。
          </h1>
          <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-xl leading-relaxed mb-8">
            记录前端开发日常，探索 React 与 Next.js 的边界，分享那些值得一读的技术经验。
          </p>
          <div className="flex items-center gap-3">
            <Link
              href="/blog"
              className="inline-flex items-center h-10 px-5 rounded-full bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 text-sm font-medium hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors"
            >
              读博客 →
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center h-10 px-5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
            >
              关于 Next.js
            </Link>
          </div>
        </section>

        {/* 最新文章 */}
        <section className="py-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">最新文章</h2>
            <Link
              href="/blog"
              className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              全部 {posts.length} 篇 →
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            {recentPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex items-center justify-between gap-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-5 py-4 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
              >
                <div className="min-w-0">
                  <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-50 group-hover:underline underline-offset-2 truncate">
                    {post.title}
                  </h3>
                  <p className="text-xs text-zinc-400 dark:text-zinc-600 mt-0.5 truncate">
                    {post.summary}
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs text-zinc-400 dark:text-zinc-600 hidden sm:block">
                    {post.date}
                  </span>
                  <span className="text-zinc-300 dark:text-zinc-700 group-hover:text-zinc-500 transition-colors">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 关于区块 */}
        <section className="py-16 border-t border-zinc-100 dark:border-zinc-800">
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50 mb-1">
                这个博客用 Next.js 构建
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                App Router · Server Components · Tailwind CSS
              </p>
            </div>
            <Link
              href="/about"
              className="shrink-0 inline-flex items-center h-9 px-4 rounded-lg border border-zinc-200 dark:border-zinc-800 text-sm text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
            >
              了解 Next.js →
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-4xl mx-auto px-6 py-8 flex items-center justify-between text-sm text-zinc-400 dark:text-zinc-600">
          <span>我的博客</span>
          <div className="flex items-center gap-4">
            <Link href="/blog" className="hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors">博客</Link>
            <Link href="/about" className="hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors">关于 Next.js</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
