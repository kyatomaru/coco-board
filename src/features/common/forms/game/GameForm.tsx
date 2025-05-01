"use client"

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation'
import { auth } from '@/app/firebase';
import { storage } from '@/app/firebase';
import { ref, getBlob } from "firebase/storage";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material-next/Button';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import ClearIcon from '@mui/icons-material/Clear';
import Divider from '@mui/material/Divider'
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import { styled } from '@mui/material/styles';
import { GameFeedbackModel } from '@/types/game/GameFeedback';
import { elementsCategories } from '@/types/Category';
import MuiRating, { RatingProps, IconContainerProps } from '@mui/material/Rating';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import ConfirmCloseModal from '../../contents/modal/ConfirmModal';
import { backTitle, backMs } from '@/constants/ModalMessage'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { ImageSelectForm } from '../Input/ImageSelectForm';
import { useGetGameImages } from '@/hooks/game/image/useGetGameImages';
import { GameTeamModel } from '@/types/game/GameTeam';
import BoardSelectForm from '../Input/BoardSelectForm';
import { BoardType } from '@/types/board/Board';
import Paper from '@mui/material/Paper';
import MenuSelectBox from '../../create/MenuSelectBox';
import TextField from '@mui/material/TextField';
import { mainColor } from '@/constants/Color';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

type pageProps = {
    contents: any,
    postData: any,
    onClose: any,
    boards: any[],
    isCreate: boolean,
    menu: number,
    setMenu: Function
}

export default function GameForm({ contents, postData, onClose, boards, isCreate, menu, setMenu }: pageProps) {
    const router = useRouter()
    const params = useParams()
    const [isConfirmCloseModal, setIsConfirmCloseModal] = React.useState<boolean>(false)
    const [waitFlag, setWaitFlag] = React.useState(false);

    const [onPosition, setOnPosition] = React.useState(contents.position != undefined)
    const [onCondition, setOnCondition] = React.useState(contents.condition > 0 || contents.fatigue > 0 || contents.injury != undefined)
    const [isImagesLoading, setIsImagesLoading] = React.useState(false)

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        if (!isImagesLoading) {
            event.preventDefault()
            const uid = await auth.currentUser?.uid;
            if (uid) {
                contents.uid = uid
                postData(contents, selectedFiles)
            }
        }
    }

    React.useEffect(() => {
        if (!contents.teams) {
            contents.teams = [new GameTeamModel()]
        }
    }, [contents])

    const [title, setTitle] = React.useState(contents.title);
    const [place, setPlace] = React.useState(contents.place);
    const [weather, setWeather] = React.useState(contents.weather);
    const [injury, setInjury] = React.useState(contents.injury);
    const [condition, setCondition] = React.useState(contents.condition);
    const [fatigue, setFatigue] = React.useState(contents.fatigue);
    const [teams, setTeams] = React.useState(contents.teams ?? [new GameTeamModel()]);
    const [position, setPosition] = React.useState(contents.position);
    const [goodPoints, setGoodPoints] = React.useState(contents.goodPoints);
    const [badPoints, setBadPoints] = React.useState(contents.badPoints);
    const [next, setNext] = React.useState(contents.next);
    const [comment, setComment] = React.useState(contents.comment);
    const [selectedFiles, setSelectedFiles] = useGetGameImages(contents.images ?? [], setIsImagesLoading)
    const [selectedBoardIds, setSelectedBoardIds] = React.useState<string[]>(contents.boardIds || []);

    const onBoardSelect = (boardIds: string[]) => {
        setSelectedBoardIds(boardIds);
        contents.boardIds = boardIds;
    };

    const ChangeTeamName = (newValue: String, index) => {
        const input = []
        teams.forEach((item) => {
            input.push(item)
        })
        input[index].team = newValue
        setTeams(input)
        contents.teams = input
    }

    const ChangeScore1 = (newValue: String, index) => {
        const input = []
        teams.forEach((item) => {
            input.push(item)
        })
        input[index].score1 = newValue
        setTeams(input)
        contents.teams = input
    }

    const ChangeScore2 = (newValue: String, index) => {
        const input = []
        teams.forEach((item) => {
            input.push(item)
        })
        input[index].score2 = newValue
        setTeams(input)
        contents.teams = input
    }

    const AddTeam = () => {
        const input = []
        teams.forEach((item) => {
            input.push(item)
        })
        input.push(new GameFeedbackModel())
        setTeams(input)
        contents.teams = input
    }

    const deleteTeam = (index) => {
        const input = []
        teams.map((item, itemIndex) => {
            if (itemIndex != index) {
                input.push(item)
            }
        })
        setTeams(input)
        contents.teams = input
    }

    const ChangeGoodPointsContext = (newValue: String, index) => {
        const input = []
        goodPoints.forEach((item) => {
            input.push(item)
        })
        input[index].context = newValue
        setGoodPoints(input)
        contents.goodPoints = input
    }

    const AddGoodPoints = () => {
        const input = []
        goodPoints.forEach((item) => {
            input.push(item)
        })
        input.push(new GameFeedbackModel())
        setGoodPoints(input)
        contents.goodPoints = input
    }

    const deleteGoodPoint = (index) => {
        const input = []
        goodPoints.map((item, itemIndex) => {
            if (itemIndex != index) {
                input.push(item)
            }
        })
        setGoodPoints(input)
        contents.goodPoints = input
    }

    const ChangeBadPointsContext = (newValue: String, index) => {
        const input = []
        badPoints.forEach((item) => {
            input.push(item)
        })
        input[index].context = newValue
        setBadPoints(input)
        contents.badPoints = input
    }

    const AddBadPoints = () => {
        const input = []
        badPoints.forEach((item) => {
            input.push(item)
        })
        input.push(new GameFeedbackModel())
        setBadPoints(input)
        contents.badPoints = input
    }

    const deleteBadPoint = (index) => {
        const input = []
        badPoints.map((item, itemIndex) => {
            if (itemIndex != index) {
                input.push(item)
            }
        })
        setBadPoints(input)
        contents.badPoints = input
    }

    return (
        <>
            <ConfirmCloseModal open={isConfirmCloseModal} setOpen={setIsConfirmCloseModal} title={backTitle} message={backMs} confirmText="中止する" onSubmit={onClose} />
            <Box
                component="form"
                onSubmit={onSubmit}
                sx={{
                    '& .MuiTextField-root': { m: 1 },
                    paddingBottom: { xs: "148px", md: "90px" },
                    minHeight: "100vh",
                    backgroundColor: "white",
                    borderRight: "solid 0.5px #b2b2b2",
                    borderLeft: "solid 0.5px #b2b2b2",
                }}
                noValidate
                autoComplete="off"
                method='POST'
            >
                {!isCreate &&
                    <Box>
                        <Stack direction="row" sx={{ px: 2, height: "36px" }} alignContent="center" justifyContent="flex-start">
                            <IconButton size="small" sx={{ width: "30px", height: "30px", my: "auto !important" }} onClick={() => setIsConfirmCloseModal(true)}>
                                <ClearIcon sx={{ fontSize: "1.25rem" }} />
                            </IconButton>
                        </Stack>

                        <Divider />
                    </Box>
                }

                <Box>
                    {isCreate &&
                        <Box sx={{ px: 2 }}>
                            <MenuSelectBox alignment={menu} setAlignment={setMenu} />
                        </Box>
                    }

                    <Divider />

                    <Box sx={{ my: 1 }}>
                        <Stack sx={{ mb: 1, px: 2 }} direction="row" spacing={0} alignItems="center">
                            <InputLabel sx={{ fontSize: 13, width: "90px", color: "black" }} >タイトル</InputLabel>
                            <TextField
                                required
                                fullWidth
                                size="small"
                                variant="standard"
                                name="title"
                                value={contents.title}
                                onChange={newValue => {
                                    setTitle(newValue.target.value)
                                    contents.title = newValue.target.value
                                }}
                                inputProps={{style: {fontSize: 13}}}
                                sx={{ backgroundColor: "background.paper" }}
                            />
                        </Stack>

                        <Stack sx={{ mb: 1, px: 2 }} direction="row" spacing={0} alignItems="center">
                            <InputLabel sx={{ fontSize: 13, width: "90px", color: "black" }} >場所</InputLabel>
                            <TextField
                                inputProps={{style: {fontSize: 13}}}
                                fullWidth
                                variant="standard"
                                size="small"
                                name="place"
                                value={contents.place}
                                onChange={newValue => {
                                    setPlace(newValue.target.value)
                                    contents.place = newValue.target.value
                                }}
                            />
                        </Stack>

                        <Stack sx={{ mb: 1, px: 2 }} direction="row" spacing={0} alignItems="center">
                            <InputLabel sx={{ fontSize: 13, width: "90px", color: "black" }} >天気</InputLabel>
                            <Select
                                sx={{ fontSize: 13, backgroundColor: "background.paper", mx: 1 }}
                                variant="standard"
                                name="weather"
                                size="small"
                                fullWidth
                                value={contents.weather}
                                onChange={newValue => {
                                    setWeather(newValue.target.value)
                                    contents.weather = newValue.target.value
                                }}
                            >
                                <MenuItem sx={{ fontSize: 13 }} value="晴れ">晴れ</MenuItem>
                                <MenuItem sx={{ fontSize: 13 }} value="曇り">曇り</MenuItem>
                                <MenuItem sx={{ fontSize: 13 }} value="雨">雨</MenuItem>
                                <MenuItem sx={{ fontSize: 13 }} value="雪">雪</MenuItem>
                            </Select>
                        </Stack>

                        <Stack sx={{ px: 2 }} direction="row" spacing={0} alignItems="center">
                            <InputLabel sx={{ fontSize: 13, width: "90px", color: "black", whiteSpace: "normal" }} >ポジション</InputLabel>
                            <TextField
                                inputProps={{style: {fontSize: 13}}}
                                fullWidth
                                variant="standard"
                                name="position"
                                size="small"
                                value={contents.position}
                                    onChange={newValue => {
                                        setPosition(newValue.target.value)
                                        contents.position = newValue.target.value
                                    }}
                            />
                        </Stack>
                    </Box>

                    <Divider />

                    <Box sx={{ my: 1, px: 2 }}>
                            <Stack spacing={2} direction="row" justifyContent="space-between" sx={{ alignItems: "center", mb: 1 }}>
                                <InputLabel sx={{ mb: 1, fontSize: 13, color: "black" }} >対戦チーム</InputLabel>
                                <IconButton size="small" sx={{ color: mainColor }} onClick={AddTeam}>
                                    <AddCircleOutlineIcon sx={{ width: "20px", height: "20px"  }} /> 
                                </IconButton>
                            </Stack>
                            {contents.teams &&
                                contents.teams.map((input, index) => (
                                    <Box key={index} sx={{ position: "relative" }}>
                                        <Stack sx={{ my: 2, alignItems: "center" }} direction="row" spacing={1} alignContent="flex-start">
                                            <InputLabel sx={{ fontSize: 13, color: "black", minWidth: "25px" }} >VS</InputLabel>

                                            <Box>
                                                <Stack direction="row" spacing={0} alignItems="center" justifyContent="flex-start">
                                                    <InputLabel sx={{ fontSize: 13, color: "black", minWidth: "60px" }} >チーム名</InputLabel>
                                                    <TextField
                                                        fullWidth
                                                        variant="standard"
                                                        name="team"
                                                        inputProps={{style: {fontSize: 13}}}
                                                        value={contents.teams[index].team}
                                                        onChange={newValue => ChangeTeamName(newValue.target.value, index)}
                                                    />
                                                </Stack>

                                                <Stack direction="row" spacing={0} alignItems="center" justifyContent="flex-start">
                                                    <InputLabel sx={{ fontSize: 13, color: "black", minWidth: "60px" }} >スコア</InputLabel>
                                                    <Stack sx={{ alignItems: "center" }} direction="row" spacing={0} alignContent="flex-start">
                                                        <TextField
                                                            fullWidth
                                                            inputProps={{style: {fontSize: 13}}}
                                                            variant="standard"
                                                            value={contents.teams[index].score1}
                                                            onChange={newValue => ChangeScore1(newValue.target.value, index)}
                                                        />
                                                        <InputLabel sx={{ fontSize: 17, color: "black", mx: 2, width: "40px" }} >ー</InputLabel>
                                                        <TextField
                                                            fullWidth
                                                            inputProps={{style: {fontSize: 13}}}
                                                            variant="standard"
                                                            value={contents.teams[index].score2}
                                                            onChange={newValue => ChangeScore2(newValue.target.value, index)}
                                                            />
                                                    </Stack>
                                                </Stack>
                                            </Box>
                                        </Stack>
                                        {index != 0 && !contents.teams[index].team && !contents.teams[index].score1 && !contents.teams[index].score2 &&
                                            <IconButton onClick={() => deleteTeam(index)} sx={{ position: "absolute", right: "-5px", top: "-5px", p: 0, backgroundColor: "white !important" }}>
                                                <HighlightOffIcon sx={{ width: "20px", height: "20px" }} />
                                            </IconButton>
                                        }

                                        {index != contents.teams.length - 1 &&
                                            <Divider />
                                        }
                                    </Box>
                                ))
                            }
                    </Box>

                    <Divider />


                    <Box sx={{ my: 2, px: 2 }}>
                        <Box sx={{ my: 1 }}>
                            <Stack sx={{ mb: 1 }} spacing={2} direction="row" justifyContent="space-between" alignItems="center">
                                <InputLabel sx={{ mx: 1, fontSize: 13, color: "#ff5e00", fontWeight: "bold" }}>良い点</InputLabel>
                                <IconButton size="small" sx={{ color: mainColor }} onClick={AddGoodPoints}>
                                    <AddCircleOutlineIcon sx={{ width: "20px", height: "20px"  }} /> 
                                </IconButton>
                            </Stack>
                            {contents.goodPoints.map((input, index) => (
                                <FormControl key={index} fullWidth sx={{ mb: 1, position: "relative" }}>
                                    <OutlinedInput
                                        multiline
                                        minRows={1}
                                        value={contents.goodPoints[index].context}
                                        onChange={newValue => ChangeGoodPointsContext(newValue.target.value, index)}
                                        sx={{ fontSize: 13, py: "9px" }}
                                        placeholder={index == 0 && "良かったところや良かったプレーなど"}
                                        startAdornment
                                    />
                                    {index != 0 && !contents.goodPoints[index].context &&
                                        <IconButton onClick={() => deleteGoodPoint(index)} sx={{ position: "absolute", right: "-5px", top: "-5px", p: 0, backgroundColor: "white !important" }}>
                                            <HighlightOffIcon sx={{ width: "20px", height: "20px" }} />
                                        </IconButton>
                                    }
                                </FormControl>
                            ))}
                        </Box>

                        <Box sx={{ my: 1 }}>
                            <Stack sx={{ mb: 1 }} spacing={2} direction="row" justifyContent="space-between" alignItems="center">
                                <InputLabel sx={{ mx: 1, fontSize: 13, color: "#007eff", fontWeight: "bold" }}>悪い点</InputLabel>
                                <IconButton size="small" sx={{ color: mainColor }} onClick={AddBadPoints}>
                                    <AddCircleOutlineIcon sx={{ width: "20px", height: "20px"  }} /> 
                                </IconButton>
                            </Stack>
                            {contents.badPoints.map((input, index) => (
                                <FormControl key={index} fullWidth sx={{ mb: 1 }}>
                                    <OutlinedInput
                                        multiline
                                        minRows={1}
                                        value={contents.badPoints[index].context}
                                        onChange={newValue => ChangeBadPointsContext(newValue.target.value, index)}
                                        sx={{ fontSize: 13, py: "9px" }}
                                        placeholder={index == 0 && "悪かったところや悪かったプレーなど"}
                                    />
                                    {index != 0 && !contents.badPoints[index].context &&
                                        <IconButton onClick={() => deleteBadPoint(index)} sx={{ position: "absolute", right: "-5px", top: "-5px", p: 0, backgroundColor: "white !important" }}>
                                            <HighlightOffIcon sx={{ width: "20px", height: "20px" }} />
                                        </IconButton>
                                    }
                                </FormControl>
                            ))}
                        </Box>

                        <Box sx={{ my: 1 }}>
                            <InputLabel sx={{ mb: 1, fontSize: 13, color: "#16b41e", fontWeight: "bold" }}>次に向けて</InputLabel>
                            <FormControl fullWidth sx={{ fontSize: 13 }} variant="outlined">
                                <OutlinedInput
                                    sx={{ m: "0 !important", fontSize: 13, py: "9px" }}
                                    multiline
                                    minRows={1}
                                    value={contents.next}
                                    onChange={newValue => {
                                        setNext(newValue.target.value)
                                        contents.next = newValue.target.value
                                    }}
                                    placeholder='次に向けての目標や取り組むことなど'
                                />
                            </FormControl>
                        </Box>
                    </Box>

                    <Divider />

                    <Box sx={{ my: 2, px: 2 }}>
                        <Typography variant="h6" sx={{ fontSize: 13, mb: 0.5, color: "black" }}>
                            ボード
                        </Typography>
                        <Typography variant="h6" sx={{ fontSize: 12, mb: 1, color: "#888" }}>
                            記録日のボードを選択することができます
                        </Typography>
                        <BoardSelectForm
                            boards={boards}
                            selectedBoards={selectedBoardIds}
                            onBoardSelect={onBoardSelect}
                        />
                    </Box>

                    <Divider />

                    <Box sx={{ my: 2, px: 2 }}>
                        <Typography variant="h6" sx={{ fontSize: 13, mb: 2, color: "black" }}>
                            画像
                        </Typography>
                        <ImageSelectForm
                            selectedFiles={selectedFiles}
                            setSelectedFiles={setSelectedFiles}
                            maxImages={5}
                            isLoading={isImagesLoading}
                        />
                    </Box>

                    <Divider />

                    <Box sx={{ my: 2, px: 2 }}>
                        <Typography variant="h6" sx={{ fontSize: 13, mb: 1, color: "black" }}>
                            コメント
                        </Typography>
                        <FormControl fullWidth sx={{ fontSize: 13, mb: 4 }} variant="outlined">
                            <OutlinedInput
                                sx={{ fontSize: 13, py: "9px" }}
                                multiline
                                minRows={1}
                                value={contents.comment}
                                onChange={newValue => {
                                    setComment(newValue.target.value)
                                    contents.comment = newValue.target.value
                                }}
                            />
                        </FormControl>
                    </Box>
                </Box>
                
                <Box sx={{ position: 'sticky', bottom: { xs: "135px", md: "80px" }, left: 0, right: 0, backgroundColor: "white", zIndex: 100 }}>
                    <Divider />
                    <Stack justifyContent="center" alignItems="center" sx={{ pt: 2, pb: 1 }} >
                        <Button size="small" fullWidth sx={{ width: "90%", borderRadius: "10px", cursor: isImagesLoading && "pointer", backgroundColor: isImagesLoading ? "#aaa !important" :  "#2e7d32 !important" }} variant='filled' type='submit'>
                            <Typography fontSize={13} component="p">
                                記録する
                            </Typography>
                        </Button>
                    </Stack>
                </Box>
            </Box >
        </>
    )
}

const StyledRating = styled((props: RatingProps) => (
    <MuiRating
        // max={4}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
        color: theme.palette.action.disabled,
    },
}));

const customIcons: {
    [index: string]: {
        icon: React.ReactElement;
        label: string;
    };
} = {
    1: {
        icon: <SentimentVeryDissatisfiedIcon color="error" />,
        label: '不良',
    },
    2: {
        icon: <SentimentDissatisfiedIcon color="error" />,
        label: 'やや不良',
    },
    3: {
        icon: <SentimentSatisfiedIcon color="warning" />,
        label: '普通',
    },
    4: {
        icon: <SentimentSatisfiedAltIcon color="success" />,
        label: 'やや良好',
    },
    5: {
        icon: <SentimentVerySatisfiedIcon sx={{ color: "#00cc33" }} />,
        label: '良好',
    },
};

function IconContainer(props: IconContainerProps) {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
}

