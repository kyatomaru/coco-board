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
  const params = useParams()
  const [user, setUser, isSubscriptionValid, isLoading] = useGetUser()
  const [date, setDate] = React.useState(new Date())
  const [displayMenu, setDisplayMenu] = React.useState(0)
  const [isBoardCreateModal, setIsBoardCreateModal] = React.useState(false)
  const [showCalendar, setShowCalendar] = React.useState(false)

  const [board, setBoard, getBoard, isBoardLoading] = useGetBoard(user, dayjs(date).format('YYYY-MM-DD'))
  const [note, setNote, getNote, isNoteLoading] = useGetNote(user, dayjs(date).format('YYYY-MM-DD'))

  const [allNote, setAllNote, getAllNote, isAllNoteLoading] = useGetAllNote(user)
  const [allBoard, setAllBoard, getAllBoard, isAllBoardLoading] = useGetAllBoard(user)

  const [isNoteLimited, setIsNoteLimited] = React.useState(false)

  useIsAuth(router)

  React.useEffect(() => {
    if (allNote && allNote.length > 0) {
      // dateの週の個数が5個以上あればisNoteLimitedをtrueにする
      const weekNotes = allNote.filter(note => {
        const noteDate = dayjs(note.date)
        const startOfWeek = dayjs(date).startOf('week')
        const endOfWeek = dayjs(date).endOf('week')

        return noteDate.isAfter(startOfWeek) && noteDate.isBefore(endOfWeek)
      })
      if (weekNotes.length >= 5) setIsNoteLimited(true)
      else setIsNoteLimited(false)
    }
  }, [allNote, date])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-white" style={{ overflow: "hidden", position: "relative" }}>
          <LeftBar />
          <NoteHeader date={date} setDate={setDate} displayMenu={displayMenu} setDisplayMenu={setDisplayMenu} showCalendar={showCalendar} setShowCalendar={setShowCalendar} />
          <Box sx={{ background: "white", overflowY: "scroll", overflowX: "hidden", position: "fixed", zIndex: 1000, width: "100%", height: "100vh" }}>
            <Container maxWidth="md" sx={{ position: "relative", pt: "80px", px: 0, pl: { md: "120px", lg: "250px" } , pb: {xs: "56px", md: "0px"}}}>
              {showCalendar ?
                displayMenu == 0 ?
                  <NoteCalendar user={user} selectedDate={date} setSelectedDate={setDate} contents={allNote} setShowCalendar={setShowCalendar} />
                  :
                  <NoteCalendar user={user} selectedDate={date} setSelectedDate={setDate} contents={allBoard} setShowCalendar={setShowCalendar} />
                
              :
              displayMenu == 0 ?  
                (isNoteLoading || !note) ?
                <Box sx={{ width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <LoadingPage />
                </Box>
                  :
                  <NoteBox user={user} contents={note} setContents={setNote} boards={board} date={date} isLimited={isNoteLimited} isSubscriptionValid={isSubscriptionValid} />
              :
                (isBoardLoading || !board) ?
                <Box sx={{ width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <LoadingPage />
                </Box>
                  :
                <Box>
                  <CreateButton onClick={() => { (false && !isSubscriptionValid && allBoard.length >= 10) ? (router.push('/plan')) : (window.scrollTo(0, 0), setIsBoardCreateModal(true)) }} />
                  <BoardCardBox user={user} contents={board} setContents={setBoard} date={date} menu={isBoardCreateModal} setMenu={setIsBoardCreateModal} />
                </Box>
              }
            </Container>
          </Box>

          <Footer />
    </main >
  )
}
