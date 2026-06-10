import React from "react";

// 假设有5篇博客数据
const blogs = [
  {
    id: 1,
    title: "如何学习React",
    summary: "本文将带你了解React的学习路径和资源推荐。",
    author: "小明",
    date: "2024-06-01",
  },
  {
    id: 2,
    title: "Next.js实战笔记",
    summary: "分享在使用Next.js过程中遇到的问题与解决办法。",
    author: "小红",
    date: "2024-06-02",
  },
  {
    id: 3,
    title: "前端性能优化技巧",
    summary: "介绍几个常见且有效的前端性能优化方法。",
    author: "老王",
    date: "2024-06-03",
  },
  {
    id: 4,
    title: "CSS中的Grid布局",
    summary: "深入讲解CSS Grid布局的用法和实践案例。",
    author: "阿强",
    date: "2024-06-04",
  },
  {
    id: 5,
    title: "TypeScript类型体操",
    summary: "尝试分析和实现一些有趣的TypeScript类型题目。",
    author: "小美",
    date: "2024-06-05",
  },
];

export default function BlogPage() {
  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">博客列表</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition duration-200 bg-white"
          >
            <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
            <p className="text-gray-600 mb-4">{blog.summary}</p>
            <div className="text-sm text-gray-400">
              作者：{blog.author} | 日期：{blog.date}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}