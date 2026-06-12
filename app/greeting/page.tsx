'use client'

import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function GreetingPage() {
  const { data, error, isLoading } = useSWR<{ greeting: string }>(
    '/api/greeting',
    fetcher
  )

  return (
    <main className="flex min-h-screen items-center justify-center">
      <p className="text-2xl font-semibold">
        {isLoading && '加载中...'}
        {error && '请求失败'}
        {data?.greeting}
      </p>
    </main>
  )
}
