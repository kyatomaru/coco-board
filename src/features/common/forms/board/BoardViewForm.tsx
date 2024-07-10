"use client"

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation'
import Box from '@mui/material/Box';
import dayjs from 'dayjs';
import TopControlBar from './TopControlBar';
import BottomControlBar from './BottomControlBar';
import CourtView from '../../board/CourtView'
import { FrameModel, FrameType } from '@/types/board/Frame';
import { BoardModel } from '@/types/board/Board';
import html2canvas from 'html2canvas';
import { auth } from '@/app/firebase';
import { Skeleton } from '@mui/material';

type PageProps = {
    contents: any,
    getContents: any,
    postData: any,
    onClose: any
}

export default function BoardViewForm({ contents, getContents, postData, onClose }: PageProps) {
    const router = useRouter()
    const params = useParams()
    const [courtHeight, setCourtHeight] = React.useState(0);
    const [courtWidth, setCourtWidth] = React.useState(0);
    const [frame, setFrame] = React.useState<Array<FrameType>>([]);
    const [currentFrame, setCurrentFrame] = React.useState(0)
    const [isPlay, setIsPlay] = React.useState(false)
    const [playFrame, setPlayFrame] = React.useState<Array<FrameType>>([]);

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
    }, [])

    React.useEffect(() => {
        window.addEventListener("resize", setWindow);
    })

    React.useEffect(() => {
        if (contents.boardFrame.length != 0) {
            setFrame(contents.boardFrame)
        }
    }, [contents])

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const uid = await auth.currentUser?.uid;
        if (uid) {
            contents.uid = uid
            contents.boardFrame = frame

            // make icon
            let image;
            const capture = document.querySelector<HTMLElement>("#board");
            await html2canvas(capture, { useCORS: true }).then((canvas) => {
                const type = "image/png";
                var dataurl = canvas.toDataURL(type);

                image = atob(dataurl.split(",")[1]);
            });

            const res = await postData(contents, image)

            if (res.ok) {
                await getContents()
                onClose()
            }
        }
    }

    return (
        <Box>
            <TopControlBar onClose={onClose} frame={frame} setFrame={setFrame} setCurrentFrame={setCurrentFrame} board={contents} onSubmit={onSubmit} />
            <CourtView courtWidth={courtWidth} courtHeight={courtHeight} frame={frame} setFrame={setFrame} currentFrame={currentFrame} setCurrentFrame={setCurrentFrame} isPlay={isPlay} isView={false} setIsPlay={setIsPlay} playFrame={playFrame} />
            <BottomControlBar frame={frame} setFrame={setFrame} currentFrame={currentFrame} setCurrentFrame={setCurrentFrame} setPlayFrame={setPlayFrame} isPlay={isPlay} setIsPlay={setIsPlay} />
        </Box>
    )
}