"use client"

import * as React from 'react';
import { useRouter, useParams } from 'next/navigation'
import LoadingPage from '@/components/LoadingPage';

export default function Home() {
  const router = useRouter()

  React.useEffect(() => {
    router.push('/note')
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-white" style={{ overflow: "hidden", position: "relative" }}>
      <LoadingPage />
    </main >
  )
}
