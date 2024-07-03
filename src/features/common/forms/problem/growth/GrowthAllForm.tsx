"use client"

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation'
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material-next/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import dayjs from 'dayjs';
import { auth } from '@/app/firebase';
import Divider from '@mui/material/Divider';
import { ProblemContentsType } from '@/types/problem/ProblemContents';
import GrowthForm from './GrowthForm';
import Chip from '@mui/material/Chip';
import Modal from '@mui/material/Modal';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { skillsCategories } from '@/types/Category';
import { styled } from '@mui/material/styles';
import MuiRating, { RatingProps, IconContainerProps } from '@mui/material/Rating';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';

const modalStyle = {
    position: 'static',
    left: '50%',
    width: "100%",
    bgcolor: 'background.paper',
    pb: 3,
    height: "100%",
    minHeight: "100vh",
};

const containterStyle = {
    borderRight: "solid 0.5px #b2b2b2",
    borderLeft: "solid 0.5px #b2b2b2",
    bgcolor: "white",
    minHeight: "100vh"
}

type PageProps = {
    problemContents: any,
    growthContents: any,
    setGrowthContents: any,
    postData: any
}


export default function GrowthAllForm({ problemContents, growthContents, setGrowthContents, postData }: PageProps) {
    const router = useRouter()
    const params = useParams()

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const uid = await auth.currentUser?.uid;
        if (uid) {
            for (let index = 0; index < problemContents.length; index++) {
                if (growthContents[index].overcome != 0 && growthContents[index].comment != undefined) {
                    growthContents[index].uid = uid;
                    growthContents[index].problemId = String(problemContents[index].contentsId)
                    growthContents[index].date = dayjs(String(params.date)).format('YYYY-MM-DD');
                    await postData(growthContents[index])
                }
            }
            router.push('/home')
        }
    }

    const changeOvercome = (newValue, index) => {
        const input = []
        growthContents.forEach((item) => {
            input.push(item)
        })
        input[index].overcome = newValue
        setGrowthContents(input)
    }

    const changeComment = (newValue, index) => {
        const input = []
        growthContents.forEach((item) => {
            input.push(item)
        })
        input[index].comment = newValue
        setGrowthContents(input)
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
                        <Button size="small" sx={{ color: 'black' }} variant='text' onClick={(event) => { router.push('/home') }}>
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

            <Container sx={{ px: "0 !important" }}>
                {problemContents != undefined && growthContents != undefined && (
                    problemContents.map((problem, index) => {
                        return (
                            <>
                                {problem.achieve == false &&
                                    <Box key={index} sx={{
                                        backgroundColor: "white", mb: 4, p: 2,
                                        borderTop: "solid 0.5px #b2b2b2", borderBottom: "solid 0.5px #b2b2b2",
                                    }}>
                                        <Box>
                                            <Box sx={{ mb: 2 }}>
                                                <Typography variant="h6" sx={{ fontSize: 14 }} component="div">
                                                    {String(problem.problem)}
                                                </Typography>
                                                <Chip label={String(skillsCategories[problem.categoryId].title)} size="small" sx={{ fontSize: 9, backgroundColor: skillsCategories[problem.categoryId].bgColor, color: skillsCategories[problem.categoryId].color, }} />

                                            </Box>
                                            <Box sx={{ mt: 1, mb: 3 }}>

                                                <Stack direction="row" spacing={2}>
                                                    <StyledRating
                                                        name="highlight-selected-only"
                                                        size="large"
                                                        value={Number(growthContents[index].overcome)}
                                                        IconContainerComponent={IconContainer}
                                                        getLabelText={(value: number) => customIcons[value].label}
                                                        onChange={(event, newValue) => changeOvercome(newValue, index)}
                                                        highlightSelectedOnly
                                                    />
                                                    {growthContents[index].overcome != 0 &&
                                                        <Typography variant="h6" sx={{ px: 1, fontSize: 14 }}>
                                                            {customIcons[Number(growthContents[index].overcome)].label}
                                                        </Typography>
                                                    }
                                                </Stack>
                                            </Box>

                                            <Box sx={{ fontSize: "14px !important" }}>
                                                <FormControl fullWidth sx={{ fontSize: 14 }} variant="outlined">
                                                    <InputLabel sx={{ fontSize: 14 }} shrink={growthContents[index].comment != ""} htmlFor="filled-multiline-flexible">コメント</InputLabel>
                                                    <OutlinedInput
                                                        sx={{ m: "0 !important", fontSize: 14 }}
                                                        id="filled-multiline-flexible"
                                                        label="課題の詳細"
                                                        multiline
                                                        value={growthContents[index].comment}
                                                        onChange={(newValue) => changeComment(newValue.target.value, index)}
                                                        notched={growthContents[index].comment != ""}
                                                    />
                                                </FormControl>
                                            </Box>
                                        </Box>
                                    </Box>
                                }
                            </>)
                    }))}
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