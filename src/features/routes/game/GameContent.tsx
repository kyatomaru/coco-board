"use client"

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import type { GameContentsType } from '@/types/game/GameContents';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Skeleton from '@mui/material/Skeleton';
import ImageGallery from '@/features/common/contents/imageViewer/ImageGallery';
import { BoardType } from '@/types/board/Board';
import BoardGallery from '../../common/contents/boardViewer/boardGallery';
import ContentsBar from '@/features/common/contents/bar/ContentsBar';
import { useDateFormat } from '@/utils/useDateFormat';

type PageProps = {
    content: GameContentsType
    boards: BoardType[]
}

const DataFormat = (date: String) => {
    return useDateFormat(date)
}


export default function GameContent({ content, boards }: PageProps) {
    return (
        <Box sx={{ position: "relative", backgroundColor: "#fbfbfb", borderRight: "solid 0.5px #b2b2b2", borderLeft: "solid 0.5px #b2b2b2", pb: {xs: "150px", md: "0px"} }}>
            <ContentsBar title="試合" contents={content} />

            {content != undefined ?
                <Box>
                    <Box sx={{ width: "100%", alignItems: "center", p: 1, mx: 1  }} >
                        <Typography variant="h6" sx={{ fontSize: 16, color: "black" }} component="div">
                            {content.title || "無題のノート"}
                        </Typography>
                        <Typography variant="h6" sx={{ fontSize: 13, color: "black" }} component="div">
                            {DataFormat(content.date)}
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
                        <Stack key={index} direction="row" justifyContent="space-between" sx={{ my: 1 }}>
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
        </Box>
    )
}