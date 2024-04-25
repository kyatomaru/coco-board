"use client"

import * as React from 'react';
import { useRouter, useParams } from 'next/navigation'
import { auth } from '@/app/firebase';
import { useGetIdGame } from '@/hooks/game/useGetGame';
import { HomeProblemModel } from '@/types/problem/Problem';
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
import { PracticeContentsModel, PracticeContentsType } from '@/types/practice/PracticeContents';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import type { User } from 'firebase/auth';
import PracticeContents from '@/components/viewpage/contents/practice/PracticeContents';


export default function Home() {
  const router = useRouter()
  const params = useParams()
  const [user, setUser] = React.useState<User | null>(null);
  const [token, setToken] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [titleError, setTitleError] = React.useState(false);
  const [dateValue, setDateValue] = React.useState<Date | null>(new Date());
  const [contents, setContents] = React.useState<PracticeContentsType | null>(new PracticeContentsModel());


  const GetContents = async (uid: string | undefined) => {
    if (uid) {
      const getParams = { uid: uid, contentsId: String(params.contentsId) };
      const query = new URLSearchParams(getParams);

      fetch(`/api/practice/?${query}`)
        .then((response) => response.json())
        .then((data) => {
          setContents(data)
        })
    }
  }

  React.useEffect(() => {
    setIsLoading(true)
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(auth.currentUser);
        user.getIdToken().then((token) => {
          setToken(token);
        });
        GetContents(auth.currentUser?.uid)
        setIsLoading(false)
      } else {
        setUser(null);
        setToken(null);
      }
    });

  }, [])

  const DeleteContents = () => {
    setIsLoading(true)
    const auth = getAuth();
    GetContents(auth.currentUser?.uid)
    setIsLoading(false)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-white">
      <Container maxWidth="sm" sx={{ px: 0, position: "relative", mt: 4 }}>
        <PracticeContents contents={contents} DeleteContents={DeleteContents} />
      </Container>
      <Footer />
    </main >
  )
}
