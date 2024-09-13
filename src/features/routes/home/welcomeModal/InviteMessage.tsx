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
import Stack from '@mui/material/Stack';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    minWidth: 320,
    width: "400px",
    maxWidth: '100%',
    zIndex: 2000,
    py: 1
};

type PageProps = {
    previousPage: any,
    nextPage: any
}

export default function InviteMessage({ previousPage, nextPage }: PageProps) {
    return (
        <Box>
            <Box sx={{ textAlign: "center", p: 3 }}>
                <Typography variant="body1" sx={{ color: "black", fontSize: 16, pb: 4 }}>
                    スマートフォン / タブレットでご利用の方は
                    <br />
                    以下の方法でcoco-boardをホーム画面に追加できます！
                </Typography>
                <Typography variant="body1" sx={{ color: "black", fontSize: 14, pb: 1 }}>
                    iOS:「{<IosShareIcon />}」から「ホーム画面に追加」
                </Typography>
                <Typography variant="body1" sx={{ color: "black", fontSize: 14, pb: 1 }}>
                    Android:「{<MoreVertIcon />}」から「ホーム画面に追加」
                </Typography>
            </Box>
            <Divider />
            <Stack direction="row" justifyContent="space-between">
                <Button onClick={previousPage}>
                    <Typography variant="button" sx={{ mx: "auto", fontWeight: "bold" }} >前へ</Typography>
                </Button>
                <Button onClick={nextPage}>
                    <Typography variant="button" sx={{ mx: "auto", fontWeight: "bold" }} >次へ</Typography>
                </Button>
            </Stack>
        </Box>
    );
}