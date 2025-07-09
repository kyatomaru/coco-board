"use client"

import * as React from 'react';
import { useRouter } from 'next/navigation'
import type { User } from 'firebase/auth';
import LoadingPage from '@/components/AuthLoadingPage';

export default function Home() {
  const router = useRouter()
  const [user, setUser] = React.useState<User | undefined>(null);

  React.useEffect(() => {
    const getAccessToken = async () => {
      const searchParams = new URLSearchParams(window.location.search);
      const code = searchParams.get('code');

      // アクセストークン生成
      await fetch(
          '/api/auth/callback/line',
          {
              method: 'POST',
              body: code as string,
              headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
              }
          }
      )
    }
    getAccessToken()
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-white">
        <LoadingPage />
    </main>
  )
}
