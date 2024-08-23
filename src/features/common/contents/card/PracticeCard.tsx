"use client"

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import type { PracticeContentsType } from '@/types/practice/PracticeContents';
import { useDeletePractice } from '@/hooks/practice/useDeletePractice';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import CardActionArea from '@mui/material/CardActionArea';
import DeleteConfirmModal from '@/features/common/contents/modal/ConfirmModal';
import ContentsMenuModal from '@/features/common/contents/modal/NoteMenuModal';
import { practiceModalTitle, deleteNoteMs } from '@/constants/ModalMessage';
import MoreHorizButton from '@/features/common/contents/button/MoreHorizButton';

type PageProps = {
    allContents: any,
    contents: PracticeContentsType,
    setContents: any
}

export default function PracticeCard({ allContents, contents, setContents }: PageProps) {
    const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState<boolean>(true)

    const [menuModalOpen, setMenuModalOpen] = React.useState<boolean>(false)

    const router = useRouter()

    const menuHandleClick = () => {
        setMenuModalOpen(true)
    }

    const ViewButtonClick = () => {
        router.push(`/practice/${contents.contentsId}`)
    }

    const EditButtonClick = () => {
        router.replace(`/practice/edit/${contents.contentsId}`)
    }

    const DeleteButtonClick = () => {
        setMenuModalOpen(false)
        setDeleteModalOpen(true)
    }

    const DeletePracticeContents = async () => {
        const res = await useDeletePractice(contents.contentsId)
        if (res.ok) {
            const newData = allContents.filter((value) => { return value.contentsId != contents.contentsId })
            setContents([...newData])
            setDeleteModalOpen(false)
            setMenuModalOpen(false)
        }
    }

    return (
        <>
            <DeleteConfirmModal open={deleteModalOpen} setOpen={setDeleteModalOpen} title={practiceModalTitle} message={deleteNoteMs} confirmText="削除" onSubmit={DeletePracticeContents} />
            <ContentsMenuModal open={menuModalOpen} setOpen={setMenuModalOpen} Delete={DeleteButtonClick} Edit={EditButtonClick} View={ViewButtonClick} />

            <Card sx={{ minWidth: 275 }}>
                <Box sx={{ width: '100%', bgcolor: 'background.paper', position: "relative" }}>
                    <Box sx={{ position: "relative" }}>
                        <MoreHorizButton menuHandleClick={menuHandleClick} />

                        <CardActionArea onClick={() => ViewButtonClick()} >
                            <Stack direction="row" sx={{ p: 1, mx: 1 }} >
                                <Box sx={{ width: "100%", alignItems: "center" }} >
                                    <Typography variant="h6" sx={{ fontSize: 16 }} component="div">
                                        {String(contents.title)}
                                    </Typography>
                                    <Chip label="練習" color="primary" size="small" sx={{ fontSize: 9 }} />
                                </Box>
                            </Stack>

                            <Divider />

                            <Box sx={{ width: "100%" }}>
                                <Stack direction="row" divider={<Divider orientation="vertical" flexItem />} justifyContent="space-between" alignItems="flex-start" >
                                    <Box sx={{ width: "100%", px: 2, my: 1 }}>
                                        <Typography sx={{ fontSize: 14, mb: 1 }} color="text.secondary">
                                            場所
                                        </Typography>
                                        <Typography variant="body2" sx={{}}>
                                            {String(contents.place)}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ width: "100%", px: 2, my: 1 }}>
                                        <Typography sx={{ fontSize: 14, mb: 1 }} color="text.secondary">
                                            天気
                                        </Typography>
                                        <Typography variant="body2" sx={{}}>
                                            {String(contents.weather)}
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Box>
                        </CardActionArea>
                    </Box >
                </Box >
            </Card >
        </>
    )
}