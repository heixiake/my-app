import type { Metadata } from "next";
import Link from "next/link";
import PostCard from "../components/PostCard";
import { getPosts } from "./lib/getPosts";

export const metadata: Metadata = {
  title: "博客",
  description: "前端技术文章，关于 React、Next.js、CSS 和 TypeScript。",
};

// async Server Component：在服务端等待数据，再渲染 HTML
export default async function BlogPage() {
  const posts = await getPosts();

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
            <PostCard key={post.slug} post={post} index={index} />
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
