"use client"

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import dayjs from 'dayjs';
import type { GameContentsType } from '@/types/game/GameContents';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import List from '@mui/material/List';
import MuiListItemText, { ListItemTextProps } from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { styled } from '@mui/material/styles';
import { useDateFormat } from '@/utils/useDateFormat';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import Skeleton from '@mui/material/Skeleton';
import DeleteConfirmModal from '@/features/common/contents/modal/ConfirmModal';
import { gameModalTitle } from '@/constants/ModalMessage';
import { deleteNoteMs } from '@/constants/ModalMessage';
import { elementsCategories } from '@/types/Category';
import { useDeleteGame } from '@/hooks/game/useDeleteGame';
import NoteContentsBar from '@/features/common/contents/bar/NoteContentsBar';
import { useUpdateGame } from '@/hooks/game/useUpdateGame';
import GameForm from '@/features/common/forms/game/GameForm';

type PageProps = {
    contents: GameContentsType
    setContents: any
}

const DataFormat = (date: String) => {
    return useDateFormat(date)
}


export default function GameContentsBox({ contents, setContents }: PageProps) {
    const router = useRouter()
    const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
    const [editModalOpen, setEditModalOpen] = React.useState<boolean>(false)

    const EditButtonClick = () => {
        setEditModalOpen(true)
    }

    const DeleteButtonClick = () => {
        setDeleteModalOpen(true)
    }

    const DeleteGameContents = async () => {
        const res = await useDeleteGame(contents.contentsId)
        if (res.ok) {
            router.replace(`/calendar/${dayjs(String(contents.date)).format('YYYY-MM-DD')}`)
        }
    }

    const UpdateGameContents = async (contents) => {
        setEditModalOpen(false)
        await useUpdateGame(contents).then((data) => {
            setContents(data)
        })
    }

    return (
        <>
            <DeleteConfirmModal open={deleteModalOpen} setOpen={setDeleteModalOpen} title={gameModalTitle} message={deleteNoteMs} confirmText="削除" onSubmit={DeleteGameContents} />
            {editModalOpen ?
                <GameForm contents={contents} postData={UpdateGameContents} onClose={() => { setEditModalOpen(false) }} />
                :
                <Box>
                    <NoteContentsBar contents={contents} EditButtonClick={EditButtonClick} DeleteButtonClick={DeleteButtonClick} />

                    {contents != undefined ?
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
                        :
                        <Skeleton variant="rectangular" height={94} />
                    }

                    <Divider />

                    {contents != undefined ?
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
                        :
                        <Skeleton variant="rectangular" height={65} />
                    }
                    <Divider />

                    {contents != undefined ?
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
                        :
                        <Skeleton variant="rectangular" height={87} />
                    }


                    {contents != undefined ?
                        contents.condition != 0 && contents.fatigue != 0 && contents.injury &&
                        <>
                            <Divider />
                            <Box sx={{ width: "100%", my: 1 }}>
                                {contents.condition != 0 &&
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
                                {contents.fatigue != 0 &&
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
                        </>
                        :
                        <Skeleton variant="rectangular" height={189} />
                    }


                    {contents != undefined && contents.position &&
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

                    {contents != undefined ?
                        <Box sx={{ px: 2, my: 2 }}>
                            <Typography sx={{ fontSize: 14, mb: 1, fontWeight: "bold" }} color="#ff5e00">
                                良かったところ
                            </Typography>
                            {contents.goodPoints[0] != null ?
                                <List sx={{ px: 0, my: 1, py: 0 }}>
                                    {contents.goodPoints.map((goodPoint, index) => (
                                        <Box key={index}>
                                            {
                                                goodPoint.context != "" &&
                                                // <ListText primary={goodPoint.context} secondary={elementsCategories[Number(goodPoint.type)].title} />
                                                <Typography variant="body2" sx={{ fontSize: 14, mb: 1 }}>
                                                    ・{goodPoint.context}
                                                </Typography>
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


                    {contents != undefined ?
                        <Box sx={{ px: 2, my: 2 }}>
                            <Typography sx={{ fontSize: 14, mb: 1, fontWeight: "bold" }} color="#007eff">
                                悪かった点
                            </Typography>
                            {contents.badPoints[0] != null ?
                                <List sx={{ px: 0, my: 1, py: 0 }}>
                                    {contents.badPoints.map((badPoint, index) => (
                                        <Box key={index}>
                                            {
                                                badPoint.context != "" &&
                                                // <ListText primary={badPoint.context} secondary={elementsCategories[Number(badPoint.type)].title} />
                                                <Typography variant="body2" sx={{ fontSize: 14, mb: 1 }}>
                                                    ・{badPoint.context}
                                                </Typography>
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

                    {contents != undefined ?
                        <Box sx={{ px: 2, my: 2 }}>
                            <Typography sx={{ fontSize: 14, mb: 1, fontWeight: "bold" }} color="#16b41e">
                                次に向けて
                            </Typography>
                            {contents.next &&
                                <Typography variant="body2" sx={{ fontSize: 14 }}>
                                    {contents.next}
                                </Typography>
                            }
                        </Box>
                        :
                        <Skeleton variant="rectangular" height={62} />
                    }

                    {contents != undefined && contents.comment != undefined &&
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
                        </>
                    }
                    <Divider />
                </Box >
            }
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