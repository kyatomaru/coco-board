"use client"

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import dayjs from 'dayjs';
import { useDeleteProblem } from '@/hooks/problem/useDeleteProblem';
import { useUpdateProblem } from '@/hooks/problem/useUpdateProblem';
import { useDeleteGrowth } from '@/hooks/problem/growth/useDeleteGrowth';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import List from '@mui/material/List';
import MuiListItemText, { ListItemTextProps } from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import AchieveModal from './modal/AchieveModal';
import IconButton from '@mui/material/IconButton';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
    AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import GrowthMenuModal from '@/features/common/contents/modal/GrowthMenuModal';
import { ProblemContentsType } from '@/types/problem/ProblemContents';
import GrowthForm from '@/features/common/forms/problem/growth/GrowthForm';
import { useDateFormat } from '@/utils/useDateFormat';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import WatchIcon from '@mui/icons-material/WatchLater';
import DeleteConfirmModal from '@/features/common/contents/modal/ConfirmModal';
import StarsIcon from '@mui/icons-material/Stars';
import { problemModalTitle, growthModalTitle } from '@/constants/modalMessage';
import { deleteNoteMs } from '@/constants/modalMessage';
import { elementsCategories, skillsCategories } from '@/types/Category';
import ProblemContentsBar from '@/features/common/contents/bar/ProblemContentsBar';
import { useUpdateGrowth } from '@/hooks/problem/growth/useUpdateProblem';
import { useInsertGrowth } from '@/hooks/problem/growth/useInsertGrowth';
import { GrowthModel } from '@/types/problem/Growth';
import Skeleton from '@mui/material/Skeleton';

type PageProps = {
    problemContents: ProblemContentsType,
    getProblemContents: any
    growthContents: Array<any>,
    getGrowthContents: any
}

const DataFormat = (date: String) => {
    return useDateFormat(date)
}


export default function ProblemContentsBox({ problemContents, growthContents, getProblemContents, getGrowthContents }: PageProps) {
    const [problemDeleteModalOpen, setProblemDeleteModalOpen] = React.useState(false);
    const [problemAchieveModalOpen, setProblemAchieveModalOpen] = React.useState(false);
    const [contentsModalOpen, setContentsModalOpen] = React.useState<boolean>(false)

    const [growthCreateModalOpen, setGrowthCreateModalOpen] = React.useState(false)
    const [growthEditModalOpen, setGrowthEditModalOpen] = React.useState(false)
    const [growthDeleteModalOpen, setGrowthDeleteModalOpen] = React.useState(false);
    const [growthMenuModalOpen, setGrowthMenuModalOpen] = React.useState(false)
    const [growthSelectContents, setGrowthSelectContents] = React.useState(new GrowthModel(dayjs(String(new Date)).format('YYYY-MM-DD')))

    const router = useRouter()

    const [activeStep, setActiveStep] = React.useState(0);

    const clickLeftButton = () => {
        setActiveStep(activeStep - 1)
    }

    const clickRightButton = () => {
        setActiveStep(activeStep + 1)
    }

    const ProblemEditButtonClick = () => {
        router.replace(`/problem/edit/${problemContents.contentsId}`)
    }

    const ProblemDeleteButtonClick = () => {
        setProblemDeleteModalOpen(true)
    }

    const DeleteProblemContents = async () => {
        const res = await useDeleteProblem(problemContents.contentsId)
        if (res.ok) {
            router.replace('/problem')
        }
    }

    const ProblemAchieveButtonClick = () => {
        setProblemAchieveModalOpen(true)
    }

    const AchieveProblemContents = async () => {
        problemContents.achieve = !problemContents.achieve
        const res = await useUpdateProblem(problemContents)

        if (res.ok) {
            getProblemContents()
            setProblemAchieveModalOpen(false)
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
        const res = await useDeleteGrowth(problemContents.contentsId)

        if (res.ok) {
            getGrowthContents()
            setGrowthDeleteModalOpen(false)
            setContentsModalOpen(false)
        }
    }

    return (
        <>
            <DeleteConfirmModal open={problemDeleteModalOpen} setOpen={setProblemDeleteModalOpen} title={problemModalTitle} message={deleteNoteMs} confirmText="削除" onSubmit={DeleteProblemContents} />

            {problemContents != undefined &&
                <AchieveModal open={problemAchieveModalOpen} setOpen={setProblemAchieveModalOpen} title={problemContents.achieve ? "未達成" : "達成"} AchieveContents={AchieveProblemContents} />
            }

            <DeleteConfirmModal open={growthDeleteModalOpen} setOpen={setGrowthDeleteModalOpen} title={growthModalTitle} message={deleteNoteMs} confirmText="削除" onSubmit={DeleteGrowthContents} />
            <GrowthMenuModal open={growthMenuModalOpen} setOpen={setGrowthMenuModalOpen} Delete={GrowthDeleteButtonClick} Edit={GrowthEditButtonClick} />

            {growthCreateModalOpen ? (
                <GrowthForm setOpen={setGrowthCreateModalOpen} contents={new GrowthModel(dayjs(String(new Date)).format('YYYY-MM-DD'))} postData={useInsertGrowth} getContents={getGrowthContents} />
            ) : growthEditModalOpen ? (
                <GrowthForm setOpen={setGrowthEditModalOpen} contents={growthSelectContents} postData={useUpdateGrowth} getContents={getGrowthContents} />

            ) :
                <Box>
                    <ProblemContentsBar contents={problemContents} EditButtonClick={ProblemEditButtonClick} DeleteButtonClick={ProblemDeleteButtonClick} />

                    <Box sx={{ minWidth: 250, mb: "80px" }} >
                        <Box sx={{ position: "relative" }}>

                            {problemContents != undefined ?
                                <Box sx={{ width: "100%", alignItems: "center", px: 2, py: 1 }} >
                                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                                        <Typography variant="h6" sx={{ fontSize: 16 }} component="div">
                                            {String(problemContents.problem)}
                                        </Typography>
                                        <Chip onClick={ProblemAchieveButtonClick} label={problemContents.achieve ? "達成" : "未達成"} icon={
                                            problemContents.achieve && <StarsIcon fontSize="small" sx={{ color: "#20603d !important" }} />
                                        } sx={{ backgroundColor: problemContents.achieve && "#baf5ba", color: problemContents.achieve && "#20603d" }} />
                                    </Stack>

                                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: "5px" }}>
                                        <Chip label={String(skillsCategories[problemContents.categoryId].title)} size="small" sx={{ fontSize: 9, backgroundColor: skillsCategories[problemContents.categoryId].bgColor, color: skillsCategories[problemContents.categoryId].color, }} />
                                        <Box>
                                            <Typography variant="h6" sx={{ fontSize: 12 }} component="div">
                                                登録日:{dayjs(String(problemContents.createDate)).format('YYYY/M/D')}
                                            </Typography>
                                        </Box>
                                    </Stack>
                                </Box>
                                :
                                <Skeleton variant="rectangular" height={77} />
                            }

                            <Divider />

                            {problemContents != undefined ?
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
                                :
                                <Skeleton variant="rectangular" height={45} />
                            }

                            <Divider />

                            {problemContents != undefined ?
                                <Box sx={{ width: "100%", px: 2, my: 1 }}>
                                    <Typography sx={{ fontSize: 14, mb: 1 }} color="text.secondary">
                                        達成予定日
                                    </Typography>
                                    <Stack direction="row" alignItems="center">
                                        {dayjs(String(problemContents.completionDate)).isBefore(dayjs(String(new Date))) && !problemContents.achieve ?
                                            <Typography variant="h6" color="error" sx={{ fontSize: 16 }} component="div">
                                                {dayjs(String(problemContents.completionDate)).format('YYYY/M/D')}
                                            </Typography>
                                            :
                                            <Typography variant="h6" sx={{ fontSize: 16 }} component="div">
                                                {dayjs(String(problemContents.completionDate)).format('YYYY/M/D')}
                                            </Typography>
                                        }

                                        {dayjs(String(problemContents.completionDate)).isBefore(dayjs(String(new Date))) && !problemContents.achieve &&
                                            <WatchIcon fontSize='small' color="error" sx={{ ml: 1 }} />
                                        }
                                    </Stack>
                                </Box>
                                :
                                <Skeleton variant="rectangular" height={54} />
                            }


                            <Divider />

                            {problemContents != undefined ?
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
                                                            <ListText primary={solution.context} secondary={elementsCategories[Number(solution.type)].title} />
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
                                :
                                <Skeleton variant="rectangular" height={62} />
                            }

                            <Divider />

                            {problemContents != undefined ?
                                <Box sx={{ px: 2, my: 1 }}>
                                    <Stack direction="row" sx={{ alignItems: "center" }} justifyContent="space-between"  >
                                        <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                            成長日記
                                        </Typography>
                                        <Button sx={{ fontSize: 14, ml: 2 }} onClick={(event) => setGrowthCreateModalOpen(true)} >
                                            記録する
                                        </Button>
                                    </Stack>

                                    {growthContents != undefined ?
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
                                :
                                <Skeleton variant="rectangular" height={212} />
                            }
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
