"use client"

import * as React from 'react';
import { useRouter, useParams } from 'next/navigation'
import { useIsAuth } from '@/hooks/auth/useIsAuth';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { User } from 'firebase/auth';
import { auth } from '@/app/firebase';
import { onAuthStateChanged, getAuth } from "firebase/auth"
import { useGetNote } from '@/hooks/note/useGetDateNote';
import { useGetBoard } from '@/hooks/board/useGetDateBoard';
import Button from '@mui/material/Button';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import LaunchIcon from '@mui/icons-material/Launch';

export default function DefaultBrowserModal() {

    return (
        <Box sx={{ width: "100%", }}>
            <Box sx={{ mb: 3 }}>
                <Typography variant="body1" sx={{ color: "black", fontSize: 14, fontWeight: 400 }}>
                    Instagramからご利用の方は、以下の方法でブラウザからご利用ください。
                </Typography>
            </Box>
            <Box>
                <Typography variant="body1" sx={{ color: "black", fontSize: 14, pb: 1, textAlign: "left" }}>
                    1. 右上の「{<MoreHorizIcon />}」ボタンをクリックする
                </Typography>
                <Typography variant="body1" sx={{ color: "black", fontSize: 14, pb: 1, textAlign: "left" }}>
                    2. 「外部ブラウザーで開く {<LaunchIcon />}」をクリックする
                </Typography>
            </Box>
        </Box>
    )
}
