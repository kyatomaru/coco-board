"use client"

import * as React from 'react';
import { useRouter, useParams } from 'next/navigation'
import LoadingPage from '@/components/common/LoadingPage';
import { useIsAuth } from '@/hooks/auth/useIsAuth';
import { auth } from '@/app/firebase';
import Container from '@mui/material/Container';
import Footer from "@/components/common/Footer";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import type { User } from 'firebase/auth';
import { useGetGame } from '@/hooks/game/useGetGame';
import GameContentsBox from '@/features/routes/game/GameContentsBox';
import LoginPage from '@/features/routes/accounts/login/LoginPage';
import NotPage from '@/components/common/NotPage';

const containterStyle = {
  borderRight: "solid 0.5px #b2b2b2",
  borderLeft: "solid 0.5px #b2b2b2",
  bgcolor: "white",
  minHeight: "100vh"
}

export default function Home() {
  const params = useParams()
  const router = useRouter()
  const [user, setUser] = React.useState<User | undefined>(null);
  const [contents, setContents] = useGetGame(user, params.contentsId)

  // useIsAuth(router)

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(auth.currentUser)
      }
    })
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-white">
      {contents == undefined ?
        <LoadingPage /> :
        (!contents ?
          <NotPage />
          :
          <Container maxWidth="sm" sx={{ ...containterStyle, px: "0 !important", position: "relative" }}>
            <GameContentsBox user={user} contents={contents} setContents={setContents} />
          </Container>
        )}
    </main >
  )
}
