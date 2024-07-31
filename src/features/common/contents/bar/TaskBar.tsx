"use client"

import * as React from 'react';
import type { User } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

type PageProps = {
    task: any,
    EditButtonClick: any,
    DeleteButtonClick: any,
}

export default function TaskBar({ task, EditButtonClick, DeleteButtonClick }: PageProps) {
    const router = useRouter()

    return (
        <Box sx={{ position: 'sticky', top: 0, left: 0, right: 0, backgroundColor: "white", zIndex: 1200 }} >
            <Grid sx={{ px: 1, height: "40px" }} container direction="row" alignItems="center" justifyContent="space-between">
                <Grid>
                    <IconButton onClick={(event) => { task != undefined && router.back() }} ><ArrowLeftIcon /></IconButton>
                </Grid>
                <Grid>
                    <Typography variant="h6" sx={{ fontSize: 14 }} component="div">
                        取り組むこと
                    </Typography>
                </Grid>
                <Grid >
                    <Stack direction="row" spacing={1}>
                        <IconButton onClick={EditButtonClick} ><EditIcon sx={{ fontSize: "1.25rem" }} /></IconButton>
                        <IconButton onClick={DeleteButtonClick} ><DeleteIcon sx={{ fontSize: "1.25rem" }} /></IconButton>
                    </Stack>
                </Grid>
            </Grid>
            <Divider />
        </Box>
    )
}