"use client"

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Modal from '@mui/material/Modal';
import LinearProgress from '@mui/material/LinearProgress';
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
import { LineShareButton, LineIcon } from "react-share";
import { shareMessage } from '@/constants/ShareMessage';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ImageGallery from '@/features/common/contents/imageViewer/ImageGallery';

type PageProps = {
    user: any,
    contents: GameContentsType
    setContents: any
}

const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    minWidth: 320,
    width: "400px",
    maxWidth: '100%',
    zIndex: 2200,
    outline: "none",
};

const DataFormat = (date: String) => {
    return useDateFormat(date)
}

export default function GameContentsBox({ user, contents, setContents }: PageProps) {
    const router = useRouter()
    const [isEditLoading, setIsEditLoading] = React.useState(false)

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

    const UpdateGameContents = async (contents, selectedFiles) => {
        setEditModalOpen(false)
        setIsEditLoading(true)

        await useUpdateGame(contents, selectedFiles).then((data) => {
            setContents(data)
            setIsEditLoading(false)
        })
    }

    return (
        <>
            <DeleteConfirmModal open={deleteModalOpen} setOpen={setDeleteModalOpen} title={gameModalTitle} message={deleteNoteMs} confirmText="削除" onSubmit={DeleteGameContents} />

            <Modal sx={{ zIndex: 2100 }} open={isEditLoading}>
                <Card elevation={2} sx={modalStyle}>
                    <Typography sx={{ fontSize: 13, textAlign: "center", my: 1, color: "black" }} component="h2">
                        ノートを保存しています。
                    </Typography>
                    <LinearProgress />
                </Card>
            </Modal>

            {editModalOpen ?
                <GameForm contents={contents} postData={UpdateGameContents} onClose={() => { setEditModalOpen(false) }} />
                :
                <Box>
                    <NoteContentsBar title="試合" contents={contents} EditButtonClick={EditButtonClick} DeleteButtonClick={DeleteButtonClick} />

                    {contents != undefined ?
                        <Stack direction="row" sx={{ p: 1, mx: 1 }} >
                            <Box sx={{ width: "100%", alignItems: "center" }} >
                                <Typography sx={{ fontSize: 17, color: "black" }} variant="h6" component="div">
                                    {DataFormat(contents.date)}
                                </Typography>
                                <Typography variant="h6" sx={{ fontSize: 16, color: "black" }} component="div">
                                    {String(contents.title)}
                                </Typography>
                                <Chip label="試合" color="success" size="small" sx={{ fontSize: 9 }} />
                            </Box>
                            <Box sx={{ mr: 1 }}>
                                {contents.uid == user?.uid &&
                                    <a href={`https://social-plugins.line.me/lineit/share?url=https://cocoboard.jp/game/${contents.contentsId}?openExternalBrowser=1&text=${shareMessage} - 試合:${contents.title}`} target="_blank" rel="nofollow noopener">
                                        <CardMedia
                                            component='img'
                                            image="/images/welcomePage/LINE-icon.png"
                                            sx={{ width: 35, height: 35 }}
                                        />
                                    </a>
                                }
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
                                    <Typography variant="body2" sx={{ color: "black" }}>
                                        {String(contents.place)}
                                    </Typography>
                                }
                            </Box>
                            <Box sx={{ px: 2, py: 1, width: "100%" }}>
                                <Typography sx={{ fontSize: 14, mb: 1 }} color="text.secondary">
                                    天気
                                </Typography>
                                {contents.weather &&
                                    <Typography variant="body2" sx={{ color: "black" }}>
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
                                    <Typography variant="body2" sx={{ fontSize: 14, mb: 1, color: "black" }}>
                                        {String(contents.name1)}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: "black" }}>
                                        {String(contents.score1)}
                                    </Typography>
                                </Box>
                                <Box sx={{ width: "100%" }}>
                                    <Typography variant="body2" sx={{ fontSize: 14, mb: 1, color: "black" }}>
                                        {String(contents.name2)}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: "black" }}>
                                        {String(contents.score2)}
                                    </Typography>
                                </Box>
                            </Stack>
                        </Box>
                        :
                        <Skeleton variant="rectangular" height={87} />
                    }


                    {contents != undefined ?
                        (Number(contents.condition) > 0 || Number(contents.fatigue) > 0 || contents.injury) &&
                        <>
                            <Divider />
                            <Box sx={{ width: "100%", my: 1 }}>
                                {Number(contents.condition) > 0 &&
                                    <Box sx={{ px: 2, mb: 2 }}>
                                        <Typography sx={{ fontSize: 14, mb: 1 }} color="text.secondary">
                                            体調
                                        </Typography>
                                        <Stack direction="row" alignItems="center">
                                            <span>{customIcons[Number(contents.condition)].icon}</span>
                                            <Typography variant="h6" sx={{ px: 1, fontSize: 14, color: "black" }}>
                                                {customIcons[Number(contents.condition)].label}
                                            </Typography>
                                        </Stack>
                                    </Box>
                                }
                                {Number(contents.fatigue) > 0 &&
                                    <Box sx={{ px: 2, mb: 2 }}>
                                        <Typography sx={{ fontSize: 14, mb: 1 }} color="text.secondary">
                                            疲労感
                                        </Typography>
                                        <Stack direction="row" alignItems="center">
                                            <span>{customIcons[Number(contents.fatigue)].icon}</span>
                                            <Typography variant="h6" sx={{ px: 1, fontSize: 14, color: "black" }}>
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
                                        <Typography variant="body2" sx={{ color: "black" }}>
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
                                <Typography variant="body2" sx={{ color: "black" }}>
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
                            {contents.goodPoints[0].context ?
                                <List sx={{ px: 0, my: 1, py: 0 }}>
                                    {contents.goodPoints.map((goodPoint, index) => (
                                        <Box key={index}>
                                            {
                                                goodPoint.context != undefined &&
                                                // <ListText primary={goodPoint.context} secondary={elementsCategories[Number(goodPoint.type)].title} />
                                                <Typography variant="body2" sx={{ fontSize: 14, mb: 1, color: "black" }}>
                                                    ・{goodPoint.context}
                                                </Typography>
                                            }
                                        </Box>
                                    ))
                                    }
                                </List >
                                :
                                <Typography variant="body2" sx={{ px: 1, width: "100px", fontSize: 14, color: "black" }}>
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
                            {contents.badPoints[0].context ?
                                <List sx={{ px: 0, my: 1, py: 0 }}>
                                    {contents.badPoints.map((badPoint, index) => (
                                        <Box key={index}>
                                            {
                                                badPoint.context != undefined &&
                                                // <ListText primary={badPoint.context} secondary={elementsCategories[Number(badPoint.type)].title} />
                                                <Typography variant="body2" sx={{ fontSize: 14, mb: 1, color: "black" }}>
                                                    ・{badPoint.context}
                                                </Typography>
                                            }
                                        </Box>
                                    ))
                                    }
                                </List >
                                :
                                <Typography variant="body2" sx={{ px: 1, width: "100px", fontSize: 14, color: "black" }}>
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
                            {contents.next ?
                                <Typography variant="body2" sx={{ fontSize: 14, color: "black" }}>
                                    {contents.next}
                                </Typography>
                                :
                                <Typography variant="body2" sx={{ px: 1, width: "100px", fontSize: 14, color: "black" }}>
                                    なし
                                </Typography>
                            }
                        </Box>
                        :
                        <Skeleton variant="rectangular" height={62} />
                    }

                    {/* 画像 */}
                    {contents != undefined && contents.images && contents.images.length > 0 &&
                        <>
                            <Divider />
                            <ImageGallery images={contents.images.map(img => String(img).toString())} />
                        </>
                    }


                    {contents != undefined && contents.comment != undefined &&
                        <>
                            <Divider />
                            <Box sx={{ px: 2, my: 1 }}>
                                <Typography sx={{ fontSize: 14, mb: 1 }} color="text.secondary">
                                    コメント
                                </Typography>

                                <Typography variant="body2" sx={{ pb: 1, color: "black" }}>
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