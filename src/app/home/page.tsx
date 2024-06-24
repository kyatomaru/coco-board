"use client"

import * as React from 'react';
import { useRouter } from 'next/navigation'
import dayjs from 'dayjs';
import LoadingPage from '@/components/LoadingPage';
import { useIsAuth } from '@/hooks/auth/useIsAuth';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import NoteCardBox from '@/features/common/contents/box/NoteCardBox';
import ProblemCardBox from '@/features/routes/home/ProblemCardBox';
import type { User } from 'firebase/auth';
import { auth } from '../firebase';
import { onAuthStateChanged, getAuth } from "firebase/auth"
import LeftBar from '@/components/LeftBar';

export default function Home() {
  const router = useRouter()
  const [user, setUser] = React.useState<User | undefined>(null);

  useIsAuth(router)

  React.useEffect(() => {
    // const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(auth.currentUser)
      }
    })
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-white">
      <LoadingPage />
      {user !== null &&
        <>
          <Header />
          <LeftBar />
          <Container maxWidth="md" sx={{ my: { xs: "80px", sm: "90px", md: "30px" }, px: 0, pl: { md: "120px", lg: "250px" } }}>
            <Box sx={{ mb: 3, px: 2, py: 1, borderRadius: 2, bgcolor: "rgba(247, 250, 250, 1.00)" }}>
              <Stack sx={{ width: "100%" }} alignItems="center" direction="row">
                <Typography variant="h6" sx={{ fontSize: 14, width: "100%" }}>
                  今日の記録
                </Typography>
                <Box sx={{ minWidth: "100px" }}>
                  <Button onClick={(event) => { router.push(`/create/${dayjs(String(new Date())).format('YYYY-MM-DD')}/board`) }}>記録する</Button>
                </Box>
              </Stack>
              <NoteCardBox user={user} date={new Date()} />
            </Box>

            <Box sx={{ mb: 3, px: 2, py: 1, borderRadius: 2, bgcolor: "rgba(247, 250, 250, 1.00)" }}>
              <Stack sx={{ width: "100%" }} alignItems="center" direction="row">
                <Typography variant="h6" sx={{ fontSize: 14, width: "100%" }}>
                  未達成の課題
                </Typography>
                <Box sx={{ minWidth: "100px" }}>
                  <Button onClick={(event) => { router.push(`create/${dayjs(String(new Date())).format('YYYY-MM-DD')}/growth`) }}>振り返る</Button>
                </Box>
              </Stack>
              <ProblemCardBox user={user} achieveMenu={false} />
            </Box>
          </Container >
          <Footer />
        </>
      }
    </main >
  )
}
