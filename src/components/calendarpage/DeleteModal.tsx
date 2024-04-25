import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';

import { useRouter } from 'next/navigation'
import { useGetAllGame } from '@/hooks/game/useGetGame';

type PageProps = {
    open: boolean,
    setOpen: Function,
    title: string,
    message: string,
    DeleteContents: Function
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    width: 320,
    maxWidth: '100%'
};

export default function DeleteModal({ open, setOpen, title, message, DeleteContents }: PageProps) {
    const [isLoading, setIsLoading] = React.useState<boolean>(true)
    const router = useRouter()
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const DeleteButtonClick = () => {
        DeleteContents()
    }

    const CancelButtonClick = () => {
        setOpen(false);
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            {/* <Box sx={style}>
                <Typography variant="body2" component="div" sx={{ mb: 2 }}>
                    本当に削除しますか？
                </Typography>
                <Stack spacing={2} direction="row">
                    <Button sx={{ width: "100%" }} variant="outlined" onClick={CancelButtonClick}>キャンセル</Button>
                    <Button sx={{ width: "100%" }} variant="contained" onClick={DeleteButtonClick}>削除</Button>
                </Stack>
            </Box> */}
            <Paper sx={style} >
                <Box sx={{ textAlign: "center", p: 3 }}>
                    <Typography variant="h4" sx={{ fontSize: 15, mb: 1 }}>
                        {title}を削除しますか？
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: 13 }}>
                        {message}
                    </Typography>
                </Box>
                <Divider />
                <MenuList sx={{ textAlign: "center" }}>
                    <MenuItem sx={{ py: 1 }} onClick={DeleteButtonClick} >
                        <Typography variant="button" sx={{ mx: "auto", color: "red", fontWeight: "bold" }} >削除</Typography>
                    </MenuItem>
                    <MenuItem sx={{ py: 1 }} onClick={CancelButtonClick}>
                        <Typography variant="button" sx={{ mx: "auto" }}>キャンセル</Typography>
                    </MenuItem>
                </MenuList>
            </Paper>
        </Modal>
    )
}