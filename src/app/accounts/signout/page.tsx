"use client"

import * as React from 'react';
import { useRouter } from 'next/navigation'
import type { User } from 'firebase/auth';
import { auth } from '@/app/firebase';
import { onAuthStateChanged, getAuth } from "firebase/auth"
import SignOutPage from '@/features/routes/accounts/signout/SignOutPage';


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-white">
      <SignOutPage />
    </main >
  )
}
