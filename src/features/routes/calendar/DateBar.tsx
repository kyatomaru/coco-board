import * as React from 'react';
import { useParams, useRouter } from 'next/navigation'
import { Typography, IconButton, Box, Divider } from '@mui/material';
import ArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import type { User } from 'firebase/auth';
import { useDateFormat } from '@/utils/useDateFormat';


export default function DateBar() {
    const params = useParams()
    const router = useRouter()

    return (
        <Box sx={{ position: 'sticky', top: 0, left: 0, right: 0, backgroundColor: "white", zIndex: 1100 }} >
            <Box sx={{ height: "40px" }} >
                <Box sx={{ float: "left" }}>
                    <IconButton onClick={(event) => router.push("/calendar")} ><ArrowLeftIcon /></IconButton>
                </Box>
                <Box sx={{ height: "40px", mx: "auto", textAlign: "center", width: 150 }}>
                    <Typography variant="h6" sx={{ fontSize: 14, lineHeight: "40px" }} component="div">
                        {useDateFormat(String(params.date))}
                    </Typography>
                </Box>
            </Box>
            <Divider />
        </Box>
    );
};