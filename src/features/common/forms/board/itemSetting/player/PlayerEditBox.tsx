"use client"

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation'
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import EditNoteIcon from '@mui/icons-material/EditNote';
import ClearIcon from '@mui/icons-material/Clear';
import { SelectItemModel } from '@/types/board/SelectItem';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { MuiColorInput } from 'mui-color-input'

type PageProps = {
    frame: any,
    setFrame: any,
    index: number,
    setIsOpenEditBox: any,
}

export default function PlayerEditBox({ frame, setFrame, index, setIsOpenEditBox }: PageProps) {
    const [name, setName] = React.useState(frame[0].players[index].name)
    const [number, setNumber] = React.useState(frame[0].players[index].backNumber)
    const [position, setPosition] = React.useState(frame[0].players[index].position)

    const [mainColor, setMainColor] = React.useState(frame[0].players[index].color.background);
    const [numberColor, setNumberColor] = React.useState(frame[0].players[index].color.number);
    const [nameColor, setNameColor] = React.useState(frame[0].players[index].color.name);

    const submit = () => {
        changeName()
        changeNumber()
        changePosition()
        changeColor()
        setIsOpenEditBox(false)
    }

    const changeName = () => {
        const frameArray = Array()
        frame.map((item, frameIndex) => {
            frameArray.push(item)
            frameArray[frameIndex].players[index].name = name
        })

        setFrame(frameArray)
    }

    const changeNumber = () => {
        const frameArray = Array()
        frame.map((item, frameIndex) => {
            frameArray.push(item)
            frameArray[frameIndex].players[index].backNumber = number
        })

        setFrame(frameArray)
    }

    const changePosition = () => {
        const frameArray = Array()
        frame.map((item, frameIndex) => {
            frameArray.push(item)
            frameArray[frameIndex].players[index].position = position
        })

        setFrame(frameArray)
    }

    const changeColor = () => {
        const newColor = { background: mainColor, number: numberColor, name: nameColor }

        const frameArray = Array()
        frame.map((item, frameIndex) => {
            frameArray.push(item)
            frameArray[frameIndex].players[index].color = newColor
        })

        setFrame(frameArray)
    }

    return (
        <Box sx={{ position: "absolute", zIndex: 2000, backgroundColor: "white", top: "24px", left: "-17px", marginLeft: "0 important", borderRight: "0.5px #666 solid", borderBottom: "0.5px #666 solid", borderTop: "1px #666 solid" }}>
            <Stack direction="row" justifyContent="space-between" sx={{ mx: 1 }}>
                <IconButton size='small' onClick={() => { setIsOpenEditBox(false) }} sx={{ color: "#444" }}>
                    <ClearIcon sx={{ width: { xs: "20px" }, height: { xs: "20px" } }} />
                </IconButton>

                <Button size='small' onClick={submit}>
                    変更
                </Button>
            </Stack>

            <Divider />

            <Box sx={{ my: 2, px: 1 }}>
                <Stack direction="row" spacing={2} sx={{ m: 1 }}>
                    <Typography fontSize={12} sx={{ lineHeight: "40px", width: "65px", color: "black" }}>名前</Typography>
                    <TextField
                        placeholder='名前'
                        size='small'
                        value={name}
                        sx={{ width: '18ch', fontSize: 10 }}
                        id={"name" + index}
                        onChange={(event) => setName(event.target.value)}
                    />
                </Stack>

                <Stack direction="row" spacing={2} sx={{ m: 1 }}>
                    <Typography fontSize={12} sx={{ lineHeight: "40px", width: "65px", color: "black" }}>背番号</Typography>
                    <TextField
                        placeholder='背番号'
                        size='small'
                        value={number}
                        sx={{ width: '18ch', fontSize: 10 }}
                        id={"name" + index}
                        onChange={(event) => setNumber(event.target.value)}
                    />
                </Stack>

                <Stack direction="row" spacing={2} sx={{ m: 1 }}>
                    <Typography fontSize={12} sx={{ lineHeight: "40px", width: "65px", color: "black" }}>ポジション</Typography>
                    <TextField
                        placeholder='ポジション'
                        size='small'
                        value={position}
                        sx={{ width: '18ch', fontSize: 10 }}
                        id={"name" + index}
                        onChange={(event) => setPosition(event.target.value)}
                    />
                </Stack>
            </Box>

            <Divider />

            <Box sx={{ my: 2, px: 1 }}>
                <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={2} sx={{ m: 1 }}>
                    <Typography fontSize={12} sx={{ width: "60px", color: "black" }}>本体</Typography>
                    <MuiColorInput size='small' sx={{ width: "20ch", fontSize: 10, border: "none" }} format="hex" value={mainColor} onChange={(newValue) => setMainColor(newValue)} />
                </Stack>
                <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={2} sx={{ m: 1 }}>
                    <Typography fontSize={12} sx={{ width: "60px", color: "black" }}>背番号</Typography>
                    <MuiColorInput size='small' sx={{ width: "20ch", fontSize: 10, border: "none" }} format="hex" value={numberColor} onChange={(newValue) => setNumberColor(newValue)} />
                </Stack>
                <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={2} sx={{ m: 1 }}>
                    <Typography fontSize={12} sx={{ width: "60px", color: "black" }}>名前</Typography>
                    <MuiColorInput size='small' sx={{ width: "20ch", fontSize: 10, border: "none" }} format="hex" value={nameColor} onChange={(newValue) => setNameColor(newValue)} />
                </Stack>
            </Box>
        </Box >
    )
}
