"use client"

import * as React from 'react';
import { useRouter } from 'next/navigation'
import { auth } from '@/app/firebase';
import dayjs from 'dayjs';
import ja from 'date-fns/locale/ja'
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ProblemContentsModel } from '@/types/problem/ProblemContents';
import HomeContentsBox from '@/components/homepage/HomeContentsBox';
import { Content } from 'next/font/google';
import { useGetAllProblem } from '@/hooks/problem/useGetProblem';
import ProblemForm from '@/components/form/problem/ProblemForm';
import ProblemFormModal from '@/components/form/problem/ProblemFormModal';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Stack from '@mui/material/Stack';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';
import ScheduleContents from '@/components/homepage/ScheduleContents';
import NoteContentsBox from '@/components/homepage/note/NoteContentsBox';
import ProblemContentsBox from '@/components/homepage/problem/ProblemContentsBox';
import type { User } from 'firebase/auth';
import { onAuthStateChanged, getAuth } from "firebase/auth"
import LoginPage from '@/components/auths/LoginPage';

export default function Home() {
  const router = useRouter()
  const [user, setUser] = React.useState<User | undefined>();
  const [token, setToken] = React.useState<string | null>(null);
  const [contents, setContents] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true)

  React.useEffect(() => {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(auth.currentUser)
        //router.push('/notes/2023-06-27')
      }
    })
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-white">
      {user !== undefined
        ? <>
          <Header />
          <Container maxWidth="sm" sx={{ my: "90px", px: 0 }}>
            {/* <Box sx={{ mb: 3, p: 2, borderRadius: 4, bgcolor: "rgba(247, 249, 249, 1.00)" }}>
          <Stack sx={{ width: "100%" }} alignItems="center" direction="row">
            <Typography variant="h6" sx={{ fontSize: 16, width: "100%" }}>
              スケジュール
            </Typography>
            <Box sx={{ minWidth: "100px" }}>
              <Button >記録する</Button>
            </Box>
          </Stack>
          <ScheduleContents />
        </Box> */}

            <Box sx={{ mb: 3, px: 2, py: 1, borderRadius: 4, bgcolor: "rgba(247, 249, 249, 1.00)" }}>
              <Stack sx={{ width: "100%" }} alignItems="center" direction="row">
                <Typography variant="h6" sx={{ fontSize: 16, width: "100%" }}>
                  今日の記録
                </Typography>
                <Box sx={{ minWidth: "100px" }}>
                  <Button onClick={(event) => { router.push(`/calendar/${dayjs(String(new Date())).format('YYYY-MM-DD')}/create`) }}>記録する</Button>
                </Box>
              </Stack>
              <NoteContentsBox />
            </Box>

            <Box sx={{ mb: 3, px: 2, py: 1, borderRadius: 4, bgcolor: "rgba(247, 249, 249, 1.00)" }}>
              <Stack sx={{ width: "100%" }} alignItems="center" direction="row">
                <Typography variant="h6" sx={{ fontSize: 16, width: "100%" }}>
                  進行中の課題
                </Typography>
                <Box sx={{ minWidth: "100px" }}>
                  <Button onClick={(event) => { router.push(`/problem/growth`) }}>振り返る</Button>
                </Box>
              </Stack>
              <ProblemContentsBox />
            </Box>
          </Container >
          <Footer />
        </>
        : <LoginPage />
      }
    </main >
  )
}
