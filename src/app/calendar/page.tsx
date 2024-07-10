"use client"

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation'
import LoadingPage from '@/components/LoadingPage';
import { useIsAuth } from '@/hooks/auth/useIsAuth';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Container from '@mui/material/Container';
import NoteCalendar from '@/features/routes/calendar/NoteCalendar';
import TaskCalendar from '@/features/routes/calendar/TaskCalendar';
import type { User } from 'firebase/auth';
import { auth } from '../firebase';
import { onAuthStateChanged, getAuth } from "firebase/auth"
import LeftBar from '@/components/LeftBar';
import CalendarHeader from '@/components/routes/calendar/CalendarHeader';
import { useGetNote } from '@/hooks/note/useGetAllNote';
import { useGetAllTask } from '@/hooks/task/useGetAllTask';
import CalendarFooter from '@/components/routes/calendar/CalendarFooter';

export default function Home(props) {
  const router = useRouter()
  const [user, setUser] = React.useState<User | undefined>(null);
  const [selectedMonth, setSelectedMonth] = React.useState(new Date());
  const [pageMenu, setPageMenu] = React.useState(0);

  const [contents, getContents] = useGetNote(user)
  const [tasks, getTasks] = useGetAllTask(user)

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
          <Container maxWidth="md" sx={{ my: "50px", px: 0, pl: { md: "120px", lg: "250px" }, position: "relative" }}>
            {pageMenu == 0 ?
              <NoteCalendar user={user} selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} contents={contents} />
              :
              <TaskCalendar user={user} selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} task={tasks[pageMenu - 1]} />
            }
          </Container >
          < CalendarFooter selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} tasks={tasks} pageMenu={pageMenu} setPageMenu={setPageMenu} />
        </>
      }
    </main >
  )
}
