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
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { PositionList } from '@/constants/board/PositionList';
import { FormationList } from '@/constants/board/FormationList';
import { TeamArray } from '@/constants/board/TeamArray';
import { MuiColorInput } from 'mui-color-input'
import { PlayerColor } from '@/types/board/Setting';
import { CourtRatio, setRatio } from '@/constants/board/CourtRatio';
import { setBesideCoordinate } from '@/hooks/board/courtSetting/CourtSetting';
import AllowPartialScrolling from '@/components/common/AllowPartialScrolling';


type PageProps = {
    frame: any,
    setFrame: any,
    board: any
    setMenu: any
}

export default function PlayersSettingBox({ frame, setFrame, board, setMenu }: PageProps) {
    const [team, setTeam] = React.useState(0);
    const [formation, setFormation] = React.useState([0, 0]);

    const [players, setPlayers] = React.useState([TeamArray(0, board.setting.color), TeamArray(1, board.setting.color)])

    const [verticalWidth, setVerticalWidth] = React.useState(0);
    const [verticalHeight, setVerticalHeight] = React.useState(0);
    const [besideWidth, setBesideWidth] = React.useState(0);
    const [besideHeight, setBesideHeight] = React.useState(0);

    const setWindow = () => {
        const courtLength = setRatio(window.innerWidth, window.innerHeight)
        setVerticalWidth(courtLength[0])
        setVerticalHeight(courtLength[1])
        setBesideWidth(courtLength[2])
        setBesideHeight(courtLength[3]);
    }

    React.useEffect(() => {
        setWindow()
    }, [])

    React.useEffect(() => {
        setWindow()
    }, [board.courtId])

    React.useEffect(() => {
        window.addEventListener("resize", setWindow);
    })

    const changeTeam = (event: React.SyntheticEvent, newValue: number) => {
        setTeam(newValue);
    };

    const formationMenu = () => {
        const menuItem = []
        FormationList(verticalWidth, verticalHeight).map((value, index) => {
            menuItem.push(<MenuItem value={index} sx={{ minHeight: 25 }}>{value.name}</MenuItem>)
        })
        return menuItem
    }

    const playersField = () => {
        const menuItem = []

        for (let index = 0; index < 11; index++) {
            menuItem.push((
                <Stack key={index} direction="row" justifyContent="flex-start" spacing={2} sx={{ mt: 1 }}>
                    <TextField
                        placeholder='名前'
                        size='small'
                        value={players[team][index].name}
                        sx={{ width: '18ch', fontSize: 10 }}
                        onChange={(event) => {
                            const playersArray = players.concat()
                            playersArray[team][index].name = event.target.value
                            setPlayers(playersArray)
                        }}
                    />
                    <TextField
                        placeholder='背番号'
                        size='small'
                        value={players[team][index].backNumber}
                        sx={{ height: 25, width: '8ch', fontSize: 10 }}
                        onChange={(event) => {
                            const playersArray = players.concat()
                            playersArray[team][index].backNumber = event.target.value
                            setPlayers(playersArray)
                        }}
                    />
                    <Box sx={{ lineHeight: "40px" }}>
                        {(FormationList(verticalWidth, verticalHeight)[formation[team]].formation[index].position)}
                    </Box>
                    <Divider />
                </Stack>
            ))
        }
        return menuItem
    }

    const changeFormation = (event) => {
        const newFormation = formation.concat()
        newFormation[team] = event.target.value
        setFormation(newFormation)
    }

    const putPlayers = () => {
        const frameArray = Array()
        frame.forEach((item) => {
            frameArray.push(item)
        })

        for (let frameIndex = 0; frameIndex < frameArray.length; frameIndex++) {
            for (let playerIndex = frameArray[frameIndex].players.length - 1; playerIndex >= 0; playerIndex--) {
                if (frameArray[frameIndex].players[playerIndex].teamNumber == team) {
                    frameArray[frameIndex].players.splice(playerIndex, 1)
                }
            }

            for (let playerIndex = 0; playerIndex < 11; playerIndex++) {
                const diameter = players[team][playerIndex].diameter

                frameArray[frameIndex].players.push(JSON.parse(JSON.stringify(players[team][playerIndex])))

                const arrayIndex = frameArray[frameIndex].players.length - 1

                frameArray[frameIndex].players[arrayIndex].color = board.setting.color[team]
                frameArray[frameIndex].players[arrayIndex].position = FormationList(verticalWidth, verticalHeight)[formation[team]].formation[playerIndex].position

                let x, y

                if (team == 0)
                    x = FormationList(verticalWidth, verticalHeight)[formation[team]].formation[playerIndex].x - diameter
                else
                    x = verticalWidth - FormationList(verticalWidth, verticalHeight)[formation[team]].formation[playerIndex].x - diameter

                if (team == 0)
                    y = FormationList(verticalWidth, verticalHeight)[formation[team]].formation[playerIndex].y
                else
                    y = verticalHeight - FormationList(verticalWidth, verticalHeight)[formation[team]].formation[playerIndex].y - (2 * diameter)

                if (board.courtId == 0) {
                    frameArray[frameIndex].players[arrayIndex].x = x
                    frameArray[frameIndex].players[arrayIndex].y = y
                } else {
                    const coordinate = setBesideCoordinate(board.courtId, 0, verticalWidth, verticalHeight, besideWidth, besideHeight, x, y, diameter)
                    frameArray[frameIndex].players[arrayIndex].x = coordinate[0]
                    frameArray[frameIndex].players[arrayIndex].y = coordinate[1]
                }
            }
        }

        setFrame(frameArray)
        setMenu(0)
    }

    return (
        <AllowPartialScrolling>
            <Box sx={{ overflowY: "auto", position: "absolute", zIndex: 2000, height: verticalHeight + 26 + "px", backgroundColor: "white", borderRight: "0.5px #666 solid" }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={team} onChange={changeTeam} >
                        <Tab label="Home" value={0} sx={{ fontSize: 12 }} />
                        <Tab label="Away" value={1} sx={{ fontSize: 12 }} />
                    </Tabs>
                </Box>
                <Box sx={{ p: 1, my: 1 }}>
                    <Stack height="25px" direction="row" justifyContent="flex-start" spacing={2} sx={{ mb: 2 }}>
                        <Select
                            value={formation[team]}
                            onChange={(event) => changeFormation(event)}
                            sx={{ height: 30, width: 100 }}
                        >
                            {formationMenu()}
                        </Select>
                        <Button onClick={() => putPlayers()} size="small">
                            配置
                        </Button>
                    </Stack>

                    <Divider />

                    <Box sx={{ mt: 2 }}>
                        {playersField()}
                    </Box>
                </Box>
            </Box>
        </AllowPartialScrolling >
    )
}