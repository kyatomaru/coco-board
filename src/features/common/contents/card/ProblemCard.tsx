"use client"

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import dayjs from 'dayjs';
import { useDeleteProblem } from '@/hooks/problem/useDeleteProblem';
import { useDateFormat } from '@/utils/useDateFormat';
import WatchIcon from '@mui/icons-material/WatchLater';
import StarsIcon from '@mui/icons-material/Stars';
import { skillsCategories } from '@/types/Category';
import DeleteConfirmModal from '@/features/common/contents/modal/ConfirmModal';
import ContentsMenuModal from '@/features/common/contents/modal/NoteMenuModal';
import { problemModalTitle } from '@/constants/modalMessage';
import { deleteNoteMs } from '@/constants/modalMessage';
import MoreHorizButton from '@/features/common/contents/button/MoreHorizButton';

type PageProps = {
    contents: any,
    getContents: any
}

const DataFormat = (date: String) => {
    return useDateFormat(date)
}

export default function ProblemCard({ contents, getContents }: PageProps) {
    const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
    const [menuModalOpen, setMenuModalOpen] = React.useState<boolean>(false)

    const router = useRouter()

    const menuHandleClick = () => {
        setMenuModalOpen(true)
    }

    const ViewButtonClick = () => {
        router.replace(`/problem/${contents.contentsId}`)
    }

    const EditButtonClick = () => {
        router.replace(`/problem/edit/${contents.contentsId}`)
    }

    const DeleteButtonClick = () => {
        setMenuModalOpen(false)
        setDeleteModalOpen(true)
    }

    const DeleteProblemContents = async () => {
        const res = await useDeleteProblem(contents.contentsId)
        if (res.ok) {
            getContents()
            setDeleteModalOpen(false)
            setMenuModalOpen(false)
        }
    }

    return (
        <>
            <DeleteConfirmModal open={deleteModalOpen} setOpen={setDeleteModalOpen} title={problemModalTitle} message={deleteNoteMs} confirmText="削除" onSubmit={DeleteProblemContents} />
            <ContentsMenuModal open={menuModalOpen} setOpen={setMenuModalOpen} Delete={DeleteButtonClick} Edit={EditButtonClick} View={ViewButtonClick} />

            <Card sx={{ minWidth: 250, my: 2 }} >
                <Box sx={{ position: "relative" }}>
                    <MoreHorizButton menuHandleClick={menuHandleClick} />
                    <CardActionArea onClick={() => ViewButtonClick()}>
                        <Stack direction="row" sx={{ py: 1, mx: 2, alignItems: "center" }} >
                            <Box sx={{ width: "100%", alignItems: "center" }} >
                                <Typography variant="h6" sx={{ fontSize: 16, mr: 4 }} component="div">
                                    {String(contents.problem)}
                                </Typography>
                                {contents.achieve ?
                                    <Stack direction="row" alignItems="center">
                                        <StarsIcon fontSize="small" sx={{ color: "#4cd34c !important" }} />
                                        <Typography variant="h6" sx={{ fontSize: 16, color: "#4cd34c", fontWeight: "bold" }} component="div">
                                            達成
                                        </Typography>
                                    </Stack> :
                                    <Stack direction="row" alignItems="center">
                                        {dayjs(String(contents.completionDate)).isBefore(dayjs(String(new Date))) ?
                                            <Typography variant="h6" color="error" sx={{ fontSize: 16 }} component="div">
                                                {DataFormat(String(contents.completionDate))}
                                            </Typography>
                                            :
                                            <Typography variant="h6" sx={{ fontSize: 16 }} component="div">
                                                {DataFormat(String(contents.completionDate))}
                                            </Typography>
                                        }

                                        {dayjs(String(contents.completionDate)).isBefore(dayjs(String(new Date))) &&
                                            <WatchIcon fontSize='small' color="error" sx={{ ml: 1 }} />
                                        }
                                    </Stack>
                                }
                                <Stack direction="row" spacing={1} >
                                    {
                                        contents.importance == 3 &&
                                        <Chip label="重要" size="small" sx={{ fontSize: 9 }} />
                                    }
                                </Stack>
                                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 1 }}>
                                    <Chip label={String(skillsCategories[contents.categoryId].title)} size="small" sx={{ fontSize: 9, backgroundColor: skillsCategories[contents.categoryId].bgColor, color: skillsCategories[contents.categoryId].color, }} />
                                    <Box>
                                        <Typography variant="h6" sx={{ fontSize: 12 }} component="div">
                                            登録日:{dayjs(String(contents.createDate)).format('YYYY/M/D')}
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Box>
                        </Stack>
                    </CardActionArea >
                </Box >
            </Card >
        </>
    );
}