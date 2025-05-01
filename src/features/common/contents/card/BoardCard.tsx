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
import { boardModalTitle, deleteNoteMs } from '@/constants/ModalMessage';
import MoreHorizButton from '@/features/common/contents/button/MoreHorizButton';
import Skeleton from '@mui/material/Skeleton';

type PageProps = {
    allContents: Array<any>,
    contents: any,
    setContents: any
}

export default function BoardCard({ allContents, contents, setContents }: PageProps) {
    const router = useRouter()
    const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
    const [menuModalOpen, setMenuModalOpen] = React.useState<boolean>(false)

    const menuHandleClick = () => {
        setMenuModalOpen(true)
    }

    const ViewButtonClick = () => {
        router.push(`/board/${contents.contentsId}`)
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
            const newData = allContents.filter((value) => { return value.contentsId != contents.contentsId })
            setContents([...newData])
            setDeleteModalOpen(false)
            setMenuModalOpen(false)
        }
    }

    return (
        <>
            <DeleteConfirmModal open={deleteModalOpen} setOpen={setDeleteModalOpen} title={boardModalTitle} message={deleteNoteMs} confirmText="削除" onSubmit={DeleteBoardContents} />
            <ContentsMenuModal open={menuModalOpen} setOpen={setMenuModalOpen} Delete={DeleteButtonClick} Edit={EditButtonClick} View={ViewButtonClick} />
            <Card elevation={0}>
                <Box sx={{ width: '100%', bgcolor: 'background.paper', position: "relative" }}>
                    <Box sx={{ position: "relative" }}>
                        <MoreHorizButton menuHandleClick={menuHandleClick} />

                        <CardActionArea onClick={() => ViewButtonClick()} >
                            <Stack direction="row" sx={{ pt: 1, px: 1 }} >
                                <Typography variant="h6" sx={{ fontSize: 14}} component="h5">
                                    {contents.title || "無題のボード"}
                                </Typography>
                            </Stack>

                            <Box sx={{ width: "100%", pb: 1 }}>
                                <Stack direction="row" justifyContent="space-between"  >
                                    <Box sx={{ width: "100%", pl: 1, my: 1 }}>
                                        {!contents.imagePath ?
                                            <Skeleton variant="rectangular" width="100%" height={100} sx={{ m: 0 }} />
                                            : <CardMedia
                                                component="img"
                                                // height="194"
                                                image={contents.imagePath}
                                            />
                                        }
                                    </Box>
                                    <Box sx={{ width: "100%", px: 1, my: 1 }}>
                                        {contents.comment &&
                                            <Typography variant="body2">
                                                {String(contents.comment).split('\\n').map((line, index) => (
                                                    <Typography
                                                        key={index}
                                                        variant="body2"
                                                        sx={{
                                                            fontSize: 12,
                                                            color: "black"
                                                        }}
                                                    >
                                                        {line}
                                                    </Typography>
                                                ))}
                                            </Typography>
                                        }
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