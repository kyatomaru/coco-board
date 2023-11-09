"use client"

import { useParams } from 'next/navigation'
import LoginBox from "@/components/Auth/LoginBox";

export default function Home() {
  const params = useParams()
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div>
        <LoginBox />
        {params.date}
      </div>
    </main>
  )
}
