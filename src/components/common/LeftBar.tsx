"use client"

import * as React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import dayjs from 'dayjs'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import HomeIcon from '@mui/icons-material/Home';
import AddBoxIcon from '@mui/icons-material/AddBox';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import EventIcon from '@mui/icons-material/Event';
import Button from '@mui/material/Button';
import { styled, alpha } from '@mui/material/styles';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import Divider from '@mui/material/Divider';
import LogoutConfirmModal from '@/features/common/auth/LogoutConfirmModal';
import CardMedia from '@mui/material/CardMedia';
import Link from '@mui/material/Link';

const barStyle = {
    bgcolor: 'background.paper',
    color: "black",
    position: 'fixed',
    zIndex: "1100",
    width: { md: "90px", lg: "250px" },
    top: 0,
    left: 0,
    display: { xs: "none", sm: "none", md: "block" },
    p: 0,
    boxShadow: "none",
    borderRight: "solid 1px rgb(219, 219, 219)",
}

export default function LeftBar(props) {
    const pathName = usePathname().split('/')

    const setLabel = () => {
        if (pathName[1] === "home") {
            return 0
        }
        else if (pathName[1] === "create") {
            return 1
        }
        else if (pathName[1] === "calendar") {
            return 2
        }
        else if (pathName[1] === "problem") {
            return 3
        }
        else if (pathName[1] === "task") {
            return 4
        }
    }

    const [value, setValue] = React.useState(setLabel())

    const router = useRouter()

    const ClickHomeButton = () => {
        router.push("/home")
    };

    const ClickProblemButton = () => {
        router.push('/problem')
    };

    const ClickCreateButton = () => {
        router.push(`/create/${dayjs(String(new Date())).format('YYYY-MM-DD')}/board`)
    };

    const ClickCalendarButton = () => {
        router.push('/calendar')
    };

    const ClickTaskButton = () => {
        router.push('/task')
    };

    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar sx={barStyle} position="static">
                <Toolbar>
                    <Stack
                        direction="column"
                        justifyItems="center"
                        sx={{ height: "100vh", width: { md: "90px", lg: "250px" }, background: "white" }}>
                        <Stack direction="row" justifyItems="center" alignItems="center" sx={{ py: 5, mb: 3 }}>
                            <IconButton sx={{ p: "0" }} onClick={(event) => { router.push('/home') }}>
                                < CardMedia
                                    component="img"
                                    sx={{ width: 45, height: 45 }}
                                    image="/images/icon.png"
                                />
                            </IconButton>
                            <Typography variant="h6" component="h2" sx={{ display: { md: "none", lg: "block" }, pl: 2 }}>
                                coco-board
                            </Typography>
                        </Stack>

                        <Button sx={{ my: 1, justifyContent: "flex-start", color: value == 0 ? "black" : "#666" }}>
                            <Stack direction="row" alignItems="center" onClick={ClickHomeButton} sx={{ width: "100%" }}>
                                <HomeIcon sx={{ fontSize: 32 }} />
                                <Typography sx={{ fontSize: 17, px: 2, fontWeight: value == 0 && "bold", display: { md: "none", lg: "block" } }}>ホーム</Typography>
                            </Stack>
                        </Button>

                        {/* <Button sx={{ my: 1, justifyContent: "flex-start", color: value == 1 ? "black" : "#666" }}>
                            <Stack direction="row" justifyItems="center" alignItems="center" onClick={ClickCreateButton}>
                                <AddBoxIcon sx={{ fontSize: 32 }} />
                                <Typography sx={{ fontSize: 17, px: 2, fontWeight: value == 1 && "bold", display: { md: "none", lg: "block" } }}>記録</Typography>
                            </Stack>
                        </Button> */}

                        <Button sx={{ my: 1, justifyContent: "flex-start", color: value == 2 ? "black" : "#666" }}>
                            <Stack direction="row" justifyItems="center" alignItems="center" onClick={ClickCalendarButton} sx={{ width: "100%" }}>
                                <EventIcon sx={{ fontSize: 32 }} />
                                <Typography sx={{ fontSize: 17, px: 2, fontWeight: value == 2 && "bold", display: { md: "none", lg: "block" } }}>カレンダー</Typography>
                            </Stack>
                        </Button>

                        {/* <Button sx={{ my: 1, justifyContent: "flex-start", color: value == 3 ? "black" : "#666" }}>
                            <Stack direction="row" justifyItems="center" alignItems="center" onClick={ClickProblemButton}>
                                <TextSnippetIcon sx={{ fontSize: 32 }} />
                                <Typography sx={{ fontSize: 17, px: 2, fontWeight: value == 3 && "bold", display: { md: "none", lg: "block" } }}>課題</Typography>
                            </Stack>
                        </Button>

                        <Button sx={{ my: 1, justifyContent: "flex-start", color: value == 4 ? "black" : "#666" }}>
                            <Stack direction="row" justifyItems="center" alignItems="center" onClick={ClickTaskButton}>
                                <TextSnippetIcon sx={{ fontSize: 32 }} />
                                <Typography sx={{ fontSize: 17, px: 2, fontWeight: value == 4 && "bold", display: { md: "none", lg: "block" } }}>タスク</Typography>
                            </Stack>
                        </Button> */}


                        <Button sx={{ my: 1, justifyContent: "flex-start", color: "#666" }}>
                            <HeaderMenusButton />
                        </Button>
                    </Stack>
                </Toolbar>
            </AppBar>
        </React.Fragment >
    );
}

const HeaderMenusButton = () => {
    const router = useRouter()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [logoutModalOpen, setLogoutModalOpen] = React.useState<boolean>(false)

    const ClickLogoutButton = () => {
        setLogoutModalOpen(true)
    };

    const ClickHelpButton = () => {
        router.prefetch('/help')
    };

    const ClickPrivacyButton = () => {
        router.push("/privacy")
    };

    const ClickTermsButton = () => {
        router.push('/terms')
    };

    return (
        <Box sx={{ width: "100%" }}>
            <LogoutConfirmModal open={logoutModalOpen} setOpen={setLogoutModalOpen} />
            <Stack direction="row" justifyItems="center" alignItems="center" onClick={handleClick} >
                <MenuIcon sx={{ fontSize: { md: 32 } }} />
                <Typography sx={{ fontSize: 17, px: 2, display: { md: "none", lg: "block" } }}>その他</Typography>
            </Stack>
            <StyledMenu
                MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                {/* <MenuItem sx={{ fontSize: 14 }} onClick={ClickHelpButton} disableRipple>
                    ヘルプ
                </MenuItem> */}
                <Link target='_blank' href='/privacy' underline="none" color="black">
                    <MenuItem sx={{ fontSize: 14, color: "black" }} disableRipple>
                        プライバシー
                    </MenuItem>
                </Link>
                <Link target='_blank' href='/terms' underline="none" color="black">
                    <MenuItem sx={{ fontSize: 14 }} disableRipple>
                        利用規約
                    </MenuItem>
                </Link>
                <Divider />
                <MenuItem sx={{ fontSize: 14 }} onClick={ClickLogoutButton} disableRipple>
                    ログアウト
                </MenuItem>
            </StyledMenu>
        </Box>
    );
}

const StyledMenu = styled((props: MenuProps) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));