"use client"

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
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
import CircularProgress from '@mui/material/CircularProgress';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { PlayerModel } from '@/types/board/Player';
import { auth } from '@/app/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import type { User } from 'firebase/auth';
import { useGetTeamPlayers } from '@/hooks/board/players/useGetTeamPlayers';
import { useDeleteTeamPlayers } from '@/hooks/board/players/useDeleteTeamPlayers';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { PlayersModel } from '@/types/board/Players';
import { useInsertTeamPlayers } from '@/hooks/board/players/useInsertTeamPlayers';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteConfirmModal from '@/features/common/contents/modal/ConfirmModal';
import { teamPlayersModalTitle, deleteTeamPlayersMs } from '@/constants/ModalMessage';

type PageProps = {
    isView: boolean,
    setPutDisabled: any,
    viewWidth: any,
    verticalWidth: number,
    verticalHeight: number,
    setPutPlayers: any,
    setPutTeamSize: any,
    setPutFormation: any,
    savePlayers: any,
    saveTeamSize: number,
    saveFormation: number
}

export default function PlayersSaveView({ isView, setPutDisabled, viewWidth, verticalWidth, verticalHeight, setPutPlayers, setPutTeamSize, setPutFormation, savePlayers, saveTeamSize, saveFormation }: PageProps) {
    const [user, setUser] = React.useState<User | undefined>(null);
    const [teamPlayers, setTeamPlayers] = useGetTeamPlayers(user)

    const maxPage = 3
    const [page, setPage] = React.useState(0)
    const [isSaveLoading, setIsSaveLoading] = React.useState(false)
    const [isDeleteLoading, setIsDeleteLoading] = React.useState(false)
    const [deleteModalOpen, setDeleteModalOpen] = React.useState(false)

    React.useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user?.uid) {
                setUser(auth.currentUser)
            }
        })
    });

    React.useEffect(() => {
        if (isView && teamPlayers) {
            setTeamData(0)
        }
    }, [isView, teamPlayers])

    const formationList = () => {
        if (teamPlayers[page].teamSize == 11) {
            return FormationList11(verticalWidth, verticalHeight)[teamPlayers[page].formation]
        }

        if (teamPlayers[page].teamSize == 8) {
            return FormationList8(verticalWidth, verticalHeight)[teamPlayers[page].formation]
        }

        if (teamPlayers[page].teamSize == 5) {
            return FormationList5(verticalWidth, verticalHeight)[teamPlayers[page].formation]
        }

        return FormationList11(verticalWidth, verticalHeight)[teamPlayers[page].formation]
    }

    const InsertPlayers = async () => {
        setIsSaveLoading(true)

        const uid = await auth.currentUser?.uid;

        const newPlayers = new PlayersModel(page, savePlayers, saveTeamSize, saveFormation)
        newPlayers.uid = uid

        console.log(newPlayers)

        await useInsertTeamPlayers(newPlayers).then((data) => {
            const newTeamPlayers = teamPlayers.concat()
            newTeamPlayers[page] = data
            setTeamPlayers(newTeamPlayers)

            setPutPlayers([data.players, data.players])
            setPutTeamSize(data.teamSize)
            setPutFormation([data.formation, data.formation])

            setPutDisabled(false)
            setIsSaveLoading(false)
        })
    }

    const DeleteTeamPlayers = async () => {
        setIsDeleteLoading(true)
        await useDeleteTeamPlayers(teamPlayers[page].contentsId)
        const newTeamPlayers = teamPlayers.concat()
        newTeamPlayers[page] = undefined
        setTeamPlayers(newTeamPlayers)

        setDeleteModalOpen(false)
        setIsDeleteLoading(false)
        setPutDisabled(true)
    }

    const nextPage = () => {
        if (0 < page) {
            setPage(page - 1)
            setTeamData(page - 1)
        }
    }

    const previousPage = () => {
        if (maxPage > page + 1) {
            setPage(page + 1)
            setTeamData(page + 1)
        }
    }

    const setTeamData = (page) => {
        if (teamPlayers[page]) {
            const newPlayers = [[], []]
            newPlayers[0] = teamPlayers[page].players
            newPlayers[1] = teamPlayers[page].players
            setPutPlayers(newPlayers)
            setPutTeamSize(teamPlayers[page].teamSize)

            console.log(teamPlayers[page].formation)

            setPutFormation([teamPlayers[page].formation, teamPlayers[page].formation])

            setPutDisabled(false)
        } else {
            setPutDisabled(true)
        }
    }

    const playersField = () => {
        return (
            <Box sx={{ p: 1, height: "100%" }}>
                {teamPlayers[page]?.players.map((players, index) => (
                    teamPlayers[page]?.teamSize > index &&
                    <Stack
                        key={index}
                        direction="row"
                        justifyContent="flex-start"
                        alignItems='center'
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
                            }}
                        >
                            <ChangeCircleIcon sx={{ mx: 1, color: "white" }} />
                            <TextField
                                size='small'
                                value={players.player?.name ?? ""}
                                sx={{
                                    width: '20ch', fontSize: 14,
                                    '& .Mui-disabled': {
                                        '-webkit-text-fill-color': "black"
                                    }
                                }}
                                inputProps={{
                                    style: { fontSize: 14 }
                                }}
                                disabled
                            />
                            <TextField
                                size='small'
                                value={players.player?.backNumber ?? ""}
                                sx={{
                                    width: '8ch', fontSize: 14,
                                    '& .Mui-disabled': {
                                        '-webkit-text-fill-color': "black"
                                    }
                                }}
                                inputProps={{
                                    style: { fontSize: 14 }
                                }}
                                disabled
                            />
                        </Stack>

                        <Box sx={{ width: '5ch', lineHeight: "40px", color: "black", mx: 1, textAlign: "center" }}>
                            {formationList()?.formation[index].position}
                        </Box>
                    </Stack>
                ))
                }
            </Box >
        );
    }

    return (
        <>
            <DeleteConfirmModal open={deleteModalOpen} setOpen={setDeleteModalOpen} title={teamPlayersModalTitle} message={deleteTeamPlayersMs} confirmText="削除" onSubmit={DeleteTeamPlayers} />
            <Box sx={{ width: viewWidth }}>
                <Stack direction="row" justifyContent="space-between" spacing={1} sx={{ p: 1 }}>
                    <IconButton size='small' onClick={() => nextPage()} disabled={0 == page || !teamPlayers}>
                        <ArrowBackIosNewIcon sx={{ fontSize: 14 }} />
                    </IconButton>

                    <Typography sx={{ fontSize: 13 }}>
                        フォーメーション{page + 1}
                    </Typography>

                    <IconButton size='small' onClick={() => previousPage()} disabled={maxPage == page + 1 || !teamPlayers}>
                        <ArrowForwardIosIcon sx={{ fontSize: 14 }} />
                    </IconButton>
                </Stack>

                <Divider />

                {teamPlayers ?
                    teamPlayers[page] ?
                        <Box>
                            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 2 }}>
                                <Typography component="h2" sx={{ fontSize: 16, width: 100 }}>
                                    {formationList()?.name}
                                </Typography>
                                <IconButton onClick={() => setDeleteModalOpen(true)}>
                                    <DeleteIcon sx={{ color: "#444", fontSize: 22 }} />
                                </IconButton>
                            </Stack>

                            <Divider />

                            {playersField()}
                        </Box>
                        :
                        isSaveLoading || isDeleteLoading ?
                            <Box sx={{ width: "100%", height: "300px", textAlign: "center", display: "flex", alignItems: "center" }}>
                                <Box sx={{ width: "100%" }}>
                                    <CircularProgress sx={{ mx: "auto" }} color="success" />
                                </Box>
                            </Box>
                            :
                            <Button onClick={InsertPlayers} sx={{ width: "100%", height: "300px" }}>
                                <Stack direction="row" justifyContent="center" alignItems="center" >
                                    <AddCircleOutlineIcon />
                                    <Typography sx={{ fontSize: 14, mx: 1 }}>
                                        新規保存
                                    </Typography>
                                </Stack>
                            </Button>
                    :
                    <Box sx={{ width: "100%", height: "300px", textAlign: "center", display: "flex", alignItems: "center" }}>
                        <Box sx={{ width: "100%" }}>
                            <CircularProgress sx={{ mx: "auto" }} color="success" />
                        </Box>
                    </Box>
                }
            </Box>
        </>
    )
}