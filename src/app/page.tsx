"use client"

import * as React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-white">
      <Header />

      {/* <HomeContentsBox></HomeContentsBox> */}
      <Footer />
    </main>
  )
}
