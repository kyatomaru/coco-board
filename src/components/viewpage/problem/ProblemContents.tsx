"use client"

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import NextButton from '@mui/material-next/Button';
import Button from '@mui/material/Button';
import dayjs from 'dayjs';
import { useDeleteProblem } from '@/hooks/problem/useDeleteProblem';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import Rating from '@mui/material/Rating';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Grid from '@mui/material/Grid';
import MuiListItemText, { ListItemTextProps } from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Divider from '@mui/material/Divider';
import NotDataCaption from '@/components/notepage/NotDataCaption';
import ProblemDeleteModal from '@/components/notepage/DeleteModal';
import GrowthDeleteModal from '@/components/notepage/DeleteModal';
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
import GrowthMenuModal from '../MenuModal';
import { ProblemContentsType } from '@/types/problem/ProblemContents';
import { ProblemGrowthModel, ProblemGrowthType } from '@/types/problem/ProblemGrowth';
import GrowthEditForm from '@/components/form/GrowthEditForm';
import GrowthCreateForm from '@/components/form/GrowthCreateForm';
import { useDateFormat } from '@/hooks/useDateFormat';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import WatchIcon from '@mui/icons-material/WatchLater';
import { deleteProblemMs, deleteGrowthMs } from '@/const/modalMessage';

type PageProps = {
    problemContents: ProblemContentsType,
    growthContents: Array<ProblemGrowthType>,
    DeleteContents: any,
    getGrowth: Function
}

const DataFormat = (date: String) => {
    return useDateFormat(date)
}


export default function ProblemContents({ problemContents, growthContents, DeleteContents, getGrowth }: PageProps) {
    const [problemDeleteModalOpen, setProblemDeleteModalOpen] = React.useState(false);
    const [contentsModalOpen, setContentsModalOpen] = React.useState<boolean>(false)

    const [growthCreateModalOpen, setGrowthCreateModalOpen] = React.useState(false)
    const [growthEditModalOpen, setGrowthEditModalOpen] = React.useState(false)
    const [growthDeleteModalOpen, setGrowthDeleteModalOpen] = React.useState(false);
    const [growthMenuModalOpen, setGrowthMenuModalOpen] = React.useState(false)
    const [growthSelectContents, setGrowthSelectContents] = React.useState<ProblemGrowthType>(new ProblemGrowthModel())

    const [isLoading, setIsLoading] = React.useState<boolean>(true)

    const router = useRouter()

    const [activeStep, setActiveStep] = React.useState(0);

    const clickLeftButton = () => {
        setActiveStep(activeStep - 1)
    }

    const clickRightButton = () => {
        setActiveStep(activeStep + 1)
    }

    // const ProblemMenuHandleClick = () => {
    //     setContentsModalOpen(true)
    // }

    // const ViewButtonClick = () => {
    //     router.replace(`/problem/${problemContents.contentsId}`)
    // }

    const ProblemEditButtonClick = () => {
        router.replace(`/problem/edit/${problemContents.contentsId}`)
    }

    const ProblemDeleteButtonClick = () => {
        setProblemDeleteModalOpen(true)
    }

    const DeleteProblemContents = async () => {
        const res = await useDeleteProblem(problemContents.contentsId)

        if (res.ok) {
            DeleteContents(problemContents.contentsId)
            setProblemDeleteModalOpen(false)
            setContentsModalOpen(false)
        }
    }

    const GrowthMenuHandleClick = () => {
        setGrowthMenuModalOpen(true)
    }

    const GrowthEditButtonClick = () => {
        setGrowthMenuModalOpen(false)
        setGrowthEditModalOpen(true)
        setGrowthSelectContents(growthContents[activeStep])
    }

    const GrowthDeleteButtonClick = () => {
        setGrowthDeleteModalOpen(true)
    }

    const DeleteGrowthContents = async () => {
        const res = await useDeleteProblem(problemContents.contentsId)

        if (res.ok) {
            DeleteContents(problemContents.contentsId)
            setGrowthDeleteModalOpen(false)
            setContentsModalOpen(false)
        }
    }

    return (
        <>
            <ProblemDeleteModal open={problemDeleteModalOpen} setOpen={setProblemDeleteModalOpen} title="課題" message={deleteProblemMs} DeleteContents={DeleteProblemContents} />
            <GrowthDeleteModal open={growthDeleteModalOpen} setOpen={setGrowthDeleteModalOpen} title="成長記録" message={deleteGrowthMs} DeleteContents={DeleteGrowthContents} />
            {/* <ContentsMenu open={contentsModalOpen} setOpen={setContentsModalOpen} Delete={DeleteButtonClick} Edit={EditButtonClick} View={ViewButtonClick} /> */}
            <GrowthMenuModal open={growthMenuModalOpen} setOpen={setGrowthMenuModalOpen} Delete={GrowthDeleteButtonClick} Edit={GrowthEditButtonClick} />

            {growthCreateModalOpen ? (
                <GrowthCreateForm open={growthCreateModalOpen} setOpen={setGrowthCreateModalOpen} getGrowth={getGrowth} />
            ) : growthEditModalOpen ? (
                <GrowthEditForm open={growthEditModalOpen} setOpen={setGrowthEditModalOpen} getGrowth={getGrowth} growthContents={growthSelectContents} />

            ) :
                <Box>
                    <Box sx={{ position: 'sticky', top: 0, left: 0, right: 0, backgroundColor: "white", zIndex: 100 }} >
                        <Grid sx={{ px: 1, height: "45px" }} container direction="row" alignItems="center" justifyContent="space-between">
                            <Grid >
                                <IconButton onClick={(event) => router.push("/problem")} ><ArrowBackIosNewIcon /></IconButton>
                            </Grid>
                            <Grid>
                                <Typography variant="h6" sx={{ fontSize: 16 }} component="div">
                                    課題
                                </Typography>
                            </Grid>
                            <Grid >
                                <Stack direction="row" spacing={1}>
                                    <IconButton onClick={ProblemEditButtonClick} ><EditIcon /></IconButton>
                                    <IconButton onClick={ProblemDeleteButtonClick} ><DeleteIcon /></IconButton>
                                </Stack>
                                {/* <NextButton size="small" sx={{ backgroundColor: "#1976d2 !important" }} variant='filled' type='submit'>記録する</NextButton> */}
                            </Grid>
                        </Grid>
                        <Divider />
                    </Box>
                    <Box sx={{ minWidth: 250, mb: "80px" }} >
                        <Box sx={{ position: "relative" }}>
                            {/* <IconButton
                                aria-label="more"
                                id="long-button"
                                // aria-controls={open ? 'long-menu' : undefined}
                                // aria-expanded={open ? 'true' : undefined}
                                // aria-haspopup="true"
                                onClick={menuHandleClick}
                                sx={{
                                    right: "10px", top: "5px",
                                    position: "absolute",
                                    zIndex: 1000, width: "35px", height: "35px", m: "auto"
                                }}
                            >
                                <MoreHorizIcon />
                            </IconButton> */}
                            {/* <Stack direction="row" sx={{ p: 1, mx: 1, alignItems: "center" }} >
                            <Box sx={{ width: "100%", alignItems: "center" }} >
                                <Typography variant="h6" sx={{ fontSize: 16 }} component="div">
                                    {String(problemContents.problem)}
                                </Typography>
                                <Typography variant="h6" sx={{ fontSize: 16 }} component="div">
                                    {DataFormat(String(problemContents.createDate))}
                                </Typography>
                                <Chip label={String(problemContents.category[problemContents.categoryId].title)} size="small" sx={{ fontSize: 9, backgroundColor: problemContents.category[problemContents.categoryId].bgColor, color: problemContents.category[problemContents.categoryId].color, }} />
                            </Box>
                        </Stack> */}
                            <Box sx={{ width: "100%", alignItems: "center", px: 2, py: 1 }} >
                                <Typography variant="h6" sx={{ fontSize: 16 }} component="div">
                                    {String(problemContents.problem)}
                                </Typography>
                                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 1 }}>
                                    <Chip label={String(problemContents.category[problemContents.categoryId].title)} size="small" sx={{ fontSize: 9, backgroundColor: problemContents.category[problemContents.categoryId].bgColor, color: problemContents.category[problemContents.categoryId].color, }} />
                                    <Box>
                                        <Typography variant="h6" sx={{ fontSize: 12 }} component="div">
                                            登録日:{dayjs(String(problemContents.createDate)).format('YYYY/M/D')}
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Box>

                            <Divider />

                            <Accordion >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary">詳細</Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{ px: 1, mb: 1 }}>
                                    <Typography variant="body2" sx={{ px: 1, fontSize: 14 }}>
                                        {problemContents.detail}
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>

                            <Divider />
                            <Box sx={{ width: "100%", px: 2, my: 1 }}>
                                <Typography sx={{ fontSize: 14, mb: 1 }} color="text.secondary">
                                    達成日
                                </Typography>
                                <Stack direction="row" alignItems="center">
                                    {dayjs(String(problemContents.completionDate)).isBefore(dayjs(String(new Date))) ?
                                        <Typography variant="h6" color="error" sx={{ fontSize: 16 }} component="div">
                                            {dayjs(String(problemContents.completionDate)).format('YYYY/M/D')}
                                        </Typography>
                                        :
                                        <Typography variant="h6" sx={{ fontSize: 16 }} component="div">
                                            {dayjs(String(problemContents.completionDate)).format('YYYY/M/D')}
                                        </Typography>
                                    }

                                    {dayjs(String(problemContents.completionDate)).isBefore(dayjs(String(new Date))) &&
                                        <WatchIcon fontSize='small' color="error" sx={{ ml: 1 }} />
                                    }
                                </Stack>
                            </Box>
                            {/* <Box>
                                <Stack direction="row">
                                    <Box sx={{ width: "100%", px: 2, my: 1 }}>
                                        <Typography sx={{ fontSize: 14, mb: 1 }} color="text.secondary">
                                            克服度
                                        </Typography>
                                        {growthContents[0] ?
                                            <Rating name="half-rating" value={Number(growthContents[0].overcome)} precision={0.5} readOnly />
                                            :
                                            <Rating name="half-rating" readOnly />
                                        }
                                    </Box>
                                    <Divider orientation="vertical" variant="fullWidth" flexItem />
                                    <Box sx={{ width: "100%", px: 2, my: 1 }}>
                                        <Typography sx={{ fontSize: 14, mb: 1 }} color="text.secondary">
                                            達成日
                                        </Typography>
                                        <Typography variant="h6" sx={{ fontSize: 16 }} component="div">
                                            {dayjs(String(problemContents.completionDate)).format('YYYY/M/D')}
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Box> */}

                            <Divider />


                            <Box sx={{ px: 2, my: 1 }}>
                                <Typography sx={{ fontSize: 14, mb: 1 }} color="text.secondary">
                                    取り組むこと
                                </Typography>
                                {problemContents.solutions[0] != null ?
                                    <List sx={{ px: 0, my: 1, py: 0 }}>
                                        {problemContents.solutions.map((solution, index) => (
                                            <Box key={index}>
                                                {
                                                    solution.context != "" && <>
                                                        {/* <Stack sx={{ mb: 1, fontSize: 13 }} direction="row" divider={<Divider orientation="vertical" flexItem />} >
                                                    <Typography variant="body2" sx={{ px: 1, width: "100px" }}>
                                                        {problemContents.solutionsCategory[Number(solution.type)].title}
                                                    </Typography>

                                                    <Chip label={String(problemContents.solutionsCategory[Number(solution.type)].title)} size="small" sx={{ fontSize: 9, backgroundColor: problemContents.solutionsCategory[Number(solution.type)].bgColor, color: problemContents.solutionsCategory[Number(solution.type)].color, }} />
                                                    <Typography variant="body2" sx={{ px: 1 }}>
                                                        {solution.context}
                                                    </Typography>
                                                </Stack > */}

                                                        <ListText primary={solution.context} secondary={problemContents.solutionsCategory[Number(solution.type)].title} />


                                                    </>
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
                                <Stack direction="row" sx={{ alignItems: "center" }} justifyContent="space-between"  >
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                        成長日記
                                    </Typography>
                                    <Button sx={{ fontSize: 14, ml: 2 }} onClick={(event) => setGrowthCreateModalOpen(true)} >
                                        記録する
                                    </Button>
                                </Stack>
                                {growthContents.length > 0 ?
                                    <Box>
                                        {growthContents.map((value, index) => {
                                            return (
                                                <Box key={index} >
                                                    {activeStep == index &&

                                                        <Card sx={{
                                                            pt: 1, px: 2, pb: 2,
                                                            borderTop: '0.5px solid rgba(0, 0, 0, .125)',
                                                            borderBottom: '0.5px solid rgba(0, 0, 0, .125)'
                                                        }}>
                                                            <Stack direction="row" alignItems="center" justifyContent="space-between">
                                                                <Typography variant="h6" sx={{ fontSize: 15 }} component="div">
                                                                    {DataFormat(String(value.date))}
                                                                </Typography>
                                                                <IconButton
                                                                    onClick={GrowthMenuHandleClick}
                                                                    sx={{
                                                                        // right: "10px", top: "5px",
                                                                        // position: "absolute",
                                                                        // zIndex: 1000, width: "35px", height: "35px", m: "auto"
                                                                    }}
                                                                >
                                                                    <MoreHorizIcon />
                                                                </IconButton>
                                                            </Stack>
                                                            <Stack direction="row" alignItems="center">
                                                                <span>{customIcons[Number(value.overcome)].icon}</span>
                                                                <Typography variant="h6" sx={{ px: 1, fontSize: 14 }}>
                                                                    {customIcons[Number(value.overcome)].label}
                                                                </Typography>

                                                            </Stack>
                                                            <Box sx={{ my: 1 }}>
                                                                <Typography variant="body1" sx={{ fontSize: 14 }}>
                                                                    {value.comment}
                                                                </Typography>
                                                            </Box>
                                                        </Card>
                                                    }
                                                    {/* <Box sx={{ px: 2, my: 1 }}>
                                                                <Typography sx={{ fontSize: 14, mb: 1 }} color="text.secondary">
                                                                    取り組んだこと
                                                                </Typography>
                                                                {
                                                                    value.solutions.map((solution, index2) => (
                                                                        <Typography key={index2} variant="body2" sx={{ px: 1, pb: 1 }}>
                                                                            {solution}
                                                                        </Typography>
                                                                    ))
                                                                }
                                                            </Box> */}
                                                </Box>
                                            )
                                        })}
                                        <DotsContentsStepper activeStep={activeStep} stepLength={growthContents.length} handleNext={clickRightButton} handleBack={clickLeftButton} />
                                    </Box>
                                    :
                                    <Box>
                                        <Typography variant="h6" sx={{ fontSize: 14 }} component="div">
                                            記録がありません
                                        </Typography>
                                    </Box>
                                }
                            </Box>
                            <Divider />
                        </Box >
                    </Box >
                </Box >
            }
        </>
    )
}

type StepperProps = {
    activeStep: number,
    stepLength: number,
    handleNext: React.MouseEventHandler<HTMLButtonElement>,
    handleBack: React.MouseEventHandler<HTMLButtonElement>
}

const DotsContentsStepper = ({ activeStep, stepLength, handleNext, handleBack }: StepperProps) => {
    const theme = useTheme();
    // const [activeStep, setActiveStep] = React.useState(0);

    // const handleNext = () => {
    //     setActiveStep((prevActiveStep) => prevActiveStep + 1);
    // };

    // const handleBack = () => {
    //     setActiveStep((prevActiveStep) => prevActiveStep - 1);
    // };

    return (
        <MobileStepper
            variant="dots"
            steps={stepLength}
            position="static"
            activeStep={activeStep}
            sx={{
                width: "100%", flexGrow: 1, borderTop: '0px solid rgba(0, 0, 0, .125)'
            }}
            nextButton={
                <Button size="small" onClick={handleNext} disabled={activeStep === stepLength - 1}>
                    次
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
                    戻る
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
        {...props}
    />
))(({ theme }) => ({
    // backgroundColor:
    //     theme.palette.mode === 'dark'
    //         ? 'rgba(255, 255, 255, .05)'
    //         : 'rgba(0, 0, 0, .03)',
    minHeight: 35,
    // flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(180deg)',
    }
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    // padding: theme.spacing(2),
    padding: 0,
    // borderTop: '1px solid rgba(0, 0, 0, .125)',
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
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
        icon: <SentimentVerySatisfiedIcon sx={{ color: "#00ff00" }} />,
        label: '成長・改善した',
    },
};

// function IconContainer(props: IconContainerProps) {
//     const { value, ...other } = props;
//     return <span {...other}>{customIcons[value].icon}</span>;
// }