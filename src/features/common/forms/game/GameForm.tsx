"use client"

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation'
import { auth } from '@/app/firebase';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material-next/Button';
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


type pageProps = {
    contents: any,
    postData: any
}

export default function GameForm({ contents, postData }: pageProps) {
    const router = useRouter()
    const params = useParams()
    const [waitFlag, setWaitFlag] = React.useState(false);
    const [titleError, setTitleError] = React.useState(false);

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const uid = await auth.currentUser?.uid;
        if (uid) {
            contents.uid = uid
            const res = await postData(contents)
            if (res.ok) {
                router.replace(`/calendar/${dayjs(String(params.date)).format('YYYY-MM-DD')}`)
            }
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


    return (
        // <Box maxWidth="sm" sx={containterStyle}>
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
                        <Button size="small" sx={{ color: 'black' }} variant='text' onClick={(event) => router.back()}>
                            <Typography fontSize={13} component="p">
                                キャンセル
                            </Typography>
                        </Button>
                    </Grid>
                    <Grid>
                        <Button size="small" sx={{ backgroundColor: "#1976d2 !important" }} variant='filled' type='submit'>
                            <Typography fontSize={13} component="p">
                                記録する
                            </Typography>
                        </Button>
                    </Grid>
                </Grid>

                <Divider />
            </Box>

            <Box>
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

                <Box>
                    <Box sx={{ my: 1, px: 2 }}>
                        <Typography variant="h6" sx={{ fontSize: 14, mb: 2 }} component="div">
                            基本情報
                        </Typography>
                        <FormControl fullWidth sx={{ mb: 2 }} variant="outlined">
                            <InputLabel sx={{ fontSize: 14 }} shrink={contents.title != undefined} error={titleError} htmlFor="outlined-adornment-title">タイトル</InputLabel>
                            <OutlinedInput

                                required
                                id="outlined-adornment-title"
                                name="title"
                                aria-describedby="outlined-title-helper-text"
                                label="タイトル"
                                value={contents.title}
                                error={titleError}
                                // helperText="入力してください。"
                                // onSelect={() => { titleError = false }}
                                onChange={newValue => {
                                    setTitle(newValue.target.value)
                                    contents.title = newValue.target.value
                                }}
                                sx={{ fontSize: 14, backgroundColor: "background.paper" }}
                                notched={contents.title != undefined}
                            />
                            {!!titleError && (
                                <FormHelperText error id="accountId-error">
                                    {"入力してください。"}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <Stack spacing={1} sx={{ mb: 2 }} direction="row" alignItems="center">
                            <FormControl fullWidth variant="outlined">
                                <InputLabel sx={{ fontSize: 14 }} shrink={contents.place != undefined} htmlFor="outlined-adornment-place">場所</InputLabel>
                                <OutlinedInput
                                    sx={{ fontSize: 14, backgroundColor: "background.paper" }}
                                    id="outlined-adornment-place"
                                    name="place"
                                    aria-describedby="outlined-place-helper-text"
                                    label="場所"
                                    value={contents.place}
                                    onChange={newValue => {
                                        setPlace(newValue.target.value)
                                        contents.place = newValue.target.value
                                    }}
                                    notched={contents.place != undefined}
                                />
                            </FormControl>

                            <FormControl fullWidth variant="outlined">
                                <InputLabel sx={{ fontSize: 14 }} shrink={contents.weather != ""} htmlFor="outlined-adornment-weather">天気</InputLabel>
                                <Select
                                    sx={{ fontSize: 14, backgroundColor: "background.paper" }}
                                    labelId="outlined-adornment-weather-label"
                                    name="weather"
                                    id="outlined-adornment-weather"
                                    value={contents.weather}
                                    label="天気"
                                    onChange={newValue => {
                                        setWeather(newValue.target.value)
                                        contents.weather = newValue.target.value
                                    }}
                                    notched={contents.weather != ""}
                                >
                                    <MenuItem sx={{ fontSize: 14 }} value="晴れ">晴れ</MenuItem>
                                    <MenuItem sx={{ fontSize: 14 }} value="曇り">曇り</MenuItem>
                                    <MenuItem sx={{ fontSize: 14 }} value="雨">雨</MenuItem>
                                    <MenuItem sx={{ fontSize: 14 }} value="雪">雪</MenuItem>
                                </Select>
                            </FormControl>
                        </Stack>
                    </Box>

                    <Divider />

                    <Box sx={{ my: 1, px: 2 }}>
                        <Typography variant="h6" sx={{ fontSize: 14, mb: 2 }} component="div">
                            コンディション
                        </Typography>
                        <Box sx={{ mb: 3 }}>
                            <InputLabel sx={{ mb: 1, fontSize: 14 }} >体調</InputLabel>
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
                                {contents.condition != 0 &&
                                    <Typography variant="h6" sx={{ px: 1, fontSize: 14 }}>
                                        {customIcons[Number(contents.condition)].label}
                                    </Typography>
                                }
                            </Stack>
                        </Box>
                        <Box sx={{ mb: 3 }}>
                            <InputLabel sx={{ mb: 1, fontSize: 14 }} >疲労感</InputLabel>
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
                                {contents.fatigue != 0 &&
                                    <Typography variant="h6" sx={{ px: 1, fontSize: 14 }}>
                                        {customIcons[Number(contents.fatigue)].label}
                                    </Typography>
                                }
                            </Stack>
                        </Box>
                        <Box sx={{ mb: 3 }}>
                            <InputLabel sx={{ mb: 1, fontSize: 14 }} >怪我</InputLabel>
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

                    <Divider />

                    <Box sx={{ my: 1, px: 2 }}>
                        <Typography variant="h6" sx={{ fontSize: 14, mb: 2 }} component="div">
                            チーム情報
                        </Typography>
                        <InputLabel sx={{ mb: 1, fontSize: 14 }} >チーム1</InputLabel>
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

                        <InputLabel sx={{ mb: 1, fontSize: 14 }} >チーム2</InputLabel>
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

                    <Box sx={{ my: 1, px: 2 }}>
                        <Typography variant="h6" sx={{ fontSize: 14, mb: 2 }} component="div">
                            ポジション
                        </Typography>
                        <FormControl fullWidth sx={{ my: 1 }} variant="outlined">
                            <InputLabel sx={{ fontSize: 14 }} shrink={contents.position != undefined} htmlFor="outlined-adornment-position">ポジション</InputLabel>
                            <OutlinedInput sx={{ fontSize: 14, backgroundColor: "background.paper" }}
                                id="outlined-adornment-position"
                                name="position"
                                aria-describedby="outlined-weight-helper-text"
                                label="ポジション"
                                value={contents.position}
                                onChange={newValue => {
                                    setPosition(newValue.target.value)
                                    contents.position = newValue.target.value
                                }}
                                notched={contents.position != undefined}
                            />
                        </FormControl>
                    </Box>

                    <Divider />

                    <Box sx={{ my: 1, px: 2 }}>
                        <Typography variant="h6" sx={{ fontSize: 14, mb: 2 }} component="div">
                            振り返り
                        </Typography>
                        <Box sx={{ mb: 1 }}>
                            <Stack spacing={2} direction="row" sx={{ alignItems: "center" }}>
                                <InputLabel sx={{ mx: 1, fontSize: 14, width: "100%" }}>良かった点</InputLabel>
                                <Button sx={{ fontSize: 13, minWidth: 85 }} onClick={AddGoodPoints}>追加</Button>
                            </Stack>
                            {contents.goodPoints.map((input, index) => (
                                <Stack spacing={1} key={index} direction="row" sx={{ alignItems: "center", mb: 2 }}>
                                    <Select sx={{ fontSize: 14, minWidth: "120px" }}
                                        value={contents.goodPoints[index].type}
                                        onChange={newValue => {
                                            ChangeGoodPointsType(Number(newValue.target.value), index)
                                        }}
                                    >
                                        {elementsCategories.map((type, index2) => (
                                            <MenuItem sx={{ fontSize: 14 }} key={index2} value={index2}>{type.title}</MenuItem>
                                        ))}
                                    </Select>
                                    <FormControl fullWidth sx={{ mb: 1 }}>
                                        <OutlinedInput
                                            value={contents.goodPoints[index].context}
                                            onChange={newValue => ChangeGoodPointsContext(newValue.target.value, index)}
                                            sx={{ fontSize: 14 }}
                                        />
                                    </FormControl>
                                </Stack>
                            ))}
                        </Box>

                        <Box sx={{ mb: 1 }}>
                            <Stack spacing={2} direction="row" sx={{ alignItems: "center" }}>
                                <InputLabel sx={{ mx: 1, fontSize: 14, width: "100%" }}>悪かった点</InputLabel>
                                <Button sx={{ fontSize: 13, minWidth: 85 }} onClick={AddBadPoints}>追加</Button>
                            </Stack>
                            {contents.badPoints.map((input, index) => (
                                <Stack spacing={1} key={index} direction="row" sx={{ alignItems: "center", mb: 2 }}>
                                    <Select sx={{ fontSize: 14, minWidth: "120px" }}
                                        value={contents.badPoints[index].type}
                                        onChange={newValue => {
                                            ChangeBadPointsType(Number(newValue.target.value), index)
                                        }}
                                    >
                                        {elementsCategories.map((type, index2) => (
                                            <MenuItem sx={{ fontSize: 14 }} key={index2} value={index2}>{type.title}</MenuItem>
                                        ))}
                                    </Select>
                                    <FormControl fullWidth sx={{ mb: 1 }}>
                                        <OutlinedInput
                                            id="outlined-adornment-input"
                                            value={contents.badPoints[index].context}
                                            onChange={newValue => ChangeBadPointsContext(newValue.target.value, index)}
                                            sx={{ fontSize: 14 }}
                                        />
                                    </FormControl>
                                </Stack>
                            ))}
                        </Box>
                    </Box>

                    <Divider />

                    <Box sx={{ my: 1, px: 2 }}>
                        <Typography variant="h6" sx={{ fontSize: 14, mb: 2 }} component="div">
                            コメント
                        </Typography>
                        <FormControl fullWidth sx={{ fontSize: 14, mb: 4 }} variant="outlined">
                            <OutlinedInput
                                sx={{ m: "0 !important", fontSize: 14, backgroundColor: "background.paper" }}
                                multiline
                                value={contents.comment}
                                onChange={newValue => {
                                    setComment(newValue.target.value)
                                    contents.comment = newValue.target.value
                                }}
                                notched={contents.comment != ""}
                            />
                        </FormControl>
                    </Box>
                </Box >
            </Box >
        </Box >

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

