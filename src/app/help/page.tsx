"use client"

import * as React from 'react';
import HelpPage from '@/components/docs/help/HelpPage';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-white">
      <HelpPage />
    </main >
  )
}
