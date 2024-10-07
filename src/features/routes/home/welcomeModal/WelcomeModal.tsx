"use client"

import * as React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import WelcomeMessage from './WelcomeMessage';
import InviteMessage from './InviteMessage';
import CreateTutorial from './CreateTutorial';
import CreateButton from '@/features/common/button/CreateButton';
import { Container, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    minWidth: 320,
    width: "400px",
    maxWidth: '100%',
    zIndex: 2000,
    outline: "none",
};

export default function WelcomeModal() {
    const [open, setOpen] = React.useState(false)
    const [page, setPage] = React.useState(1)

    React.useEffect(() => {
        const isNewUser = localStorage.getItem('isNewUser')
        if (isNewUser == "true") {
            setOpen(true)
        }
        else {
            setOpen(false)
        }
    }, [])

    const previousPage = () => { setPage(page - 1) }
    const nextPage = () => { setPage(page + 1) }

    const register = () => { setOpen(false), localStorage.removeItem('isNewUser'), localStorage.setItem('isNewCreateBoard', "1") }

    return (
        <>
            <Modal open={open} onClose={() => { }} >
                <Paper sx={style}>
                    {page == 1 ? <WelcomeMessage nextPage={nextPage} /> :
                        page == 2 ? <InviteMessage previousPage={previousPage} nextPage={nextPage} /> :
                            page == 3 && <CreateTutorial previousPage={previousPage} register={register} />
                    }
                </Paper>
            </Modal>

            {open && page == 3 &&
                <Box sx={{ position: 'fixed', top: 0, right: 0, left: 0, height: "-webkit-fill-available", zIndex: 2000, pointerEvents: "none" }} >
                    <Container maxWidth="md" sx={{ my: 0, height: "100vh", px: 0, position: "relative", pl: { md: "120px", lg: "250px" } }}>
                        <Fab sx={{ bottom: { md: 200, xs: "25vh" }, position: "absolute", pointerEvents: "auto", right: 30, backgroundColor: "#2e7d32 !important" }} color="primary" aria-label="add">
                            <AddIcon />
                        </Fab>
                    </Container>
                </Box >
            }
        </>
    );
}