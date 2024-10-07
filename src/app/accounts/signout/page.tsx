"use client"

import * as React from 'react';
import { useRouter } from 'next/navigation'
import type { User } from 'firebase/auth';
import { auth } from '@/app/firebase';
import { onAuthStateChanged, getAuth } from "firebase/auth"
import SignOutPage from '@/features/routes/accounts/signout/SignOutPage';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import InfoFooter from '@/components/common/InfoFooter';


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-white">
      <SignOutPage />
      <Box sx={{ width: "100%", position: "fixed", bottom: 0 }}>
        <Divider />
        <InfoFooter />
      </Box>
    </main >
  )
}
