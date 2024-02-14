"use client"

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation'
import { useGetProblem } from '@/hooks/problem/useGetProblem';
import { useGetAllGame } from '@/hooks/game/useGetGame';
import { useGetAllPractice } from '@/hooks/practice/useGetPractice';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TitleBox from "@/components/TitleBox";
import DateBox from "@/components/form/DateBox"
import MenuSelectBox from "@/components/notepage/MenuSelectBox"
import ProblemContentsBox from '@/components/notepage/contents/ProblemContentsBox';
import GameContentsBox from '@/components/notepage/contents/GameContentsBox';
import PracticeContentsBox from '@/components/notepage/contents/PracticeContentsBox';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import NoteContentsBox from '@/components/notepage/contents/NoteContentsBox';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CreateForm from '@/components/form/NoteCreateForm';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';


export default function Home() {
  const params = useParams()
  // const [contents, setContents] = React.useState<string | null>(null);
  const [menu, setMenu] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState<boolean>(true)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setMenu(newValue);
  };

  const handleMenuChange = (newValue) => {
    setMenu(newValue);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between, bg-white">
      <Container maxWidth="sm" sx={{ px: 0, position: "relative" }}>
        <CreateForm />
      </Container>
      < Footer />
    </main >
  )
}
