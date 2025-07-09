"use client"

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation'
import LoadingPage from '@/components/LoadingPage';
import { useAuth, useRequireAuth } from '@/context/auth/AuthContext';
import Container from '@mui/material/Container';
import Footer from "@/components/Footer";
import BoardContentsBox from '@/features/routes/board/BoardContentsBox';
import { BoardType, BoardModel } from '@/types/board/Board';
import { useGetBoard } from '@/hooks/board/useGetBoard';
import NotPage from '@/components/NotPage';

const containterStyle = {
  bgcolor: "white",
  minHeight: "100vh", 
}

export default function Home() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()

  const [contents, setContents] = useGetBoard(user, params.contentsId)

  useRequireAuth()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-white">
      {contents == undefined ?
        <LoadingPage /> :
        (!contents ?
          <NotPage title="ボード" />
          :
          <Container maxWidth="sm" sx={{ ...containterStyle, px: "0 !important", position: "relative", overflowX: "hidden" }}>
            <BoardContentsBox user={user} contents={contents} setContents={setContents} />
          </Container>
        )}
    </main >
  )
} 