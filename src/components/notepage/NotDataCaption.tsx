"use client"

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

type PageProps = {
    url: string
}

export default function NotDataCaption({ url }: PageProps) {
    const ClickButton = () => {
        const router = useRouter()
        router.replace(url)
    }

    return (
        <Box sx={{ p: 5, height: '40vh', textAlign: "center" }} >
            <Typography variant="body1" gutterBottom>
                データがありません。
            </Typography>
            <Button onClick={ClickButton}>
                記録する
            </Button>
        </Box>
    )
}