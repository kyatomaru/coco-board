"use client"

import * as React from 'react';
import ContactPage from '@/components/docs/contact/ContactPage';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-white">
      <ContactPage />
    </main >
  )
}
