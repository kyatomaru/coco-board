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
import { useUpdateGame } from '@/hooks/game/useUpdateGame';
import GameForm from '@/features/common/forms/game/GameForm';
import { LineShareButton, LineIcon } from "react-share";
import { shareMessage } from '@/constants/ShareMessage';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ImageGallery from '@/features/common/contents/imageViewer/ImageGallery';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { BoardType } from '@/types/board/Board';
import CircularProgress from '@mui/material/CircularProgress';
import BoardGallery from '../../common/contents/boardViewer/boardGallery';

type PageProps = {
    user: any,
    allContents: any[],
    content: GameContentsType
    setContents: any,
    boards: BoardType[],
    setTabValue: any
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

export default function GameNote({ user, allContents, content, setContents, boards, setTabValue }: PageProps) {
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

    const DeleteGameContent = async () => {
        setDeleteModalOpen(false)
        await useDeleteGame(content.contentsId)
        .then(() => {
            const newContents = allContents.filter(value => value.contentsId != content.contentsId)
            setContents(newContents)
            setTabValue(newContents.length == 0 ? 0 : 1)
        })
    }

    const UpdateGameContent = async (content, selectedFiles) => {
        setEditModalOpen(false)
        setIsEditLoading(true)

        await useUpdateGame(content, selectedFiles).then((data) => {
            const newContent = allContents.map(content => {
                if (content.contentsId === data.contentsId) {
                    return data;
                }
                return content;
            });
            setContents(newContent)
            setIsEditLoading(false)
        })
    }

    return (
        <>
            <DeleteConfirmModal open={deleteModalOpen} setOpen={setDeleteModalOpen} title={gameModalTitle} message={deleteNoteMs} confirmText="削除" onSubmit={DeleteGameContent} />

            {!isEditLoading ? (
                <>
                    {editModalOpen ? (
                        <GameForm 
                            contents={content} 
                            postData={UpdateGameContent} 
                            boards={boards} 
                            onClose={() => setEditModalOpen(false)} 
                            isCreate={false}
                            menu={-1}
                            setMenu={() => {}}
                        />
                    ) : (
                        <Box sx={{ backgroundColor: "#fbfbfb", borderRight: "solid 0.5px #b2b2b2", borderLeft: "solid 0.5px #b2b2b2", pb: {xs: "150px", md: "100px"} }}>
                            <Box sx={{
                                position: 'sticky', top: "40px", left: 0, right: 0, backgroundColor: "white", zIndex: 1900
                            }} >
                                <Stack sx={{ px: 1, height: "40px" }} direction="row" alignItems="center" justifyContent="center">
                                    <Stack direction="row" justifyContent="flex-end" spacing={1} sx={{ width: "100%" }}>
                                        {user ?
                                            user.uid == content.uid &&
                                            <>
                                                <IconButton onClick={EditButtonClick} size='small' sx={{ width: "30px", height: "30px", my: "auto !important" }}><EditIcon sx={{ fontSize: "1.25rem" }} /></IconButton>
                                                <IconButton onClick={DeleteButtonClick} size='small' sx={{ width: "30px", height: "30px", my: "auto !important" }}><DeleteIcon sx={{ fontSize: "1.25rem" }} /></IconButton>
                                                <IconButton>
                                                    {content.uid == user?.uid &&
                                                        <a href={`https://social-plugins.line.me/lineit/share?url=https://cocoboard.jp/game/${content.contentsId}?openExternalBrowser=1&text=${shareMessage} - 試合:${content.title}`} target="_blank" rel="nofollow noopener">
                                                            <CardMedia
                                                                component='img'
                                                                image="/images/welcomePage/LINE-icon.png"
                                                                sx={{ width: 20, height: 20 }}
                                                            />
                                                        </a>
                                                    }
                                                </IconButton>
                                            </>
                                            :
                                            <Button size="medium" onClick={() => router.push('/accounts/login')}>
                                                <Typography sx={{ fontSize: 13 }}>ログイン</Typography>
                                            </Button>
                                        }
                                    </Stack>
                                </Stack>
                                <Divider />
                            </Box>

                            {content != undefined ?
                                <Box>
                                    <Box sx={{ width: "100%", alignItems: "center", p: 1, mx: 1  }} >
                                        <Typography variant="h6" sx={{ fontSize: 16, color: "black" }} component="div">
                                            {content.title || "無題のノート"}
                                        </Typography>
                                    </Box>
                                    <Stack direction="row" alignItems="center" sx={{ p: 1, mx: 1 }} spacing={1}>
                                        <Typography sx={{ fontSize: 12 }} color="text.secondary">
                                            場所
                                        </Typography>
                                        {content.place &&
                                            <Typography variant="body2" sx={{ color: "black" }}>
                                                {String(content.place)}
                                            </Typography>
                                        }
                                    </Stack>
                                    <Stack direction="row"  alignItems="center" sx={{ p: 1, mx: 1 }} spacing={1}>
                                        <Typography sx={{ fontSize: 12}} color="text.secondary">
                                            天気
                                        </Typography>
                                        {content.weather &&
                                            <Typography variant="body2" sx={{ color: "black" }}>
                                                {String(content.weather)}
                                            </Typography>
                                        }
                                    </Stack>
                                    <Stack direction="row"  alignItems="center" sx={{ p: 1, mx: 1 }} spacing={1}>
                                        <Typography sx={{ fontSize: 12}} color="text.secondary">
                                            ポジション
                                        </Typography>
                                        {content.position &&
                                            <Typography variant="body2" sx={{ color: "black" }}>
                                                {String(content.position)}
                                            </Typography>
                                        }
                                    </Stack>
                                </Box>
                                :
                                <Skeleton variant="rectangular" height={65} />
                            }
                            <Divider />

                            {content != undefined ?
                                content.teams && content.teams[0]?.team &&
                                    <List sx={{ mx: 2 }}>
                                        {content.teams.map((team, index) => (
                                        <Stack direction="row" justifyContent="space-between" sx={{ my: 1 }}>
                                             <Stack direction="row" alignItems="center" >
                                                <Typography variant="body2" color="text.secondary" sx={{ fontSize: 12, mr: 1 }}>
                                                    VS
                                                </Typography>
                                                <Typography variant="body2" sx={{ fontSize: 14, color: "black" }}>
                                                    {String(team.team)}
                                                </Typography>
                                            </Stack>
                                            <Stack direction="row" alignItems="center" sx={{ mr: 2 }}>
                                                <Typography variant="body2" sx={{ fontSize: 16, color: "black" }}>
                                                    {String(team.score1)}
                                                </Typography>
                                                <Typography variant="body2" sx={{ fontSize: 16, mx: "6px", color: "black", transform: "scale(2, 1)" }}>
                                                    -
                                                </Typography>
                                                <Typography variant="body2" sx={{ fontSize: 16, color: "black" }}>
                                                    {String(team.score2)}
                                                </Typography>
                                            </Stack>
                                        </Stack>
                                            ))
                                        }
                                    </List>
                                :
                                <Skeleton variant="rectangular" height={87} />
                            }
                            
                            <Divider />

                            {content != undefined ?
                                <Box sx={{ px: 2, mb: 3, mt: 2 }}>
                                    <Typography sx={{ fontSize: 12, mb: 1, fontWeight: "bold" }} color="#ff5e00">
                                        良かったところ
                                    </Typography>
                                    {content.goodPoints[0].context ?
                                        <List sx={{ px: 0, my: 1, py: 0 }}>
                                            {content.goodPoints.map((goodPoint, index) => (
                                                <Box key={index}>
                                                    {
                                                        goodPoint.context != undefined &&
                                                        goodPoint.context.split('\n').map((line, index) => (
                                                            <Typography
                                                                key={index}
                                                                variant="body2"
                                                                sx={{
                                                                    fontSize: 14,
                                                                    color: "black",
                                                                    ml: index === 0 ? 0 : 2
                                                                }}
                                                            >
                                                                {index === 0 && "・"}{line}
                                                            </Typography>
                                                        ))
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


                            {content != undefined ?
                                <Box sx={{ px: 2, my: 3 }}>
                                    <Typography sx={{ fontSize: 12, mb: 1, fontWeight: "bold" }} color="#007eff">
                                        悪かった点
                                    </Typography>
                                    {content.badPoints[0].context ?
                                        <List sx={{ px: 0, my: 1, py: 0 }}>
                                            {content.badPoints.map((badPoint, index) => (
                                                <Box key={index}>
                                                    {
                                                        badPoint.context != undefined &&
                                                        badPoint.context.split('\n').map((line, index) => (
                                                            <Typography
                                                                key={index}
                                                                variant="body2"
                                                                sx={{
                                                                    fontSize: 14,
                                                                    color: "black",
                                                                    ml: index === 0 ? 0 : 2
                                                                }}
                                                            >
                                                                {index === 0 && "・"}{line}
                                                            </Typography>
                                                        ))
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

                            {content != undefined ?
                                <Box sx={{ px: 2, my: 3 }}>
                                    <Typography sx={{ fontSize: 12, mb: 1, fontWeight: "bold" }} color="#16b41e">
                                        次に向けて
                                    </Typography>
                                    {content.next ?
                                        <Typography variant="body2" sx={{ fontSize: 14, color: "black" }}>
                                            {content.next.split('\n').map((line, index) => (
                                                <Typography
                                                    key={index}
                                                    variant="body2"
                                                    sx={{
                                                        fontSize: 14,
                                                        color: "black"
                                                    }}
                                                >
                                                    {line}
                                                </Typography>
                                            ))}
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

                            

                            {/* ボード */}
                            {content.boardIds && content.boardIds.length > 0 && (
                                <>
                                    <Divider />
                                    <BoardGallery boards={boards} boardIds={content.boardIds} />
                                </>
                            )}

                            {/* 画像 */}
                            {content.images && content.images.length > 0 && (
                                <>
                                    <Divider />
                                    <ImageGallery images={content.images.map(img => String(img).toString())} />
                                </>
                            )}


                            {content != undefined && content.comment != undefined &&
                                <>
                                    <Divider />
                                    <Box sx={{ px: 2, my: 1 }}>
                                        <Typography sx={{ fontSize: 14, mb: 1 }} color="text.secondary">
                                            コメント
                                        </Typography>

                                        <Typography variant="body2" sx={{ pb: 1, color: "black" }}>
                                            {content.comment.split('\n').map((line, index) => (
                                                <Typography
                                                    key={index}
                                                    variant="body2"
                                                    sx={{
                                                        fontSize: 14,
                                                        color: "black"
                                                    }}
                                                >
                                                    {line}
                                                </Typography>
                                            ))}
                                        </Typography>
                                    </Box>
                                </>
                            }
                            
                            <Divider />
                        </Box >
                    )}
                </>
            ) : (
                <Box sx={{ textAlign: "center", height: "100vh", marginBottom: "50%", marginTop: "50%" }}>
                    <Typography sx={{ fontSize: 13, textAlign: "center", mb: 2, color: "black" }} component="h2">
                        ノートを保存しています
                    </Typography>
                    <CircularProgress />
                </Box>
            )}
        </>
    )
}

const DotsContentStepper = () => {
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