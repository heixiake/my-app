// Server Component — 无需 "use client"
import Link from "next/link";
import type { Post } from "../blog/data";

const tagColors: Record<string, string> = {
  React: "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-400",
  "Next.js": "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-400",
  性能: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400",
  CSS: "bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-400",
  TypeScript: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400",
};

type Props = {
  post: Post;
  index: number;
};

export default function PostCard({ post, index }: Props) {
  return (
    <Link
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
        <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-1">{post.summary}</p>
      </div>

      <div className="flex sm:flex-col items-center sm:items-end gap-3 sm:gap-1 shrink-0">
        <span className="text-xs text-zinc-400 dark:text-zinc-600">{post.date}</span>
        <span className="text-xs text-zinc-400 dark:text-zinc-600">{post.readingTime}</span>
      </div>
    </Link>
  );
}
