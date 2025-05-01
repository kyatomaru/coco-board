"use client"

import * as React from 'react';
import { useRouter, useParams } from 'next/navigation'
import LoadingPage from '@/components/LoadingPage';
import Container from '@mui/material/Container';
import PracticeContent from '@/features/routes/practice/PracticeContent';
import NotPage from '@/components/NotPage';
import { useGetPractice } from '@/hooks/practice/useGetPractice';

const containterStyle = {
  borderRight: "solid 0.5px #b2b2b2",
  borderLeft: "solid 0.5px #b2b2b2",
  bgcolor: "white",
  minHeight: "100vh"
}

export default function Home() {
  const params = useParams()
  const [content, setContent, boards, setBoards] = useGetPractice(params.contentsId)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-white">
      {content === undefined ?
        <LoadingPage /> :
        (!content ?
          <NotPage title="練習" />
          :
          <Container maxWidth="sm" sx={{ ...containterStyle, px: "0 !important", position: "relative" }}>
            <PracticeContent content={content} boards={boards} />
          </Container>
        )}
    </main >
  )
}
