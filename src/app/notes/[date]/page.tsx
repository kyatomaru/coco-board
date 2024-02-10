"use client"

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation'
import { useGetProblem } from '@/hooks/problem/useGetProblem';
import { useGetDateGame } from '@/hooks/game/useGetGame';
import { useGetDatePractice } from '@/hooks/practice/useGetPractice';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TitleBox from "@/components/TitleBox";
import DateBox from "@/components/form/DateBox"
import MenuSelectBox from "@/components/notepage/MenuSelectBox"
import ProblemContentsBox from '@/components/notepage/contents/ProblemContentsBox';
import GameContentsBox from '@/components/notepage/contents/GameContentsBox';
import PracticeContentsBox from '@/components/notepage/contents/PracticeContentsBox';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';


export default function Home() {
  const params = useParams()
  // const [contents, setContents] = React.useState<string | null>(null);
  const [menu, setMenu] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState<boolean>(true)

  const gameContents = useGetDateGame(setIsLoading)
  const practiceContents = useGetDatePractice(setIsLoading)
  const problemContents = useGetProblem(gameContents, practiceContents)


  const handleMenuChange = (newValue) => {
    setMenu(newValue);
  };

  console.log(gameContents)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-white">
      <Header />
      {isLoading ?
        <Container fixed sx={{ width: "100vh", height: "100vh", position: "relative", textAlign: "center" }} >
          <CircularProgress sx={{ position: "absolute", top: "50%", bottom: "50%", my: "auto" }} />
        </Container>
        :
        <Container sx={{ my: "70px" }}>
          <Stack direction="row" sx={{ p: 1, justifyContent: "center", alignItems: "center" }}>
            <DateBox date={String(params.date)} />
            <MenuSelectBox menu={menu} handleMenuChange={handleMenuChange} />
          </Stack>
          <Container maxWidth="sm" sx={{ mb: "80px" }}>

            {/* {menu == 0 &&
              // <></>
              <ProblemContentsBox contents={problemContents} />
            } */}
            {menu == 1 &&
              <GameContentsBox contents={gameContents} />
            }
            {menu == 2 &&
              <PracticeContentsBox contents={practiceContents} />
            }
          </Container>
        </Container>
      }
      <Footer />
    </main>
  )
}
