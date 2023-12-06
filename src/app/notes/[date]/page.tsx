"use client"

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation'
import { useGetDateGame } from '@/hooks/game/useGetGame';
import { useGetDatePractice } from '@/hooks/practice/useGetPractice';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TitleBox from "@/components/TitleBox";
import DateBox from "@/components/notepage/DateBox"
import MenuSelectBox from "@/components/notepage/MenuSelectBox"
import GameContentsBox from '@/components/notepage/GameContentsBox';
import PracticeContentsBox from '@/components/notepage/PracticeContentsBox';



export default function Home() {
  const params = useParams()
  // const [contents, setContents] = React.useState<string | null>(null);
  const [menu, setMenu] = React.useState(0);

  const gameContents = useGetDateGame()
  const practiceContents = useGetDatePractice()

  const handleMenuChange = (newValue) => {
    setMenu(newValue);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Header />
      <TitleBox title="View Page" />
      <DateBox date={String(params.date)} />
      <MenuSelectBox menu={menu} handleMenuChange={handleMenuChange} />
      {menu == 0
        ? <GameContentsBox contents={gameContents} />
        : <PracticeContentsBox contents={practiceContents} />
      }
      <Footer />
    </main>
  )
}
