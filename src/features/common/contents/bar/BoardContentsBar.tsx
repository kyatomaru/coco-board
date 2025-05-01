"use client"

import * as React from 'react';
import type { User } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { auth } from '@/app/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

type PageProps = {
    title: String,
    contents: any,
    EditButtonClick: any,
    DeleteButtonClick: any,
}

export default function BoardContentsBar({ title, contents, EditButtonClick, DeleteButtonClick }: PageProps) {
    const router = useRouter()

    const [user, setUser] = React.useState<User | undefined>(null);

    React.useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(auth.currentUser)
            }
        })
    }, [])

    return (
        <Box sx={{
            position: 'sticky', top: 0, left: 0, right: 0, backgroundColor: "white", zIndex: 1900
        }} >
            <Stack sx={{ px: 1, height: "40px" }} direction="row" alignItems="center" justifyContent="center">
                <Box sx={{ width: "100%" }}>
                    {user &&
                        <IconButton onClick={(event) => { contents != undefined && router.back() }} ><ArrowLeftIcon /></IconButton>
                    }
                </Box>
                <Box sx={{ width: "100%", textAlign: "center" }}>
                    <Typography variant="h6" sx={{ fontSize: 14, color: "black" }} component="div">
                        {title}
                    </Typography>
                </Box>
                <Stack direction="row" justifyContent="flex-end" spacing={1} sx={{ width: "100%" }}>
                    {user ?
                        user.uid == contents.uid &&
                        <>
                            <IconButton onClick={EditButtonClick} size='small'><EditIcon sx={{ fontSize: "1.25rem" }} /></IconButton>
                            <IconButton onClick={DeleteButtonClick} size='small'><DeleteIcon sx={{ fontSize: "1.25rem" }} /></IconButton>
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
    )
}