"use client"

import * as React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import MenuList from '@mui/material/MenuList'
import MenuItem from '@mui/material/MenuItem'
import IosShareIcon from '@mui/icons-material/IosShare';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Checkbox from '@mui/material/Checkbox';
import { Stack } from '@mui/material';

type PageProps = {
    nextPage: any
}

export default function WelcomeMessage({ nextPage }: PageProps) {
    return (
        <Box>
            <Box sx={{ textAlign: "center", p: 2 }}>
                <Typography variant="h5" sx={{ color: "black", pb: 1 }}>
                    ようこそcoco-boardへ！
                </Typography>
                <Typography variant="body1" sx={{ color: "black", fontSize: 15, py: 1 }}>
                    coco-boardは戦術・試合・練習の記録ができるアプリです。
                    サッカーの振り返りにご活用いただけますと幸いです。
                </Typography>
            </Box>
            <Divider />
            <Stack direction="row" justifyContent="flex-end">
                <Button onClick={nextPage}>
                    <Typography variant="button" sx={{ mx: "auto", fontWeight: "bold" }} >次へ</Typography>
                </Button>
            </Stack>
        </Box>
    );
}