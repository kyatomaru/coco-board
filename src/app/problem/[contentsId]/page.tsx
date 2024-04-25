"use client"

import * as React from 'react';
import { useRouter, useParams } from 'next/navigation'
import { auth } from '@/app/firebase';
import { useGetIdGame } from '@/hooks/game/useGetGame';
import Header from "@/components/Header";
import TitleBox from "@/components/TitleBox";
import MenuSelectBox from "@/components/form/MenuSelectBox"
import { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import ja from 'date-fns/locale/ja'
import { format } from 'date-fns'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import GameForm from "@/components/form/game/GameForm"
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Footer from "@/components/Footer";
import CircularProgress from '@mui/material/CircularProgress';
import { usePatchGame } from '@/hooks/game/usePatchGame';
import { ProblemContentsModel, ProblemContentsType } from '@/types/problem/ProblemContents';
import { ProblemGrowthModel, ProblemGrowthType } from '@/types/problem/ProblemGrowth';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import type { User } from 'firebase/auth';
import ProblemContents from '@/components/viewpage/problem/ProblemContents';

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
  const [user, setUser] = React.useState<User | null>(null);
  const [token, setToken] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [titleError, setTitleError] = React.useState(false);
  const [dateValue, setDateValue] = React.useState<Date | null>(new Date());
  const [problemContents, setProblemContents] = React.useState<ProblemContentsType | null>(new ProblemContentsModel());
  const [growthContents, setGrowthContents] = React.useState<Array<ProblemGrowthType>>([]);


  const GetProblem = async (uid: string | undefined) => {
    if (uid) {
      const getParams = { uid: uid, contentsId: String(params.contentsId) };
      const query = new URLSearchParams(getParams);

      fetch(`/api/problem/?${query}`)
        .then((response) => response.json())
        .then((data) => {
          setProblemContents(data)
        })
    }
  }

  const GetGrowth = async (uid: string | undefined) => {
    if (uid) {
      const getParams = { uid: uid, problemId: String(params.contentsId) };
      const query = new URLSearchParams(getParams);

      fetch(`/api/growth/?${query}`)
        .then((response) => response.json())
        .then((data) => {
          setGrowthContents(data)
        })
    }
  }

  React.useEffect(() => {
    setIsLoading(true)
    // const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(auth.currentUser);
        user.getIdToken().then((token) => {
          setToken(token);
        });
        GetProblem(auth.currentUser?.uid)
        GetGrowth(auth.currentUser?.uid)
        setIsLoading(false)
      } else {
        setUser(null);
        setToken(null);
      }
    });

  }, [])

  const DeleteProblem = () => {
    setIsLoading(true)
    const auth = getAuth();
    GetProblem(auth.currentUser?.uid)
    setIsLoading(false)
  }

  const submitGrowthData = () => {
    GetGrowth(auth.currentUser?.uid)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-white">

      <Container maxWidth="sm" sx={{ ...containterStyle, px: "0 !important", position: "relative" }}>
        <ProblemContents problemContents={problemContents} growthContents={growthContents} DeleteContents={DeleteProblem} getGrowth={submitGrowthData} />
      </Container>
      <Footer />
    </main >
  )
}
