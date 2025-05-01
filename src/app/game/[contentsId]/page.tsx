"use client"

import * as React from 'react';
import { useRouter, useParams } from 'next/navigation'
import LoadingPage from '@/components/LoadingPage';
import Container from '@mui/material/Container';
import type { User } from 'firebase/auth';
import { useGetGame } from '@/hooks/game/useGetGame';
import NotPage from '@/components/NotPage';
import GameContent from '@/features/routes/game/GameContent';
import { useGetBoard } from '@/hooks/board/useGetBoard';
import dayjs from 'dayjs';
import Box from '@mui/material/Box';

export default function Home() {
  const params = useParams()
  const [content, setContent, boards, setBoards] = useGetGame(params.contentsId)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-white">
      {content === undefined ?
        <LoadingPage /> :
        (!content ?
          <NotPage title="試合" />
          :
          <Box sx={{ background: "white", overflowY: "scroll", overflowX: "hidden", position: "fixed", zIndex: 1000, width: "100%", height: "100vh" }}>
            <Container maxWidth="md" sx={{ position: "relative", px: 0, pb: {xs: "56px", md: "0px"}}}>
              <GameContent content={content} boards={boards} />
            </Container>
          </Box>
        )}
    </main >
  )
}
