"use client"

import * as React from 'react';
import WelcomePage from '@/components/routes/welcome/WelcomePage';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-white">
      <WelcomePage />
    </main >
  )
}
