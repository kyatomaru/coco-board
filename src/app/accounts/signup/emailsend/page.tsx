"use client"

import * as React from 'react';
import { useRouter } from 'next/navigation'
import type { User } from 'firebase/auth';
import { auth } from '@/app/firebase';
import { onAuthStateChanged, getAuth } from "firebase/auth"
import EmailsendPage from '@/features/routes/accounts/signup/emailsend/EmailsendPage';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-white">
      <EmailsendPage />
    </main >
  )
}
