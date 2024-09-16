"use client"

import * as React from 'react';
import { useRouter, useParams } from 'next/navigation'
import LoadingPage from '@/components/AuthLoadingPage';
import { useIsAuth } from '@/hooks/auth/useIsAuth';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import BoardCardBox from '@/features/common/contents/box/BoardCardBox';
import NoteCardBox from '@/features/common/contents/box/NoteCardBox';
import TaskCardBox from '@/features/routes/home/TaskCardBox';
import type { User } from 'firebase/auth';
import { auth } from '@/app/firebase';
import { onAuthStateChanged, getAuth } from "firebase/auth"
import LeftBar from '@/components/LeftBar';
import HomeHeader from '@/components/routes/home/HomeHeader';
import CreateButton from '@/features/common/button/CreateButton'
import { useGetNote } from '@/hooks/note/useGetDateNote';
import { useGetBoard } from '@/hooks/board/useGetDateBoard';
import WelcomeModal from '@/features/routes/home/welcomeModal/WelcomeModal';
import dayjs from 'dayjs';
import InviteModal from '@/components/common/InviteModal';

export default function Home() {
  const router = useRouter()
  const params = useParams()
  const [user, setUser] = React.useState<User | undefined>(null);
  const [date, setDate] = React.useState(new Date(String(params.date)))
  const [displayMenu, setDisplayMenu] = React.useState(0)
  const [isNoteCreateModal, setIsNoteCreateModal] = React.useState(-1)
  const [isTaskAddModal, setIsTaskAddModal] = React.useState(false)

  const [board, setBoard] = useGetBoard(user, dayjs(String(date)).format('YYYY-MM-DD'))
  const [note, setNote] = useGetNote(user, dayjs(String(date)).format('YYYY-MM-DD'))

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
      <Box sx={{ position: "fixed", backgroundColor: "white", height: "100vh", width: "100%" }} />
      <LoadingPage />
      {user !== null &&
        <>
          <WelcomeModal />

          <LeftBar />
          <HomeHeader date={date} setDate={setDate} displayMenu={displayMenu} setDisplayMenu={setDisplayMenu} />
          <Container maxWidth="md" sx={{ overflowY: "auto", height: "100vh", position: "relative", mx: 0, pt: { xs: "150px", md: "110px" }, px: 0, pl: { md: "120px", lg: "250px" } }}>

            {displayMenu == 0 &&
              <Box sx={{ pt: 2, pb: "150px", borderRadius: 2, px: 2 }}>
                <CreateButton onClick={() => { setIsNoteCreateModal(0) }} />
                <BoardCardBox user={user} contents={board} setContents={setBoard} date={date} menu={isNoteCreateModal} setMenu={setIsNoteCreateModal} />
              </Box>
            }
            {displayMenu == 1 &&
              <Box sx={{ pt: 2, pb: "150px", borderRadius: 2, px: 2 }}>
                <CreateButton onClick={() => { setIsNoteCreateModal(1) }} />
                <NoteCardBox user={user} contents={note} setContents={setNote} date={date} menu={isNoteCreateModal} setMenu={setIsNoteCreateModal} />
              </Box>
            }
          </Container>
        </>
      }
    </main >
  )
}
