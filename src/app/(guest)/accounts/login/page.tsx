"use client"

import * as React from 'react';
import { useRouter } from 'next/navigation'
import type { User } from 'firebase/auth';
import { auth } from '@/app/firebase';
import { onAuthStateChanged, getAuth } from "firebase/auth"
import LoadingPage from '@/components/AuthLoadingPage';
import LoginPage from '@/features/routes/accounts/login/LoginPage';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import InfoFooter from '@/components/InfoFooter';
import { useAuth } from '@/context/auth/AuthContext';

export default function Home() {
  const router = useRouter()
  const { user, isLoading } = useAuth()

  React.useEffect(() => {
    if (user) {
      router.replace('/note')
    }
  }, [user])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-white">
      {user != undefined ?
        <LoadingPage />
        :
        <LoginPage />
      }
      <Box sx={{ width: "100%", position: "fixed", bottom: 0 }}>
        <Divider />
        <InfoFooter />
      </Box>
    </main>
  )
}
