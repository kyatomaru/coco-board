"use client"

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation'
import LoadingPage from '@/components/LoadingPage';
import { useIsAuth } from '@/hooks/auth/useIsAuth';
import BoardViewForm from '@/features/common/forms/board/BoardViewForm';
import type { User } from 'firebase/auth';
import { onAuthStateChanged, getAuth } from "firebase/auth"
import LoginPage from '@/features/routes/accounts/login/LoginPage';
import Container from '@mui/material/Container';
import { auth } from '@/app/firebase';
import MenuSelectBox from '@/features/common/create/MenuSelectBox';
import { useInsertBoard } from '@/hooks/board/useInsertBoard';
import { BoardModel } from '@/types/board/Board';
import LeftBar from '@/components/LeftBar';
import dayjs from 'dayjs';

export default function Home() {
  const params = useParams()
  const router = useRouter()
  const [contents, setContents] = React.useState(new BoardModel(dayjs(String(params.date)).format('YYYY-MM-DD')));
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
    <main className='flex bg-white min-h-screen flex-col items-center' >
      <LoadingPage />
      {user !== null &&
        <>
          <LeftBar />
          <Container maxWidth="sm" sx={{ minHeight: "100vh", px: 0, position: "relative" }}>
            <BoardViewForm contents={contents} postData={useInsertBoard} />
          </Container>
          <MenuSelectBox />
        </>
      }
    </main >
  )
}
