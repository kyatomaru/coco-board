"use client"

import * as React from 'react';
import AppDetailPage from '@/components/routes/welcome/AppDetailPage';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-white">
      <AppDetailPage />
    </main >
  )
}
