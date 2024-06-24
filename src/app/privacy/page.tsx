"use client"

import * as React from 'react';
import PrivacyPage from '@/components/docs/privacy/PrivacyPage';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-white">
      <PrivacyPage />
    </main >
  )
}
