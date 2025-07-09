"use client"

import * as React from 'react';
import AuthLoadingPage from '@/components/AuthLoadingPage';
import { useAuth, useRequireAuth } from '@/context/auth/AuthContext';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import LeftBar from '@/components/LeftBar';
import WelcomeModal from '@/features/routes/home/welcomeModal/WelcomeModal';
import Footer from '@/components/Footer';
import SettingPage from '@/features/routes/setting/SettingPage';
import SettingHeader from '@/features/routes/setting/SettingHeader';

export default function Home() {
  const { isLoading } = useAuth()

  useRequireAuth()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-white" style={{ overflow: "hidden", position: "relative" }}>
      {isLoading ?
        <AuthLoadingPage />
      :
        <>
          <WelcomeModal />

          <LeftBar />
          <SettingHeader />
          
          <Box sx={{ background: "white", overflowY: "scroll", overflowX: "hidden", position: "fixed", zIndex: 1000, width: "100%", height: "100vh" }}>
            <Container maxWidth="md" sx={{ position: "relative", pt: "40px", px: 0, pl: { md: "120px", lg: "250px" } , pb: {xs: "56px", md: "0px"}}}>
              <SettingPage />
            </Container>
          </Box>
        </>
      }

      <Footer />
    </main >
  )
}
