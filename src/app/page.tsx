"use client"

import TitleBox from "@/components/TitleBox";
import LoginBox from "@/components/auth/LoginBox";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <TitleBox title="Login Page" />
      <LoginBox />
    </main>
  )
}
