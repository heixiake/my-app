// 下面的函数定义了一个名为 GET 的异步处理函数，通常用于处理 HTTP GET 请求。
// 当该接口被请求时，会返回一个 JSON 响应，内容是 { message: 'Hello, Next.js!' }
// 这种写法常见于 Next.js 的 API 路由（如 app/api/*/route.ts 文件）
export async function GET() {
  return Response.json({ message: 'Hello, Next.js!' })
}
