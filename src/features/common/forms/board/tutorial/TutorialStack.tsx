"use client"

import * as React from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TutorialConfirmModal from './modal/TutorialConfirmModal';
import TutorialArrow1 from './arrow/TutorialArrow1';
import TutorialArrow2 from './arrow/TutorialArrow2';
import TutorialArrow3 from './arrow/TutorialArrow3';
import TutorialArrow4 from './arrow/TutorialArrow4';
import TutorialTopControlBar from './TutorialTopControlBar';
import { setRatio } from '@/constants/board/CourtRatio';
import TutorialAddPlayerModal from './modal/TutorialAddPlayerModal';
import TutorialFrameModal from './modal/TutorialFrameModal';
import TutorialDragModal from './modal/TutorialDragModal';
import TutorialConfirmDemoModal from './modal/TutorialConfirmDemoModal';
import TutorialRetryDragModal from './modal/TutorialRetryDragModal';
import TutorialAnimationModal from './modal/TutorialAnimationModal';
import TutorialEndModal from './modal/TutorialEndModal';
import DragTutorial from './DragTutorial';

type PageProps = {
    tutorialId: number,
    setTutorialId: Function
}

export default function TutorialStack({ tutorialId, setTutorialId }: PageProps) {
    const [courtHeight, setCourtHeight] = React.useState(0);
    const [courtWidth, setCourtWidth] = React.useState(0);

    const setWindow = () => {
        const courtLength = setRatio(window.innerWidth, window.innerHeight)
        setCourtWidth(courtLength[0])
        setCourtHeight(courtLength[1])
    }

    React.useEffect(() => {
        setWindow()
    }, [])


    return (
        <>
            <Box sx={{ zIndex: 3000, position: "absolute", width: "100%", height: "100%", pointerEvents: "none" }}>
                {/* top control bar  */}
                <Box sx={{ height: 25, width: "100%", zIndex: tutorialId == 2 ? 3100 : 3000, position: "relative", backgroundColor: tutorialId == 2 ? "unset" : "rgb(1 1 1 / 30%)", pointerEvents: tutorialId == 2 ? "none" : "auto" }} >
                    {tutorialId == 2 &&
                        <TutorialArrow1 />
                    }
                </Box>

                {/* top sub control bar  */}
                <Box sx={{ height: 25, width: "100%", zIndex: tutorialId == 3 ? 3100 : 3000, position: "relative", backgroundColor: tutorialId == 3 ? "unset" : "rgb(1 1 1 / 30%)", pointerEvents: tutorialId == 3 ? "none" : "auto" }} >
                    {tutorialId == 3 &&
                        <TutorialArrow2 />
                    }
                </Box>

                {/* main court */}
                <Box sx={{ height: window.innerHeight - 85 + "px", width: "100%", zIndex: tutorialId == 6 ? 3100 : 3000, position: "relative", display: "flex" }} >
                    <Box sx={{ backgroundColor: "rgb(1 1 1 / 30%)", flexGrow: 1, position: "relative", zIndex: 3000 }} />
                    <Box sx={{ width: courtWidth, position: "relative" }}>
                        <Box sx={{ backgroundColor: "rgb(1 1 1 / 30%)", position: "absolute", m: "auto", top: 0, left: 0, right: 0, zIndex: 3000, width: courtWidth, height: (window.innerHeight - courtHeight - 85) / 2 }} />
                        {tutorialId == 7 ?
                            // <Box sx={{ backgroundImage: `url(/images/board/court1.jpg)`, backgroundSize: "cover", m: "auto", position: "absolute", width: courtWidth + "px", height: courtHeight + "px", top: 0, bottom: 0, right: 0, left: 0, pointerEvents: "auto" }} >
                            //     <DragTutorial courtWidth={courtWidth} courtHeight={courtHeight} isEnd={() => { setTutorialId(tutorialId + 1) }} />
                            // </Box>
                            <></>
                            :
                            <Box sx={{ backgroundColor: tutorialId == 9 || tutorialId == 13 ? "unset" : "rgb(1 1 1 / 30%)", position: "absolute", width: courtWidth + "px", height: courtHeight + "px", pointerEvents: tutorialId == 9 ? "none" : "auto", top: (window.innerHeight - courtHeight - 85) / 2 }} />
                        }
                        <Box sx={{ backgroundColor: "rgb(1 1 1 / 30%)", position: "absolute", m: "auto", bottom: 0, left: 0, right: 0, zIndex: 3000, width: courtWidth, height: (window.innerHeight - courtHeight - 85) / 2 }} />
                    </Box>
                    <Box sx={{ backgroundColor: "rgb(1 1 1 / 30%)", flexGrow: 1, position: "relative", zIndex: 3000 }} />
                </Box>

                {/* bottom control bar */}
                <Box sx={{ height: 35, width: "100%", zIndex: tutorialId == 5 || tutorialId == 12 ? 3100 : 3000, position: "relative", backgroundColor: tutorialId == 5 || tutorialId == 12 ? "unset" : "rgb(1 1 1 / 30%)", pointerEvents: tutorialId == 5 || tutorialId == 12 ? "none" : "auto" }} >
                    {tutorialId == 5 &&
                        <TutorialArrow3 />
                    }
                    {tutorialId == 12 &&
                        <TutorialArrow4 />
                    }
                </Box>
            </Box >
            {tutorialId == 0 &&
                <TutorialConfirmModal skip={() => { setTutorialId(-1), localStorage.removeItem('isNewCreateBoard') }} register={() => { setTutorialId(tutorialId + 1) }} />
            }

            {/* before add player */}
            {
                tutorialId == 1 &&
                <TutorialAddPlayerModal register={() => { setTutorialId(tutorialId + 1) }} />
            }

            {/* before add frame */}
            {
                tutorialId == 4 &&
                <TutorialFrameModal register={() => { setTutorialId(tutorialId + 1) }} />
            }

            {/* before drag demo */}
            {
                tutorialId == 6 &&
                <TutorialDragModal register={() => { setTutorialId(tutorialId + 1) }} />
            }

            {/* confirm demo */}
            {tutorialId == 8 &&
                <TutorialConfirmDemoModal oneMore={() => { setTutorialId(tutorialId - 1) }} register={() => { setTutorialId(tutorialId + 1) }} />
            }

            {/* retry drag */}
            {tutorialId == 10 &&
                <TutorialRetryDragModal register={() => { setTutorialId(tutorialId - 1) }} />
            }

            {/* before play animation */}
            {tutorialId == 11 &&
                <TutorialAnimationModal register={() => { setTutorialId(tutorialId + 1) }} />
            }

            {/* end tutorial */}
            {tutorialId == 14 &&
                <TutorialEndModal register={() => { setTutorialId(-1), localStorage.removeItem('isNewCreateBoard') }} />
            }
        </>
    )
}
