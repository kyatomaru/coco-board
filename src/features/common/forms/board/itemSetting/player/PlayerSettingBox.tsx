"use client"

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation'
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';
import { SelectItemModel } from '@/types/board/SelectItem';
import PlayerEditBox from './PlayerEditBox';

type PageProps = {
    frame: any,
    setFrame: any,
    setSelectItem: any,
    index: number,
}

export default function PlayerSettingBox({ frame, setFrame, setSelectItem, index }: PageProps) {
    const [isOpenEditBox, setIsOpenEditBox] = React.useState(false)

    const DeletePlayer = () => {
        setSelectItem(new SelectItemModel())

        const frameArray = frame.concat();
        frameArray.forEach((item) => {
            item.players.splice(index, 1)
        })
        setFrame(frameArray)
    }

    return (
        <>
            <IconButton size='small' onClick={() => { setIsOpenEditBox(true) }} sx={{ color: "#444" }}>
                <EditNoteIcon sx={{ width: { xs: "20px" }, height: { xs: "20px" }, p: 0 }} />
            </IconButton>

            <IconButton size='small' onClick={DeletePlayer} sx={{ color: "#444" }}>
                <DeleteIcon sx={{ width: { xs: "20px" }, height: { xs: "20px" } }} />
            </IconButton>

            {isOpenEditBox &&
                <PlayerEditBox frame={frame} setFrame={setFrame} index={index} setIsOpenEditBox={setIsOpenEditBox} />
            }
        </>
    )
}
