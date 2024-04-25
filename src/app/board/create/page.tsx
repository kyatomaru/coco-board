"use client"

import * as React from 'react';
import { useRouter } from 'next/navigation'
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
import TacticalBoard from '@/components/tacticalBoard/TacticalBoard';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Footer from "@/components/Footer";
import { Container } from '@mui/material';

export default function Home() {
  const router = useRouter()

  const [dateValue, setDateValue] = React.useState<Date | null>(new Date());
  const [titleError, setTitleError] = React.useState(false);
  const [contents, setContents] = React.useState(new GameContentsModel());

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // const formData = new FormData(event.currentTarget)
    // const data = Object.fromEntries(formData)
    const data = contents

    if (!data.title) {
      setTitleError(true)
    }
    else {
      const uid = await auth.currentUser?.uid;
      if (uid) {
        data.uid = uid;

        if (dateValue) data.date = dayjs(String(dateValue)).format('YYYY-MM-DD');

        const date = new Date();
        data.createDate = date;
        data.updateDate = date;

        const response = await fetch('/api/game/', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'content-type': 'application/json'
          }
        })

        console.log(response.json())

        const contentsId = response.json()

        const problemContents = []
        // const problemContents = new HomeProblemModel(contentsId, contents.problems, contents.date, date, date)

        await fetch('/api/problem/', {
          method: 'POST',
          body: JSON.stringify(problemContents),
          headers: {
            'content-type': 'application/json'
          }
        }).then((res) => {
          if (res.ok) {
            try {
              router.push('/notes/' + dayjs(String(data.date)).format('YYYY-MM-DD'));
            } catch (error) {
              console.log(error)
            }
          }
        })
      }
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-white">
      <Header />
      <Container fixed sx={{ mt: "80px", mb: "80px" }}>
        <MenuSelectBox />

        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
          <DemoContainer components={['DatePicker']}>
            <DatePicker format='yyyy年MM月dd日' value={dateValue} disableFuture onChange={(newValue) => setDateValue(newValue)} />
          </DemoContainer>
        </LocalizationProvider>

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
          <TacticalBoard />
          <Button type='submit'>決定</Button>
        </Box>
      </Container>
      <Footer />
    </main >
  )
}
