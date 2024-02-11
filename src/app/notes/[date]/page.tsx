"use client"

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation'
import { useGetProblem } from '@/hooks/problem/useGetProblem';
import { useGetAllGame } from '@/hooks/game/useGetGame';
import { useGetAllPractice } from '@/hooks/practice/useGetPractice';
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
import NoteContentsBox from '@/components/notepage/contents/NoteContentsBox';

const sortDateContents = (dateArray, contents, type) => {
  for (let index = 0; index < contents.length; index++) {
    let flag = false
    contents[index].type = type
    for (let index2 = 0; index2 < dateArray.length; index2++) {
      if (dateArray[index2].date === contents[index].date) {
        flag = true
        dateArray[index2].contents.push(contents[index])
        break
      }
    }
    if (!flag) {
      dateArray.push({ date: contents[index].date, contents: [contents[index]] })
    }
  }
  return dateArray
}

const sortContents = (gameContents, practiceContents) => {
  let dateArray = [{ date: null }]
  const contents = []
  if (gameContents[0] != null)
    dateArray = sortDateContents(dateArray, gameContents, "game")
  if (practiceContents[0] != null)
    dateArray = sortDateContents(dateArray, practiceContents, "practice")

  dateArray.splice(0, 1)
  return dateArray
}

export default function Home() {
  const params = useParams()
  // const [contents, setContents] = React.useState<string | null>(null);
  const [menu, setMenu] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState<boolean>(true)

  const gameContents = useGetAllGame(setIsLoading)
  const practiceContents = useGetAllPractice(setIsLoading)
  // const problemContents = useGetProblem(gameContents, practiceContents)

  // if (gameContents.length > 0 || practiceContents.length > 0) {
  //   sortContents(gameContents, practiceContents)
  // }
  const contents = sortContents(gameContents, practiceContents)

  const handleMenuChange = (newValue) => {
    setMenu(newValue);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-white">
      <Header />
      {isLoading ?
        <Container fixed sx={{ height: "100vh", position: "relative", textAlign: "center" }} >
          <CircularProgress sx={{ position: "absolute", top: "50%", bottom: "50%", my: "auto" }} />
        </Container>
        :
        <Container sx={{ my: "70px" }}>
          {/* <Stack direction="row" sx={{ p: 1, justifyContent: "center", alignItems: "center" }}>
            <DateBox date={String(params.date)} />
            <MenuSelectBox menu={menu} handleMenuChange={handleMenuChange} />
          </Stack> */}
          <Container maxWidth="sm" sx={{ mb: "80px" }}>
            <NoteContentsBox contents={contents} />
            {/* {menu == 0 &&
              // <></>
              <ProblemContentsBox contents={problemContents} />
            } */}
            {/* {menu == 1 &&
              <GameContentsBox contents={gameContents} />
            } */}
            {/* {menu == 2 &&
              <PracticeContentsBox contents={practiceContents} />
            } */}
          </Container>
        </Container>
      }
      <Footer />
    </main>
  )
}
