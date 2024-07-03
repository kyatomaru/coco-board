"use client"

import * as React from 'react';
import { useRouter } from 'next/navigation'
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material-next/Button';
import Grid from '@mui/material/Grid';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ja from 'date-fns/locale/ja'
import { ProblemContentsModel } from '@/types/problem/ProblemContents';
import { auth } from '@/app/firebase';
import Divider from '@mui/material/Divider';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import { ProblemSolutionModel } from '@/types/problem/ProblemSolution';
import { elementsCategories, skillsCategories } from '@/types/Category';

const containterStyle = {
    // height: "auto",
    // position: "absolute",
    // zIndex: 90,
    // top: "0",
    bgcolor: "white",
    pb: "60px",
    minHeight: "100vh"
}

type PageProps = {
    contents: any,
    postData: any
}


export default function ProblemForm({ contents, postData }: PageProps) {
    const [menu, setMenu] = React.useState(0);
    const [titleError, setTitleError] = React.useState(false);

    const router = useRouter()

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setMenu(newValue);
    };

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const uid = await auth.currentUser?.uid;
        if (uid) {
            contents.uid = uid
            const res = await postData(contents)
            if (res.ok) {
                router.push('/problem')
            }
        }
    }

    const [problem, setProblem] = React.useState(contents.problem);
    const [categoryId, setCategoryId] = React.useState(contents.categoryId);
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
                        <Button size="small" sx={{ color: 'black' }} variant='text' onClick={(event) => router.push('/problem')}>
                            <Typography fontSize={13} component="p">
                                キャンセル
                            </Typography>
                        </Button>
                    </Grid>
                    <Grid >
                        <Button size="small" sx={{ backgroundColor: "#1976d2 !important" }} variant='filled' type='submit'>
                            <Typography fontSize={13} component="p">
                                記録する
                            </Typography>
                        </Button>
                    </Grid>
                </Grid>
                <Divider />
            </Box>

            <Container maxWidth="sm" sx={{ mt: 2 }}>
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
                            <InputLabel sx={{ fontSize: 14 }} shrink={skillsCategories[contents.categoryId].title != ""} htmlFor="outlined-adornment-weather">カテゴリ</InputLabel>
                            <Select sx={{ fontSize: 14 }}
                                labelId="outlined-adornment-weather-label"
                                name="weather"
                                id="outlined-adornment-weather"
                                value={contents.categoryId}
                                label="カテゴリ"
                                onChange={newValue => {
                                    setCategoryId(Number(newValue.target.value))
                                    contents.categoryId = Number(newValue.target.value)
                                }}
                                notched={skillsCategories[contents.categoryId].title != ""}
                            >
                                {skillsCategories.map((category, index) => (
                                    <MenuItem sx={{ fontSize: 14 }} key={index} value={index}>{category.title}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>


                    <Box >
                        <Box sx={{ mb: 1 }}>
                            <Stack spacing={2} direction="row" sx={{ alignItems: "center" }}>
                                <InputLabel sx={{ mx: 1, fontSize: 14, width: "100%" }}>解決のための練習内容</InputLabel>
                                <Button sx={{ fontSize: 13, minWidth: 85 }} onClick={AddSolutions}>追加</Button>
                            </Stack>
                            {contents.solutions.map((input, index) => (
                                <Stack spacing={1} key={index} direction="row" sx={{ alignItems: "center", mb: 2 }}>
                                    <Select sx={{ fontSize: 14, minWidth: "120px" }}
                                        value={contents.solutions[index].type}
                                        onChange={newValue => {
                                            ChangeSolutionsType(Number(newValue.target.value), index)
                                        }}
                                    >
                                        {elementsCategories.map((type, index2) => (
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
            </Container>
        </Box>
    )
}