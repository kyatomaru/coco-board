import SearchIcon from '@mui/icons-material/Search';
import CampaignIcon from '@mui/icons-material/Campaign';
import TagIcon from '@mui/icons-material/Tag';
import PeopleIcon from '@mui/icons-material/People';
import { createElement } from 'react';
import { SvgIconProps } from '@mui/material';

export type AgeGroup = {
    id: string;
    title: string;
}

export type DiscoveryRoute = {
    id: string;
    title: string;
    subtitle?: string;
    icon: JSX.Element;
}

export const AGE_GROUPS: AgeGroup[] = [
    { id: 'elementary_low', title: '小学1-3年生' },
    { id: 'elementary_high', title: '小学4-6年生' },
    { id: 'junior_high', title: '中学生' },
    { id: 'high_school', title: '高校生' },
    { id: 'university', title: '大学生' },
    { id: 'adult', title: '社会人' }
];

const createIcon = (Icon: React.ComponentType<SvgIconProps>) => 
    createElement(Icon, { sx: { fontSize: 24 } });

export const DISCOVERY_ROUTES: DiscoveryRoute[] = [
    { 
        id: 'search', 
        title: 'Webで検索',
        icon: createIcon(SearchIcon)
    },
    { 
        id: 'sns_ad', 
        title: 'SNS広告',
        subtitle: '（Instagram、TikTokなど）',
        icon: createIcon(CampaignIcon)
    },
    { 
        id: 'sns', 
        title: 'SNS',
        subtitle: '（Instagram、TikTokなど）',
        icon: createIcon(TagIcon)
    },
    { 
        id: 'friend', 
        title: '友達の紹介',
        icon: createIcon(PeopleIcon)
    }
]; 