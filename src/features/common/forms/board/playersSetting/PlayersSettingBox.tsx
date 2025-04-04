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
import { FormationList11 } from '@/constants/board/formation/FormationList11';
import { FormationList8 } from '@/constants/board/formation/FormationList8';
import { FormationList5 } from '@/constants/board/formation/FormationList5';
import { TeamArray } from '@/constants/board/TeamArray';
import { MuiColorInput } from 'mui-color-input'
import { PlayerColor } from '@/types/board/Setting';
import { CourtRatio, setRatio } from '@/constants/board/CourtRatio';
import { setBesideCoordinate } from '@/hooks/board/courtSetting/CourtSetting';
import AllowPartialScrolling from '@/components/common/AllowPartialScrolling';
import Player from '@/features/common/board/item/Player';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { styled } from '@mui/material/styles';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { PlayerModel } from '@/types/board/Player';
import SyncIcon from '@mui/icons-material/Sync';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import PlayersSaveView from './PlayersSaveView';

type PageProps = {
    frame: any,
    setFrame: any,
    board: any
    setMenu: any
}

export default function PlayersSettingBox({ frame, setFrame, board, setMenu }: PageProps) {
    const [team, setTeam] = React.useState(0);

    const [formation, setFormation] = React.useState(board.setting.formation ?? [0, 0]);
    const [putFormation, setPutFormation] = React.useState(board.setting.formation ?? [0, 0]);
    const [teamSize, setTeamSize] = React.useState(board.setting.teamSize ?? 11);
    const [putTeamSize, setPutTeamSize] = React.useState(board.setting.teamSize ?? 11);
    const [players, setPlayers] = React.useState([undefined, undefined]);
    const [putPlayers, setPutPlayers] = React.useState([undefined, undefined]);

    const [isSaveView, setIsSaveView] = React.useState(false);
    const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);
    const [putDisabled, setPutDisabled] = React.useState(false);

    const [verticalWidth, setVerticalWidth] = React.useState(0);
    const [verticalHeight, setVerticalHeight] = React.useState(0);
    const [besideWidth, setBesideWidth] = React.useState(0);
    const [besideHeight, setBesideHeight] = React.useState(0);

    const [settingViewWidth, setSettingViewWidth] = React.useState(0)

    const setWindow = () => {
        const courtLength = setRatio(window.innerWidth, window.innerHeight)
        setVerticalWidth(courtLength[0])
        setVerticalHeight(courtLength[1])
        setBesideWidth(courtLength[2])
        setBesideHeight(courtLength[3]);
    }

    const initPlayers = () => {
        const prevPlayers = [[], []]

        for (let index = 0; index < frame[0].players.length; index++) {
            prevPlayers[frame[0].players[index].teamNumber].push({
                index: index,
                player: frame[0].players[index]
            })
        }

        for (let teamIndex = 0; teamIndex < 2; teamIndex++) {
            const remainingPlayers = 11 - prevPlayers[teamIndex].length;
            for (let index = 0; index < remainingPlayers; index++) {
                prevPlayers[teamIndex].push({
                    index: prevPlayers[teamIndex].length,
                    player: new PlayerModel(
                        teamIndex,
                        prevPlayers[teamIndex].length + 1,
                        `player${prevPlayers[teamIndex].length + 1}`,
                        board.setting.color[teamIndex]
                    )
                })
            }
        }

        setPlayers(prevPlayers)
        setPutPlayers(prevPlayers)
    }

    React.useEffect(() => {
        setWindow()
        initPlayers()
    }, [])

    React.useEffect(() => {
        setWindow()
    }, [board.courtId])

    React.useEffect(() => {
        if (!isSaveView) {
            setTeamData()
        }
    }, [isSaveView])

    React.useEffect(() => {
        window.addEventListener("resize", setWindow);

        const width = document.getElementById("playerField")?.clientWidth
        if (width != 0 && width) setSettingViewWidth(width)
    })

    const setTeamData = () => {
        if (players[0]) {
            setPutPlayers(players)
        }
        setPutTeamSize(teamSize)
        setPutFormation(formation)

        setPutDisabled(false)
    }

    const changeTeam = (event: React.SyntheticEvent, newValue: number) => {
        setTeam(newValue);
    };

    const formationMenus = () => {
        if (board.setting.teamSize == 11) {
            return FormationList11(verticalWidth, verticalHeight).map((value, index) =>
                formationMenu(value, index, FormationList11(0, 0).length - 1 > index)
            );
        }

        if (board.setting.teamSize == 8) {
            return FormationList8(verticalWidth, verticalHeight).map((value, index) =>
                formationMenu(value, index, FormationList8(0, 0).length - 1 > index)
            );
        }

        if (board.setting.teamSize == 5) {
            return FormationList5(verticalWidth, verticalHeight).map((value, index) =>
                formationMenu(value, index, FormationList5(0, 0).length - 1 > index)
            );
        }

        return FormationList11(verticalWidth, verticalHeight).map((value, index) =>
            formationMenu(value, index, FormationList11(0, 0).length - 1 > index)
        );
    }

    const formationMenu = (value, index, isDivider) => {
        return (
            <MenuItem value={index} key={index} sx={{ minHeight: 25 }} divider={isDivider}>{value.name}</MenuItem>
        )
    }

    const formationList = () => {
        if (board.setting.teamSize == 11) {
            return FormationList11(verticalWidth, verticalHeight)[putFormation[team]]
        }

        if (board.setting.teamSize == 8) {
            return FormationList8(verticalWidth, verticalHeight)[putFormation[team]]
        }

        if (board.setting.teamSize == 5) {
            return FormationList5(verticalWidth, verticalHeight)[putFormation[team]]
        }

        return FormationList11(verticalWidth, verticalHeight)[putFormation[team]]
    }

    const changeName = (name, index) => {
        if (frame[0].players[index]) {
            const frameArray = []

            frame.forEach((item) => {
                frameArray.push(item)
            })

            frameArray.forEach((item) => {
                item.players[index].name = name
            })

            setFrame(frameArray)
        }
    }

    const changeNumber = (backNumber, index) => {
        if (frame[0].players[index]) {
            const frameArray = []

            frame.forEach((item) => {
                frameArray.push(item)
            })

            frameArray.forEach((item) => {
                item.players[index].backNumber = backNumber
            })

            setFrame(frameArray)
        }

    }

    const changeTeamSize = (e) => {
        console.log(e.target.value)
        const newTeamSize = e.target.value;
        setTeamSize(newTeamSize);
        setPutTeamSize(newTeamSize);  // putTeamSizeも同時に更新
        board.setting.teamSize = newTeamSize;

        initPlayers()

        setFormation([0, 0])
    }

    const changeFormation = (event) => {
        board.setting.formation[team] = event.target.value

        const newFormation = formation.concat()
        newFormation[team] = event.target.value
        setFormation(newFormation)
    }

    const handleItemClick = (index: number) => {
        if (selectedIndex === null) {
            setSelectedIndex(index);
        } else {
            if (index !== selectedIndex) {
                const newPlayers = players.concat();
                const temp = newPlayers[team][selectedIndex];
                newPlayers[team][selectedIndex] = newPlayers[team][index];
                newPlayers[team][index] = temp;
                setPlayers(newPlayers);
            }
            setSelectedIndex(null);
        }
    };

    const playersField = () => {
        return (
            <Box sx={{ p: 1, my: 1 }} id="playerField">
                {players[team]?.map((playerData, index) => (
                    teamSize > index &&
                    <Stack
                        key={playerData.index}
                        direction="row"
                        justifyContent="flex-start"
                        alignItems='center'
                        onClick={() => handleItemClick(index)}
                        sx={{
                            width: '100%'
                        }}
                    >
                        <Stack
                            direction="row"
                            justifyContent="flex-start"
                            sx={{
                                pr: 1,
                                userSelect: 'none',
                                position: 'relative',
                                height: '48px',
                                display: 'flex',
                                alignItems: 'center',
                                cursor: 'pointer',
                                backgroundColor: selectedIndex === index ? 'rgba(25, 118, 210, 0.08)' : 'transparent',
                                '&:hover': {
                                    backgroundColor: 'rgba(0, 0, 0, 0.04)'
                                },
                            }}
                        >
                            <ChangeCircleIcon sx={{ mx: 1, color: selectedIndex === index ? 'primary.main' : 'inherit' }} />
                            <TextField
                                placeholder='名前'
                                size='small'
                                value={playerData.player.name ?? ""}
                                sx={{ width: '20ch', fontSize: 14 }}
                                inputProps={{
                                    style: { fontSize: 14 },
                                    onClick: (e) => e.stopPropagation()
                                }}
                                onChange={(event) => {
                                    const playersArray = players.concat();
                                    playersArray[team][index].player.name = event.target.value;
                                    setPlayers(playersArray);
                                    changeName(event.target.value, playerData.index);
                                }}
                            />
                            <TextField
                                placeholder='背番号'
                                size='small'
                                value={playerData.player.backNumber ?? ""}
                                sx={{ width: '8ch', fontSize: 14 }}
                                inputProps={{
                                    style: { fontSize: 14 },
                                    onClick: (e) => e.stopPropagation()
                                }}
                                onChange={(event) => {
                                    const playersArray = players.concat();
                                    playersArray[team][index].player.backNumber = event.target.value;
                                    setPlayers(playersArray);
                                    changeNumber(event.target.value, playerData.index);
                                }}
                            />
                        </Stack>

                        <Box sx={{ width: '5ch', lineHeight: "40px", color: "black", mx: 1, textAlign: "center" }}>
                            {formationList()?.formation[index].position}
                        </Box>
                    </Stack>
                ))}
            </Box>
        );
    }

    const placePlayers = () => {
        const frameArray = Array()
        frame.forEach((item) => {
            frameArray.push(item)
        })

        console.log(players)
        console.log(putPlayers)
        console.log(putTeamSize)
        console.log(putFormation)

        for (let frameIndex = 0; frameIndex < frameArray.length; frameIndex++) {
            for (let playerIndex = frameArray[frameIndex].players.length - 1; playerIndex >= 0; playerIndex--) {
                if (frameArray[frameIndex].players[playerIndex].teamNumber == team) {
                    frameArray[frameIndex].players.splice(playerIndex, 1)
                }
            }

            // edit player
            for (let playerIndex = 0; playerIndex < putTeamSize; playerIndex++) {
                frameArray[frameIndex].players.push(JSON.parse(JSON.stringify(putPlayers[team][playerIndex].player)))

                const arrayIndex = frameArray[frameIndex].players.length - 1
                const diameter = frameArray[frameIndex].players[arrayIndex].diameter

                frameArray[frameIndex].players[arrayIndex].color = board.setting.color[team]
                frameArray[frameIndex].players[arrayIndex].position = formationList().formation[playerIndex].position

                let x, y

                if (team == 0)
                    x = formationList().formation[playerIndex].x - diameter
                else
                    x = verticalWidth - formationList().formation[playerIndex].x - diameter

                if (team == 0)
                    y = formationList().formation[playerIndex].y
                else
                    y = verticalHeight - formationList().formation[playerIndex].y - (2 * diameter)

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

        board.setting.teamSize = putTeamSize
        const newFormation = formation
        newFormation[team] = putFormation[team]
        board.setting.formation = newFormation

        setFrame(frameArray)
        setMenu(0)
    }

    return (
        <Box sx={{ height: verticalHeight + 28 + "px", position: "absolute", zIndex: 2000 }} id="teamSettingBox">
            <Box sx={{ backgroundColor: "white", borderRight: "0.5px #666 solid", "-webkit-overflow-scrolling": "touch", overflowY: "scroll", height: "100%" }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <StyledTabs value={team} onChange={changeTeam}>
                        <Tab label="Home" value={0} sx={{ fontSize: 12, fontWeight: "bolder" }} />
                        <Tab label="Away" value={1} sx={{ fontSize: 12, fontWeight: "bolder" }} />
                    </StyledTabs>
                </Box>

                <Box sx={{ p: 1, mt: 1 }}>
                    <Stack direction="row" justifyContent="space-between" spacing={1}>
                        {!isSaveView ?
                            <Button onClick={() => { setIsSaveView(true) }} size="small" variant="contained" sx={{ background: "#2e7d32 !important" }}>
                                保存リスト
                            </Button>
                            :
                            <Button onClick={() => { setIsSaveView(false) }} size="small" sx={{ color: 'black' }}>
                                キャンセル
                            </Button>
                        }

                        <Button onClick={() => placePlayers()} disabled={putDisabled} size="small" variant="contained" sx={{ background: putDisabled ? "#888" : "#1565c0 !important" }}>
                            配置
                        </Button>
                    </Stack>
                </Box>

                <Divider />

                {!isSaveView ?
                    <Box>
                        <Box sx={{ p: 1 }}>
                            <Stack direction="row" justifyContent="flex-start" spacing={1}>
                                <Select
                                    value={board.setting.teamSize ?? 11}
                                    onChange={(e) => changeTeamSize(e)}
                                    sx={{ height: 30, width: 100, fontSize: 14 }}
                                >
                                    <MenuItem value={11} key={0} sx={{ minHeight: 25, fontSize: 14 }} divider={true}>11人制</MenuItem>
                                    <MenuItem value={8} key={1} sx={{ minHeight: 25, fontSize: 14 }} divider={true}>8人制</MenuItem>
                                    <MenuItem value={5} key={2} sx={{ minHeight: 25, fontSize: 14 }}>5人制</MenuItem>
                                </Select>

                                <Select
                                    value={formation[team]}
                                    onChange={(e) => changeFormation(e)}
                                    sx={{ height: 30, width: 100 }}
                                >
                                    {formationMenus()}
                                </Select>
                            </Stack>
                        </Box>

                        <Divider />

                        <Box sx={{ my: 1 }}>
                            {playersField()}
                        </Box>
                    </Box>
                    :
                    <PlayersSaveView
                        isView={isSaveView}
                        setPutDisabled={setPutDisabled}
                        viewWidth={settingViewWidth}
                        verticalWidth={verticalWidth}
                        verticalHeight={verticalHeight}
                        setPutPlayers={setPutPlayers}
                        setPutTeamSize={setPutTeamSize}
                        setPutFormation={setPutFormation}
                        savePlayers={players[team]}
                        saveTeamSize={teamSize}
                        saveFormation={formation[team]}
                    />
                }
            </Box>
        </Box >
    )
}

interface StyledTabsProps {
    children?: React.ReactNode;
    value: number;
    onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

interface StyledTabProps {
    label: string;
}

const StyledTabs = styled((props: StyledTabsProps) => (
    <Tabs
        {...props}
        TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
        variant="fullWidth"
        centered
    />
))(({ theme }) => ({
    minHeight: "38px",
    '& button': {
        minHeight: "38px",
    },
}));