"use client"

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation'
import Container from '@mui/material/Container';
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
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { ProblemContentsModel } from '@/types/problem/ProblemContents';
import { auth } from '@/app/firebase';
import { redirect } from 'next/navigation';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import CssBaseline from '@mui/material/CssBaseline';
import { AppBar } from '@mui/material';
import { ProblemContentsType } from '@/types/problem/ProblemContents';
import GrowthForm from './GrowthForm';
import Chip from '@mui/material/Chip';
import Modal from '@mui/material/Modal';
import { ProblemGrowthType, ProblemGrowthModel } from '@/types/problem/ProblemGrowth';

const modalStyle = {
    position: 'static',
    // top: '50%',
    left: '50%',
    // transform: 'translate(-50%, -50%)',
    // maxWidth: 500,
    width: "100%",
    bgcolor: 'background.paper',
    // boxShadow: 24,
    // pt: 1,
    // px: 4,
    pb: 3,
    height: "100%",
    minHeight: "100vh",
    // mb: "60px"
};

const containterStyle = {
    // height: "auto",
    // position: "absolute",
    // zIndex: 90,
    // top: "0",
    borderRight: "solid 0.5px #b2b2b2",
    borderLeft: "solid 0.5px #b2b2b2",
    bgcolor: "white",
    // pb: "60px",
    minHeight: "100vh"
}

type PageProps = {
    problems: Array<ProblemContentsType>,
    growth: Array<ProblemGrowthType>
}

const day = ['日', '月', '火', '水', '木', '金', '土']

const DataFormat = (date) => {
    const thisYear = dayjs(String(new Date)).format('YYYY');
    const recordYear = dayjs(String(date)).format('YYYY');
    const recordDay = `(${day[Number(dayjs(String(date)).format('d'))]})`

    if (thisYear == recordYear) {
        return dayjs(String(date)).format('M/DD ') + recordDay;
    }
    else {
        return dayjs(String(date)).format('YYYY/M/DD ') + recordDay;
    }
}

export default function GrowthFormModal({ problems, growth }: PageProps) {
    const [dateValue, setDateValue] = React.useState<Date | null>(new Date());
    const [isLoading, setIsLoading] = React.useState(false);
    const [titleError, setTitleError] = React.useState(false);
    const [growthContents, setGrowthContents] = React.useState<ProblemGrowthType>(new ProblemGrowthModel());

    const router = useRouter()
    const params = useParams()

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsLoading(true)

        for (let index = 0; index < problems.length; index++) {
            growth[index].problemId = String(problems[index].contentsId)
            growth[index].date = new Date();
            growth[index].createDate = new Date();
            growth[index].updateDate = new Date();
        }

        const res = await insertGrowthList(growth)
        if (res.ok) {
            router.push('/')
        } else {
            // 失敗時の処理（エラーメッセージの表示）
        }

    }

    return (
        <Box
            component="form"
            onSubmit={onSubmit}
            sx={{
                ...modalStyle,
                backgroundColor: "#fbfbfb",
            }}
            noValidate
            autoComplete="off"
            method='POST'

        >
            <Box sx={{ position: 'sticky', top: 0, left: 0, right: 0, backgroundColor: "white", zIndex: 100 }} >
                <Grid sx={{ px: 1, height: "50px" }} container direction="row" alignItems="center" justifyContent="space-between">
                    <Grid >
                        <Button size="small" sx={{ color: 'black' }} variant='text' onClick={(event) => { router.push('/') }}>キャンセル</Button>
                    </Grid>
                    <Grid >
                        <Button size="small" sx={{ backgroundColor: "#1976d2 !important" }} variant='filled' type='submit'>記録する</Button>
                    </Grid>
                </Grid>
                <Divider />
            </Box>

            <Container sx={{ px: "0 !important" }}>
                {
                    problems.length > 0 && (
                        problems.map((problem, index) => {
                            return (
                                <Box key={index} sx={{
                                    backgroundColor: "white", mb: 4, p: 2,
                                    borderTop: "solid 0.5px #b2b2b2", borderBottom: "solid 0.5px #b2b2b2",
                                }}>
                                    <GrowthForm problem={problem} growth={growth[index]} />
                                </Box>
                            )
                        }))}
            </Container>
        </Box>
    )
}

async function insertGrowthList(contents) {

    const uid = await auth.currentUser?.uid;
    if (uid) {
        contents.uid = uid;

        return fetch('/api/growth/list/', {
            method: 'POST',
            body: JSON.stringify(contents),
            headers: {
                'content-type': 'application/json'
            }
        })
    }
}