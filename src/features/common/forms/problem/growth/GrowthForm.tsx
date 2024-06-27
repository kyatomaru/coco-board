"use client"

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation'
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material-next/Button';
import Grid from '@mui/material/Grid';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import ja from 'date-fns/locale/ja'
import { auth } from '@/app/firebase';
import Divider from '@mui/material/Divider';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import MuiRating, { RatingProps, IconContainerProps } from '@mui/material/Rating';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';

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
    setOpen: Function,
    contents: any,
    postData: any,
    getContents: any
}

export default function GrowthForm({ setOpen, contents, postData, getContents }: PageProps) {
    const [overcome, setOvercome] = React.useState<Number>(contents.overcome);
    const [comment, setComment] = React.useState(contents.comment);
    const [solution, setSolution] = React.useState(contents.solutions);

    const router = useRouter()
    const params = useParams()

    const handleClose = () => {
        setOpen(false);
    }

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const uid = await auth.currentUser?.uid;
        if (uid) {
            contents.uid = uid
            contents.problemId = params.contentsId

            const res = await postData(contents)
            if (res.ok) {
                await getContents()
                setOpen(false)
            }
        }
    }

    return (
        <Box
            component="form"
            onSubmit={onSubmit}
            sx={{
                ...modalStyle
            }}
            noValidate
            autoComplete="off"
            method='POST'

        >
            <Box sx={{ position: 'sticky', top: 0, left: 0, right: 0, backgroundColor: "white", zIndex: 100 }} >
                <Grid sx={{ px: 1, height: "50px" }} container direction="row" alignItems="center" justifyContent="space-between">
                    <Grid >
                        <Button size="small" sx={{ color: 'black' }} variant='text' onClick={handleClose}>
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

            <Container maxWidth="sm" sx={{ mt: 1 }}>

                <Box sx={{ maxWidth: "300px", mx: "auto", mb: 1 }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker sx={{ width: "auto !important" }} format='yyyy年MM月dd日'
                                value={new Date(String(contents.date))}
                                disableFuture
                                onChange={(newValue) => { contents.date = dayjs(String(newValue)).format('YYYY-MM-DD') }} />
                        </DemoContainer>
                    </LocalizationProvider>
                </Box>
                <Box>
                    <Box sx={{ mt: 1, mb: 3 }}>
                        <InputLabel sx={{ fontSize: 14, mb: 1 }}>成長の変化</InputLabel>

                        <Stack direction="row" spacing={2}>
                            <StyledRating
                                name="highlight-selected-only"
                                size="large"
                                value={Number(contents.overcome)}
                                IconContainerComponent={IconContainer}
                                getLabelText={(value: number) => customIcons[value].label}
                                onChange={(event, newValue) => {
                                    setOvercome(newValue);
                                    contents.overcome = newValue
                                }}
                                highlightSelectedOnly
                            />
                            {contents.overcome != 0 &&
                                <Typography variant="h6" sx={{ px: 1, fontSize: 14 }}>
                                    {customIcons[Number(contents.overcome)].label}
                                </Typography>
                            }
                        </Stack>
                    </Box>

                    <Box sx={{ mb: 3, fontSize: "14px !important" }}>
                        <FormControl fullWidth sx={{ fontSize: 14 }} variant="outlined">
                            <InputLabel sx={{ fontSize: 14 }} shrink={contents.comment != ""} htmlFor="filled-multiline-flexible">コメント</InputLabel>
                            <OutlinedInput
                                sx={{ m: "0 !important", fontSize: 14 }}
                                id="filled-multiline-flexible"
                                label="課題の詳細"
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
            </Container>
        </Box>
    )
}

const StyledRating = styled((props: RatingProps) => (
    <MuiRating
        max={4}
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
    // 1: {
    //     icon: <SentimentVeryDissatisfiedIcon color="error" />,
    //     label: 'Very Dissatisfied',
    // },
    1: {
        icon: <SentimentDissatisfiedIcon color="error" />,
        label: '退化・改悪した',
    },
    2: {
        icon: <SentimentSatisfiedIcon color="warning" />,
        label: '成長が見られない',
    },
    3: {
        icon: <SentimentSatisfiedAltIcon color="success" />,
        label: 'やや成長・改善した',
    },
    4: {
        icon: <SentimentVerySatisfiedIcon sx={{ color: "#00cc33" }} />,
        label: '成長・改善した',
    },
};

function IconContainer(props: IconContainerProps) {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
}