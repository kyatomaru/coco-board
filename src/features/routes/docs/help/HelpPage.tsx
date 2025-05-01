"use client"

import * as React from 'react';
import { 
    Container, 
    Box, 
    List, 
    ListItemButton,
    ListItemText,
    ListItemIcon,
    Collapse,
    Divider,
    Link
} from '@mui/material';
import { useRouter } from 'next/navigation';
import Header from '../Header';
import Footer from '../Footer';
import InfoIcon from '@mui/icons-material/Info';
import PersonIcon from '@mui/icons-material/Person';
import SecurityIcon from '@mui/icons-material/Security';
import GavelIcon from '@mui/icons-material/Gavel';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

export default function HelpPage() {
    const router = useRouter();
    const [openStates, setOpenStates] = React.useState<{ [key: string]: boolean }>({});

    const handleClick = (title: string, link?: string) => {
        if (link) {
            if (link.startsWith('/help')) {
                router.push(link);
            } else {
                window.open(link, '_blank');
            }
            return;
        }
        setOpenStates(prev => ({
            ...prev,
            [title]: !prev[title]
        }));
    };

    const helpItems = [
        {
            title: "coco-boardの機能",
            icon: <InfoIcon />,
            items: [
                {
                    text: "ボード（戦術）機能について",
                    link: "/help/features/board"
                },
                {
                    text: "試合記録機能について",
                    link: "/help/features/game"
                },
                {
                    text: "練習記録機能について",
                    link: "/help/features/practice"
                }
            ],
            expandable: true
        },
        {
            title: "アカウント",
            icon: <PersonIcon />,
            items: [
                {
                    text: "アカウントの登録方法",
                    link: "/help/account/register"
                },
                {
                    text: "利用開始の手順",
                    link: "/help/account/start"
                }
            ],
            expandable: true
        },
        {
            title: "プライバシーポリシー",
            icon: <SecurityIcon />,
            items: [],
            expandable: false,
            link: '/privacy'
        },
        {
            title: "利用規約",
            icon: <GavelIcon />,
            items: [],
            expandable: false,
            link: '/terms'
        }
    ];

    return (
        <Box sx={{ width: "100%", background: "white", position: "relative", minHeight: "100vh", pb: "64px" }}>
            <Header title="ヘルプ" />
            <Container 
                maxWidth="md" 
                sx={{ 
                    mt: "90px", 
                    pb: 8,
                }}
            >
                <List
                    sx={{
                        width: '100%',
                        bgcolor: 'background.paper',
                        borderRadius: 1,
                        boxShadow: 1
                    }}
                >
                    {helpItems.map((section, index) => (
                        <React.Fragment key={index}>
                            <ListItemButton 
                                onClick={() => handleClick(section.title, section.link)}
                                sx={section.link ? {
                                    '&:hover': {
                                        textDecoration: 'none',
                                        color: 'primary.main'
                                    }
                                } : {}}
                            >
                                <ListItemIcon>
                                    {section.icon}
                                </ListItemIcon>
                                <ListItemText 
                                    primary={section.title}
                                    sx={{ 
                                        '& .MuiListItemText-primary': {
                                            fontWeight: 600,
                                            fontSize: '1.1rem'
                                        }
                                    }}
                                />
                                {section.expandable && (openStates[section.title] ? <ExpandLess /> : <ExpandMore />)}
                            </ListItemButton>
                            {section.expandable && (
                                <Collapse in={openStates[section.title]} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        {section.items.map((item, itemIndex) => (
                                            <ListItemButton 
                                                key={itemIndex} 
                                                sx={{ pl: 4 }}
                                                onClick={() => handleClick('', item.link)}
                                            >
                                                <ListItemText 
                                                    primary={item.text}
                                                    sx={{
                                                        '& .MuiListItemText-primary': {
                                                            fontSize: '0.95rem'
                                                        }
                                                    }}
                                                />
                                            </ListItemButton>
                                        ))}
                                    </List>
                                </Collapse>
                            )}
                            {index < helpItems.length - 1 && <Divider />}
                        </React.Fragment>
                    ))}
                </List>
            </Container>
            <Box sx={{ position: "absolute", bottom: 0, width: "100%" }}>
                <Footer />
            </Box>
        </Box>
    );
}
