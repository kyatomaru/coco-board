import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';

type PageProps = {
    open: boolean,
    setOpen: Function,
    DeleteContents: Function
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    height: 80,
    bgcolor: 'background.paper',
    textAlign: "center",
    // border: '2px solid #000',
    // boxShadow: 24,
    p: 3,
    justifyContent: "center"
};

export default function DeleteModal({ open, setOpen, DeleteContents }: PageProps) {
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const DeleteButtonClick = () => {
        DeleteContents();
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
            <Box sx={style}>
                <Stack spacing={2} direction="row" >
                    <Button variant="outlined" onClick={DeleteButtonClick}>削除</Button>
                    <Button variant="outlined" onClick={CancelButtonClick}>キャンセル</Button>
                </Stack>
            </Box>
        </Modal>
    )
}