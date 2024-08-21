"use client"

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import dayjs from 'dayjs';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { BoardType } from '@/types/board/Board';

type PageProps = {
    contents: BoardType,
}


export default function TopViewBar({ contents }: PageProps) {
    const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState<boolean>(true)

    const [contentsModalOpen, setContentsModalOpen] = React.useState<boolean>(false)

    const menuHandleClick = () => {
        setContentsModalOpen(true)
    }

    const router = useRouter()

    const ViewButtonClick = () => {
        router.replace(`/board/${contents.contentsId}`)
    }

    const EditButtonClick = () => {
        router.replace(`/board/edit/${contents.contentsId}`)
    }

    const DeleteButtonClick = () => {
        setDeleteModalOpen(true)
    }

    return (
        <Box sx={{ position: 'sticky', top: 0, left: 0, right: 0, backgroundColor: "white", zIndex: 1900, borderRight: "solid 0.5px #b2b2b2", borderLeft: "solid 0.5px #b2b2b2" }} >
            <Grid sx={{ px: 1 }} container direction="row" alignItems="center" justifyContent="space-between">
                <Grid >
                    <IconButton size='small' onClick={(event) => router.push(`/calendar/${dayjs(String(contents.date)).format('YYYY-MM-DD')}`)} ><ArrowBackIosNewIcon /></IconButton>
                </Grid>
                <Grid>
                    <Typography variant="h6" sx={{ fontSize: 14 }} component="div">
                        記録
                    </Typography>
                </Grid>
                <Grid >
                    <Stack direction="row" spacing={1}>
                        <IconButton size='small' onClick={EditButtonClick} ><EditIcon /></IconButton>
                        <IconButton size='small' onClick={DeleteButtonClick} ><DeleteIcon /></IconButton>
                    </Stack>
                    {/* <NextButton size="small" sx={{ backgroundColor: "#1976d2 !important" }} variant='filled' type='submit'>記録する</NextButton> */}
                </Grid>
            </Grid>
            <Divider />
        </Box>
    )
}