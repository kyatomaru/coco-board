"use client"

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { useDeleteBoard } from '@/hooks/board/useDeleteBoard';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import CardActionArea from '@mui/material/CardActionArea';
import DeleteConfirmModal from '@/features/common/contents/modal/ConfirmModal';
import ContentsMenuModal from '@/features/common/contents/modal/NoteMenuModal';
import { boardModalTitle } from '@/constants/modalMessage';
import { deleteNoteMs } from '@/constants/modalMessage';
import MoreHorizButton from '@/features/common/contents/button/MoreHorizButton';

type PageProps = {
    contents: any,
    getContents: any
}

export default function BoardCard({ contents, getContents }: PageProps) {
    const router = useRouter()
    const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
    const [menuModalOpen, setMenuModalOpen] = React.useState<boolean>(false)

    const menuHandleClick = () => {
        setMenuModalOpen(true)
    }

    const ViewButtonClick = () => {
        router.replace(`/board/${contents.contentsId}`)
    }

    const EditButtonClick = () => {
        router.replace(`/board/edit/${contents.contentsId}`)
    }

    const DeleteButtonClick = () => {
        setMenuModalOpen(false)
        setDeleteModalOpen(true)
    }

    const DeleteBoardContents = async () => {
        const res = await useDeleteBoard(contents.contentsId)
        if (res.ok) {
            getContents()
            setDeleteModalOpen(false)
            setMenuModalOpen(false)
        }
    }

    return (
        <>
            <DeleteConfirmModal open={deleteModalOpen} setOpen={setDeleteModalOpen} title={boardModalTitle} message={deleteNoteMs} confirmText="削除" onSubmit={DeleteBoardContents} />
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
                                    <Chip label="ボード" color="warning" size="small" sx={{ fontSize: 9 }} />
                                </Box>
                            </Stack>

                            <Divider />
                            <Box sx={{ width: "100%" }}>
                                <Stack direction="row" divider={<Divider orientation="vertical" flexItem />} justifyContent="space-between"  >
                                    <Box sx={{ width: "100%", px: 2, my: 1 }}>
                                        < CardMedia
                                            component="img"
                                            // height="194"
                                            image={contents.imagePath}
                                        />
                                    </Box>
                                    <Box sx={{ width: "100%", px: 2, my: 1 }}>
                                        <Typography sx={{ fontSize: 14, mb: 1 }} color="text.secondary">
                                            コメント
                                        </Typography>
                                        <Typography variant="body2" sx={{}}>
                                            {String(contents.comment)}
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