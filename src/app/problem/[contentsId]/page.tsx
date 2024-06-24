"use client"

import * as React from 'react';
import { useRouter, useParams } from 'next/navigation'
import LoadingPage from '@/components/LoadingPage';
import { useIsAuth } from '@/hooks/auth/useIsAuth';
import { auth } from '@/app/firebase';
import Container from '@mui/material/Container';
import Footer from "@/components/Footer";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import type { User } from 'firebase/auth';
import ProblemContentsBox from '@/features/routes/problem/ProblemContentsBox';
import { useGetIdProblem } from '@/hooks/problem/useGetIdProblem';
import { useGetIdGrowth } from '@/hooks/problem/growth/useGetIdGrowth';

const containterStyle = {
  // height: "auto",
  // position: "absolute",
  // zIndex: 90,
  // top: "0",
  borderRight: "solid 0.5px #b2b2b2",
  borderLeft: "solid 0.5px #b2b2b2",
  bgcolor: "white",
  pb: "45px",
  minHeight: "100vh"
}

export default function Home() {
  const router = useRouter()
  const params = useParams()

  const [user, setUser] = React.useState<User | undefined>(null);

  const [problemContents, getProblemContents] = useGetIdProblem(user, params.contentsId)
  const [growthContents, getGrowthContents] = useGetIdGrowth(user, params.contentsId)

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
      {user !== null && <>
        <Container maxWidth="sm" sx={{ ...containterStyle, px: "0 !important", position: "relative" }}>
          <ProblemContentsBox problemContents={problemContents} growthContents={growthContents} getProblemContents={getProblemContents} getGrowthContents={getGrowthContents} />

        </Container>
        <Footer />
      </>
      }
    </main >
  )
}
