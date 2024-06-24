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
import { boardModalTitle } from '@/constants/modalMessage';
import { deleteNoteMs } from '@/constants/modalMessage';
import { useDeleteBoard } from '@/hooks/board/useDeleteBoard';
import NoteContentsBar from '@/features/common/contents/bar/NoteContentsBar';
import dayjs from 'dayjs';

type pageProps = {
    contents: BoardType
}

export default function BoardContentsBox({ contents }: pageProps) {
    const router = useRouter()
    const params = useParams()
    const [menu, setMenu] = React.useState(0);
    const [isLoading, setIsLoading] = React.useState<boolean>(true)

    const [courtHeight, setCourtHeight] = React.useState(0);
    const [courtWidth, setCourtWidth] = React.useState(0);

    const [frame, setFrame] = React.useState<Array<FrameType>>([]);
    const [currentFrame, setCurrentFrame] = React.useState(0)

    const [playFrame, setPlayFrame] = React.useState<Array<FrameType>>([]);
    const [playCurrentFrame, setPlayCurrentFrame] = React.useState(0)
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

    const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);

    const EditButtonClick = () => {
        router.push(`/board/edit/${contents.contentsId}`)
    }

    const DeleteButtonClick = () => {
        setDeleteModalOpen(true)
    }

    const DeleteBoardContents = async () => {
        const res = await useDeleteBoard(contents.contentsId)
        if (res.ok) {
            router.replace(`/calendar/${dayjs(String(contents.date)).format('YYYY-MM-DD')}`)
        }
    }

    return (
        <>
            <DeleteConfirmModal open={deleteModalOpen} setOpen={setDeleteModalOpen} title={boardModalTitle} message={deleteNoteMs} confirmText="削除" onSubmit={DeleteBoardContents} />

            <Box>
                {contents != undefined
                    ? <NoteContentsBar contents={contents} EditButtonClick={EditButtonClick} DeleteButtonClick={DeleteButtonClick} />
                    : <Skeleton variant="rectangular" height={30} />
                }
                {contents != undefined
                    ? <CourtView courtWidth={courtWidth} courtHeight={courtHeight} frame={contents.boardFrame} setFrame={setFrame} currentFrame={currentFrame} setCurrentFrame={setCurrentFrame} isPlay={isPlay} isView={true} setIsPlay={setIsPlay} playFrame={playFrame} />
                    : <Skeleton variant="rectangular" height={courtHeight} />
                }
                {contents != undefined
                    ? <BottomViewBar frame={contents.boardFrame} setFrame={setFrame} currentFrame={currentFrame} setCurrentFrame={setCurrentFrame} setPlayFrame={setPlayFrame} isPlay={isPlay} setIsPlay={setIsPlay} />
                    : <Skeleton variant="rectangular" height={30} />
                }

                {contents != undefined ?
                    <Box>
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
        </>
    )
}
