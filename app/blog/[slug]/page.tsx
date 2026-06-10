import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, posts } from "../data";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "文章不存在" };
  return {
    title: post.title,
    description: post.summary,
  };
}

const tagColors: Record<string, string> = {
  React: "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-400",
  "Next.js": "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-400",
  性能: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400",
  CSS: "bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-400",
  TypeScript: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400",
};

function renderContent(content: string) {
  const lines = content.trim().split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // 代码块
    if (line.startsWith("```")) {
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      elements.push(
        <pre
          key={i}
          className="my-5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/60 overflow-x-auto"
        >
          <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-zinc-200 dark:border-zinc-700">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
          </div>
          <code className="block p-5 text-sm font-mono leading-relaxed text-zinc-700 dark:text-zinc-300">
            {codeLines.join("\n")}
          </code>
        </pre>
      );
      i++;
      continue;
    }

    // 表格
    if (line.startsWith("|")) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].startsWith("|")) {
        tableLines.push(lines[i]);
        i++;
      }
      const [header, , ...rows] = tableLines;
      const headers = header.split("|").filter(Boolean).map((h) => h.trim());
      elements.push(
        <div key={i} className="my-5 overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-sm">
            <thead className="bg-zinc-50 dark:bg-zinc-800/60">
              <tr>
                {headers.map((h) => (
                  <th key={h} className="px-4 py-3 text-left font-medium text-zinc-700 dark:text-zinc-300">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <tr key={ri} className="border-t border-zinc-100 dark:border-zinc-800">
                  {row
                    .split("|")
                    .filter(Boolean)
                    .map((cell) => cell.trim())
                    .map((cell, ci) => (
                      <td key={ci} className="px-4 py-3 text-zinc-600 dark:text-zinc-400">
                        {cell}
                      </td>
                    ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    // H2
    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={i} className="mt-10 mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-50 scroll-mt-20">
          {line.slice(3)}
        </h2>
      );
      i++;
      continue;
    }

    // H3
    if (line.startsWith("### ")) {
      elements.push(
        <h3 key={i} className="mt-7 mb-3 text-base font-semibold text-zinc-800 dark:text-zinc-200">
          {line.slice(4)}
        </h3>
      );
      i++;
      continue;
    }

    // 列表项
    if (line.startsWith("- ")) {
      const listItems: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        listItems.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <ul key={i} className="my-4 space-y-2 pl-1">
          {listItems.map((item, li) => (
            <li key={li} className="flex gap-2 text-zinc-600 dark:text-zinc-400">
              <span className="mt-2 w-1 h-1 rounded-full bg-zinc-400 dark:bg-zinc-600 shrink-0" />
              <span dangerouslySetInnerHTML={{ __html: inlineFormat(item) }} />
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // 空行
    if (line.trim() === "") {
      i++;
      continue;
    }

    // 普通段落
    elements.push(
      <p
        key={i}
        className="my-4 leading-8 text-zinc-600 dark:text-zinc-400"
        dangerouslySetInnerHTML={{ __html: inlineFormat(line) }}
      />
    );
    i++;
  }

  return elements;
}

function inlineFormat(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-zinc-800 dark:text-zinc-200">$1</strong>')
    .replace(/`(.+?)`/g, '<code class="px-1.5 py-0.5 rounded text-sm font-mono bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">$1</code>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-zinc-900 dark:text-zinc-100 underline underline-offset-2">$1</a>');
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) notFound();

  const currentIndex = posts.findIndex((p) => p.slug === slug);
  const prev = posts[currentIndex - 1];
  const next = posts[currentIndex + 1];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans">
      <nav className="sticky top-0 z-10 border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link
            href="/blog"
            className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            ← 返回博客
          </Link>
          <span className="text-sm font-medium text-zinc-400 dark:text-zinc-500">博客</span>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-16">
        {/* 文章头部 */}
        <header className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span
              className={`text-xs px-2.5 py-1 rounded-full font-medium ${tagColors[post.tag] ?? "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"}`}
            >
              {post.tag}
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-4 leading-tight">
            {post.title}
          </h1>
          <p className="text-lg text-zinc-500 dark:text-zinc-400 mb-6 leading-relaxed">
            {post.summary}
          </p>
          <div className="flex items-center gap-4 text-sm text-zinc-400 dark:text-zinc-600 pt-6 border-t border-zinc-100 dark:border-zinc-800">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center text-xs font-medium text-zinc-600 dark:text-zinc-400">
                {post.author[0]}
              </div>
              <span>{post.author}</span>
            </div>
            <span>·</span>
            <span>{post.date}</span>
            <span>·</span>
            <span>{post.readingTime}阅读</span>
          </div>
        </header>

        {/* 文章内容 */}
        <article className="min-w-0">
          {renderContent(post.content)}
        </article>

        {/* 上/下篇导航 */}
        <nav className="mt-16 pt-8 border-t border-zinc-100 dark:border-zinc-800 grid grid-cols-2 gap-4">
          <div>
            {prev && (
              <Link
                href={`/blog/${prev.slug}`}
                className="group flex flex-col gap-1 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
              >
                <span className="text-xs text-zinc-400 dark:text-zinc-600">← 上一篇</span>
                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300 group-hover:underline underline-offset-2 line-clamp-1">
                  {prev.title}
                </span>
              </Link>
            )}
          </div>
          <div>
            {next && (
              <Link
                href={`/blog/${next.slug}`}
                className="group flex flex-col gap-1 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors text-right"
              >
                <span className="text-xs text-zinc-400 dark:text-zinc-600">下一篇 →</span>
                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300 group-hover:underline underline-offset-2 line-clamp-1">
                  {next.title}
                </span>
              </Link>
            )}
          </div>
        </nav>
      </main>

      <footer className="border-t border-zinc-200 dark:border-zinc-800 mt-8">
        <div className="max-w-3xl mx-auto px-6 py-8 text-center text-sm text-zinc-400 dark:text-zinc-600">
          <Link href="/blog" className="hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors">
            查看所有文章
          </Link>
        </div>
      </footer>
    </div>
  );
}
