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
import { useGetUser } from '@/hooks/auth/useGetUser';

export default function Home() {
  const router = useRouter()

  React.useEffect(() => {
    router.push('/note')
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-white" style={{ overflow: "hidden", position: "relative" }}>
          
    </main >
  )
}
