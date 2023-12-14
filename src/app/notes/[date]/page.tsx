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
import Container from '@mui/material/Container';



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
      <DateBox date={String(params.date)} />
      <MenuSelectBox menu={menu} handleMenuChange={handleMenuChange} />
      <Container fixed maxWidth="sm" sx={{ mb: "80px" }}>
        {menu == 0 &&
          <GameContentsBox contents={gameContents} />
        }
        {menu == 1 &&
          <GameContentsBox contents={gameContents} />
        }
        {menu == 2 &&
          <PracticeContentsBox contents={practiceContents} />
        }
      </Container>
      <Footer />
    </main>
  )
}
