"use client"

import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { PositionList } from '@/constants/board/PositionList';
import { FormationList } from '@/constants/board/FormationList';
import { TeamArray } from '@/constants/board/TeamArray';
import { MuiColorInput } from 'mui-color-input'
import { PlayerColor } from '@/types/board/Setting';

type PageProps = {
    frame: any,
    setFrame: any,
    board: any
    setMenu: any
}

export default function CourtSettingBox({ frame, setFrame, board, setMenu }: PageProps) {
    const [thisCourtId, setThisCourtId] = React.useState(board.courtId);

    const courtMenu = () => {
        const menuItem = []

        for (let index = 0; index < 3; index++) {
            menuItem.push((
                <Button onClick={(event) => { changeCourt(event, index) }} key={index} sx={{ height: "120px", border: thisCourtId == index && "3px solid #1976d2", p: 0.5 }}>
                    <img src={`/images/board/court${index + 1}.jpg`} style={{ height: "100%", }} />
                </Button>

            ))
        }
        return menuItem
    }

    const changeCourt = (event, newValue) => {
        setThisCourtId(newValue)
    }

    const submitCourt = () => {
        board.courtId = thisCourtId
        setMenu(0)
    }

    return (
        <Box sx={{ overflowY: "auto", top: "24px", position: "absolute", zIndex: 2000, backgroundColor: "white", borderRight: "0.5px #666 solid", borderBottom: "0.5px #666 solid", borderTop: "1px #666 solid" }}>
            <Box >
                <Stack height="25px" direction="row" justifyContent="flex-end" sx={{ mx: 1 }} >
                    <Button size="small" onClick={() => submitCourt()}>
                        変更
                    </Button>
                </Stack>

                <Divider />

                <Stack direction="row" justifyContent="flex-start" spacing={2} sx={{ p: 1 }}>
                    {courtMenu()}
                </Stack>
            </Box>
        </Box>
    )
}
