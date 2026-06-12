export type Post = {
  slug: string;
  title: string;
  summary: string;
  author: string;
  date: string;
  readingTime: string;
  tag: string;
  cover: string;
  content: string;
};

export const posts: Post[] = [
  {
    slug: "how-to-learn-react",
    title: "如何系统学习 React",
    summary: "从零到熟练，梳理 React 学习路径与高质量资源推荐，帮你少走弯路。",
    author: "小明",
    date: "2024-06-01",
    readingTime: "8 分钟",
    tag: "React",
    cover: "https://picsum.photos/seed/react/640/360",
    content: `
React 是目前最流行的前端 UI 库之一，学习曲线适中，生态极为丰富。本文将梳理一条清晰的学习路径。

## 第一步：掌握 JavaScript 基础

在学 React 之前，你需要熟悉现代 JavaScript（ES6+）的核心特性：

- **箭头函数**：\`const fn = () => {}\`
- **解构赋值**：\`const { a, b } = obj\`
- **展开运算符**：\`const arr2 = [...arr1]\`
- **模块系统**：\`import / export\`
- **Promise 与 async/await**

这些是 React 代码中无处不在的写法，不熟悉的话会很痛苦。

## 第二步：理解核心概念

React 的核心就三个概念：

1. **组件（Component）**：UI 的基本单元，本质是一个返回 JSX 的函数。
2. **Props**：父组件向子组件传递数据的方式，单向数据流。
3. **State**：组件内部的可变状态，通过 \`useState\` 管理，状态变化触发重新渲染。

\`\`\`tsx
function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(count + 1)}>
      点击次数：{count}
    </button>
  );
}
\`\`\`

## 第三步：学会常用 Hooks

Hooks 是 React 16.8 引入的革命性 API，核心 Hooks 包括：

- \`useState\`：管理本地状态
- \`useEffect\`：处理副作用（数据获取、订阅等）
- \`useContext\`：消费 Context
- \`useRef\`：获取 DOM 引用或存储不触发渲染的值
- \`useMemo / useCallback\`：性能优化

## 第四步：推荐资源

- [React 官方文档](https://react.dev) —— 全面重写，有大量交互练习
- [Kent C. Dodds 的博客](https://kentcdodds.com) —— 深度文章
- [Epic React](https://epicreact.dev) —— 付费但质量极高

掌握以上内容后，就可以开始学习 Next.js 了。
    `,
  },
  {
    slug: "nextjs-practical-notes",
    title: "Next.js 实战笔记",
    summary: "分享在真实项目中使用 Next.js App Router 踩过的坑和解决方案。",
    author: "小红",
    date: "2024-06-02",
    readingTime: "10 分钟",
    tag: "Next.js",
    cover: "https://picsum.photos/seed/nextjs/640/360",
    content: `
从 Pages Router 迁移到 App Router 的过程中，踩了不少坑，在此记录。

## 坑一：默认是 Server Component

App Router 中，所有组件默认是 Server Component。如果你在里面用了 \`useState\`、\`useEffect\` 或任何事件处理，会直接报错。

**解决方案**：在文件顶部加 \`"use client"\`：

\`\`\`tsx
"use client";

import { useState } from "react";

export default function Toggle() {
  const [on, setOn] = useState(false);
  return <button onClick={() => setOn(!on)}>{on ? "开" : "关"}</button>;
}
\`\`\`

## 坑二：layout.tsx 不会重新渲染

layout 在路由切换时**不会重新渲染**，这是设计行为（性能优化）。如果你的 layout 里有依赖当前路由变化的逻辑，需要改到 Client Component 里使用 \`usePathname()\`。

## 坑三：async params

在新版 Next.js 中，\`params\` 是一个 Promise，需要 await：

\`\`\`tsx
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  // ...
}
\`\`\`

如果你直接解构 \`params\`，TypeScript 会报错，运行时也可能出问题。

## 坑四：fetch 缓存行为变了

Next.js 15 中，\`fetch\` 默认**不再缓存**（之前默认缓存）。如果想缓存，需要显式指定：

\`\`\`ts
fetch(url, { cache: "force-cache" });
// 或使用 unstable_cache
import { unstable_cache } from "next/cache";
\`\`\`

总体来说，App Router 的心智模型更清晰，适应之后开发体验很好。
    `,
  },
  {
    slug: "frontend-performance-tips",
    title: "前端性能优化技巧",
    summary: "介绍几个立竿见影的前端性能优化手段，从加载到交互全面提速。",
    author: "老王",
    date: "2024-06-03",
    readingTime: "12 分钟",
    tag: "性能",
    cover: "https://picsum.photos/seed/perf/640/360",
    content: `
性能优化是前端开发中永恒的话题。本文介绍几个最常见也最有效的优化手段。

## 1. 减少 JavaScript Bundle 体积

Bundle 体积是影响首屏加载最直接的因素。

**代码分割（Code Splitting）**：用动态 import 按需加载模块：

\`\`\`ts
const HeavyComponent = dynamic(() => import("./HeavyComponent"), {
  loading: () => <Skeleton />,
});
\`\`\`

**Tree Shaking**：只引入你实际用到的函数：

\`\`\`ts
// 坏：引入整个库
import _ from "lodash";
// 好：只引入需要的函数
import debounce from "lodash/debounce";
\`\`\`

## 2. 图片优化

图片通常是页面中体积最大的资源。

- 使用现代格式：**WebP / AVIF** 比 JPEG/PNG 小 30%~80%
- 设置正确的尺寸，避免下载超大图片再缩放
- 对首屏以外的图片使用懒加载：\`loading="lazy"\`
- 在 Next.js 中，直接用 \`<Image />\` 组件，它自动处理以上所有优化

## 3. 减少重渲染

在 React 中，不必要的重渲染会拖慢交互响应速度：

- \`React.memo\`：包裹纯展示组件，props 不变则不重渲染
- \`useMemo\`：缓存昂贵计算结果
- \`useCallback\`：缓存函数引用，避免子组件不必要更新

## 4. 使用 Web Vitals 衡量

优化前后一定要用数据说话：

- **LCP**（Largest Contentful Paint）：< 2.5s 为良好
- **FID/INP**（交互延迟）：< 200ms
- **CLS**（累积布局偏移）：< 0.1

使用 Chrome DevTools 的 Performance 面板或 [PageSpeed Insights](https://pagespeed.web.dev) 测量。
    `,
  },
  {
    slug: "css-grid-layout",
    title: "CSS Grid 布局深度解析",
    summary: "从基础到进阶，彻底搞懂 CSS Grid，附实际案例演示。",
    author: "阿强",
    date: "2024-06-04",
    readingTime: "9 分钟",
    tag: "CSS",
    cover: "https://picsum.photos/seed/cssgrid/640/360",
    content: `
CSS Grid 是目前最强大的二维布局方案，配合 Flexbox 可以应对几乎所有布局需求。

## 核心概念

**Grid Container** 和 **Grid Items**：

\`\`\`css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 列，等宽 */
  grid-template-rows: auto;
  gap: 16px;
}
\`\`\`

**fr 单位**：Fraction，按比例分配剩余空间：

\`\`\`css
/* 左边 1/4，右边 3/4 */
grid-template-columns: 1fr 3fr;
\`\`\`

## 常用技巧

**自动填充列数（响应式）**：

\`\`\`css
grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
\`\`\`

这一行代码就能实现响应式卡片网格，无需媒体查询！

**跨越多列/行**：

\`\`\`css
.featured {
  grid-column: span 2; /* 横跨 2 列 */
  grid-row: span 2;    /* 纵跨 2 行 */
}
\`\`\`

**命名区域（超直观）**：

\`\`\`css
.layout {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
\`\`\`

## Grid vs Flexbox

| 场景 | 推荐 |
|---|---|
| 一维排列（行或列） | Flexbox |
| 二维布局（行且列） | Grid |
| 卡片等高 | Flexbox |
| 整体页面布局 | Grid |

两者不是竞争关系，而是互补的。
    `,
  },
  {
    slug: "typescript-type-gymnastics",
    title: "TypeScript 类型体操入门",
    summary: "从条件类型到 infer，带你玩转 TypeScript 高级类型，让类型更智能。",
    author: "小美",
    date: "2024-06-05",
    readingTime: "15 分钟",
    tag: "TypeScript",
    cover: "https://picsum.photos/seed/typescript/640/360",
    content: `
TypeScript 的类型系统是图灵完备的，这意味着你可以用类型来"编程"。本文带你入门高级类型。

## 条件类型

类型版的三元运算符：

\`\`\`ts
type IsString<T> = T extends string ? true : false;

type A = IsString<"hello">; // true
type B = IsString<42>;      // false
\`\`\`

## infer：从类型中提取信息

\`infer\` 用于在条件类型中"捕获"某个类型：

\`\`\`ts
// 提取函数返回值类型
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

type Fn = () => string;
type R = ReturnType<Fn>; // string
\`\`\`

## 映射类型

对对象类型的每个属性做变换：

\`\`\`ts
// 让所有属性变为可选
type Partial<T> = {
  [K in keyof T]?: T[K];
};

// 让所有属性变为只读
type Readonly<T> = {
  readonly [K in keyof T]: T[K];
};
\`\`\`

## 实用工具类型速查

| 工具类型 | 作用 |
|---|---|
| \`Partial<T>\` | 所有属性可选 |
| \`Required<T>\` | 所有属性必填 |
| \`Readonly<T>\` | 所有属性只读 |
| \`Pick<T, K>\` | 挑选指定属性 |
| \`Omit<T, K>\` | 排除指定属性 |
| \`Record<K, V>\` | 构造对象类型 |
| \`Exclude<T, U>\` | 从联合类型排除 |
| \`Extract<T, U>\` | 从联合类型提取 |

## 练习推荐

[Type Challenges](https://github.com/type-challenges/type-challenges) 是最好的类型体操练习题库，从 Easy 到 Extreme，循序渐进，强烈推荐。
    `,
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
