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

type PageProps = {
    user: any,
    allContents: any[],
    content: PracticeContentsType,
    setContents: any,
    boards: any[],
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

export default function PracticeContentBox({ user, allContents, content, setContents, boards, setTabValue }: PageProps) {
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

    const DeletePracticeContent = async () => {
        setDeleteModalOpen(false)
        const res = await useDeletePractice(content.contentsId)
        .then(() => {
            const newContents = allContents.filter(value => value.contentsId != content.contentsId)
            setContents(newContents)
            setTabValue(newContents.length == 0 ? 0 : 1)
        })
    }

    const UpdatePracticeContent = async (content, selectedFiles) => {
        setEditModalOpen(false)
        setIsEditLoading(true)

        await useUpdatePractice(content, selectedFiles).then((data) => {
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
            <DeleteConfirmModal open={deleteModalOpen} setOpen={setDeleteModalOpen} title={practiceModalTitle} message={deleteNoteMs} confirmText="削除" onSubmit={DeletePracticeContent} />
            
            {!isEditLoading ? (
                <>
                    {editModalOpen ? (
                        <PracticeForm 
                            contents={content} 
                            postData={UpdatePracticeContent} 
                            boards={boards} 
                            onClose={() => setEditModalOpen(false)} 
                            isCreate={false}
                            menu={-1}
                            setMenu={() => {}}
                        />
                    ) : (
                        <Box sx={{ backgroundColor: "#fbfbfb", borderRight: "solid 0.5px #b2b2b2", borderLeft: "solid 0.5px #b2b2b2", pb: {xs: "150px", md: "100px"} }}>
                            <Box sx={{
                                position: 'sticky', top: 0, left: 0, right: 0, backgroundColor: "white", zIndex: 1900
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
                                                        <a href={`https://social-plugins.line.me/lineit/share?url=https://cocoboard.jp/practice/${content.contentsId}?openExternalBrowser=1&text=${shareMessage} - 練習:${content.title}`} target="_blank" rel="nofollow noopener">
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
                    {content.images && content.images.length > 0 &&
                        <>
                            <Divider />
                            <ImageGallery images={content.images.map(img => String(img).toString())} />
                        </>
                    }

                    {content.comment != undefined &&
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
                </Box >)}
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