'use client'

import { useEffect, useState } from 'react'

export default function HelloPage() {
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/hello')
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch(() => setError('请求失败'))
  }, [])

  return (
    <main className="flex min-h-screen items-center justify-center">
      <p className="text-2xl font-semibold">
        {error ?? message ?? '加载中...'}
      </p>
    </main>
  )
}
