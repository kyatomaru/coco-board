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
import { auth } from '@/app/firebase';
import Divider from '@mui/material/Divider';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import { elementsCategories, skillsCategories } from '@/types/Category';
import { IconButton, Avatar } from '@mui/material';

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
    task: any,
    getTask: any
    postData: any,
    onClose: any
}


export default function TaskForm({ task, getTask, postData, onClose }: PageProps) {
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
            task.uid = uid
            const res = await postData(task)
            if (res.ok) {
                await getTask()
                onClose()
            }
        }
    }

    const [title, setTitle] = React.useState(task.title);
    const [detail, setDetail] = React.useState(task.detail);
    const [goal, setGoal] = React.useState(task.goal);
    const [doday, setDoday] = React.useState(task.doday);

    const changeDoday = (index) => {
        const input = []
        doday.forEach((item) => {
            input.push(item)
        })
        input[index] = !input[index]
        setDoday(input)
        task.doday = input
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
                        <Button size="small" sx={{ color: 'black' }} variant='text' onClick={onClose}>
                            <Typography fontSize={13} component="p">
                                キャンセル
                            </Typography>
                        </Button>
                    </Grid>
                    <Grid >
                        <Button size="small" sx={{ backgroundColor: "#1976d2 !important" }} variant='filled' type='submit'>
                            <Typography fontSize={13} component="p">
                                追加する
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
                            <Typography variant="h6" sx={{ fontSize: 14, mb: 1 }} component="div">
                                取り組み
                            </Typography>
                            <OutlinedInput
                                required
                                id="outlined-adornment-task"
                                name="title"
                                aria-describedby="outlined-title-helper-text"
                                value={task.title}
                                onChange={newValue => {
                                    setTitle(newValue.target.value)
                                    task.title = newValue.target.value
                                }}
                                sx={{ fontSize: 14 }}
                            />
                            {!!titleError && (
                                <FormHelperText error id="accountId-error">
                                    {"入力してください。"}
                                </FormHelperText>
                            )}
                        </FormControl>
                    </Box>

                    <Box sx={{ mb: 3, fontSize: "14px !important" }}>
                        <Typography variant="h6" sx={{ fontSize: 14, mb: 1 }} component="div">
                            ゴール
                        </Typography>
                        <FormControl fullWidth sx={{ fontSize: 14 }} variant="outlined">
                            <OutlinedInput
                                sx={{ m: "0 !important", fontSize: 14 }}
                                id="filled-multiline-goal"
                                multiline
                                value={task.goal}
                                onChange={newValue => {
                                    setGoal(newValue.target.value)
                                    task.goal = newValue.target.value
                                }}
                                notched={task.goal != undefined}
                            />
                        </FormControl>
                    </Box>

                    <Box sx={{ mb: 3, fontSize: "14px !important" }}>
                        <Typography variant="h6" sx={{ fontSize: 14, mb: 1 }} component="div">
                            取り組む曜日
                        </Typography>

                        <Stack justifyContent="space-between" direction="row" sx={{ maxWidth: "300px" }}>
                            {days.map((day, index) => {
                                return <IconButton
                                    onClick={() => { changeDoday(index) }}
                                    sx={{ width: "40px", height: "40px" }}>
                                    <Avatar sx={{
                                        width: "32px", height: "32px", fontSize: 13, fontWeight: "bold",
                                        bgcolor: "#eee", color: doday[index] ? "#e57f3a" : "#444",
                                        border: doday[index] && "0.5px #e57f3a solid"
                                    }}>{day}</Avatar>
                                </IconButton>
                            })}
                        </Stack>
                    </Box>

                </Box>
            </Container >
        </Box >
    )
}

const days = [
    "日", "月", "火", "水", "木", "金", "土",
];