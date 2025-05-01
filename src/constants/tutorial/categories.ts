import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import PsychologyIcon from '@mui/icons-material/Psychology';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { SvgIconProps } from '@mui/material';
import { createElement } from 'react';

export type MainCategory = {
    id: string;
    title: string;
    icon: JSX.Element;
    subCategories: SubCategory[];
}

export type SubCategory = {
    id: string;
    title: string;
    skills: Skill[];
}

export type Skill = {
    id: string;
    title: string;
}

const createIcon = (Icon: React.ComponentType<SvgIconProps>) => 
    createElement(Icon, { sx: { fontSize: 24 } });

export const mainCategories: MainCategory[] = [
    {
        id: 'physical',
        title: '体力',
        icon: createIcon(FitnessCenterIcon),
        subCategories: [
            {
                id: 'stamina',
                title: '持久力',
                skills: []
            },
            {
                id: 'power',
                title: '瞬発力',
                skills: []
            },
            {
                id: 'strength',
                title: '筋力',
                skills: []
            },
            {
                id: 'agility',
                title: '俊敏性',
                skills: []
            },
            {
                id: 'balance',
                title: 'バランス能力',
                skills: []
            }
        ]
    },
    {
        id: 'technical',
        title: '技術',
        icon: createIcon(SportsSoccerIcon),
        subCategories: [
            {
                id: 'ball_control',
                title: 'トラップ',
                skills: []
            },
            {
                id: 'dribble',
                title: 'ドリブル',
                skills: []
            },
            {
                id: 'pass',
                title: 'パス',
                skills: []
            },
            {
                id: 'shoot',
                title: 'シュート',
                skills: []
            }
        ]
    },
    {
        id: 'tactical',
        title: '判断力',
        icon: createIcon(PsychologyIcon),
        subCategories: [
            {
                id: 'situation',
                title: '状況判断',
                skills: []
            },
            {
                id: 'prediction',
                title: '予測能力',
                skills: []
            }
        ]
    },
    {
        id: 'mental',
        title: 'メンタル',
        icon: createIcon(FavoriteIcon),
        subCategories: [
            {
                id: 'concentration',
                title: '集中力',
                skills: []
            },
            {
                id: 'communication',
                title: 'コミュニケーション能力',
                skills: []
            }
        ]
    }
]; 