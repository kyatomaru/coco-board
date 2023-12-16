"use client"

import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import type { GameContentsType } from '@/types/GameContents';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';


type PageProps = {
    contents: GameContentsType,
    titleError: boolean,
}

export default function GameForm({ contents, titleError }: PageProps) {
    const [title, setTitle] = React.useState(contents.title);
    const [place, setPlace] = React.useState(contents.place);
    const [weather, setWeather] = React.useState(contents.weather);
    const [name1, setName1] = React.useState(contents.name1);
    const [score1, setScore1] = React.useState(contents.score1);
    const [name2, setName2] = React.useState(contents.name2);
    const [score2, setScore2] = React.useState(contents.score2);
    const [position, setPosition] = React.useState(contents.position);
    const [goodPoints, setGoodPoints] = React.useState(contents.goodPoints);
    const [badPoints, setBadPoints] = React.useState(contents.badPoints);
    const [problems, setProblems] = React.useState(contents.problems);

    const ChangeGoodPoint = (newValue, index) => {
        const goodPoint = []
        goodPoints.forEach((item) => {
            goodPoint.push(item)
        })
        goodPoint[index] = newValue
        setGoodPoints(goodPoint)
        contents.goodPoints = goodPoint
    }

    const AddGoodPoint = () => {
        const goodPoint = []
        goodPoints.forEach((item) => {
            goodPoint.push(item)
        })
        goodPoint.push([undefined])
        setGoodPoints(goodPoint)
        contents.goodPoints = goodPoint
    }

    const ChangebadPoint = (newValue, index) => {
        const badPoint = []
        badPoints.forEach((item) => {
            badPoint.push(item)
        })
        badPoint[index] = newValue
        setBadPoints(badPoint)
        contents.badPoints = badPoint
    }

    const AddBadPoint = () => {
        const badPoint = []
        badPoints.forEach((item) => {
            badPoint.push(item)
        })
        badPoint.push([undefined])
        setBadPoints(badPoint)
        contents.badPoints = badPoint
    }

    const ChangeProblem = (newValue, index) => {
        const problem = []
        problems.forEach((item) => {
            problem.push(item)
        })
        problem[index].problem = newValue
        setProblems(problem)
        contents.problems = problem
    }

    const AddProblem = () => {
        const problem = []
        problems.forEach((item) => {
            problem.push(item)
        })
        problem.push({ problem: undefined, solution: [undefined] })
        setProblems(problem)
        contents.problems = problem
    }

    const ChangeSolution = (newValue, index, index2) => {
        const problem = []
        problems.forEach((item) => {
            problem.push(item)
        })
        problem[index].solution[index2] = newValue
        setProblems(problem)
        contents.problems = problem
    }

    const AddSolution = (index) => {
        const problem = []
        problems.forEach((item) => {
            problem.push(item)
        })
        problem[index].solution.push(undefined)
        setProblems(problem)
        contents.problems = problem
    }

    return (
        <Box>
            <Box sx={{ my: 3 }}>
                <Box sx={{ my: 2 }}>
                    <FormControl sx={{ p: 1, width: '25ch' }} variant="outlined">
                        <InputLabel error={titleError} htmlFor="outlined-adornment-title">タイトル</InputLabel>
                        <OutlinedInput
                            required
                            id="outlined-adornment-title"
                            name="title"
                            aria-describedby="outlined-title-helper-text"
                            label="タイトル"
                            value={title}
                            error={titleError}
                            // helperText="入力してください。"
                            onSelect={() => { titleError = false }}
                            onChange={newValue => {
                                setTitle(newValue.target.value)
                                contents.title = newValue.target.value
                            }}
                        />
                        {!!titleError && (
                            <FormHelperText error id="accountId-error">
                                {"入力してください。"}
                            </FormHelperText>
                        )}
                    </FormControl>

                    <FormControl sx={{ p: 1, width: '25ch' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-place">場所</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-place"
                            name="place"
                            aria-describedby="outlined-place-helper-text"
                            label="場所"
                            value={place}
                            onChange={newValue => {
                                setPlace(newValue.target.value)
                                contents.place = newValue.target.value
                            }}
                        />
                    </FormControl>

                    <FormControl sx={{ p: 1, width: '25ch' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-weather">天気</InputLabel>
                        <Select
                            labelId="outlined-adornment-weather-label"
                            name="weather"
                            id="outlined-adornment-weather"
                            value={weather}
                            label="天気"
                            onChange={newValue => {
                                setWeather(newValue.target.value)
                                contents.weather = newValue.target.value
                            }}
                        >
                            <MenuItem value="晴れ">晴れ</MenuItem>
                            <MenuItem value="曇り">曇り</MenuItem>
                            <MenuItem value="雨">雨</MenuItem>
                            <MenuItem value="雪">雪</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <Box sx={{ my: 2 }}>
                    <InputLabel sx={{ mb: 2 }}>チーム1</InputLabel>
                    <FormControl sx={{ mb: 1, p: 1, width: '25ch' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-name1">チーム名</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-name1"
                            name="name1"
                            aria-describedby="outlined-name1-helper-text"
                            label="チーム名"
                            value={name1}
                            onChange={newValue => {
                                setName1(newValue.target.value)
                                contents.name1 = newValue.target.value
                            }}

                        />
                    </FormControl>

                    <FormControl sx={{ mb: 1, p: 1, width: '25ch' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-score1">点数</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-score1"
                            name="score1"
                            aria-describedby="outlined-score1-helper-text"
                            label="点数"
                            value={score1}
                            onChange={newValue => {
                                setScore1(Number(newValue.target.value))
                                contents.score1 = Number(newValue.target.value)
                            }}
                        />
                    </FormControl>
                </Box>

                <Box sx={{ my: 2 }}>
                    <InputLabel sx={{ mb: 2 }}>チーム2</InputLabel>
                    <FormControl sx={{ mb: 1, p: 1, width: '25ch' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-name2">チーム名</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-name2"
                            name="name2"
                            aria-describedby="outlined-name2-helper-text"
                            label="チーム"
                            value={name2}
                            onChange={newValue => {
                                setName2(newValue.target.value)
                                contents.name2 = newValue.target.value
                            }}
                        />
                    </FormControl>

                    <FormControl sx={{ mb: 1, p: 1, width: '25ch' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-score2">点数</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-score2"
                            name="score2"
                            aria-describedby="outlined-score2-helper-text"
                            label="点数"
                            value={score2}
                            onChange={newValue => {
                                setScore2(Number(newValue.target.value))
                                contents.score2 = Number(newValue.target.value)
                            }}
                        />
                    </FormControl>
                </Box>

                <FormControl sx={{ p: 1, width: '25ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-position">ポジション</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-position"
                        name="position"
                        aria-describedby="outlined-weight-helper-text"
                        label="ポジション"
                        value={position}
                        onChange={newValue => {
                            setPosition(newValue.target.value)
                            contents.position = newValue.target.value
                        }}
                    />
                </FormControl>
            </Box>

            <Box sx={{ my: 3 }}>
                <Box sx={{ my: 1 }}>
                    <Stack spacing={2} direction="row">
                        <InputLabel>良かった点</InputLabel>
                        <Button onClick={AddGoodPoint}>追加</Button>
                    </Stack>
                    {goodPoints.map((goodPoint, index) => (
                        <FormControl key={index} fullWidth sx={{ p: 1 }}>
                            {/* <InputLabel htmlFor="outlined-adornment-goodpoint">Good point</InputLabel> */}
                            <OutlinedInput
                                id="outlined-adornment-goodpoint"
                                name="goodPoint"
                                // label="good point"
                                value={goodPoint}
                                onChange={newValue => ChangeGoodPoint(newValue.target.value, index)}
                            />
                        </FormControl>
                    ))}
                </Box>

                <Box sx={{ my: 1 }}>
                    <Stack spacing={2} direction="row">
                        <InputLabel >悪かった点</InputLabel>
                        <Button onClick={AddBadPoint}>追加</Button>
                    </Stack>
                    {badPoints.map((badPoint, index) => (
                        <FormControl key={index} fullWidth sx={{ p: 1 }}>
                            {/* <InputLabel htmlFor="outlined-adornment-goodpoint">Good point</InputLabel> */}
                            <OutlinedInput
                                id="outlined-adornment-badPoint"
                                name="badPoint"
                                // label="good point"
                                value={badPoint}
                                onChange={newValue => ChangebadPoint(newValue.target.value, index)}
                            />
                        </FormControl>
                    ))}
                </Box>
            </Box>

            <Box sx={{ my: 3 }}>
                <Stack spacing={2} direction="row">
                    <InputLabel >課題と解決策</InputLabel>
                    <Button onClick={AddProblem}>追加</Button>
                </Stack>
                {problems.map((item, index1) => (
                    <Box sx={{ my: 2 }} key={index1}>
                        <InputLabel >課題{index1 + 1}</InputLabel>
                        <FormControl fullWidth sx={{ p: 1 }}>
                            <OutlinedInput
                                id="outlined-adornment-badPoint"
                                name="badPoint"
                                // label="good point"
                                value={item.problem}
                                onChange={newValue => ChangeProblem(newValue.target.value, index1)}
                            />
                        </FormControl>

                        <Box>
                            <Stack spacing={2} direction="row">
                                <InputLabel >課題{index1 + 1}の解決策</InputLabel>
                                <Button onClick={event => AddSolution(index1)}>追加</Button>
                            </Stack>
                            {problems[index1].solution.map((solution, index2) => (
                                <Box key={index2}>
                                    <FormControl fullWidth sx={{ p: 1 }}>
                                        <OutlinedInput
                                            id="outlined-adornment-badPoint"
                                            name="badPoint"
                                            // label="good point"
                                            value={solution}
                                            onChange={newValue => ChangeSolution(newValue.target.value, index1, index2)}
                                        />
                                    </FormControl>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                ))}
            </Box>
        </Box >
    );
}