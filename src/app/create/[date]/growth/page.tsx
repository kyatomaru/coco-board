"use client"

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation'
import LoadingPage from '@/components/LoadingPage';
import { useIsAuth } from '@/hooks/auth/useIsAuth';
import Footer from "@/components/Footer";
import Container from '@mui/material/Container';
import GrowthAllForm from '@/features/common/forms/problem/growth/GrowthAllForm';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import type { User } from 'firebase/auth';
import { auth } from '@/app/firebase';
import { useGetDateProblem } from '@/hooks/problem/useGetDateProblem';
import { GrowthModel } from '@/types/problem/Growth';
import { useInsertGrowth } from '@/hooks/problem/growth/useInsertGrowth';

const style = {
  // height: "auto",
  // position: "absolute",
  // zIndex: 90,
  // top: "0",
  borderRight: "solid 0.5px #b2b2b2",
  borderLeft: "solid 0.5px #b2b2b2",
  bgcolor: "white",
  // pb: "60px",
  minHeight: "100vh"
};

export default function Home() {
  const params = useParams()
  const router = useRouter()
  const [problems, setProblems] = React.useState([]);
  const [growth, setGrowth] = React.useState([]);

  const [user, setUser] = React.useState<User | undefined>(null);

  const [problemContents, setProblemContents] = useGetDateProblem(user, params.date)
  const [growthContents, setGrowthContents] = React.useState(undefined);

  useIsAuth(router)

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(auth.currentUser)
      }
    })
  });

  React.useEffect(() => {
    if (problemContents != undefined && growthContents == undefined) {
      const growthArray = Array()
      for (let index = 0; index < problemContents.length; index++) {
        growthArray.push(new GrowthModel(params.date))
      }
      setGrowthContents(growthArray)
    }
  }, [problemContents]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between, bg-white">
      <LoadingPage />
      {user !== null &&
        <>
          <Container maxWidth="sm" sx={{ px: "0 !important", position: "relative", ...style }}>
            <GrowthAllForm problemContents={problemContents} growthContents={growthContents} setGrowthContents={setGrowthContents} postData={useInsertGrowth} />
          </Container>
          <Footer />
        </>
      }
    </main >
  )
}
