"use client"

import * as React from 'react';
import { useRouter } from 'next/navigation'
import type { User } from 'firebase/auth';
import { auth } from '@/app/firebase';
import { onAuthStateChanged, getAuth } from "firebase/auth"
import LoadingPage from '@/components/AuthLoadingPage';
import LoginPage from '@/features/routes/accounts/login/LoginPageGoogle';
import DefaultBrowserModal from '@/features/common/auth/DefaultBrowserModal';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import InfoFooter from '@/components/InfoFooter';

export default function Home() {
  const router = useRouter()
  const [user, setUser] = React.useState<User | undefined>(null);

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
        router.replace('/home')
      }
    })
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-white">
      {user != undefined ?
        <LoadingPage />
        :
        <LoginPage />
      }
      <Box sx={{ width: "100%" }}>
        <Divider />
        <InfoFooter />
      </Box>
    </main>
  )
}
