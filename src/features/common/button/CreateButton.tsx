import * as React from 'react';
import { useParams, useRouter } from 'next/navigation'
import { Container, Fab, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

type PageProps = {
    onClick: any
}

export default function CreateButton({ onClick }: PageProps) {
    const params = useParams()
    const router = useRouter()

    return (
        <Box sx={{ position: 'fixed', right: 0, left: 0, height: "-webkit-fill-available", zIndex: 1050, pointerEvents: "none" }} >
            <Container maxWidth="md" sx={{ my: 0, height: "100vh", px: 0, position: "relative", pl: { md: "120px", lg: "250px" } }}>
                <Fab sx={{ bottom: { xs: 300, sm: 250 }, position: "absolute", pointerEvents: "auto", right: 30, backgroundColor: "#2e7d32 !important" }} color="primary" aria-label="add"
                    onClick={(event) => { onClick() }}>
                    <AddIcon />
                </Fab>
            </Container>
        </Box>
    );
};