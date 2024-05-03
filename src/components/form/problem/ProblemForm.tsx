import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import AddInputBox from '../inputBox/AddInputBox';
import { ProblemContentsType } from '@/types/problem/ProblemContents';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { ProblemSolutionModel } from '@/types/problem/ProblemSolution';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import ja from 'date-fns/locale/ja'

type PageProps = {
    contents: ProblemContentsType,
    titleError: boolean
}

const shapeStyles = { width: 40, height: 40 };
const shapeCircleStyles = { borderRadius: '50%' };
const SelectCircle = (bgColor) => {
    return (
        <Box component="span" sx={{ backgroundColor: bgColor, ...shapeStyles, ...shapeCircleStyles }} />
    )
}



export default function ProblemForm({ contents, titleError }: PageProps) {
    const [problem, setProblem] = React.useState(contents.problem);
    const [categoryId, setCategoryId] = React.useState(contents.categoryId);
    const [category, setCategory] = React.useState(contents.category[0].title);
    const [importance, setImportance] = React.useState(contents.importance);
    const [solution, setSolution] = React.useState(contents.solutions);
    const [detail, setDetail] = React.useState(contents.detail);

    const ChangeSolutionsContext = (newValue: String, index) => {
        const input = []
        solution.forEach((item) => {
            input.push(item)
        })
        input[index].context = newValue
        setSolution(input)
        contents.solutions = input
    }

    const ChangeSolutionsType = (newValue: Number, index) => {
        const input = []
        solution.forEach((item) => {
            input.push(item)
        })
        input[index].type = newValue
        setSolution(input)
        contents.solutions = input
    }

    const AddSolutions = () => {
        const input = []
        solution.forEach((item) => {
            input.push(item)
        })
        input.push(new ProblemSolutionModel())
        setSolution(input)
        contents.solutions = input
    }

    return (
        <Box>
            <Box sx={{ mb: 3 }}>
                <FormControl fullWidth variant="outlined">
                    <InputLabel sx={{ fontSize: 14 }} shrink={contents.problem != undefined} error={titleError} htmlFor="outlined-adornment-problem">課題</InputLabel>
                    <OutlinedInput
                        required
                        id="outlined-adornment-problem"
                        name="problem"
                        aria-describedby="outlined-title-helper-text"
                        label="課題"
                        value={contents.problem}
                        onChange={newValue => {
                            setProblem(newValue.target.value)
                            contents.problem = newValue.target.value
                        }}
                        sx={{ fontSize: 14 }}
                        notched={contents.problem != undefined}
                    />
                    {!!titleError && (
                        <FormHelperText error id="accountId-error">
                            {"入力してください。"}
                        </FormHelperText>
                    )}
                </FormControl>
            </Box>

            <Box sx={{ maxWidth: "300px", mb: 3 }}>
                <InputLabel sx={{ fontSize: 14 }}>達成日</InputLabel>
                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
                    <DemoContainer sx={{ pt: "0 !important" }} components={['DatePicker']}>
                        <DatePicker sx={{ mx: "0 !important", width: "auto !important" }} format='yyyy年MM月dd日' value={new Date(contents.completionDate)} onChange={(newValue) => {
                            // setDateValue(newValue)
                            contents.completionDate = newValue
                        }} />
                    </DemoContainer>
                </LocalizationProvider>
            </Box>

            <Box sx={{ mb: 3, fontSize: "14px !important" }}>
                <FormControl fullWidth sx={{ fontSize: 14 }} variant="outlined">
                    <InputLabel sx={{ fontSize: 14 }} shrink={contents.detail != ""} htmlFor="filled-multiline-flexible">課題の詳細</InputLabel>
                    <OutlinedInput
                        sx={{ m: "0 !important", fontSize: 14 }}
                        id="filled-multiline-flexible"
                        label="課題の詳細"
                        multiline
                        value={contents.detail}
                        onChange={newValue => {
                            setDetail(newValue.target.value)
                            contents.detail = newValue.target.value
                        }}
                        notched={contents.detail != ""}
                    />
                </FormControl>
            </Box>

            <Box sx={{ mb: 3 }}>
                <FormControl fullWidth sx={{ mb: 2 }} variant="outlined">
                    <InputLabel sx={{ fontSize: 14 }} shrink={contents.category[contents.categoryId].title != ""} htmlFor="outlined-adornment-weather">カテゴリ</InputLabel>
                    <Select sx={{ fontSize: 14 }}
                        labelId="outlined-adornment-weather-label"
                        name="weather"
                        id="outlined-adornment-weather"
                        value={contents.categoryId}
                        label="カテゴリ"
                        onChange={newValue => {
                            setCategory(contents.category[Number(newValue.target.value)].title)
                            setCategoryId(Number(newValue.target.value))
                            contents.categoryId = Number(newValue.target.value)
                        }}
                        notched={contents.category[contents.categoryId].title != ""}
                    >
                        {contents.category.map((category, index) => (
                            <MenuItem sx={{ fontSize: 14 }} key={index} value={index}>{category.title}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            {/* <Box sx={{ mb: 3 }}>
                <InputLabel sx={{ mx: 1, fontSize: 14, mb: 1 }}>重要度</InputLabel>
                <Slider
                    sx={{ maxWidth: "300px", mx: "auto", ml: 1 }}
                    value={Number(contents.importance)}
                    onChange={(event, newValue) => {
                        setImportance(Number(newValue))
                        contents.importance = Number(newValue)
                    }}
                    step={1}
                    min={1}
                    max={3}
                    marks={[{ value: 1, label: '低', }, { value: 2, label: '普通', }, { value: 3, label: '高', }]}
                />
            </Box> */}
            <Box >
                <Box sx={{ mb: 1 }}>
                    <Stack spacing={2} direction="row" sx={{ alignItems: "center" }}>
                        <InputLabel sx={{ mx: 1, fontSize: 14, width: "100%" }}>解決のための練習内容</InputLabel>
                        <Button sx={{ fontSize: 14 }} onClick={AddSolutions}>追加</Button>
                    </Stack>
                    {contents.solutions.map((input, index) => (
                        <Stack spacing={1} key={index} direction="row" sx={{ alignItems: "center", mb: 2 }}>
                            <Select sx={{ fontSize: 14, minWidth: "120px" }}
                                value={contents.solutions[index].type}
                                onChange={newValue => {
                                    ChangeSolutionsType(Number(newValue.target.value), index)
                                }}
                            >
                                {contents.solutionsCategory.map((type, index2) => (
                                    <MenuItem sx={{ fontSize: 14 }} key={index2} value={index2}>{type.title}</MenuItem>
                                ))}
                            </Select>
                            <FormControl fullWidth sx={{ mb: 1 }}>
                                <OutlinedInput
                                    id="outlined-adornment-input"
                                    value={contents.solutions[index].context}
                                    onChange={newValue => ChangeSolutionsContext(newValue.target.value, index)}
                                    sx={{ fontSize: 14 }}
                                />
                            </FormControl>
                        </Stack>
                    ))}
                </Box>
            </Box>
        </Box>
    )
}