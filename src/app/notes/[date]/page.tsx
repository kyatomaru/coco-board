"use client"

import { useParams } from 'next/navigation'

export default function Home() {
  const params = useParams()
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div>
        {params.date}
      </div>
    </main>
  )
}
