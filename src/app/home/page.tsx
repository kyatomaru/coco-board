"use client"

import * as React from 'react';
import { useRouter, useParams } from 'next/navigation'
import LoadingPage from '@/components/LoadingPage';
import { useIsAuth } from '@/hooks/auth/useIsAuth';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import NoteCardBox from '@/features/common/contents/box/NoteCardBox';
import TaskCardBox from '@/features/routes/home/TaskCardBox';
import type { User } from 'firebase/auth';
import { auth } from '../firebase';
import { onAuthStateChanged, getAuth } from "firebase/auth"
import LeftBar from '@/components/LeftBar';
import HomeHeader from '@/components/routes/home/HomeHeader';
import CreateButton from '@/features/common/button/CreateButton';

export default function Home() {
  const router = useRouter()
  const params = useParams()
  const [user, setUser] = React.useState<User | undefined>(null);
  const [date, setDate] = React.useState(new Date())
  const [displayMenu, setDisplayMenu] = React.useState(0)
  const [isNoteCreateModal, setIsNoteCreateModal] = React.useState(-1)
  const [isTaskAddModal, setIsTaskAddModal] = React.useState(false)

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
          {/* <Header /> */}
          <LeftBar />
          <HomeHeader date={date} setDate={setDate} displayMenu={displayMenu} setDisplayMenu={setDisplayMenu} />
          <Container maxWidth="md" sx={{ mt: { xs: "146px", sm: "152px" }, px: 0, pl: { md: "120px", lg: "250px", position: "relative" } }}>

            {displayMenu == 1 &&
              <Box sx={{ mb: 3, borderRadius: 2, px: 2 }}>
                <CreateButton onClick={() => { setIsNoteCreateModal(0) }} />
                <NoteCardBox user={user} date={date} menu={isNoteCreateModal} setMenu={setIsNoteCreateModal} />
              </Box>
            }
            {displayMenu == 0 &&
              <Box sx={{ mb: 3, borderRadius: 2, px: 2 }}>
                <CreateButton onClick={() => { setIsTaskAddModal(true) }} />
                <TaskCardBox user={user} date={date} isAddModal={isTaskAddModal} setIsAddModal={setIsTaskAddModal} />
              </Box>
            }
          </Container >
          {/* <Footer /> */}
        </>
      }
    </main >
  )
}
