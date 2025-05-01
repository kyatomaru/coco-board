"use client"

import * as React from 'react';
import { useRouter, useParams } from 'next/navigation'
import LoadingPage from '@/components/LoadingPage';
import { useIsAuth } from '@/hooks/auth/useIsAuth';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import BoardCardBox from '@/features/routes/board/BoardCardBox';
import NoteBox from '@/features/routes/note/NoteBox';
import type { User } from 'firebase/auth';
import { auth } from '../firebase';
import { onAuthStateChanged, getAuth } from "firebase/auth"
import LeftBar from '@/components/LeftBar';
import NoteHeader from '@/features/routes/note/NoteHeader';
import CreateButton from '@/features/common/button/CreateButton';
import { useGetAllNote } from '@/hooks/note/useGetAllNote';
import { useGetAllBoard } from '@/hooks/board/useGetAllBoard';

import { useGetNote } from '@/hooks/note/useGetDateNote';
import { useGetBoard } from '@/hooks/board/useGetDateBoard';
import WelcomeModal from '@/features/routes/home/welcomeModal/WelcomeModal';
import dayjs from 'dayjs';
import HomePageGuideModal from '@/features/routes/home/homePageGuideModal/HomePageGuideModal';
import NoteCalendar from '@/features/routes/note/NoteCalendar'; 
import Paper from '@mui/material/Paper';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Footer from '@/components/Footer';
import SettingPage from '@/features/routes/setting/SettingPage';
import SettingHeader from '@/features/routes/setting/SettingHeader';
import { useGetUser } from '@/hooks/auth/useGetUser';

export default function Home() {
  const router = useRouter()
  const params = useParams()
  const [user, setUser, isSubscriptionValid, isLoading] = useGetUser()

  useIsAuth(router)

  React.useEffect(() => {
    if (localStorage.getItem("isNewUser")) router.push('/action/tutorial')
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-white" style={{ overflow: "hidden", position: "relative" }}>
          <WelcomeModal />

          <LeftBar />
          <SettingHeader />
          {isLoading ?
            <LoadingPage />
          :
          <Box sx={{ background: "white", overflowY: "scroll", overflowX: "hidden", position: "fixed", zIndex: 1000, width: "100%", height: "100vh" }}>
            <Container maxWidth="md" sx={{ position: "relative", pt: "40px", px: 0, pl: { md: "120px", lg: "250px" } , pb: {xs: "56px", md: "0px"}}}>
              <SettingPage isSubscriptionValid={isSubscriptionValid} />
            </Container>
          </Box>
          }

          <Footer />
    </main >
  )
}
