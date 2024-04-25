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
// import ProblemContentsBox from '@/components/calendarpage/contents/ProblemContentsBox';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import NoteDateContentsBox from '@/components/calendarpage/contents/NoteDateContentsBox';
import dayjs from 'dayjs';
import CreateForm from '@/components/form/NoteCreateForm';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import HomeContentsBox from '@/components/homepage/HomeContentsBox';
import { useGetAllProblem } from '@/hooks/problem/useGetProblem';

type Props = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: Window;
  children: React.ReactElement;
}


export default function Home(props) {
  const params = useParams()
  const router = useRouter()
  // const [contents, setContents] = React.useState<string | null>(null);
  const [menu, setMenu] = React.useState(0);

  const handleMenuChange = (newValue) => {
    setMenu(newValue);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between, bg-white">
      {/* <Header props={props} setMenu={setMenu} /> */}
      <Container maxWidth="sm" sx={{ px: 0, position: "relative" }}>
        <Box sx={{ position: 'fixed', right: 0, left: 0, height: "-webkit-fill-available", zIndex: 1050, pointerEvents: "none" }} >
          <Container maxWidth="sm" sx={{ my: 0, height: "100vh", px: 0, position: "relative" }}>
            <Fab sx={{ position: "absolute", pointerEvents: "auto", right: 30, bottom: 85, backgroundColor: "#1976d2 !important" }} color="primary" aria-label="add"
              onClick={(event) => {
                router.replace(`/calendar/${dayjs(String(params.date)).format('YYYY-MM-DD')}/create`)
              }
              }>
              <AddIcon />
            </Fab>
          </Container>
        </Box>
        <NoteDateContentsBox />
      </Container >

      < Footer />
    </main >
  )
}
