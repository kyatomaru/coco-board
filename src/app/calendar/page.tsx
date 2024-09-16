"use client"

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation'
import LoadingPage from '@/components/AuthLoadingPage';
import { useIsAuth } from '@/hooks/auth/useIsAuth';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Container from '@mui/material/Container';
import NoteCalendar from '@/features/routes/calendar/Calendar';
import BoardCalendar from '@/features/routes/calendar/Calendar';
import type { User } from 'firebase/auth';
import { auth } from '../firebase';
import { onAuthStateChanged, getAuth } from "firebase/auth"
import LeftBar from '@/components/LeftBar';
import CalendarHeader from '@/components/routes/calendar/CalendarHeader';
import { useGetNote } from '@/hooks/note/useGetAllNote';
import { useGetBoard } from '@/hooks/board/useGetAllBoard';
import CalendarFooter from '@/components/routes/calendar/CalendarFooter';

export default function Home(props) {
  const router = useRouter()
  const [user, setUser] = React.useState<User | undefined>(null);
  const [selectedMonth, setSelectedMonth] = React.useState(new Date());
  const [pageMenu, setPageMenu] = React.useState(0);

  const [boardContents, getBoardContents] = useGetBoard(user)
  const [noteContents, getNoteContents] = useGetNote(user)

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
    <main className="flex min-h-screen flex-col items-center justify-between, bg-white">
      <LoadingPage />
      {user !== null &&
        <>
          <CalendarHeader date={new Date()} selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} />
          <LeftBar />
          <Container maxWidth="md" sx={{ mt: { xs: "96px", md: "65px" }, mb: { xs: "50px", sm: "75px" }, px: 0, pl: { md: "120px", lg: "250px" }, position: "relative" }}>
            {pageMenu == 0 ?
              <NoteCalendar user={user} selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} contents={boardContents} />
              :
              <BoardCalendar user={user} selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} contents={noteContents} />
            }
          </Container >
          <CalendarFooter selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} pageMenu={pageMenu} setPageMenu={setPageMenu} />
        </>
      }
    </main >
  )
}
