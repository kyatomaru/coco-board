"use client"

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation'
import LoadingPage from '@/components/AuthLoadingPage';
import { useIsAuth } from '@/hooks/auth/useIsAuth';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import MenuSelectBox from '@/features/common/create/MenuSelectBox';
import type { User } from 'firebase/auth';
import { auth } from '@/app/firebase';
import { onAuthStateChanged, getAuth } from "firebase/auth"
import LoginPage from '@/features/routes/accounts/login/LoginPage';
import BoardViewForm from '@/features/common/forms/board/BoardViewForm';
import { BoardModel } from '@/types/board/Board';
import { useInsertBoard } from '@/hooks/board/useInsertBoard';
import GameForm from '@/features/common/forms/game/GameForm';
import { GameContentsModel } from '@/types/game/GameContents';
import { useInsertGame } from '@/hooks/game/useInsertGame';
import PracticeForm from '@/features/common/forms/practice/PracticeForm';
import { PracticeContentsModel } from '@/types/practice/PracticeContents';
import { useInsertPractice } from '@/hooks/practice/useInsertPractice'
import LeftBar from '@/components/LeftBar';
import dayjs from 'dayjs';
import { Button, Stack, Typography } from '@mui/material';
import { Card } from '@mui/material';
import Modal from '@mui/material/Modal';
import CircularProgress from '@mui/material/CircularProgress';



export default function InviteSubscribe() {
    const router = useRouter()

    return (
        <Box
            sx={{
                '& .MuiTextField-root': { m: 1 },
                paddingBottom: { xs: "148px", md: "90px" },
                minHeight: "100vh",
                backgroundColor: "white",
            }}
        >
            <Box sx={{ textAlign: "center", height: "100vh", marginBottom: "50%", marginTop: "50%", px: 3 }}>
                <Typography sx={{ fontSize: 13, textAlign: "center", mb: 2, color: "black" }} component="h2">
                    今週（日曜日から土曜日）の保存数の上限に達しました。
                </Typography>
                <Button size="small" sx={{ p: 1, borderRadius: "10px", cursor: "pointer", backgroundColor: "#2e7d32 !important" }} variant='contained' type='submit' onClick={() => router.push('/plan')}>
                    プランをアップグレードする
                </Button>
            </Box>
        </Box>
    )
}