"use client"

import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import type { PracticeContentsType } from '@/types/PracticeContents';
import { theme } from '@/components/style/Thema'
import AddInputBox from './inputBox/AddInputBox';


type PageProps = {
    contents: PracticeContentsType,
    titleError: boolean,
}

export default function PracticeForm({ contents, titleError }: PageProps) {
    const [title, setTitle] = React.useState(contents.title);
    const [place, setPlace] = React.useState(contents.place);
    const [weather, setWeather] = React.useState(contents.weather);
    const [details, setDetails] = React.useState(contents.details);
    const [problems, setProblems] = React.useState(contents.problems);

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
        <Box >
            <Box sx={{ my: 3 }}>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-title">タイトル</InputLabel>
                    {/* <OutlinedInput
                        id="outlined-adornment-title"
                        name="title"
                        aria-describedby="outlined-title-helper-text"
                        label="タイトル"
                        defaultValue={title}
                    /> */}
                    <Select
                        labelId="outlined-adornment-title-label"
                        name="title"
                        id="outlined-adornment-title"
                        value={title}
                        label="タイトル"
                        onChange={newValue => {
                            setTitle(newValue.target.value)
                            contents.title = newValue.target.value
                        }}
                    >
                        <MenuItem value="自主練習">自主練習</MenuItem>
                        <MenuItem value="チーム練習">チーム練習</MenuItem>
                    </Select>
                </FormControl>

                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
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

                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
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

            <Box sx={{ my: 3 }}>
                <AddInputBox title="練習メニュー" contents={contents.details} />
            </Box>

            <Box sx={{ my: 3, mx: 1 }}>
                <Stack spacing={2} direction="row">
                    <InputLabel sx={{ mx: 1 }}>課題と解決策</InputLabel>
                    <Button onClick={AddProblem}>追加</Button>
                </Stack>
                {problems.map((item, index1) => (
                    <Box sx={{ my: 3 }} key={index1}>
                        <InputLabel >課題{index1 + 1}</InputLabel>
                        <FormControl fullWidth sx={{ my: 1 }}>
                            <OutlinedInput
                                id="outlined-adornment-badPoint"
                                name="badPoint"
                                // label="good point"
                                value={item.problem}
                                onChange={newValue => ChangeProblem(newValue.target.value, index1)}
                            />
                        </FormControl>

                        <Box sx={{ my: 1 }}>
                            <Stack spacing={2} direction="row">
                                <InputLabel >課題{index1 + 1}の解決策</InputLabel>
                                <Button onClick={event => AddSolution(index1)}>追加</Button>
                            </Stack>
                            {problems[index1].solution.map((solution, index2) => (
                                <Box key={index2}>
                                    <FormControl fullWidth sx={{ mb: 1 }}>
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