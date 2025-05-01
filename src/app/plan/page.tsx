"use client"

import * as React from 'react';
import { useRouter, useParams } from 'next/navigation'
import LoadingPage from '@/components/LoadingPage';
import { useIsAuth } from '@/hooks/auth/useIsAuth';
import PlanPage from '@/features/routes/plan/PlanPage';
import { useGetUser } from '@/hooks/auth/useGetUser';
import CurrentPlanPage from '@/features/routes/plan/current/CurrentPlanPage';
export default function Home() {
  const router = useRouter()
  const [user, setUser, isSubscriptionValid, isLoading] = useGetUser()

  useIsAuth(router)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-white" >
      {isLoading ? 
      <LoadingPage /> :( 
        !isSubscriptionValid ?
        <PlanPage user={user} backPage={() => router.push('/setting')} />
        :
        <CurrentPlanPage user={user} />
      )
      }
    </main >
  )
}
