import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useSignOut } from '@/hooks/auth/useSignOut';
import { useRouter } from 'next/navigation';
import Divider from '@mui/material/Divider';
import LogoutConfirmModal from '@/features/common/auth/LogoutConfirmModal';
import Link from '@mui/material/Link';

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

export default function HeaderMenus() {
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
        <div>
            <LogoutConfirmModal open={logoutModalOpen} setOpen={setLogoutModalOpen} />
            <IconButton
                color="inherit"
                onClick={handleClick}
            >
                <MenuIcon sx={{ fontSize: { md: 35 } }} />
            </IconButton>
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
                <Link target='_blank' href='/privacy' underline="none">
                    <MenuItem sx={{ fontSize: 14 }} disableRipple>
                        プライバシー
                    </MenuItem>
                </Link>
                <Link target='_blank' href='/terms' underline="none">
                    <MenuItem sx={{ fontSize: 14 }} disableRipple>
                        利用規約
                    </MenuItem>
                </Link>
                <Divider />
                <MenuItem sx={{ fontSize: 14 }} onClick={ClickLogoutButton} disableRipple>
                    ログアウト
                </MenuItem>
            </StyledMenu>
        </div>
    );
}