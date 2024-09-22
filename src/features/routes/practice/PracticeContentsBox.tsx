"use client"

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import Modal from '@mui/material/Modal';
import LinearProgress from '@mui/material/LinearProgress';
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
import { LineShareButton, LineIcon } from "react-share";
import { shareMessage } from '@/constants/ShareMessage';

type PageProps = {
    user: any,
    contents: PracticeContentsType,
    setContents: any
}

const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    minWidth: 320,
    width: "400px",
    maxWidth: '100%',
    zIndex: 2200,
    outline: "none",
};

const DataFormat = (date: String) => {
    return useDateFormat(date)
}

export default function PracticeContentsBox({ user, contents, setContents }: PageProps) {
    const router = useRouter()
    const [isEditLoading, setIsEditLoading] = React.useState(false)

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
        setIsEditLoading(true)

        await useUpdatePractice(contents).then((data) => {
            setContents(data)
            setIsEditLoading(false)
        })
    }

    return (
        <>
            <DeleteConfirmModal open={deleteModalOpen} setOpen={setDeleteModalOpen} title={practiceModalTitle} message={deleteNoteMs} confirmText="削除" onSubmit={DeletePracticeContents} />
            <Modal sx={{ zIndex: 2100 }} open={isEditLoading}>
                <Card elevation={2} sx={modalStyle}>
                    <Typography sx={{ fontSize: 13, textAlign: "center", my: 1, color: "black" }} component="h2">
                        ノートを保存しています。
                    </Typography>
                    <LinearProgress />
                </Card>
            </Modal>

            {editModalOpen ?
                <PracticeForm contents={contents} postData={UpdatePracticeContents} onClose={() => { setEditModalOpen(false) }} />
                :
                <Box>
                    <NoteContentsBar title="練習" contents={contents} EditButtonClick={EditButtonClick} DeleteButtonClick={DeleteButtonClick} />

                    {contents != undefined ?
                        <Stack direction="row" sx={{ p: 1, mx: 1 }} >
                            <Box sx={{ width: "100%", alignItems: "center" }} >
                                <Typography sx={{ fontSize: 17, color: "black" }} variant="h6" component="div">
                                    {DataFormat(contents.date)}
                                </Typography>
                                <Typography variant="h6" sx={{ fontSize: 16, color: "black" }} component="div">
                                    {String(contents.title)}
                                </Typography>
                                <Chip label="練習" color="primary" size="small" sx={{ fontSize: 9 }} />
                            </Box>
                            <Box sx={{ mr: 1 }}>
                                {contents.contentsId == user?.uid &&
                                    <a href={`https://social-plugins.line.me/lineit/share?url=https://cocoboard.jp/practice/${contents.contentsId}&text=${shareMessage} - 練習:${contents.title}`} target="_blank" rel="nofollow noopener">
                                        <CardMedia
                                            component='img'
                                            image="/images/welcomePage/LINE-icon.png"
                                            sx={{ width: 35, height: 35 }}
                                        />
                                    </a>
                                }
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
                                    <Typography variant="body2" sx={{ color: "black" }}>
                                        {String(contents.place)}
                                    </Typography>
                                }
                            </Box>
                            <Box sx={{ px: 2, py: 1, width: "100%" }}>
                                <Typography sx={{ fontSize: 14, mb: 1 }} color="text.secondary">
                                    天気
                                </Typography>
                                {contents.weather &&
                                    <Typography variant="body2" sx={{ color: "black" }}>
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
                            {contents.details[0].context ?
                                <List sx={{ px: 0, my: 1, py: 0 }}>
                                    {contents.details.map((detail, index) => (
                                        <Box key={index}>
                                            {
                                                detail.context != undefined &&
                                                // <ListText primary={detail.context} secondary={elementsCategories[Number(detail.type)].title} />
                                                <Typography variant="body2" sx={{ fontSize: 14, mb: 1, color: "black" }}>
                                                    ・{detail.context}
                                                </Typography>
                                            }
                                        </Box>
                                    ))
                                    }
                                </List>
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

                    {contents != undefined ?
                        <Box sx={{ px: 2, my: 2 }}>
                            <Typography sx={{ fontSize: 14, mb: 1, fontWeight: "bold" }} color="#16b41e">
                                次に向けて
                            </Typography>
                            {contents.next ?
                                <Typography variant="body2" sx={{ fontSize: 14, color: "black" }}>
                                    {contents.next}
                                </Typography>
                                :
                                <Typography variant="body2" sx={{ px: 1, width: "100px", fontSize: 14, color: "black" }}>
                                    なし
                                </Typography>
                            }
                        </Box>
                        :
                        <Skeleton variant="rectangular" height={62} />
                    }

                    <Divider />

                    {contents != undefined && contents.comment != undefined &&
                        <>
                            <Box sx={{ px: 2, my: 1 }}>
                                <Typography sx={{ fontSize: 14, mb: 1 }} color="text.secondary">
                                    コメント
                                </Typography>
                                <Typography variant="body2" sx={{ pb: 1, color: "black" }}>
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