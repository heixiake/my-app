import { posts, type Post } from "../data";

/**
 * 模拟服务端数据获取。
 * 实际项目中可替换为 fetch('/api/posts')、数据库查询等。
 */
export async function getPosts(): Promise<Post[]> {
  // 模拟网络/数据库延迟
  await new Promise((resolve) => setTimeout(resolve, 600));
  return posts;
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return posts.find((p) => p.slug === slug);
}
