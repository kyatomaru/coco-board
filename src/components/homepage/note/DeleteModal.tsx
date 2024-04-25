import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import Popper from '@mui/material/Popper';
import { useRouter } from 'next/navigation'
import { useGetAllGame } from '@/hooks/game/useGetGame';

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
    minHeight: 120,
    bgcolor: 'background.paper',
    textAlign: "center",
    // border: '2px solid #000',
    // boxShadow: 24,
    p: 3,
    justifyContent: "center"
};

export default function DeleteModal({ open, setOpen, DeleteContents }: PageProps) {
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
            <Box sx={style}>
                <Typography variant="body2" component="div" sx={{ mb: 2 }}>
                    本当に削除しますか？
                </Typography>
                <Stack spacing={2} direction="row">
                    <Button sx={{ width: "100%" }} variant="outlined" onClick={CancelButtonClick}>キャンセル</Button>
                    <Button sx={{ width: "100%" }} variant="contained" onClick={DeleteButtonClick}>削除</Button>
                </Stack>
            </Box>
        </Modal>
    )
}