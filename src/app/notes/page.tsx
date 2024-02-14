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
// import ProblemContentsBox from '@/components/notepage/contents/ProblemContentsBox';
import ProblemContentsBox from '@/components/problem/ProblemContentsBox';
import GameContentsBox from '@/components/notepage/contents/GameContentsBox';
import PracticeContentsBox from '@/components/notepage/contents/PracticeContentsBox';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import NoteContentsBox from '@/components/notepage/contents/NoteContentsBox';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CreateForm from '@/components/form/NoteCreateForm';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import HomeContentsBox from '@/components/homepage/HomeContentsBox';
import { useGetAllProblem } from '@/hooks/problem/useGetProblem';


export default function Home() {
  const params = useParams()
  const router = useRouter()
  // const [contents, setContents] = React.useState<string | null>(null);
  const [menu, setMenu] = React.useState(0);


  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setMenu(newValue);
  };

  const handleMenuChange = (newValue) => {
    setMenu(newValue);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between, bg-white">
      <Header />

      <Container maxWidth="sm" sx={{ my: "65px", px: 0, position: "relative" }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', width: "100%" }}>
          <Tabs value={menu} onChange={handleChange} centered>
            <Tab label="記録" sx={{ width: "100px", m: "auto" }} />
            <Tab label="課題" sx={{ width: "100px", m: "auto" }} />
          </Tabs>
        </Box>

        <Box sx={{ position: 'fixed', right: 0, left: 0, height: "-webkit-fill-available" }} >
          <Container maxWidth="sm" sx={{ my: 0, height: "100%", px: 0, position: "relative" }}>
            <Fab sx={{ position: "absolute", right: 30, bottom: 80, backgroundColor: "#1976d2 !important" }} color="primary" aria-label="add"
              onClick={(event) => {
                if (menu == 0)
                  router.push("/notes/create")
                else if (menu == 1)
                  router.push("/problem/create")
              }
              }>
              <AddIcon />
            </Fab>
          </Container>
        </Box>
        {menu == 0 &&
          <NoteContentsBox />

        }
        {menu == 1 &&
          < ProblemContentsBox />

        }
      </Container>

      < Footer />
    </main >
  )
}
