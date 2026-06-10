import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Next.js",
  description: "了解 Next.js 的核心概念与特性",
};

const features = [
  {
    icon: "⚡",
    title: "文件系统路由",
    description:
      "通过 app 目录下的文件夹和文件自动生成路由，无需手动配置。创建 app/about/page.tsx 即可访问 /about 路径。",
  },
  {
    icon: "🖥️",
    title: "服务端组件",
    description:
      "默认情况下，所有页面和布局都是 Server Components，可在服务端获取数据、使用密钥，并减少发送至浏览器的 JavaScript 体积。",
  },
  {
    icon: "🧩",
    title: "客户端组件",
    description:
      '需要交互性时，使用 "use client" 指令声明客户端组件，支持 useState、useEffect 及浏览器 API。',
  },
  {
    icon: "🏗️",
    title: "布局系统",
    description:
      "layout.tsx 在页面间共享 UI，导航时保持状态不重新渲染。支持嵌套布局，轻松构建复杂页面结构。",
  },
  {
    icon: "🚀",
    title: "内置优化",
    description:
      "自动优化图片（next/image）、字体（next/font）和脚本加载，提升 Core Web Vitals 性能指标。",
  },
  {
    icon: "🔄",
    title: "数据获取与缓存",
    description:
      "在 Server Components 中直接使用 async/await 获取数据，内置请求记忆化与增量静态再生成（ISR）。",
  },
];

const routers = [
  {
    name: "App Router",
    badge: "推荐",
    badgeColor: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400",
    description: "基于 React Server Components 的新一代路由，支持流式渲染和嵌套布局。",
    items: ["Server & Client Components", "嵌套布局", "流式渲染 (Streaming)", "Route Handlers"],
  },
  {
    name: "Pages Router",
    badge: "稳定",
    badgeColor: "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400",
    description: "原有的经典路由方案，成熟稳定，持续维护与优化。",
    items: ["getServerSideProps", "getStaticProps", "API Routes", "中间件支持"],
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans">
      {/* 顶部导航 */}
      <nav className="sticky top-0 z-10 border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
            ← 返回首页
          </Link>
          <span className="text-sm font-medium text-zinc-400 dark:text-zinc-500">Next.js 简介</span>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-16">
        {/* Hero */}
        <section className="mb-20 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 text-xs font-medium mb-6">
            React 全栈框架
          </div>
          <h1 className="text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-6">
            什么是 Next.js？
          </h1>
          <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Next.js 是一个用于构建全栈 Web 应用的 React 框架。你用 React 组件构建界面，
            Next.js 负责额外的功能与性能优化——包括打包、编译等底层配置，让你专注于产品本身。
          </p>
        </section>

        {/* 核心特性 */}
        <section className="mb-20">
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 mb-8">
            核心特性
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
              >
                <span className="text-2xl mb-3 block">{feature.icon}</span>
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 两种路由 */}
        <section className="mb-20">
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 mb-3">
            两种路由方案
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 mb-8">
            Next.js 提供 App Router 和 Pages Router 两套路由，可在同一项目中共存。
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {routers.map((router) => (
              <div
                key={router.name}
                className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6"
              >
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">{router.name}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${router.badgeColor}`}>
                    {router.badge}
                  </span>
                </div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4 leading-relaxed">
                  {router.description}
                </p>
                <ul className="space-y-1.5">
                  {router.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                      <span className="w-1 h-1 rounded-full bg-zinc-400 dark:bg-zinc-600 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* 代码示例 */}
        <section className="mb-20">
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 mb-3">
            快速上手
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 mb-6">
            在 <code className="text-sm font-mono bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">app</code> 目录下新建文件夹和 <code className="text-sm font-mono bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">page.tsx</code>，路由即自动生效。
          </p>
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 bg-zinc-100 dark:bg-zinc-800/60 border-b border-zinc-200 dark:border-zinc-700">
              <span className="w-3 h-3 rounded-full bg-red-400" />
              <span className="w-3 h-3 rounded-full bg-yellow-400" />
              <span className="w-3 h-3 rounded-full bg-green-400" />
              <span className="ml-2 text-xs text-zinc-500 font-mono">app/about/page.tsx</span>
            </div>
            <pre className="p-6 text-sm font-mono leading-relaxed text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-900 overflow-x-auto">
              <code>{`import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About",
}

// 默认是 Server Component，可直接 async/await
export default async function AboutPage() {
  // 可在服务端直接获取数据
  const data = await fetch("https://api.example.com/data")
  const json = await data.json()

  return (
    <main>
      <h1>About</h1>
      <p>{json.message}</p>
    </main>
  )
}`}</code>
            </pre>
          </div>
        </section>

        {/* 前置知识 */}
        <section className="mb-20">
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 mb-6">
            建议前置知识
          </h2>
          <div className="flex flex-wrap gap-3">
            {["HTML", "CSS", "JavaScript", "React"].map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm text-zinc-700 dark:text-zinc-300 font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* 链接 */}
        <section>
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 mb-6">
            继续学习
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: "官方文档", href: "https://nextjs.org/docs", desc: "完整 API 与指南" },
              { label: "交互式教程", href: "https://nextjs.org/learn", desc: "边做边学" },
              { label: "模板库", href: "https://vercel.com/templates?framework=next.js", desc: "快速启动项目" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-1 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
              >
                <span className="font-medium text-zinc-900 dark:text-zinc-50 group-hover:underline">
                  {link.label} ↗
                </span>
                <span className="text-sm text-zinc-500 dark:text-zinc-400">{link.desc}</span>
              </a>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-200 dark:border-zinc-800 mt-16">
        <div className="max-w-4xl mx-auto px-6 py-8 text-center text-sm text-zinc-400 dark:text-zinc-600">
          基于 Next.js App Router · 当前页面为 Server Component
        </div>
      </footer>
    </div>
  );
}
