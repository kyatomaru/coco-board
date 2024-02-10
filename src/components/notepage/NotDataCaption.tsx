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
    const router = useRouter();

    const ClickButton = () => {
        router.push(url);
    }

    return (
        <Box sx={{ py: 5, height: '200px', textAlign: "center" }} >
            <Typography variant="body2" gutterBottom>
                記録がありません。
            </Typography>
            <Button onClick={ClickButton}>
                記録する
            </Button>
        </Box>
    )
}