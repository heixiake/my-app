// Server Component — 无需 "use client"
import Link from "next/link";
import type { Post } from "../blog/data";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

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
    <Card className="gap-3 py-0 overflow-hidden hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
      <CardHeader className="pt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-medium ${tagColors[post.tag] ?? "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"}`}
            >
              {post.tag}
            </span>
            <span className="text-xs text-zinc-400 dark:text-zinc-600">
              {post.date} · {post.readingTime}
            </span>
          </div>
          <span className="hidden sm:flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-xs font-bold text-zinc-400 dark:text-zinc-500">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <CardTitle className="text-base text-zinc-900 dark:text-zinc-50 truncate">
          {post.title}
        </CardTitle>
        <CardDescription className="line-clamp-1">{post.summary}</CardDescription>
      </CardHeader>

      <CardContent className="pb-0" />

      <CardFooter className="pb-6 pt-0">
        <Button asChild variant="outline" size="sm">
          <Link href={`/blog/${post.slug}`}>阅读更多</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
