"use client"

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation'
import Footer from "@/components/Footer";
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import NoteContentsBox from '@/components/notepage/contents/NoteContentsBox';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import GrowthCreateForm from '@/components/homepage/problem/GrowthCreateForm';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { ProblemContentsModel, ProblemContentsType } from '@/types/problem/ProblemContents';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import type { User } from 'firebase/auth';
import { auth } from '@/app/firebase';
import { ProblemGrowthModel } from '@/types/problem/ProblemGrowth';

const style = {
  // height: "auto",
  // position: "absolute",
  // zIndex: 90,
  // top: "0",
  borderRight: "solid 0.5px #b2b2b2",
  borderLeft: "solid 0.5px #b2b2b2",
  bgcolor: "white",
  // pb: "60px",
  minHeight: "100vh"
};

export default function Home() {
  const params = useParams()
  // const [contents, setContents] = React.useState<string | null>(null);
  const [user, setUser] = React.useState<User | null>(null);
  const [token, setToken] = React.useState<string | null>(null);
  const [menu, setMenu] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState<boolean>(true)
  const [problems, setProblems] = React.useState([]);
  const [growth, setGrowth] = React.useState([]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setMenu(newValue);
  };

  const handleMenuChange = (newValue) => {
    setMenu(newValue);
  };

  const GetProblem = async (uid: string | undefined) => {
    if (uid) {
      const getParams = { uid: uid };
      const query = new URLSearchParams(getParams);

      fetch(`/api/problem/?${query}`)
        .then((response) => response.json())
        .then((data) => {
          setProblems(data)
          const growthList = Array()
          for (let index = 0; index < data.length; index++) {
            growthList.push(new ProblemContentsModel())
          }
          setGrowth(growthList)
        })
    }
  }

  React.useEffect(() => {
    setIsLoading(true)
    // const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(auth.currentUser);
        user.getIdToken().then((token) => {
          setToken(token);
        });
        GetProblem(auth.currentUser?.uid)
        setIsLoading(false)
      } else {
        setUser(null);
        setToken(null);
      }
    });

  }, [])

  const DeleteProblem = () => {
    setIsLoading(true)
    const auth = getAuth();
    GetProblem(auth.currentUser?.uid)
    setIsLoading(false)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between, bg-white">
      <Container maxWidth="sm" sx={{ px: "0 !important", position: "relative", ...style }}>
        <GrowthCreateForm problems={problems} growth={growth} />
      </Container>
      < Footer />
    </main >
  )
}
