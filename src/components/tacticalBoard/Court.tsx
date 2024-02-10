import * as React from 'react';
import { styled } from '@mui/system';
import Box from '@mui/material/Box';

const CourtBox = styled(Box)(({ theme }) => ({
    position: "relative",
    backgroundColor: "#009900",
    userSelect: "none",
}));

export default function Court() {
    const [courtHeight, setCourtHeight] = React.useState(680);
    const [courtWidth, setCourtWidth] = React.useState(500);

    return (
        <CourtBox id="court" sx={{ height: courtHeight + 'px', width: courtWidth + 'px' }} >

        </CourtBox >
    )
}