"use client"

import * as React from 'react';
import { useRouter } from 'next/navigation'
import { auth } from '@/app/firebase';
import { TargetModel } from '@/types/Target';
// import { ProblemModel } from '@/types/problem/Problem';
import Header from "@/components/Header";
import TitleBox from "@/components/TitleBox";
import Footer from "@/components/Footer";
import dayjs from 'dayjs';
// import TargetForm from "@/components/form/target/TargetForm"

import Button from '@mui/material/Button';

export default function Home() {
  const router = useRouter()

  const [dateValue, setDateValue] = React.useState<Date | null>(new Date());
  const [target, setTarget] = React.useState(new TargetModel());
  // const [problem, setProblem] = React.useState(new ProblemModel());

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

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Header />
      <TitleBox title="Target Page" />

      <form onSubmit={onSubmit} method='POST'>
        {/* <TargetForm targetProp={target} problemProp={problem} /> */}
        <Button type='submit'>決定</Button>
      </form>
      <Footer />
    </main >
  )
}
