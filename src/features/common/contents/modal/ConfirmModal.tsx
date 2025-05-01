import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import { useRouter } from 'next/navigation'
import zIndex from '@mui/material/styles/zIndex';

type PageProps = {
    open: boolean,
    setOpen: Function,
    title: string,
    message: string,
    confirmText: string
    onSubmit: any
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    width: 320,
    maxWidth: '100%',
    zIndex: 2000,
};

export default function ConfirmModal({ open, setOpen, title, message, confirmText, onSubmit }: PageProps) {
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const SubmitButtonClick = () => {
        onSubmit()
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
            sx={{ zIndex: 2600 }}
        >
            <Paper sx={style} >
                <Box sx={{ textAlign: "center", p: 3 }}>
                    <Typography variant="h4" sx={{ fontSize: 15, mb: 1 }}>
                        {title}
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: 13 }}>
                        {message}
                    </Typography>
                </Box>
                <Divider />
                <MenuList sx={{ textAlign: "center" }}>
                    <MenuItem sx={{ py: 1 }} onClick={SubmitButtonClick} >
                        <Typography variant="button" sx={{ mx: "auto", color: "red", fontWeight: "bold" }} >{confirmText}</Typography>
                    </MenuItem>
                    <MenuItem sx={{ py: 1 }} onClick={CancelButtonClick}>
                        <Typography variant="button" sx={{ mx: "auto" }}>キャンセル</Typography>
                    </MenuItem>
                </MenuList>
            </Paper>
        </Modal>
    )
}