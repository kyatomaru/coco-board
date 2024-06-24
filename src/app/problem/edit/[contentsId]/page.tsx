"use client"

import * as React from 'react';
import { useRouter, useParams } from 'next/navigation'
import LoadingPage from '@/components/LoadingPage';
import { useIsAuth } from '@/hooks/auth/useIsAuth';
import { auth } from '@/app/firebase';
import Container from '@mui/material/Container';
import Footer from "@/components/Footer";
import Box from '@mui/material/Box';
import ProblemForm from '@/features/common/forms/problem/ProblemForm';
import { useUpdateProblem } from '@/hooks/problem/useUpdateProblem';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import type { User } from 'firebase/auth';
import { useGetIdProblem } from '@/hooks/problem/useGetIdProblem';


export default function Home() {
  const params = useParams()
  const router = useRouter()
  const [user, setUser] = React.useState<User | undefined>(null);
  const [contents, getContents] = useGetIdProblem(user, params.contentsId)

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
          <Container maxWidth="sm" sx={{ px: 0, position: "relative" }}>
            <Box sx={{ pb: "30px", borderRight: "solid 0.5px #b2b2b2", borderLeft: "solid 0.5px #b2b2b2", backgroundColor: "#fbfbfb" }}>
              {contents != undefined &&
                <ProblemForm contents={contents} postData={useUpdateProblem} />
              }
            </Box>
          </Container>
          <Footer />
        </>
      }
    </main >
  )
}
