"use client"

import * as React from 'react';
import { useRouter } from 'next/navigation'
import { auth } from '@/app/firebase';
import { PracticeContentsModel } from '@/types/PracticeContents';
import Header from "@/components/Header";
import MenuSelectBox from "@/components/form/MenuSelectBox"
import Footer from "@/components/Footer";
import dayjs from 'dayjs';
import ja from 'date-fns/locale/ja'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import PracticeForm from "@/components/form/practice/PracticeForm"
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useInsertPractice } from '@/hooks/practice/useInsertPractice';

async function insertData(event: React.FormEvent<HTMLFormElement>, contents, dateValue) {
  event.preventDefault()
  // const formData = new FormData(event.currentTarget)
  const data = contents
  // const data = Object.fromEntries(formData)



  const uid = await auth.currentUser?.uid;
  if (uid) {
    data.uid = uid;

    if (dateValue) data.date = dayjs(String(dateValue)).format('YYYY-MM-DD');

    const date = new Date();
    data.createDate = date;
    data.updateDate = date;

    fetch('/api/practice/', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json'
      }
    })
  }
}

export default function Home() {
  const router = useRouter()

  const [dateValue, setDateValue] = React.useState<Date | null>(new Date());
  const [titleError, setTitleError] = React.useState(false);
  const [contents, setContents] = React.useState(new PracticeContentsModel());
  const [isLoading, setIsLoading] = React.useState(false);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true)
    insertData(event, contents, dateValue).then(() => {
      router.push('/notes/' + dayjs(String(dateValue)).format('YYYY-MM-DD'));
    })
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-white">
      <Header />
      <Container sx={{ mt: "80px", mb: "80px" }}>
        <Box>
          <Stack direction="row" sx={{ p: 1, justifyContent: "center", alignItems: "center" }}>
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker format='yyyy年MM月dd日' value={dateValue} disableFuture onChange={(newValue) => setDateValue(newValue)} />
              </DemoContainer>
            </LocalizationProvider>
            <MenuSelectBox />
          </Stack>
        </Box>

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
          <PracticeForm contents={contents} titleError={titleError} />
          <Button type='submit'>決定</Button>
        </Box>
      </Container>
      <Footer />
    </main >
  )
}
