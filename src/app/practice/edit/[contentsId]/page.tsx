"use client"

import * as React from 'react';
import { useRouter, useParams } from 'next/navigation'
import LoadingPage from '@/components/LoadingPage';
import { useIsAuth } from '@/hooks/auth/useIsAuth';
import { useGetPractice } from '@/hooks/practice/useGetPractice';
import PracticeForm from '@/features/common/forms/practice/PracticeForm';
import Footer from "@/components/Footer";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import type { User } from 'firebase/auth';
import { auth } from '@/app/firebase';
import { onAuthStateChanged, getAuth } from "firebase/auth"
import { useUpdatePractice } from '@/hooks/practice/useUpdatePractice';
import LoginPage from '@/features/routes/accounts/login/LoginPage';

export default function Home() {
  const params = useParams()
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [titleError, setTitleError] = React.useState(false);

  const [user, setUser] = React.useState<User | undefined>(null);
  const [contents, getContents] = useGetPractice(user, params.contentsId)

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
                <PracticeForm contents={contents} postData={useUpdatePractice} />
              }
            </Box>
          </Container>
        </>
      }
    </main >
  )
}
