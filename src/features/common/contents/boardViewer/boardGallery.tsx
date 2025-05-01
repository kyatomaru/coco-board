"use client"

import * as React from 'react';
import { 
    Box,
    Typography,
    Stack,
    CardMedia,
    Divider
} from '@mui/material';
import { BoardType } from '@/types/board/Board';
import { useRouter } from 'next/navigation';

type BoardGalleryProps = {
    boards: any[];
    boardIds: string[];
}

export default function BoardGallery({ boards, boardIds }: BoardGalleryProps) {
    const router = useRouter()
    if (!boardIds?.length) return null;

    return (
        <Box sx={{ py: 2 }}>
            <Typography sx={{ fontSize: 12, mb: 1, px: 2, color: "black" }}>
                ボード
            </Typography>
            <Stack spacing={1}>
                {boardIds.map((boardId) => {
                    const board = boards.find(b => b.contentsId === boardId);
                    if (!board) return null;

                    return (
                        <Box key={boardId} onClick={() => router.push(`/board/${boardId}`)} sx={{ py: 2,cursor: 'pointer', "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.05)" } }}>
                            <Typography sx={{ fontSize: 14, mb: 1, px: 2 }}>
                                {board.title || '無題のボード'}
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1, pl: 2 }}>
                                {/* コメント表示 */}
                                <Box sx={{ 
                                    flex: 1,
                                    minHeight: 200,
                                    display: 'flex',
                                    alignItems: 'flex-start'
                                }}>
                                    <Typography 
                                        sx={{ 
                                            fontSize: 14,
                                            color: board.comment ? 'text.primary' : 'text.secondary',
                                            whiteSpace: 'pre-wrap'
                                        }}
                                    >

                                        {board.comment ?
                                        board.comment.split('\\n').map((line, index) => (
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
                                            ))
                                        :
                                        <Typography variant="body2" sx={{ px: 1, width: "100px", fontSize: 14, color: "black" }}>
                                            なし
                                        </Typography>
                                    }
                                    </Typography>
                                </Box>

                                {/* ボード画像 */}
                                <Box sx={{ 
                                    width: 160,
                                    height: 200,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 1,
                                    overflow: 'hidden'
                                }}>
                                    {board.imagePath ? (
                                        <CardMedia
                                            component="img"
                                            image={board.imagePath}
                                            sx={{ 
                                                height: '100%',
                                                width: '100%',
                                                objectFit: 'contain'
                                            }}
                                        />
                                    ) : (
                                        <Typography sx={{ color: 'text.secondary' }}>
                                            画像なし
                                        </Typography>
                                    )}
                                </Box>
                            </Box>
                        </Box>
                    );
                })}
            </Stack>
        </Box>
    );
}
