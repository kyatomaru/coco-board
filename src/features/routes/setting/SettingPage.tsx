import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import LogoutConfirmModal from '@/features/common/auth/LogoutConfirmModal';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/app/firebase';
import { User } from 'firebase/auth';
import Card from '@mui/material/Card';
import PaymentIcon from '@mui/icons-material/Payment';
import GavelIcon from '@mui/icons-material/Gavel';
import SecurityIcon from '@mui/icons-material/Security';
import LogoutIcon from '@mui/icons-material/Logout';

type PageProps = {
    isSubscriptionValid: boolean
}

export default function SettingPage({ isSubscriptionValid }: PageProps) {
    const [logoutModalOpen, setLogoutModalOpen] = React.useState<boolean>(false)

    const ClickLogoutButton = () => {
        setLogoutModalOpen(true)
    };

    return (
        <>
            <LogoutConfirmModal open={logoutModalOpen} setOpen={setLogoutModalOpen} />
            <Box sx={{ width: '100%', maxWidth: 600, mx: 'auto' }}>
                <List sx={{ px: 2}}>
                    <Card sx={{ borderRadius: "10px", boxShadow: "none" }}>
                        <ListItem disablePadding>
                            <ListItemButton component="a" href="/plan">
                                <ListItemIcon sx={{ minWidth: 40 }}>
                                    <PaymentIcon />
                                </ListItemIcon>
                                <ListItemText 
                                    primary="プラン"
                                    sx={{ span: { fontSize: 14 } }}
                                />
                            </ListItemButton>
                        </ListItem>
                    </Card>
                    <Divider />
                    <Card sx={{ borderRadius: "10px", boxShadow: "none" }}>
                        <ListItem disablePadding>
                            <ListItemButton component="a" href="/contact" target='_blank'>
                                <ListItemIcon sx={{ minWidth: 40 }}>
                                    <EmailOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText 
                                    primary="お問い合わせ"
                                    sx={{ span: { fontSize: 14 } }}
                                />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton component="a" href="/privacy" target='_blank'>
                                <ListItemIcon sx={{ minWidth: 40 }}>
                                    <SecurityIcon />
                                </ListItemIcon>
                                <ListItemText 
                                    primary="プライバシー"
                                    sx={{ span: { fontSize: 14 } }}
                                />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton component="a" href="/terms" target='_blank'>
                                <ListItemIcon sx={{ minWidth: 40 }}>
                                    <GavelIcon />
                                </ListItemIcon>
                                <ListItemText 
                                    primary="利用規約"
                                    sx={{ span: { fontSize: 14 } }}
                                />
                            </ListItemButton>
                        </ListItem>
                    </Card>
                    <Divider />
                    <Card sx={{ borderRadius: "10px", boxShadow: "none" }}>
                        <ListItem disablePadding>
                            <ListItemButton 
                                onClick={ClickLogoutButton}
                                sx={{ color: "red" }}
                            >
                                <ListItemIcon sx={{ minWidth: 40 }}>
                                    <LogoutIcon sx={{ color: "red" }} />
                                </ListItemIcon>
                                <ListItemText 
                                    primary="ログアウト"
                                    sx={{ span: { fontSize: 14 } }}
                                />
                            </ListItemButton>
                        </ListItem>
                    </Card>
                    <Divider />
                </List>
            </Box>
        </>
    );
}
