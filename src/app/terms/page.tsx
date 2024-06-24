"use client"

import * as React from 'react';
import TermsPage from '@/components/docs/terms/TermsPage';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-white">
      <TermsPage />
    </main >
  )
}
