"use client"

import * as React from 'react';
import { useRouter, useParams } from 'next/navigation'
import LoadingPage from '@/components/common/AuthLoadingPage';
import { useIsAuth } from '@/hooks/auth/useIsAuth';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import BoardCardBox from '@/features/common/contents/box/BoardCardBox';
import NoteCardBox from '@/features/common/contents/box/NoteCardBox';
import TaskCardBox from '@/features/routes/home/TaskCardBox';
import type { User } from 'firebase/auth';
import { auth } from '../firebase';
import { onAuthStateChanged, getAuth } from "firebase/auth"
import LeftBar from '@/components/common/LeftBar';
import HomeHeader from '@/components/routes/home/HomeHeader';
import CreateButton from '@/features/common/button/CreateButton';
import { useGetNote } from '@/hooks/note/useGetDateNote';
import { useGetBoard } from '@/hooks/board/useGetDateBoard';
import InviteModal from '@/components/common/InviteModal';
import WelcomeModal from '@/features/routes/home/welcomeModal/WelcomeModal';
import dayjs from 'dayjs';

export default function Home() {
  const router = useRouter()
  const params = useParams()
  const [user, setUser] = React.useState<User | undefined>(null);
  const [date, setDate] = React.useState(new Date())
  const [displayMenu, setDisplayMenu] = React.useState(0)
  const [isNoteCreateModal, setIsNoteCreateModal] = React.useState(-1)
  const [isTaskAddModal, setIsTaskAddModal] = React.useState(false)

  const [board, setBoard] = useGetBoard(user, dayjs(String(date)).format('YYYY-MM-DD'))
  const [note, setNote] = useGetNote(user, dayjs(String(date)).format('YYYY-MM-DD'))

  useIsAuth(router)

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(auth.currentUser)
      }
    })
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-white" style={{ overflow: "hidden", position: "relative" }}>
      <LoadingPage />
      {user !== null &&
        <>
          <WelcomeModal />

          <LeftBar />
          <HomeHeader isLoading={board == undefined || note == undefined} date={date} setDate={setDate} displayMenu={displayMenu} setDisplayMenu={setDisplayMenu} />
          <Box sx={{ background: "white", overflowY: "scroll", position: "fixed", zIndex: 1000, width: "100%", height: "100vh" }}>
            <Container maxWidth="md" sx={{ position: "relative", pt: { xs: "146px", md: "110px" }, px: 0, pl: { md: "120px", lg: "250px" } }}>

              {displayMenu == 0 &&
                <Box sx={{ pt: 2, pb: "200px", borderRadius: 2, px: 2 }}>
                  <CreateButton onClick={() => { window.scrollTo(0, 0); setIsNoteCreateModal(0) }} />
                  <BoardCardBox user={user} contents={board} setContents={setBoard} date={date} menu={isNoteCreateModal} setMenu={setIsNoteCreateModal} />
                </Box>
              }
              {displayMenu == 1 &&
                <Box sx={{ pt: 2, pb: "200px", borderRadius: 2, px: 2 }}>
                  <CreateButton onClick={() => { setIsNoteCreateModal(1) }} />
                  <NoteCardBox user={user} contents={note} setContents={setNote} date={date} menu={isNoteCreateModal} setMenu={setIsNoteCreateModal} />
                </Box>
              }
            </Container>
          </Box>
          {/* <InviteModal /> */}
        </>
      }
    </main >
  )
}
