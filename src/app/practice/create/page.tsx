"use client"

import * as React from 'react';
import { useRouter } from 'next/navigation'
import { getAuth } from "firebase/auth";
import { auth } from '@/app/firebase';
import { PracticeContentsModel } from '@/types/PracticeContents';
import Header from "@/components/Header";
import TitleBox from "@/components/TitleBox";
import MenuSelectBox from "@/components/createpage/MenuSelectBox"
import Footer from "@/components/Footer";
import { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import ja from 'date-fns/locale/ja'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import PracticeForm from "@/components/createpage/PracticeForm"
import Button from '@mui/material/Button';
import { format } from 'date-fns'

export default function Home() {
  const router = useRouter()

  const [dateValue, setDateValue] = React.useState<Date | null>(new Date());
  const [contents, setContents] = React.useState(new PracticeContentsModel());

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData)

    if (dateValue) data.date = String(dateValue);

    const uid = await auth.currentUser?.uid;
    if (uid) {
      data.uid = uid;

      const date = new Date();
      data.createDate = String(date);
      data.updateDate = String(date);

      const response = await fetch('/api/practice/create', {
        method: 'POST',
        body: JSON.stringify(data),
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

  const clickGameButton = () => {
    router.push('/game/create')
  }

  const clickPracticeButton = () => {
    router.push('/practice/create')
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Header />
      <TitleBox title="Create Page" />
      <MenuSelectBox />

      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
        <DemoContainer components={['DatePicker']}>
          <DatePicker format='yyyy年MM月dd日' value={dateValue} disableFuture onChange={(newValue) => setDateValue(newValue)} />
        </DemoContainer>
      </LocalizationProvider>

      <form onSubmit={onSubmit} method='POST'>
        <PracticeForm contents={contents} />
        <Button type='submit'>決定</Button>
      </form>
      <Footer />
    </main >
  )
}
