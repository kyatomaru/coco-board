import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import type { ProblemContentsType } from '@/types/ProblemContents';
import { contentsCheckModel } from '@/types/ProblemContents';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

type PageProps = {
    problemContents: Array<ProblemContentsType | null>
}

export default function HomeContents({ problemContents }: PageProps) {
    const EditButtonClick = (index) => {

    }

    const DeleteButtonClick = () => {

    }

    return (
        <List sx={{ width: '100%', maxWidth: 600, bgcolor: 'background.paper', margin: "auto" }}>
            {problemContents.map((value, index) => {
                const labelId = `checkbox-list-problem-${value}`;

                return (
                    <ListItem
                        key={index}
                        // disablePadding
                        sx={{ display: "block", margin: "auto" }}
                    >
                        <ListItemButton
                            role={undefined}
                            dense
                            sx={{ width: "100%" }}>
                            <Stack direction="row" sx={{ width: "100%", p: 1 }} >
                                <Box sx={{ width: "100%" }}>
                                    <ListItemText id={labelId} primary={value.problem} />
                                </Box>
                                <IconButton sx={{ minWidth: "20px" }} onClick={EditButtonClick}><EditIcon /></IconButton>
                                <IconButton sx={{ minWidth: "20px" }} onClick={DeleteButtonClick}><DeleteIcon /></IconButton>

                            </Stack>
                        </ListItemButton>


                        <List sx={{ display: "block", width: '100%', bgcolor: 'background.paper' }}>
                            {value.solutions.map((value2, index2) => {
                                const labelId2 = `checkbox-list-label-${value2}`;
                                return (
                                    <ListItem
                                        key={index2}
                                        disablePadding
                                    >
                                        <ListItemButton
                                            sx={{ pl: 5 }}
                                            role={undefined}
                                            dense>
                                            <ListItemText id={labelId2} primary={value2} />

                                        </ListItemButton>
                                    </ListItem>
                                );
                            })}
                        </List>
                        <Divider />
                    </ListItem>
                );
            })}
        </List >
    );
}