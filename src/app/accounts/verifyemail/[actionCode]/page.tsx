"use client"

import * as React from 'react';
import { useRouter } from 'next/navigation'
import type { User } from 'firebase/auth';
import { auth } from '@/app/firebase';
import { onAuthStateChanged, getAuth } from "firebase/auth"
import VerifyemailPage from '@/features/routes/accounts/verifyemail/VerifyemailPage';

export default function Home() {
  const router = useRouter()
  const [user, setUser] = React.useState<User | undefined>(null);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-white">
      <VerifyemailPage />
    </main >
  )
}
