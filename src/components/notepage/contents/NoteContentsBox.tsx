"use client"

import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import type { GameContentsType } from '@/types/GameContents';
import NoteContents from './NoteContents';

type PageProps = {
    contents: Array<any>
}

export default function NoteContentsBox({ contents }: PageProps) {
    const [contentsId, setcontentsId] = React.useState([]);

    console.log(contents)
    console.log(contentsId)

    return (
        <Box>
            {contents.map((value, index) => {
                return (
                    <NoteContents key={index} contents={value} />
                )
            })}
        </Box >
    )
}