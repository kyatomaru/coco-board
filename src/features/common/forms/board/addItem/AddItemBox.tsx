"use client"

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation'
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import PersonIcon from '@mui/icons-material/Person';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import { PlayerModel } from '@/types/board/Player';

type PageProps = {
    frame: any,
    setFrame: any,
    board: any
}

export default function AddItemBox({ frame, setFrame, board }: PageProps) {


    const addBall = () => {
        const frameArray = []
        frame.forEach((item) => {
            frameArray.push(item)
        })

        if (frameArray[0].ball.x < 0) {
            frame.map((item, index) => {
                frameArray[index].ball.x = 0
                frameArray[index].ball.y = 0
            })
        }
        setFrame(frameArray)
    }

    const addPlayer = (team) => {
        const frameArray = []

        frame.forEach((item) => {
            frameArray.push(item)
        })

        let teamLength = 0
        for (let index = 0; index < frameArray[0].players.length; index++) {
            if (team == frameArray[0].players[index].teamNumber) teamLength++;
        }
        const name = "player" + String(frameArray[0].players.length + 1)

        frameArray.forEach((item) => {
            if (teamLength <= 10) {
                item.players.push(new PlayerModel(team, teamLength + 1, name, board.setting.color[team]))
            }
        })

        setFrame(frameArray)
    }

    return (
        <>
            <IconButton size='small' onClick={() => { addPlayer(0) }}>
                <Avatar sx={{ backgroundColor: "#444", width: { xs: "20px" }, height: { xs: "20px" }, fontSize: 10 }}>H</Avatar>
            </IconButton>

            <IconButton size='small' onClick={() => { addPlayer(1) }}>
                <Avatar sx={{ backgroundColor: "#444", width: { xs: "20px" }, height: { xs: "20px" }, fontSize: 10 }}>A</Avatar>
            </IconButton>

            <IconButton size='small' onClick={addBall} sx={{ color: "#444" }}>
                <SportsSoccerIcon sx={{ width: { xs: "20px" }, height: { xs: "20px" } }} />
            </IconButton>
        </ >
    )
}
