"use client"

import * as React from 'react';
import { useRouter } from 'next/navigation'
import { getAuth } from "firebase/auth";
import { auth } from '@/app/firebase';
import dayjs from 'dayjs';
import ja from 'date-fns/locale/ja'
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ProblemContentsModel } from '@/types/ProblemContents';
import HomeContentsBox from '@/components/homepage/HomeContentsBox';
import { Content } from 'next/font/google';
import { useGetAllProblem } from '@/hooks/problem/useGetProblem';
import ProblemForm from '@/components/form/problem/ProblemForm';
import ProblemFormModal from '@/components/form/problem/ProblemFormModal';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';

export default function Home() {
  const router = useRouter()

  const [dateValue, setDateValue] = React.useState<Date | null>(new Date());
  const [isLoading, setIsLoading] = React.useState<boolean>(true)
  const [isCreate, setIsCreate] = React.useState<boolean>(true)
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [newProblemContents, setNewProblemContents] = React.useState(new ProblemContentsModel());

  const problemContents = useGetAllProblem(setIsLoading)

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const data = newProblemContents
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

        const response = await fetch('/api/problem/', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'content-type': 'application/json'
          }
        }).then((res) => {
          if (res.ok) {
            try {
              setNewProblemContents(new ProblemContentsModel())
              setOpen(false)
              router.push('/');
              router.refresh()
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
      {isLoading ?
        <Container fixed sx={{ height: "100vh", position: "relative", textAlign: "center" }} >
          <CircularProgress sx={{ position: "absolute", top: "50%", bottom: "50%", my: "auto" }} />
        </Container>
        :
        <Container fixed>
          <HomeContentsBox problemContents={problemContents} />
        </Container>
      }
      {/* <TargetForm targetProp={target} problemProp={problem} /> */}
      <IconButton onClick={handleOpen} >
        <AddCircleIcon sx={{ width: "50px", height: "50px" }} />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ProblemFormModal contents={newProblemContents} onSubmit={onSubmit} />
      </Modal>

      <Footer />
    </main >
  )
}
