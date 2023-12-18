"use client"

import TitleBox from "@/components/TitleBox";
import LoginBox from "@/components/auths/LoginBox";
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  router.replace('/notes/' + (dayjs(String(new Date())).format('YYYY-MM-DD')));

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <TitleBox title="Login Page" />
    </main>
  )
}
