"use client"

import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import { 
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Typography,
    Stack,
    Checkbox,
    TextField,
    Grid,
    Paper,
    CardMedia,
    OutlinedInput,
    Divider
} from '@mui/material';
import { BoardType } from '@/types/board/Board';
import Image from 'next/image';

type BoardSelectFormProps = {
    boards: any[];
    selectedBoards: string[];
    onBoardSelect: (boardIds: string[]) => void;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export default function BoardSelectForm({ boards, selectedBoards, onBoardSelect }: BoardSelectFormProps) {
    return (
        <Box sx={{ my: 1 }}>
            <Stack >
                <Select
                    multiple
                    displayEmpty
                    value={selectedBoards}
                    onChange={(e) => {
                        const selectedIds = typeof e.target.value === 'string' 
                            ? e.target.value.split(',') 
                            : e.target.value;
                        onBoardSelect(selectedIds);
                    }}
                    size="small"
                    input={<OutlinedInput />}
                    renderValue={(selected) => {
                        if (selected.length === 0) {
                            return <Typography sx={{ fontSize: 13, color: 'text.secondary', p: "0px" }}>
                                ボードを選択
                            </Typography>;
                        }

                        const selectedTitles = selected.map(id => {
                            const board = boards.find(b => b.contentsId === id);
                            return board?.title || '無題のボード';
                        });

                        return (
                            <Typography sx={{ fontSize: 13 }}>
                                {selectedTitles.join(', ')}
                            </Typography>
                        );
                    }}
                    MenuProps={MenuProps}
                >
                    <MenuItem disabled value="">
                        <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>
                            ボードを選択
                        </Typography>
                    </MenuItem>
                    {boards &&
                        boards.map((board) => (
                            <MenuItem key={board.contentsId} value={board.contentsId}>
                                <Checkbox checked={selectedBoards.includes(board.contentsId)} />
                                <Typography sx={{ fontSize: 13 }}>
                                    {board.title || '無題のボード'}
                                </Typography>
                            </MenuItem>
                        ))}
                </Select>

                {/* 選択されたボードの表示 */}
                <Stack sx={{ mt: 2 }}>
                    {selectedBoards.map((boardId, index) => {
                        const board = boards.find(b => b.contentsId === boardId);
                        if (!board) return null;

                        return (
                            <Box key={boardId} sx={{ mb: 1 }}>
                                <Typography sx={{ fontSize: 13, mb: 1 }}>
                                    {board.title || '無題のボード'}
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    {/* コメント表示 */}
                                    <Box sx={{ 
                                        flex: 1,
                                        minHeight: 200,
                                        display: 'flex',
                                        alignItems: 'flex-start'
                                    }}>
                                        <Typography 
                                            sx={{ 
                                                fontSize: 13,
                                                color: board.comment ? 'text.primary' : 'text.secondary',
                                                whiteSpace: 'pre-wrap'
                                            }}
                                        >
                                            {String(board.comment).split('\\n').map((line, index2) => (
                                                <Typography
                                                    key={index2}
                                                    variant="body2"
                                                    sx={{
                                                        fontSize: 13,
                                                        color: "black"
                                                    }}
                                                >
                                                    {line}
                                                </Typography>
                                            ))}
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
                                
                                {index != selectedBoards.length - 1 &&
                                    <Divider sx={{ mt: 2 }} />
                                }
                            </Box>
                        );
                    })}
                </Stack>
            </Stack>
        </Box>
    );
}