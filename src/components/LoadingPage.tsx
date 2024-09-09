"use client"

import * as React from 'react';
import { useRouter } from 'next/navigation'
import { onAuthStateChanged, getAuth } from "firebase/auth"
import { auth } from '@/app/firebase';
import type { User } from "firebase/auth"
import { Router } from 'next/router';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function LoadingPage() {
    return (
        <Box sx={{
            display: 'flex', width: "100%", height: "90vh", alignItems: "center", justifyContent: "center"
        }}>
            <CircularProgress sx={{ zIndex: 2000 }} />
        </Box>
    );
}