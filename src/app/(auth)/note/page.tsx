"use client"

import * as React from 'react';
import { useRouter, useParams } from 'next/navigation'
import LoadingPage from '@/components/LoadingPage';
import AuthLoadingPage from '@/components/AuthLoadingPage';
import { useAuth, useRequireAuth } from '@/context/auth/AuthContext';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import BoardCardBox from '@/features/routes/board/BoardCardBox';
import LeftBar from '@/components/LeftBar';
import NoteHeader from '@/features/routes/note/NoteHeader';
import CreateButton from '@/features/common/button/CreateButton';
import { useGetAllBoard } from '@/hooks/board/useGetAllBoard';
import WelcomeModal from '@/features/routes/home/welcomeModal/WelcomeModal';
import dayjs from 'dayjs';
import NoteCalendar from '@/features/routes/note/NoteCalendar'; 

export default function Home() {
  const { user, isLoading } = useAuth()
  const [date, setDate] = React.useState(new Date())
  const [displayMenu, setDisplayMenu] = React.useState(0)
  const [isBoardCreateModal, setIsBoardCreateModal] = React.useState(false)
  const [showCalendar, setShowCalendar] = React.useState(false)
  const [allBoard, setAllBoard, getAllBoard, isAllBoardLoading] = useGetAllBoard(user)

  useRequireAuth()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-white" style={{ overflow: "hidden", position: "relative", height: "100vh", width: "100vw" }}>
      {isLoading ?
        <AuthLoadingPage />
      :
        <>
          <WelcomeModal />
          
          <LeftBar />
          <NoteHeader date={date} setDate={setDate} displayMenu={displayMenu} setDisplayMenu={setDisplayMenu} showCalendar={showCalendar} setShowCalendar={setShowCalendar} />
          
          <Box sx={{ background: "white", overflowY: "scroll", overflowX: "hidden", position: "fixed", zIndex: 1000, width: "100%", height: "100vh" }}>
            <Container maxWidth="md" sx={{ position: "relative", pt: { xs: "120px", md: "60px" }, px: 0, pl: { md: "120px", lg: "250px" }, pb: "10px" }}>
              {showCalendar ?
                  <NoteCalendar user={user} selectedDate={date} setSelectedDate={setDate} contents={allBoard} setShowCalendar={setShowCalendar} />
              :
                (isAllBoardLoading || !allBoard) ?
                <Box sx={{ width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <LoadingPage />
                </Box>
                  :
                <Box>
                  <CreateButton onClick={() => {window.scrollTo(0, 0), setIsBoardCreateModal(true)}} />
                  <BoardCardBox user={user} contents={allBoard.filter(board => board.date === dayjs(date).format('YYYY-MM-DD'))} setContents={setAllBoard} date={date} menu={isBoardCreateModal} setMenu={setIsBoardCreateModal} />
                </Box>
              }
            </Container>
          </Box>
        </>
      }
    </main >
  )
}
