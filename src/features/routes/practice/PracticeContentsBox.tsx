"use client"

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import dayjs from 'dayjs';
import type { PracticeContentsType } from '@/types/practice/PracticeContents';
import { useDeletePractice } from '@/hooks/practice/useDeletePractice';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import Chip from '@mui/material/Chip';
import MuiListItemText, { ListItemTextProps } from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import { useDateFormat } from '@/utils/useDateFormat';
import Skeleton from '@mui/material/Skeleton';
import DeleteConfirmModal from '@/features/common/contents/modal/ConfirmModal';
import { practiceModalTitle } from '@/constants/ModalMessage';
import { deleteNoteMs } from '@/constants/ModalMessage';
import { elementsCategories } from '@/types/Category';
import NoteContentsBar from '@/features/common/contents/bar/NoteContentsBar';
import PracticeForm from '@/features/common/forms/practice/PracticeForm';
import { useUpdatePractice } from '@/hooks/practice/useUpdatePractice';

type PageProps = {
    contents: PracticeContentsType,
    setContents: any
}

const DataFormat = (date: String) => {
    return useDateFormat(date)
}

export default function PracticeContentsBox({ contents, setContents }: PageProps) {
    const router = useRouter()
    const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
    const [editModalOpen, setEditModalOpen] = React.useState<boolean>(false)

    const EditButtonClick = () => {
        setEditModalOpen(true)
    }

    const DeleteButtonClick = () => {
        setDeleteModalOpen(true)
    }

    const DeletePracticeContents = async () => {
        const res = await useDeletePractice(contents.contentsId)
        if (res.ok) {
            router.replace(`/calendar/${dayjs(String(contents.date)).format('YYYY-MM-DD')}`)
        }
    }

    const UpdatePracticeContents = async (contents) => {
        setEditModalOpen(false)
        await useUpdatePractice(contents).then((data) => {
            setContents(data)
        })
    }

    return (
        <>
            <DeleteConfirmModal open={deleteModalOpen} setOpen={setDeleteModalOpen} title={practiceModalTitle} message={deleteNoteMs} confirmText="削除" onSubmit={DeletePracticeContents} />
            {editModalOpen ?
                <PracticeForm contents={contents} postData={UpdatePracticeContents} onClose={() => { setEditModalOpen(false) }} />
                :
                <Box>
                    <NoteContentsBar contents={contents} EditButtonClick={EditButtonClick} DeleteButtonClick={DeleteButtonClick} />

                    {contents != undefined ?
                        <Stack direction="row" sx={{ p: 1, mx: 1 }} >
                            <Box sx={{ width: "100%", alignItems: "center" }} >
                                <Typography sx={{ fontSize: 17 }} variant="h6" component="div">
                                    {DataFormat(contents.date)}
                                </Typography>
                                <Typography variant="h6" sx={{ fontSize: 16 }} component="div">
                                    {String(contents.title)}
                                </Typography>
                                <Chip label="練習" color="primary" size="small" sx={{ fontSize: 9 }} />
                            </Box>
                        </Stack>
                        :
                        <Skeleton variant="rectangular" height={94} />
                    }

                    <Divider />

                    {contents != undefined ?
                        <Stack direction="row" divider={<Divider orientation="vertical" flexItem />} justifyContent="space-between" alignItems="center">
                            <Box sx={{ px: 2, py: 1, width: "100%" }}>
                                <Typography sx={{ fontSize: 14, mb: 1 }} color="text.secondary">
                                    場所
                                </Typography>
                                {contents.place &&
                                    <Typography variant="body2" sx={{}}>
                                        {String(contents.place)}
                                    </Typography>
                                }
                            </Box>
                            <Box sx={{ px: 2, py: 1, width: "100%" }}>
                                <Typography sx={{ fontSize: 14, mb: 1 }} color="text.secondary">
                                    天気
                                </Typography>
                                {contents.weather &&
                                    <Typography variant="body2" sx={{}}>
                                        {String(contents.weather)}
                                    </Typography>
                                }
                            </Box>
                        </Stack>
                        :
                        <Skeleton variant="rectangular" height={65} />
                    }

                    <Divider />

                    {contents != undefined ?
                        <Box sx={{ px: 2, my: 1 }}>
                            <Typography sx={{ fontSize: 14, mb: 1 }} color="text.secondary">
                                練習メニュー
                            </Typography>
                            {contents.details[0] != null ?
                                <List sx={{ px: 0, my: 1, py: 0 }}>
                                    {contents.details.map((detail, index) => (
                                        <Box key={index}>
                                            {
                                                detail.context != "" &&
                                                <ListText primary={detail.context} secondary={elementsCategories[Number(detail.type)].title} />
                                            }
                                        </Box>
                                    ))
                                    }
                                </List >
                                :
                                <Typography variant="body2" sx={{ px: 1, width: "100px", fontSize: 14 }}>
                                    なし
                                </Typography>
                            }
                        </Box>
                        :
                        <Skeleton variant="rectangular" height={62} />
                    }

                    <Divider />

                    {contents != undefined && contents.comment != "" &&
                        <>
                            <Box sx={{ px: 2, my: 1 }}>
                                <Typography sx={{ fontSize: 14, mb: 1 }} color="text.secondary">
                                    コメント
                                </Typography>

                                <Typography variant="body2" sx={{ pb: 1 }}>
                                    {contents.comment}
                                </Typography>
                            </Box>
                            <Divider />
                        </>
                    }
                </Box >
            }
        </>
    )
}

const ListText = styled((props: ListItemTextProps) => (
    <MuiListItemText
        {...props}
    />
))(({ theme }) => ({
    '& span': {
        fontSize: 13
    },
    '& p': {
        fontSize: 10,
    },
}));