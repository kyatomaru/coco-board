"use client"

import * as React from 'react';
import { useRouter } from 'next/navigation'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { auth } from '@/app/firebase';
import type { GameContentsType } from '@/types/game/GameContents';
import { GameContentsModel } from '@/types/game/GameContents';
// import { HomeProblemModel } from '@/types/problem/Problem';
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
import Stack from '@mui/material/Stack';
import Footer from "@/components/Footer";
import { Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';


async function insertData(event: React.FormEvent<HTMLFormElement>, contents, dateValue) {
  event.preventDefault()
  // const formData = new FormData(event.currentTarget)
  const data = contents
  // const data = Object.fromEntries(formData)

  // if (!data.title) {
  //   setTitleError(true)
  // }
  if (false) {
  }
  else {
    const uid = await auth.currentUser?.uid;
    if (uid) {
      data.uid = uid;

      if (dateValue) data.date = dayjs(String(dateValue)).format('YYYY-MM-DD');

      const date = new Date();
      data.createDate = date;
      data.updateDate = date;

      fetch('/api/game/', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'content-type': 'application/json'
        }
      })
    }
  }
}


export default function Home() {
  const [dateValue, setDateValue] = React.useState<Date | null>(new Date());
  const [titleError, setTitleError] = React.useState(false);
  const [contents, setContents] = React.useState(new GameContentsModel());
  const [isLoading, setIsLoading] = React.useState(false);

  const router = useRouter()

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true)
    insertData(event, contents, dateValue).then(() => {
      router.push('/notes/' + dayjs(String(dateValue)).format('YYYY-MM-DD'));
    })
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-white">
      <Header />
      {isLoading ?
        <Container fixed sx={{ height: "100vh", position: "relative", textAlign: "center" }} >
          <CircularProgress sx={{ position: "absolute", top: "50%", bottom: "50%", my: "auto" }} />
        </Container>
        :
        <Container maxWidth="sm" fixed sx={{ mt: "80px", mb: "80px" }}>
          <Stack direction="row" sx={{ p: 1, justifyContent: "center", alignItems: "center" }}>
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker format='yyyy年MM月dd日' value={dateValue} disableFuture onChange={(newValue) => setDateValue(newValue)} />
              </DemoContainer>
            </LocalizationProvider>
            <MenuSelectBox />
          </Stack>

          <Box
            component="form"
            onSubmit={onSubmit}
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            method='POST'

          >
            <GameForm contents={contents} titleError={titleError} />
            <Button type='submit'>決定</Button>
          </Box>
        </Container>
      }
      <Footer />
    </main >
  )
}
