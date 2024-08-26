"use client"

import * as React from 'react';
import Box from '@mui/material/Box';
import { useScrollLock } from '@/hooks/common/useScrollLock';
import { useSwipeLock } from '@/hooks/common/useSwipeLock';
import dayjs from 'dayjs';
import TopControlBar from './TopControlBar';
import BottomControlBar from './BottomControlBar';
import CourtView from '../../board/CourtView'
import { FrameModel, FrameType } from '@/types/board/Frame';
import html2canvas from 'html2canvas';
import { auth } from '@/app/firebase';
import { BallModel } from '@/types/board/Ball';
import { PlayerModel } from '@/types/board/Player';
import { ajustCoordinate, restoreCoordinate } from '@/hooks/board/courtSetting/CourtSetting';
import { setRatio } from '@/constants/board/CourtRatio';

type PageProps = {
    contents: any,
    postData: any,
    onClose: any
}

export default function BoardViewForm({ contents, postData, onClose }: PageProps) {
    const [frame, setFrame] = React.useState<Array<FrameType>>([]);
    const [currentFrame, setCurrentFrame] = React.useState(0)
    const [isPlay, setIsPlay] = React.useState(false)
    const [playFrame, setPlayFrame] = React.useState<Array<FrameType>>([]);

    useScrollLock()
    useSwipeLock()

    React.useEffect(() => {
        if (contents != undefined) {
            if (contents.frame.length == 0) {
                const frameArray = Array()
                frameArray.push(new FrameModel([], new BallModel()))
                setFrame(frameArray)
            }
        }
    }, [])

    React.useEffect(() => {
        if (contents.frame.length != 0) {
            const courtLength = setRatio(window.innerWidth, window.innerHeight)
            let newFrame
            if (contents.courtId == 0)
                newFrame = restoreCoordinate(JSON.parse(JSON.stringify(contents.frame)), courtLength[0], courtLength[1])
            else
                newFrame = restoreCoordinate(JSON.parse(JSON.stringify(contents.frame)), courtLength[3], courtLength[2])

            setFrame(newFrame)
        }
    }, [contents])

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const uid = await auth.currentUser?.uid;
        if (uid) {
            const courtLength = setRatio(window.innerWidth, window.innerHeight)
            let newFrame
            if (contents.courtId == 0)
                newFrame = ajustCoordinate(frame, courtLength[0], courtLength[1])
            else
                newFrame = ajustCoordinate(frame, courtLength[3], courtLength[2])

            contents.uid = uid
            contents.frame = newFrame

            // make icon
            let image;
            const capture = document.querySelector<HTMLElement>("#board");
            await html2canvas(capture, { useCORS: true }).then(async (canvas) => {
                const type = "image/png";
                var dataurl = canvas.toDataURL(type);

                image = atob(dataurl.split(",")[1]);
            });

            postData(contents, image)
        }
    }

    return (
        <Box>
            <CourtView board={contents} onClose={onClose} onSubmit={onSubmit} frame={frame} setFrame={setFrame} currentFrame={currentFrame} setCurrentFrame={setCurrentFrame} isPlay={isPlay} isView={false} setIsPlay={setIsPlay} playFrame={playFrame} />
            <BottomControlBar frame={frame} setFrame={setFrame} currentFrame={currentFrame} setCurrentFrame={setCurrentFrame} setPlayFrame={setPlayFrame} isPlay={isPlay} setIsPlay={setIsPlay} />
        </Box>
    )
}