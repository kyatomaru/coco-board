"use client"

import * as React from 'react';
import ContactPage from '@/components/docs/contact/ContactPage';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Footer from '@/components/docs/Footer';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-white">
      <ContactPage />
      <Box sx={{ width: "100%", position: "fixed", bottom: 0 }}>
        <Divider />
        <Footer />
      </Box>
    </main >
  )
}
