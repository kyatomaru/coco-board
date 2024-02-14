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

async function updateData(event: React.FormEvent<HTMLFormElement>, data, dateValue) {
  event.preventDefault()
  // const formData = new FormData(event.currentTarget)
  // const updateData = Object.fromEntries(formData)

  const uid = await auth.currentUser?.uid;
  if (uid) {
    data.updateData.uid = uid;

    if (dateValue) data.updateData.date = dayjs(String(dateValue)).format('YYYY-MM-DD');

    const date = new Date();
    data.updateData.createDate = date;
    data.updateData.updateDate = date;

    fetch('/api/game/', {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json'
      }
    })
  }
}

export default function Home() {
  const router = useRouter()
  const params = useParams()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [titleError, setTitleError] = React.useState(false);
  const [dateValue, setDateValue] = React.useState<Date | null>(new Date());

  const contents = useGetIdGame(setIsLoading, setDateValue)

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true)
    const data = { updateData: contents, contentsId: params.contentsId }
    updateData(event, data, dateValue).then(() => {
      router.push('/notes/' + dayjs(String(dateValue)).format('YYYY-MM-DD'));
    })
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
          <Container maxWidth="sm" fixed sx={{ mt: "80px", mb: "80px" }}>
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
          </Container>
        }
      </Container>
      <Footer />
    </main >
  )
}
