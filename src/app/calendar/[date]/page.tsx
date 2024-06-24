"use client"

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation'
import LoadingPage from '@/components/LoadingPage';
import { useIsAuth } from '@/hooks/auth/useIsAuth';
import Footer from "@/components/Footer";
import Container from '@mui/material/Container';
import type { User } from 'firebase/auth';
import { auth } from '@/app/firebase';
import { onAuthStateChanged, getAuth } from "firebase/auth"
import NoteCardBox from '@/features/common/contents/box/NoteCardBox';
import LoginPage from '@/features/routes/accounts/login/LoginPage';
import DateBar from '@/features/routes/calendar/DateBar';
import CreateButton from '@/features/routes/calendar/CreateButton';
import LeftBar from '@/components/LeftBar';

export default function Home() {
  const params = useParams()
  const router = useRouter()
  const [user, setUser] = React.useState<User | undefined>(null);

  useIsAuth(router)

  React.useEffect(() => {
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
          <LeftBar />
          <Container maxWidth="md" sx={{ px: 0, position: "relative", mb: "50px", pl: { md: "120px", lg: "250px" } }}>
            <CreateButton />
            <DateBar />
            <NoteCardBox user={user} date={new Date(String(params.date))} />
          </Container >
          <Footer />
        </>
      }

    </main >
  )
}
