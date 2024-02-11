"use client"

import * as React from 'react';
import { useRouter, useParams } from 'next/navigation'
import { auth } from '@/app/firebase';
import { useGetIdGame } from '@/hooks/game/useGetGame';
import { HomeProblemModel } from '@/types/Problem';
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

export default function Home() {
  const router = useRouter()
  const params = useParams()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [titleError, setTitleError] = React.useState(false);
  const [dateValue, setDateValue] = React.useState<Date | null>(new Date());

  const contents = useGetIdGame(setIsLoading, setDateValue)

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // const formData = new FormData(event.currentTarget)
    // const updateData = Object.fromEntries(formData)
    const updateData = contents

    const data = { updateData: updateData, contentsId: params.contentsId }

    const uid = await auth.currentUser?.uid;
    if (uid) {
      data.updateData.uid = uid;

      if (dateValue) data.updateData.date = dayjs(String(dateValue)).format('YYYY-MM-DD');

      const date = new Date();
      data.updateData.createDate = date;
      data.updateData.updateDate = date;

      const response = await usePatchGame(data).then((res) => {
        if (res.ok) {
          try {
            router.push('/notes/' + dayjs(String(data.updateData.date)).format('YYYY-MM-DD'));
          } catch (error) {
            console.log(error)
          }
        }
      })
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-white">
      <Header />
      <Container fixed sx={{ mt: "80px", mb: "80px" }}>
        {isLoading ?
          <Container fixed sx={{ my: "50%", textAlign: "center" }}>
            <CircularProgress />
          </Container>
          :
          <Box>
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker format='yyyy年MM月dd日' value={dateValue} disableFuture onChange={(newValue) => setDateValue(newValue)} />
              </DemoContainer>
            </LocalizationProvider>

            <form onSubmit={onSubmit} method='POST'>
              <GameForm contents={contents} titleError={titleError} />
              <Button type='submit'>決定</Button>
            </form>
          </Box>
        }
      </Container>
      <Footer />
    </main >
  )
}
