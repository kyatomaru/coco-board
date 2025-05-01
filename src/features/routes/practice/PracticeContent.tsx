"use client"

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import Modal from '@mui/material/Modal';
import LinearProgress from '@mui/material/LinearProgress';
import dayjs from 'dayjs';
import type { PracticeContentsType } from '@/types/practice/PracticeContents';
import { useDeletePractice } from '@/hooks/practice/useDeletePractice';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import Chip from '@mui/material/Chip';
import MuiListItemText, { ListItemTextProps } from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import { useDateFormat } from '@/utils/useDateFormat';
import Skeleton from '@mui/material/Skeleton';
import DeleteConfirmModal from '@/features/common/contents/modal/ConfirmModal';
import { practiceModalTitle } from '@/constants/ModalMessage';
import { deleteNoteMs } from '@/constants/ModalMessage';
import { elementsCategories } from '@/types/Category';
import PracticeForm from '@/features/common/forms/practice/PracticeForm';
import { useUpdatePractice } from '@/hooks/practice/useUpdatePractice';
import { LineShareButton, LineIcon } from "react-share";
import { shareMessage } from '@/constants/ShareMessage';
import ImageGallery from '@/features/common/contents/imageViewer/ImageGallery';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material-next/Button/Button';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import BoardGallery from '@/features/common/contents/boardViewer/boardGallery';
import ContentsBar from '@/features/common/contents/bar/ContentsBar';

type PageProps = {
    content: PracticeContentsType,
    boards: any[]
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

export default function PracticeContent({ content, boards }: PageProps) {
    const router = useRouter()

    return (
        <Box sx={{ backgroundColor: "#fbfbfb", borderRight: "solid 0.5px #b2b2b2", borderLeft: "solid 0.5px #b2b2b2", pb: {xs: "150px", md: "100px"} }}>
             <ContentsBar title="試合" contents={content} />          

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
                        </Box>
                        :
                        <Skeleton variant="rectangular" height={94} />
                    }

                    <Divider />

                    {content != undefined ?
                        <Box sx={{ px: 2, my: 1 }}>
                            <Typography sx={{ fontSize: 12, mb: 1 }} color="text.secondary">
                                練習メニュー
                            </Typography>
                            {content.details[0].context ?
                                <List sx={{ px: 0, my: 1, py: 0 }}>
                                    {content.details.map((detail, index) => (
                                        <Box key={index}>
                                            {
                                                detail.context != undefined &&
                                                // <ListText primary={detail.context} secondary={elementsCategories[Number(detail.type)].title} />
                                                <Typography variant="body2" sx={{ fontSize: 14, mb: 1, color: "black" }}>
                                                    ・{detail.context}
                                                </Typography>
                                            }
                                        </Box>
                                    ))
                                    }
                                </List>
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

            {content != undefined ?
                <Box sx={{ px: 2, mb: 3, mt: 2 }}>
                    <Typography sx={{ fontSize: 12, mb: 1, fontWeight: "bold" }} color="#ff5e00">
                        良かったところ
                    </Typography>
                    {content.goodPoints[0]?.context ?
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
                            ))}
                        </List>
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
                    {content.badPoints[0]?.context ?
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
                            ))}
                        </List>
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
            {content != undefined && content.images && content.images.length > 0 &&
                <>
                    <Divider />
                    <ImageGallery images={content.images.map(img => String(img).toString())} />
                </>
            }

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
    )
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