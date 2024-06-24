"use client"

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation'
import LoadingPage from '@/components/LoadingPage';
import { useIsAuth } from '@/hooks/auth/useIsAuth';
import Container from '@mui/material/Container';
import BoardViewForm from '@/features/common/forms/board/BoardViewForm';
import MenuSelectBox from '@/features/common/create/MenuSelectBox';
import { useUpdateBoard } from '@/hooks/board/useUpdateBoard';
import { useGetBoard } from '@/hooks/board/useGetBoard';
import type { User } from 'firebase/auth';
import { auth } from '@/app/firebase';
import { onAuthStateChanged, getAuth } from "firebase/auth"


export default function Home() {
  const router = useRouter()
  const params = useParams()
  const [user, setUser] = React.useState<User | undefined>(null);
  const [contents, getContents] = useGetBoard(user, params.contentsId)

  useIsAuth(router)

  React.useEffect(() => {
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
          <Container maxWidth="sm" sx={{ minHeight: "100vh", px: 0, position: "relative" }}>
            {contents != undefined &&
              <BoardViewForm contents={contents} postData={useUpdateBoard} />
            }
          </Container>
        </>
      }
    </main >
  )
}
