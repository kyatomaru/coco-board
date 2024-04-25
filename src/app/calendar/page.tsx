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
import ProblemContentsBox from '@/components/notepage/problem/ProblemContentsBox';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import NoteContentsBox from '@/components/notepage/contents/NoteContentsBox';
import dayjs from 'dayjs';
import CreateForm from '@/components/form/NoteCreateForm';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import HomeContentsBox from '@/components/homepage/HomeContentsBox';
import { useGetAllProblem } from '@/hooks/problem/useGetProblem';
import Calendar from '@/components/calendarpage/Calendar';

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
      <Header props={props} setMenu={setMenu} />
      <Container maxWidth="sm" sx={{ mt: "65px", mb: "90px", px: 0, position: "relative" }}>
        {/* <Box sx={{ position: 'fixed', right: 0, left: 0, height: "-webkit-fill-available", pointerEvents: "none" }} >
          <Container maxWidth="sm" sx={{ my: 0, height: "70vh", px: 0, position: "relative" }}>
            <Fab sx={{ position: "absolute", zIndex: 1050, pointerEvents: "auto", right: 25, bottom: 25, backgroundColor: "#1976d2 !important" }} color="primary" aria-label="add"
              onClick={(event) => {
                router.push("/notes/create")
              }
              }>
              <AddIcon />
            </Fab>
          </Container>
        </Box> */}
        <Calendar />
      </Container >

      < Footer />
    </main >
  )
}
