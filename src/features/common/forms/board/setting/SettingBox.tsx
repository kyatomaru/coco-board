"use client"

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation'
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { MuiColorInput } from 'mui-color-input'
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AllowPartialScrolling from '@/components/common/AllowPartialScrolling';

type PageProps = {
    frame: any,
    setFrame: any,
    board: any
}

export default function SettingBox({ frame, setFrame, board }: PageProps) {
    const [isSeeNumber, setIsSeeNumber] = React.useState(board.setting.isSeeNumber)
    const [isSeePosition, setIsSeePosition] = React.useState(board.setting.isSeePosition)
    const [isSeeName, setIsSeeName] = React.useState(board.setting.isSeeName)

    const [mainColor, setMainColor] = React.useState([board.setting.color[0].background, board.setting.color[1].background]);
    const [numberColor, setNumberColor] = React.useState([board.setting.color[0].number, board.setting.color[1].number]);
    const [nameColor, setNameColor] = React.useState([board.setting.color[0].name, board.setting.color[1].name]);

    const [courtHeight, setCourtHeight] = React.useState(0);
    const [courtWidth, setCourtWidth] = React.useState(0);

    const setWindow = () => {
        const frame_menu_width = 85
        const window_width = window.innerWidth - frame_menu_width;
        const window_height = window.innerHeight - frame_menu_width;

        const court_width_ratio = 400
        const court_height_ratio = 620

        setCourtHeight(window_height - 5)
        setCourtWidth((court_width_ratio * (window_height - 5)) / court_height_ratio);
    }

    React.useEffect(() => {
        setWindow()
    }, [])

    React.useEffect(() => {
        window.addEventListener("resize", setWindow);
    })

    const team = ["Home", "Away"]

    const submit = () => {
        changeIsSee()
        changeColor()
    }

    const changeIsSee = () => {
        board.setting.isSeeNumber = isSeeNumber
        board.setting.isSeePosition = isSeePosition
        board.setting.isSeeName = isSeeName
    }

    const changeColor = () => {
        const newColor = [
            { background: mainColor[0], number: numberColor[0], name: nameColor[0] },
            { background: mainColor[1], number: numberColor[1], name: nameColor[1] }
        ]

        board.setting.color = newColor

        const frameArray = Array()
        frame.map((frameItem, frameIndex) => {
            frameArray.push(frameItem)
            frameArray[frameIndex].players.map((playerItem, playerIndex) => {
                frameArray[frameIndex].players[playerIndex].color = newColor[frameArray[frameIndex].players[playerIndex].teamNumber]
            })
        })

        setFrame(frameArray)
    }


    return (
        <Box sx={{ overflowY: "auto", position: "absolute", zIndex: 2000, height: courtHeight + 27 + "px", backgroundColor: "white", borderRight: "0.5px #666 solid" }}>
            <Box sx={{ position: "sticky", top: 0, backgroundColor: "white", zIndex: 2001 }}>
                <Stack direction="row" justifyContent="flex-end" sx={{ mx: 1, py: 1 }}>
                    <Button onClick={submit} size="small" sx={{ height: "25px", fontWeight: "bolder" }}>
                        変更
                    </Button>
                </Stack>

                <Divider />
            </Box>

            <Box sx={{ my: 1, px: 1 }}>
                <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={2} sx={{ my: 1 }}>
                    <Typography fontSize={13} sx={{ width: "80px", color: "black" }}>背番号</Typography>
                    <IconButton onClick={() => { setIsSeeNumber(!isSeeNumber), setIsSeePosition(!isSeePosition) }}>
                        {isSeeNumber ? <Visibility sx={{ fontSize: 18, color: "#444" }} /> : <VisibilityOff sx={{ fontSize: 18, color: "#444" }} />}
                    </IconButton>
                </Stack>

                <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={2} sx={{ my: 1 }}>
                    <Typography fontSize={13} sx={{ width: "80px", color: "black" }}>ポジション</Typography>
                    <IconButton onClick={() => { setIsSeeNumber(!isSeeNumber), setIsSeePosition(!isSeePosition) }}>
                        {isSeePosition ? <Visibility sx={{ fontSize: 18, color: "#444" }} /> : <VisibilityOff sx={{ fontSize: 18, color: "#444" }} />}
                    </IconButton>
                </Stack>

                <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={2} sx={{ my: 1 }}>
                    <Typography fontSize={13} sx={{ width: "80px", color: "black" }}>名前</Typography>
                    <IconButton onClick={() => { setIsSeeName(!isSeeName) }}>
                        {isSeeName ? <Visibility sx={{ fontSize: 18, color: "#444" }} /> : <VisibilityOff sx={{ fontSize: 18, color: "#444" }} />}
                    </IconButton>
                </Stack>
            </Box>

            {
                team.map((value, index) => {
                    return (<>
                        <Divider />
                        <Box sx={{ my: 1, px: 1 }}>
                            <Typography fontSize={13} sx={{ width: "40px", color: "black" }}>{value}</Typography>
                            <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={2} sx={{ my: 1 }}>
                                <Typography fontSize={13} sx={{ width: "40px", color: "black" }}>本体</Typography>
                                <MuiColorInput sx={{ width: "150px", fontSize: 13, border: "none" }} format="hex" value={mainColor[index]}
                                    onChange={(newValue) => {
                                        const newColor = mainColor.concat()
                                        newColor[index] = newValue
                                        setMainColor(newColor)
                                    }} />
                            </Stack>
                            <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={2} sx={{ my: 1 }}>
                                <Typography fontSize={13} sx={{ width: "40px", color: "black" }}>背番号</Typography>
                                <MuiColorInput sx={{ width: "150px", fontSize: 13, border: "none" }} format="hex" value={numberColor[index]}
                                    onChange={(newValue) => {
                                        const newColor = numberColor.concat()
                                        newColor[index] = newValue
                                        setNumberColor(newColor)
                                    }} />
                            </Stack>
                            <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={2} sx={{ my: 1 }}>
                                <Typography fontSize={13} sx={{ width: "40px", color: "black" }}>名前</Typography>
                                <MuiColorInput sx={{ width: "150px", fontSize: 13, border: "none" }} format="hex" value={nameColor[index]}
                                    onChange={(newValue) => {
                                        const newColor = nameColor.concat()
                                        newColor[index] = newValue
                                        setNameColor(newColor)
                                    }} />
                            </Stack>
                        </Box>
                    </>)
                })
            }
        </Box>
    )
}
