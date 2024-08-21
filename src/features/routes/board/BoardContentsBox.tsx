"use client"

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation'
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
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

type pageProps = {
    contents: BoardType
    getContents: any
}

export default function BoardContentsBox({ contents, getContents }: pageProps) {
    const router = useRouter()
    const [menu, setMenu] = React.useState(0);

    const [courtHeight, setCourtHeight] = React.useState(0);
    const [courtWidth, setCourtWidth] = React.useState(0);

    const [frame, setFrame] = React.useState<Array<FrameType>>([]);
    const [currentFrame, setCurrentFrame] = React.useState(0)

    const [playFrame, setPlayFrame] = React.useState<Array<FrameType>>([]);
    const [isPlay, setIsPlay] = React.useState(false)

    const setWindow = () => {
        const frame_menu_width = 85
        const window_width = window.innerWidth - frame_menu_width;
        const window_height = window.innerHeight - frame_menu_width;

        const court_width_ratio = 400
        const court_height_ratio = 620

        setCourtHeight(window_height - 40)
        setCourtWidth((court_width_ratio * (window_height - 40)) / court_height_ratio);
    }

    React.useEffect(() => {
        setWindow()
        window.addEventListener("resize", setWindow);
    })

    React.useEffect(() => {
        if (contents != undefined) {
            if (contents.frame.length != 0) {
                const frameArray = []
                contents.frame.forEach(value => {
                    frameArray.push(value)
                })
                console.log(frameArray)
                setFrame(frameArray)
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

    return (
        <>
            <DeleteConfirmModal open={deleteModalOpen} setOpen={setDeleteModalOpen} title={boardModalTitle} message={deleteNoteMs} confirmText="削除" onSubmit={DeleteBoardContents} />
            {editModalOpen ?
                <Modal
                    open={editModalOpen}
                    sx={{ overflowY: menu != 0 && "auto", scrollbarWidth: "none" }}
                >
                    <Container maxWidth="sm" sx={{ px: 0, minHeight: "100vh", position: "relative", zIndex: 1500, borderRadius: 4 }}>
                        <BoardViewForm contents={contents} getContents={getContents} postData={useUpdateBoard} onClose={() => { setEditModalOpen(false) }} />
                    </Container>
                </Modal>
                :
                <Box>
                    {contents != undefined
                        ? <NoteContentsBar contents={contents} EditButtonClick={EditButtonClick} DeleteButtonClick={DeleteButtonClick} />
                        : <Skeleton variant="rectangular" height={30} />
                    }
                    {contents != undefined
                        ? <CourtView board={contents} onClose={() => { }} onSubmit={() => { }} frame={frame} setFrame={setFrame} currentFrame={currentFrame} setCurrentFrame={setCurrentFrame} isPlay={isPlay} isView={true} setIsPlay={setIsPlay} playFrame={playFrame} />
                        : <Skeleton variant="rectangular" height={courtHeight} />
                    }
                    {contents != undefined
                        ? <BottomViewBar frame={frame} setFrame={setFrame} currentFrame={currentFrame} setCurrentFrame={setCurrentFrame} setPlayFrame={setPlayFrame} isPlay={isPlay} setIsPlay={setIsPlay} />
                        : <Skeleton variant="rectangular" height={30} />
                    }

                    {contents != undefined ?
                        <Box sx={{ borderRight: "solid 0.5px #b2b2b2", borderLeft: "solid 0.5px #b2b2b2" }}>
                            <Box sx={{ p: 1, mx: 1 }} >
                                <Box sx={{ width: "100%", alignItems: "center" }} >
                                    <Typography variant="h6" sx={{ fontSize: 16 }} component="div">
                                        {String(contents.title)}
                                    </Typography>
                                    {/* <Chip label="試合" color="success" size="small" sx={{ fontSize: 9 }} /> */}
                                </Box>
                            </Box>
                            <Divider />
                            {contents.comment != "" &&
                                <>
                                    <Box sx={{ px: 2, py: 1 }}>
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
                        </Box>
                        :
                        <Skeleton variant="rectangular" height={87} />
                    }
                </Box>
            }
        </>
    )
}
