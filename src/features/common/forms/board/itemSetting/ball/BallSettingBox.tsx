"use client"

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation'
import IconButton from '@mui/material/IconButton';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';
import { SelectItemModel } from '@/types/board/SelectItem';

type PageProps = {
    frame: any,
    setFrame: any,
    setSelectItem: any,
}

export default function BallSettingBox({ frame, setFrame, setSelectItem }: PageProps) {
    const [isOpenSaveModal, setIsOpenSaveModal] = React.useState<boolean>(false)

    const DeleteBall = () => {
        setSelectItem(new SelectItemModel())

        const frameArray = frame.concat();
        frameArray.forEach((item) => {
            item.ball.x = -500
            item.ball.y = -500
        })
        setFrame(frameArray)
    }

    return (
        <>
            {/* 
            <IconButton size='small' onClick={() => { console.log("test") }} sx={{ color: "#444" }}>
                <EditNoteIcon sx={{ width: { xs: "20px" }, height: { xs: "20px" } }} />
            </IconButton> */}

            <IconButton size='small' onClick={() => { DeleteBall() }} sx={{ color: "#444" }}>
                <DeleteIcon sx={{ width: { xs: "20px" }, height: { xs: "20px" } }} />
            </IconButton>
        </>
    )
}
