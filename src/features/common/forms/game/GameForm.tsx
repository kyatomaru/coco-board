"use client"

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation'
import { auth } from '@/app/firebase';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material-next/Button';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import ja from 'date-fns/locale/ja'
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

type pageProps = {
    contents: any,
    postData: any,
    onClose: any
}

export default function GameForm({ contents, postData, onClose }: pageProps) {
    const router = useRouter()
    const params = useParams()
    const [isConfirmCloseModal, setIsConfirmCloseModal] = React.useState<boolean>(false)
    const [waitFlag, setWaitFlag] = React.useState(false);

    const [onPosition, setOnPosition] = React.useState(false)
    const [onCondition, setOnCondition] = React.useState(false)

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const uid = await auth.currentUser?.uid;
        if (uid) {
            contents.uid = uid
            postData(contents)
        }
    }

    const [title, setTitle] = React.useState(contents.title);
    const [place, setPlace] = React.useState(contents.place);
    const [weather, setWeather] = React.useState(contents.weather);
    const [injury, setInjury] = React.useState(contents.injury);
    const [condition, setCondition] = React.useState(contents.condition);
    const [fatigue, setFatigue] = React.useState(contents.fatigue);
    const [name1, setName1] = React.useState(contents.name1);
    const [score1, setScore1] = React.useState(contents.score1);
    const [name2, setName2] = React.useState(contents.name2);
    const [score2, setScore2] = React.useState(contents.score2);
    const [position, setPosition] = React.useState(contents.position);
    const [goodPoints, setGoodPoints] = React.useState(contents.goodPoints);
    const [badPoints, setBadPoints] = React.useState(contents.badPoints);
    const [next, setNext] = React.useState(contents.next);
    const [comment, setComment] = React.useState(contents.comment);

    const ChangeGoodPointsContext = (newValue: String, index) => {
        const input = []
        goodPoints.forEach((item) => {
            input.push(item)
        })
        input[index].context = newValue
        setGoodPoints(input)
        contents.goodPoints = input
    }

    const ChangeGoodPointsType = (newValue: Number, index) => {
        const input = []
        goodPoints.forEach((item) => {
            input.push(item)
        })
        input[index].type = newValue
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

    const ChangeBadPointsType = (newValue: Number, index) => {
        const input = []
        badPoints.forEach((item) => {
            input.push(item)
        })
        input[index].type = newValue
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
                    marginBottom: "30px",
                    minHeight: "100vh"
                }}
                noValidate
                autoComplete="off"
                method='POST'
            >
                <Box sx={{ position: 'sticky', top: 0, backgroundColor: "white", zIndex: 100 }} >
                    <Grid sx={{ px: 1, height: "50px" }} container direction="row" alignItems="center" justifyContent="space-between">
                        <Grid >
                            <Button size="small" sx={{ color: 'black' }} variant='text' onClick={() => setIsConfirmCloseModal(true)}>
                                <Typography fontSize={13} component="p">
                                    キャンセル
                                </Typography>
                            </Button>
                        </Grid>
                        <Grid>
                            <Button size="small" sx={{ backgroundColor: "#2e7d32 !important" }} variant='filled' type='submit'>
                                <Typography fontSize={13} component="p">
                                    記録する
                                </Typography>
                            </Button>
                        </Grid>
                    </Grid>

                    <Divider />
                </Box>

                <Box >
                    <Box sx={{ mx: "auto", px: 2 }}>
                        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker sx={{ mx: "0 !important", width: "auto !important", backgroundColor: "background.paper" }} format='yyyy年MM月dd日'
                                    value={new Date(String(contents.date))}
                                    disableFuture
                                    onChange={(newValue) => { contents.date = dayjs(String(newValue)).format('YYYY-MM-DD') }} />
                            </DemoContainer>
                        </LocalizationProvider>
                    </Box>

                    <Box sx={{ my: 3 }}>
                        <Box sx={{ my: 2, px: 2 }}>
                            <InputLabel sx={{ mb: 1, fontSize: 14, color: "black" }} >タイトル</InputLabel>
                            <FormControl fullWidth sx={{ mb: 2 }} variant="outlined">
                                <OutlinedInput
                                    required
                                    name="title"
                                    value={contents.title}
                                    onChange={newValue => {
                                        setTitle(newValue.target.value)
                                        contents.title = newValue.target.value
                                    }}
                                    sx={{ fontSize: 14, backgroundColor: "background.paper" }}
                                />
                            </FormControl>
                        </Box>

                        <Box sx={{ my: 2, px: 2 }}>
                            <InputLabel sx={{ mb: 1, fontSize: 14, color: "black" }} >場所</InputLabel>
                            <FormControl fullWidth sx={{ mb: 2 }} variant="outlined">
                                <OutlinedInput
                                    sx={{ fontSize: 14, backgroundColor: "background.paper" }}
                                    name="place"
                                    value={contents.place}
                                    onChange={newValue => {
                                        setPlace(newValue.target.value)
                                        contents.place = newValue.target.value
                                    }}
                                />
                            </FormControl>
                        </Box>

                        <Box sx={{ my: 2, px: 2 }}>
                            <InputLabel sx={{ mb: 1, fontSize: 14, color: "black" }} >天気</InputLabel>
                            <FormControl fullWidth sx={{ mb: 2 }} variant="outlined">
                                <Select
                                    sx={{ fontSize: 14, backgroundColor: "background.paper" }}
                                    name="weather"
                                    value={contents.weather}
                                    onChange={newValue => {
                                        setWeather(newValue.target.value)
                                        contents.weather = newValue.target.value
                                    }}
                                >
                                    <MenuItem sx={{ fontSize: 14 }} value="晴れ">晴れ</MenuItem>
                                    <MenuItem sx={{ fontSize: 14 }} value="曇り">曇り</MenuItem>
                                    <MenuItem sx={{ fontSize: 14 }} value="雨">雨</MenuItem>
                                    <MenuItem sx={{ fontSize: 14 }} value="雪">雪</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Box>

                    <Divider />

                    <Box sx={{ my: 3, px: 2 }}>
                        {/* <Typography variant="h6" sx={{ fontSize: 14, mb: 2, color: "black" }} component="div">
                            チーム情報
                        </Typography> */}
                        <InputLabel sx={{ mb: 1, fontSize: 14 }} >HOME</InputLabel>
                        <Stack sx={{ mb: 2, alignItems: "center" }} spacing={1} direction="row" >
                            <FormControl fullWidth sx={{ mb: 1, }} variant="outlined">
                                {/* <InputLabel sx={{ fontSize: 14 }} htmlFor="outlined-adornment-name1">チーム名</InputLabel> */}
                                <OutlinedInput sx={{ fontSize: 14, backgroundColor: "background.paper" }}
                                    id="outlined-adornment-name1"
                                    name="name1"
                                    placeholder="チーム名"
                                    value={contents.name1}
                                    onChange={newValue => {
                                        setName1(newValue.target.value)
                                        contents.name1 = newValue.target.value
                                    }}
                                />
                            </FormControl>

                            <FormControl sx={{ mb: 1, width: "70px", minWidth: "70px" }} variant="outlined">
                                {/* <InputLabel sx={{ fontSize: 14 }} htmlFor="outlined-adornment-score1">点数</InputLabel> */}
                                <OutlinedInput sx={{ fontSize: 14, backgroundColor: "background.paper" }}
                                    id="outlined-adornment-score1"
                                    name="score1"
                                    aria-describedby="outlined-score1-helper-text"
                                    placeholder="スコア"
                                    value={contents.score1}
                                    onChange={newValue => {
                                        setScore1(newValue.target.value)
                                        contents.score1 = newValue.target.value
                                    }}
                                />
                            </FormControl>
                        </Stack>

                        <InputLabel sx={{ mb: 1, fontSize: 14 }} >AWAY</InputLabel>
                        <Stack sx={{ mb: 2, alignItems: "center" }} spacing={1} direction="row">
                            <FormControl fullWidth sx={{ mb: 1, }} variant="outlined">
                                {/* <InputLabel sx={{ fontSize: 14 }} htmlFor="outlined-adornment-name2">チーム名</InputLabel> */}
                                <OutlinedInput
                                    sx={{ fontSize: 14, backgroundColor: "background.paper" }}
                                    id="outlined-adornment-name2"
                                    name="name2"
                                    aria-describedby="outlined-name2-helper-text"
                                    placeholder="チーム名"
                                    value={contents.name2}
                                    onChange={newValue => {
                                        setName2(newValue.target.value)
                                        contents.name2 = newValue.target.value
                                    }}
                                />
                            </FormControl>

                            <FormControl sx={{ mb: 1, width: "70px", minWidth: "70px" }} variant="outlined">
                                {/* <InputLabel sx={{ fontSize: 14 }} htmlFor="outlined-adornment-score2">点数</InputLabel> */}
                                <OutlinedInput
                                    sx={{ fontSize: 14, backgroundColor: "background.paper" }}
                                    id="outlined-adornment-score2"
                                    name="score2"
                                    aria-describedby="outlined-score2-helper-text"
                                    placeholder="スコア"
                                    value={contents.score2}
                                    onChange={newValue => {
                                        setScore2(newValue.target.value)
                                        contents.score2 = newValue.target.value
                                    }}
                                />
                            </FormControl>
                        </Stack>
                    </Box>

                    <Divider />

                    <Box sx={{ my: 3, px: 2 }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }} >
                            <Typography variant="h6" sx={{ fontSize: 14, color: "black" }} component="div">
                                ポジション
                            </Typography>
                            <Switch size='small' onChange={() => setOnPosition(!onPosition)} />
                        </Stack>
                        {onPosition &&
                            <FormControl fullWidth sx={{ my: 1 }} variant="outlined">
                                <OutlinedInput sx={{ fontSize: 14, backgroundColor: "background.paper" }}
                                    name="position"
                                    value={contents.position}
                                    onChange={newValue => {
                                        setPosition(newValue.target.value)
                                        contents.position = newValue.target.value
                                    }}
                                />
                            </FormControl>
                        }
                    </Box>

                    <Divider />

                    <Box sx={{ my: 3, px: 2 }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }} >
                            <Typography variant="h6" sx={{ fontSize: 14, color: "black" }} component="div">
                                コンディション
                            </Typography>
                            <Switch size='small' onChange={() => setOnCondition(!onCondition)} />
                        </Stack>
                        {onCondition &&
                            <Box>
                                <Box sx={{ mb: 3 }}>
                                    <InputLabel sx={{ mb: 1, fontSize: 14, color: "black" }} >体調</InputLabel>
                                    <Stack direction="row" spacing={2}>
                                        <StyledRating
                                            name="highlight-selected-only"
                                            size="large"
                                            value={Number(contents.condition)}
                                            IconContainerComponent={IconContainer}
                                            getLabelText={(value: number) => customIcons[value].label}
                                            onChange={(event, newValue) => {
                                                setCondition(newValue);
                                                contents.condition = newValue
                                            }}
                                            highlightSelectedOnly
                                        />
                                        {contents.condition <= 0 &&
                                            <Typography variant="h6" sx={{ px: 1, fontSize: 14 }}>
                                                {customIcons[Number(contents.condition)].label}
                                            </Typography>
                                        }
                                    </Stack>
                                </Box>
                                <Box sx={{ mb: 3 }}>
                                    <InputLabel sx={{ mb: 1, fontSize: 14, color: "black" }} >疲労感</InputLabel>
                                    <Stack direction="row" spacing={2}>
                                        <StyledRating
                                            name="highlight-selected-only"
                                            size="large"
                                            value={Number(contents.fatigue)}
                                            IconContainerComponent={IconContainer}
                                            getLabelText={(value: number) => customIcons[value].label}
                                            onChange={(event, newValue) => {
                                                setFatigue(newValue);
                                                contents.fatigue = newValue
                                            }}
                                            highlightSelectedOnly
                                        />
                                        {contents.fatigue <= 0 &&
                                            <Typography variant="h6" sx={{ px: 1, fontSize: 14 }}>
                                                {customIcons[Number(contents.fatigue)].label}
                                            </Typography>
                                        }
                                    </Stack>
                                </Box>
                                <Box sx={{ mb: 3 }}>
                                    <InputLabel sx={{ mb: 1, fontSize: 14, color: "black" }} >怪我</InputLabel>
                                    <FormControl fullWidth sx={{ mb: 1, }} variant="outlined">
                                        <OutlinedInput sx={{ fontSize: 14, backgroundColor: "background.paper" }}
                                            value={contents.injury}
                                            onChange={newValue => {
                                                setInjury(newValue.target.value)
                                                contents.injury = newValue.target.value
                                            }}
                                        />
                                    </FormControl>
                                </Box>
                            </Box>
                        }
                    </Box>

                    <Divider />


                    <Box sx={{ my: 3, px: 2 }}>
                        {/* <Typography variant="h6" sx={{ fontSize: 14, mb: 2, color: "black" }} component="div">
                            振り返り
                        </Typography> */}
                        <Box sx={{ my: 2 }}>
                            <Stack spacing={2} direction="row" justifyContent="space-between" sx={{ alignItems: "center", mb: 1 }}>
                                <InputLabel sx={{ mx: 1, fontSize: 14, color: "#ff5e00", fontWeight: "bold" }}>良い点</InputLabel>
                                <Button size="small" color='secondary' sx={{ fontSize: 13, minWidth: 85 }} onClick={AddGoodPoints}>
                                    <Typography fontSize={13} component="p">
                                        追加
                                    </Typography>
                                </Button>
                            </Stack>
                            {contents.goodPoints.map((input, index) => (
                                <FormControl key={index} fullWidth sx={{ mb: 1, position: "relative" }}>
                                    <OutlinedInput
                                        multiline
                                        minRows={2}
                                        value={contents.goodPoints[index].context}
                                        onChange={newValue => ChangeGoodPointsContext(newValue.target.value, index)}
                                        sx={{ fontSize: 14 }}
                                        placeholder={index == 0 && "良かったところや良かったプレーなど"}
                                        startAdornment
                                    />
                                    {index != 0 && !contents.goodPoints[index].context &&
                                        <IconButton onClick={() => deleteGoodPoint(index)} sx={{ position: "absolute", right: "-5px", top: "-5px", p: 0, backgroundColor: "white" }}>
                                            <HighlightOffIcon sx={{ width: "20px", height: "20px" }} />
                                        </IconButton>
                                    }
                                </FormControl>
                            ))}
                        </Box>

                        <Box sx={{ my: 2 }}>
                            <Stack spacing={2} direction="row" justifyContent="space-between" sx={{ alignItems: "center", mb: 1 }}>
                                <InputLabel sx={{ mx: 1, fontSize: 14, color: "#007eff", fontWeight: "bold" }}>悪い点</InputLabel>
                                <Button size="small" color='secondary' sx={{ fontSize: 13, minWidth: 85 }} onClick={AddBadPoints}>
                                    <Typography fontSize={13} component="p">
                                        追加
                                    </Typography>
                                </Button>
                            </Stack>
                            {contents.badPoints.map((input, index) => (
                                <FormControl key={index} fullWidth sx={{ mb: 1 }}>
                                    <OutlinedInput
                                        multiline
                                        minRows={2}
                                        value={contents.badPoints[index].context}
                                        onChange={newValue => ChangeBadPointsContext(newValue.target.value, index)}
                                        sx={{ fontSize: 14 }}
                                        placeholder={index == 0 && "悪かったところや悪かったプレーなど"}
                                    />
                                    {index != 0 && !contents.badPoints[index].context &&
                                        <IconButton onClick={() => deleteBadPoint(index)} sx={{ position: "absolute", right: "-5px", top: "-5px", p: 0, backgroundColor: "white" }}>
                                            <HighlightOffIcon sx={{ width: "20px", height: "20px" }} />
                                        </IconButton>
                                    }
                                </FormControl>
                            ))}
                        </Box>

                        <Box sx={{ my: 2 }}>
                            <InputLabel sx={{ mb: 1, fontSize: 14, color: "#16b41e", fontWeight: "bold" }}>次に向けて</InputLabel>
                            <FormControl fullWidth sx={{ fontSize: 14 }} variant="outlined">
                                <OutlinedInput
                                    sx={{ m: "0 !important", fontSize: 14, backgroundColor: "background.paper" }}
                                    multiline
                                    minRows={2}
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

                    <Box sx={{ my: 3, px: 2 }}>
                        <Typography variant="h6" sx={{ fontSize: 14, mb: 2, color: "black" }}>
                            コメント
                        </Typography>
                        <FormControl fullWidth sx={{ fontSize: 14, mb: 4 }} variant="outlined">
                            <OutlinedInput
                                sx={{ m: "0 !important", fontSize: 14, backgroundColor: "background.paper" }}
                                multiline
                                minRows={2}
                                value={contents.comment}
                                onChange={newValue => {
                                    setComment(newValue.target.value)
                                    contents.comment = newValue.target.value
                                }}
                            />
                        </FormControl>
                    </Box>
                </Box >
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

