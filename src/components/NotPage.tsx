"use client"

import * as React from 'react';
import { useRouter } from 'next/navigation';
import LeftBar from './LeftBar';
import Header from './Header';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import ContentsBar from '@/features/common/contents/bar/ContentsBar';

export default function NotPage({ title }: { title: string }) {
    const router = useRouter()
    return (
        <Box sx={{
            position: "relative", pl: { md: "90px", lg: "250px" }, width: "100%", height: "90vh", alignItems: "center", justifyContent: "center"
        }}>
            <ContentsBar title={title} contents={[]} />
            
            <Typography sx={{
                textAlign: "center",
                lineHeight: "100vh"
            }}>
                ページが見つかりません。
            </Typography>
        </Box >
    );
}