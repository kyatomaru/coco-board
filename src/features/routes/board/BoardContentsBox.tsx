"use client"

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation'
import { useSwipeLock } from '@/hooks/common/useSwipeLock';
import { useDateFormat } from '@/utils/useDateFormat';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import BottomViewBar from './BottomViewBar';
import CourtView from '@/features/common/board/CourtView';
import { FrameModel, FrameType } from '@/types/board/Frame';
import { BoardType } from '@/types/board/Board';
import Skeleton from '@mui/material/Skeleton';
import DeleteConfirmModal from '@/features/common/contents/modal/ConfirmModal';
import { boardModalTitle } from '@/constants/ModalMessage';
import { deleteNoteMs } from '@/constants/ModalMessage';
import { useDeleteBoard } from '@/hooks/board/useDeleteBoard';
import NoteContentsBar from '@/features/common/contents/bar/NoteContentsBar';
import dayjs from 'dayjs';
import BoardViewForm from '@/features/common/forms/board/BoardViewForm';
import { useUpdateBoard } from '@/hooks/board/useUpdateBoard';
import Modal from '@mui/material/Modal';
import Container from '@mui/material/Container';
import { setRatio } from '@/constants/board/CourtRatio';
import { restoreCoordinate } from '@/hooks/board/courtSetting/CourtSetting';
import { LineShareButton, LineIcon } from "react-share";
import { shareMessage } from '@/constants/ShareMessage';

type pageProps = {
    user: any,
    contents: BoardType
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

export default function BoardContentsBox({ user, contents, setContents }: pageProps) {
    const router = useRouter()
    const [isEditLoading, setIsEditLoading] = React.useState(false)

    const [menu, setMenu] = React.useState(0);

    const [courtHeight, setCourtHeight] = React.useState(0);
    const [courtWidth, setCourtWidth] = React.useState(0);

    const [frame, setFrame] = React.useState<Array<FrameType>>([]);
    const [currentFrame, setCurrentFrame] = React.useState(0)

    const [playFrame, setPlayFrame] = React.useState<Array<FrameType>>([]);
    const [isPlay, setIsPlay] = React.useState(false)

    const setWindow = () => {
        const courtLength = setRatio(window.innerWidth, window.innerHeight)

        if (contents.courtId == 0) {
            setCourtWidth(courtLength[0])
            setCourtHeight(courtLength[1])
        } else {
            setCourtWidth(courtLength[2])
            setCourtHeight(courtLength[3])
        }
    }

    // React.useEffect(() => {
    //     setWindow()
    //     window.addEventListener("resize", setWindow);
    // })

    React.useEffect(() => {
        if (contents != undefined) {
            if (contents.frame.length != 0) {
                setWindow()

                const courtLength = setRatio(window.innerWidth, window.innerHeight)
                let newFrame
                if (contents.courtId == 0)
                    newFrame = restoreCoordinate(JSON.parse(JSON.stringify(contents.frame)), courtLength[0], courtLength[1])
                else
                    newFrame = restoreCoordinate(JSON.parse(JSON.stringify(contents.frame)), courtLength[3], courtLength[2])

                setFrame(newFrame)
            }
        }
    }, [contents])

    const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
    const [editModalOpen, setEditModalOpen] = React.useState<boolean>(false)

    const EditButtonClick = () => {
        setEditModalOpen(true)
    }

    const DeleteButtonClick = () => {
        setDeleteModalOpen(true)
    }

    const DeleteBoardContents = async () => {
        const res = await useDeleteBoard(contents.contentsId)
        if (res.ok) {
            router.replace(`/home/${dayjs(String(contents.date)).format('YYYY-MM-DD')}`)
        }
    }

    const UpdateBoardContents = async (contents, image) => {
        setEditModalOpen(false)
        setIsEditLoading(true)

        await useUpdateBoard(contents, image).then((data) => {
            setContents(data)
            setIsEditLoading(false)
        })
    }

    return (
        <>
            <DeleteConfirmModal open={deleteModalOpen} setOpen={setDeleteModalOpen} title={boardModalTitle} message={deleteNoteMs} confirmText="削除" onSubmit={DeleteBoardContents} />

            <Modal sx={{ zIndex: 2100 }} open={isEditLoading}>
                <Card elevation={2} sx={modalStyle}>
                    <Typography sx={{ fontSize: 13, textAlign: "center", my: 1, color: "black" }} component="h2">
                        ボードを保存しています。
                    </Typography>
                    <LinearProgress />
                </Card>
            </Modal>

            {editModalOpen ?
                <Modal
                    open={editModalOpen}
                    sx={{ overflowY: menu != 0 && "auto", scrollbarWidth: "none" }}
                >
                    <Container maxWidth="sm" sx={{ px: 0, minHeight: "100vh", position: "relative", zIndex: 1500, borderRadius: 4 }}>
                        <BoardViewForm contents={contents} postData={UpdateBoardContents} onClose={() => { setEditModalOpen(false) }} />
                    </Container>
                </Modal>
                :
                <Box>
                    {contents != undefined
                        ? <NoteContentsBar title="ボード" contents={contents} EditButtonClick={EditButtonClick} DeleteButtonClick={DeleteButtonClick} />
                        : <Skeleton variant="rectangular" height={30} />
                    }
                    {contents != undefined
                        ? <CourtView board={contents} onClose={() => { }} onSubmit={() => { }} frame={frame} setFrame={setFrame} currentFrame={currentFrame} setCurrentFrame={setCurrentFrame} isPlay={isPlay} isView={true} setIsPlay={setIsPlay} playFrame={playFrame} tutorialId={-1} setTutorialId={() => { }} />
                        : <Skeleton variant="rectangular" height={courtHeight} />
                    }
                    {contents != undefined
                        ? <BottomViewBar frame={frame} setFrame={setFrame} currentFrame={currentFrame} setCurrentFrame={setCurrentFrame} setPlayFrame={setPlayFrame} isPlay={isPlay} setIsPlay={setIsPlay} />
                        : <Skeleton variant="rectangular" height={30} />
                    }

                    {contents != undefined ?
                        <Box sx={{ p: 1, borderRight: "solid 0.5px #b2b2b2", borderLeft: "solid 0.5px #b2b2b2" }}>
                            <Stack direction="row" justifyContent="space-between">
                                <Box>
                                    {contents.title != undefined &&
                                        <Box sx={{ width: "100%", alignItems: "center" }} >
                                            <Typography sx={{ fontSize: 15, color: "black" }} variant="h6" component="div">
                                                {DataFormat(contents.date)}
                                            </Typography>
                                            <Typography variant="h6" sx={{ fontSize: 14, color: "black" }} component="div">
                                                {String(contents.title)}
                                            </Typography>
                                        </Box>
                                    }
                                </Box>
                                <Box sx={{ mr: 1 }}>
                                    {contents.uid == user?.uid &&
                                        < a href={`https://social-plugins.line.me/lineit/share?url=https://cocoboard.jp/board/${contents.contentsId}?openExternalBrowser=1&text=${shareMessage} - 戦術ボード:${contents.title}`} target="_blank" rel="nofollow noopener">
                                            <CardMedia
                                                component='img'
                                                image="/images/welcomePage/LINE-icon.png"
                                                sx={{ width: 35, height: 35 }}
                                            />
                                        </a>
                                    }
                                </Box>
                            </Stack>
                            {contents.comment != undefined &&
                                <Box sx={{ px: 1, pb: 1 }}>
                                    <Typography variant="body2" sx={{ fontSize: 13, color: "black" }}>
                                        {contents.comment}
                                    </Typography>
                                </Box>
                            }
                        </Box >
                        :
                        <Skeleton variant="rectangular" height={87} />
                    }
                </Box >
            }
        </>
    )
}
