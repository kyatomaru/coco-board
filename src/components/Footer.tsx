"use client"

import * as React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import AppBar from '@mui/material/AppBar';
import dayjs from 'dayjs'
import HomeIcon from '@mui/icons-material/Home';
import AddBoxIcon from '@mui/icons-material/AddBox';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import EventIcon from '@mui/icons-material/Event';
import IconButton from '@mui/material/IconButton';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import EditNoteIcon from '@mui/icons-material/EditNote';
import SettingsIcon from '@mui/icons-material/Settings';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Link from 'next/link'
import { mainColor } from '@/constants/Color';

export default function Footer() {
    const pathName = usePathname().split('/')

    const setLabel = () => {
        if (pathName[1] === "note") {
            return 0
        }
        else if (pathName[1] === "setting") {
            return 1
        }
    }

    const [value, setValue] = React.useState(setLabel())

    return (
        <Box sx={{ width: "100%" }}>
            <AppBar position="fixed" sx={{ top: 'auto', bottom: 0, backgroundColor: 'background.paper', display: { sm: "block", md: "none" } }}>
                <BottomNavigation
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                    showLabels
                >
                    <BottomNavigationAction 
                        href="/note" 
                        value={0} 
                        label="ノート"
                        icon={<EditNoteIcon />} 
                        sx={{
                            color: 'text.secondary',
                            '&.Mui-selected': {
                                color: mainColor,
                                '& .MuiSvgIcon-root': {
                                    color: mainColor,
                                }
                            }
                        }}
                    />
                    <BottomNavigationAction 
                        href="/setting" 
                        value={1} 
                        label="設定" 
                        icon={<SettingsIcon />} 
                        sx={{
                            color: 'text.secondary',
                            '&.Mui-selected': {
                                color: mainColor,
                                '& .MuiSvgIcon-root': {
                                    color: mainColor,
                                }
                            }
                        }}
                    />
                </BottomNavigation>
            </AppBar>
        </Box>
    );
}