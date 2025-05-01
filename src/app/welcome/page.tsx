"use client"

import * as React from 'react';
import { useRouter, useParams } from 'next/navigation'
import Footer from '@/components/Footer';
import LoginPage from '@/features/routes/accounts/login/LoginPage';
import { useGetUser } from '@/hooks/auth/useGetUser';
import InviteHomeScreenView from '@/features/routes/tutorial/InviteHomeScreenView';
import PlanPage from '@/features/routes/plan/PlanPage';


export default function Home() {
  const router = useRouter()

  const [user, setUser, isSubscriptionValid, isLoading] = useGetUser()
  const [tutorialStep, setTutorialStep] = React.useState(0);
  const [isNewUser, setIsNewUser] = React.useState(false);

  React.useEffect(() => {
    const isNewUser = localStorage.getItem('isNewUser') === "true"
    if (!isNewUser) {
      router.push('/note')
    }
    
  }, [tutorialStep])

  React.useEffect(() => {
    if (user) {
      setTutorialStep(1)
    }
  }, [user])


  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-white">
        {tutorialStep == 0 ? (
          <LoginPage />
        ) : tutorialStep == 1 ? (
          <InviteHomeScreenView tutorialStep={tutorialStep} setTutorialStep={setTutorialStep} />
        ) : (
          <PlanPage user={user} backPage={() => {
            localStorage.removeItem('isNewUser')
            router.push('/note')
          }} />
        )}
    </main >
  )
}
