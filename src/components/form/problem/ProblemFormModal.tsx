import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddInputBox from '../inputBox/AddInputBox';
import { ProblemContentsType } from '@/types/ProblemContents';
import ProblemForm from '@/components/form/problem/ProblemForm';


type PageProps = {
    contents: ProblemContentsType,
    onSubmit: React.FormEventHandler<HTMLFormElement>,
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "45vw",
    minWidth: 400,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function ProblemFormModal({ contents, onSubmit }: PageProps) {
    return (
        <Box
            component="form"
            onSubmit={onSubmit}
            sx={style}
            noValidate
            autoComplete="off"
            method='POST'

        >
            <ProblemForm contents={contents} />
            <Button type='submit'>決定</Button>
        </Box>
    )
}