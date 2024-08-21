"use client"

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import type { GameContentsType } from '@/types/game/GameContents';
import { useDeleteGame } from '@/hooks/game/useDeleteGame';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import DeleteConfirmModal from '@/features/common/contents/modal/ConfirmModal';
import ContentsMenuModal from '@/features/common/contents/modal/NoteMenuModal';
import CardActionArea from '@mui/material/CardActionArea';
import { gameModalTitle, deleteNoteMs } from '@/constants/ModalMessage';
import MoreHorizButton from '@/features/common/contents/button/MoreHorizButton';
import { useUpdateGame } from '@/hooks/game/useUpdateGame';
import GameForm from '@/features/common/forms/game/GameForm';

type PageProps = {
    contents: GameContentsType
    getContents: any
}

export default function GameCard({ contents, getContents }: PageProps) {
    const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
    const [editModalOpen, setEditModalOpen] = React.useState<boolean>(false)
    const [isLoading, setIsLoading] = React.useState<boolean>(true)

    const [menuModalOpen, setMenuModalOpen] = React.useState<boolean>(false)

    const router = useRouter()

    const menuHandleClick = () => {
        setMenuModalOpen(true)
    }

    const ViewButtonClick = () => {
        router.push(`/game/${contents.contentsId}`)
    }

    const EditButtonClick = () => {
        setEditModalOpen(true)
    }

    const DeleteButtonClick = () => {
        setMenuModalOpen(false)
        setDeleteModalOpen(true)
    }

    const DeleteGameContents = async () => {
        const res = await useDeleteGame(contents.contentsId)
        if (res.ok) {
            getContents(contents.contentsId)
            setDeleteModalOpen(false)
            setMenuModalOpen(false)
        }
    }

    return (
        <>
            <DeleteConfirmModal open={deleteModalOpen} setOpen={setDeleteModalOpen} title={gameModalTitle} message={deleteNoteMs} confirmText="削除" onSubmit={DeleteGameContents} />
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
                                    <Chip label="試合" color="success" size="small" sx={{ fontSize: 9 }} />
                                </Box>
                            </Stack>


                            <Divider />

                            <Box sx={{ width: "100%", px: 2, my: 1 }}>
                                <Stack direction="row"  >
                                    <Box sx={{ width: "100%" }}>
                                        <Typography variant="body2" sx={{ fontSize: 14, mb: 1 }}>
                                            {String(contents.name1)}
                                        </Typography>
                                        <Typography variant="body2" sx={{}}>
                                            {String(contents.score1)}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ width: "100%" }}>
                                        <Typography variant="body2" sx={{ fontSize: 14, mb: 1 }}>
                                            {String(contents.name2)}
                                        </Typography>
                                        <Typography variant="body2" sx={{}}>
                                            {String(contents.score2)}
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Box>
                        </CardActionArea >
                    </Box>
                </Box>
            </Card >
        </>
    )
}