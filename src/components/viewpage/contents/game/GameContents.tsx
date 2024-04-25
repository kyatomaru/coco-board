"use client"

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import dayjs from 'dayjs';
import type { GameContentsType } from '@/types/game/GameContents';
import { useDeleteGame } from '@/hooks/game/useDeleteGame';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import List from '@mui/material/List';
import MuiListItemText, { ListItemTextProps } from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Divider from '@mui/material/Divider';
import NotDataCaption from '@/components/notepage/NotDataCaption';
import DeleteModal from '@/components/notepage/DeleteModal';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { useGetAllGame } from '@/hooks/game/useGetGame';
import { useGetAllPractice } from '@/hooks/practice/useGetPractice';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CardActionArea from '@mui/material/CardActionArea';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
    AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import ContentsMenu from '@/components/notepage/NoteContentsMenu';
import { useDateFormat } from '@/hooks/useDateFormat';
import Grid from '@mui/material/Grid';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';

type PageProps = {
    contents: GameContentsType
    DeleteContents: any
}

const DataFormat = (date: String) => {
    return useDateFormat(date)
}


export default function GameContents({ contents, DeleteContents }: PageProps) {
    const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState<boolean>(true)

    const [contentsModalOpen, setContentsModalOpen] = React.useState<boolean>(false)

    const menuHandleClick = () => {
        setContentsModalOpen(true)
    }


    const router = useRouter()

    const ViewButtonClick = () => {
        router.replace(`/game/${contents.contentsId}`)
    }

    const EditButtonClick = () => {
        router.replace(`/game/edit/${contents.contentsId}`)
    }

    const DeleteButtonClick = () => {
        setDeleteModalOpen(true)
    }

    const DeleteGameContents = () => {
        useDeleteGame(contents.contentsId)
        DeleteContents(contents.contentsId)
        setDeleteModalOpen(false)
    }

    return (
        <>
            {/* <DeleteModal open={deleteModalOpen} setOpen={setDeleteModalOpen} DeleteContents={DeleteGameContents} /> */}
            {/* <ContentsMenu open={contentsModalOpen} setOpen={setContentsModalOpen} Delete={DeleteButtonClick} Edit={EditButtonClick} View={ViewButtonClick} /> */}


            <Box>
                <Box sx={{ position: 'sticky', top: 0, left: 0, right: 0, backgroundColor: "white", zIndex: 100 }} >
                    <Grid sx={{ px: 1, height: "45px" }} container direction="row" alignItems="center" justifyContent="space-between">
                        <Grid >
                            <IconButton onClick={(event) => router.push("/notes/problem")} ><ArrowBackIosNewIcon /></IconButton>
                        </Grid>
                        <Grid>
                            <Typography variant="h6" sx={{ fontSize: 16 }} component="div">
                                記録
                            </Typography>
                        </Grid>
                        <Grid >
                            <Stack direction="row" spacing={1}>
                                <IconButton onClick={EditButtonClick} ><EditIcon /></IconButton>
                                <IconButton onClick={DeleteButtonClick} ><DeleteIcon /></IconButton>
                            </Stack>
                            {/* <NextButton size="small" sx={{ backgroundColor: "#1976d2 !important" }} variant='filled' type='submit'>記録する</NextButton> */}
                        </Grid>
                    </Grid>
                    <Divider />
                </Box>
                <Stack direction="row" sx={{ p: 1, mx: 1 }} >

                    <Box sx={{ width: "100%", alignItems: "center" }} >
                        <Typography sx={{ fontSize: 17 }} variant="h6" component="div">
                            {DataFormat(contents.date)}
                        </Typography>
                        <Typography variant="h6" sx={{ fontSize: 16 }} component="div">
                            {String(contents.title)}
                        </Typography>
                        <Chip label="試合" color="success" size="small" sx={{ fontSize: 9 }} />
                    </Box>

                </Stack>

                <Divider />

                <Stack direction="row" divider={<Divider orientation="vertical" flexItem />} justifyContent="space-between" alignItems="center">
                    <Box sx={{ px: 2, py: 1, width: "100%" }}>
                        <Typography sx={{ fontSize: 14, mb: 1 }} color="text.secondary">
                            場所
                        </Typography>
                        {contents.place &&
                            <Typography variant="body2" sx={{}}>
                                {String(contents.place)}
                            </Typography>
                        }
                    </Box>
                    <Box sx={{ px: 2, py: 1, width: "100%" }}>
                        <Typography sx={{ fontSize: 14, mb: 1 }} color="text.secondary">
                            天気
                        </Typography>
                        {contents.weather &&
                            <Typography variant="body2" sx={{}}>
                                {String(contents.weather)}
                            </Typography>
                        }
                    </Box>
                </Stack>

                <Divider />

                <Box sx={{ width: "100%", px: 2, my: 1 }}>
                    <Typography sx={{ fontSize: 14, mb: 1 }} color="text.secondary">
                        チーム
                    </Typography>
                    <Stack direction="row" sx={{}} >
                        <Box sx={{ width: "100%" }}>
                            <Typography variant="body2" sx={{ fontSize: 14, mb: 1 }}>
                                {String(contents.name1)}
                            </Typography>
                            <Typography variant="body2" sx={{}}>
                                {String(contents.score1)}
                            </Typography>
                        </Box>
                        <Box sx={{ width: "100%" }}>
                            <Typography variant="body2" sx={{ fontSize: 14, mb: 1 }}>
                                {String(contents.name2)}
                            </Typography>
                            <Typography variant="body2" sx={{}}>
                                {String(contents.score2)}
                            </Typography>
                        </Box>
                    </Stack>
                </Box>

                <Divider />

                <Box sx={{ width: "100%", my: 1 }}>
                    {contents.condition &&
                        <Box sx={{ px: 2, mb: 2 }}>
                            <Typography sx={{ fontSize: 14, mb: 1 }} color="text.secondary">
                                体調
                            </Typography>
                            <Stack direction="row" alignItems="center">
                                <span>{customIcons[Number(contents.condition)].icon}</span>
                                <Typography variant="h6" sx={{ px: 1, fontSize: 14 }}>
                                    {customIcons[Number(contents.condition)].label}
                                </Typography>
                            </Stack>
                        </Box>
                    }
                    {contents.fatigue &&
                        <Box sx={{ px: 2, mb: 2 }}>
                            <Typography sx={{ fontSize: 14, mb: 1 }} color="text.secondary">
                                疲労感
                            </Typography>
                            <Stack direction="row" alignItems="center">
                                <span>{customIcons[Number(contents.fatigue)].icon}</span>
                                <Typography variant="h6" sx={{ px: 1, fontSize: 14 }}>
                                    {customIcons[Number(contents.fatigue)].label}
                                </Typography>
                            </Stack>
                        </Box>
                    }
                    {contents.injury &&
                        <Box sx={{ px: 2 }}>
                            <Typography sx={{ fontSize: 14, mb: 1 }} color="text.secondary">
                                怪我
                            </Typography>
                            <Typography variant="body2" sx={{}}>
                                {String(contents.injury)}
                            </Typography>
                        </Box>
                    }
                </Box>


                {contents.position != null &&
                    <>
                        <Divider />
                        <Box sx={{ px: 2, my: 1 }}>
                            <Typography sx={{ fontSize: 14, mb: 1 }} color="text.secondary">
                                ポジション
                            </Typography>
                            <Typography variant="body2" sx={{}}>
                                {String(contents.position)}
                            </Typography>
                        </Box>
                    </>
                }
                <Divider />
                <Box sx={{ px: 2, my: 1 }}>
                    <Typography sx={{ fontSize: 14, mb: 1 }} color="text.secondary">
                        良かったところ
                    </Typography>
                    {contents.goodPoints[0] != null ?
                        <List sx={{ px: 0, my: 1, py: 0 }}>
                            {contents.goodPoints.map((goodPoint, index) => (
                                <Box key={index}>
                                    {
                                        goodPoint.context != "" &&
                                        <ListText primary={goodPoint.context} secondary={contents.feedbackCategory[Number(goodPoint.type)].title} />
                                    }
                                </Box>
                            ))
                            }
                        </List >
                        :
                        <Typography variant="body2" sx={{ px: 1, width: "100px", fontSize: 14 }}>
                            なし
                        </Typography>
                    }
                </Box>

                <Divider />
                <Box sx={{ px: 2, my: 1 }}>
                    <Typography sx={{ fontSize: 14, mb: 1 }} color="text.secondary">
                        悪かった点
                    </Typography>
                    {contents.badPoints[0] != null ?
                        <List sx={{ px: 0, my: 1, py: 0 }}>
                            {contents.badPoints.map((badPoint, index) => (
                                <Box key={index}>
                                    {
                                        badPoint.context != "" &&
                                        <ListText primary={badPoint.context} secondary={contents.feedbackCategory[Number(badPoint.type)].title} />
                                    }
                                </Box>
                            ))
                            }
                        </List >
                        :
                        <Typography variant="body2" sx={{ px: 1, width: "100px", fontSize: 14 }}>
                            なし
                        </Typography>
                    }
                </Box>

                {contents.comment != "" &&
                    <>
                        <Divider />
                        <Box sx={{ px: 2, my: 1 }}>
                            <Typography sx={{ fontSize: 14, mb: 1 }} color="text.secondary">
                                コメント
                            </Typography>

                            <Typography variant="body2" sx={{ pb: 1 }}>
                                {contents.comment}
                            </Typography>
                        </Box>
                        <Divider />
                    </>
                }
            </Box >
            {/* </CardActionArea> */}
        </>
    )
}

const DotsContentsStepper = () => {
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <MobileStepper
            variant="dots"
            steps={6}
            position="static"
            activeStep={activeStep}
            sx={{ maxWidth: 400, flexGrow: 1 }}
            nextButton={
                <Button size="small" onClick={handleNext} disabled={activeStep === 5}>
                    Next
                    {theme.direction === 'rtl' ? (
                        <KeyboardArrowLeft />
                    ) : (
                        <KeyboardArrowRight />
                    )}
                </Button>
            }
            backButton={
                <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                    {theme.direction === 'rtl' ? (
                        <KeyboardArrowRight />
                    ) : (
                        <KeyboardArrowLeft />
                    )}
                    Back
                </Button>
            }
        />
    );
}

const ListText = styled((props: ListItemTextProps) => (
    <MuiListItemText
        {...props}
    />
))(({ theme }) => ({
    '& span': {
        fontSize: 13
    },
    '& p': {
        fontSize: 10,
    },
}));

const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    '&:not(:last-child)': {
        borderBottom: 0
    },
    '&::before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    // backgroundColor:
    //     theme.palette.mode === 'dark'
    //         ? 'rgba(255, 255, 255, .05)'
    //         : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(180deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    // padding: theme.spacing(2),
    padding: 0,
    borderTop: '1px solid rgba(0, 0, 0, .125)',
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