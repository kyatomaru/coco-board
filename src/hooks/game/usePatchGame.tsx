import * as React from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useParams } from 'next/navigation';
import type { User } from 'firebase/auth';
import { GameContentsModel, type GameContentsType } from '@/types/game/GameContents';
import { useRouter } from 'next/navigation'
import { auth } from '@/app/firebase';
import dayjs from 'dayjs';

export const usePatchGame = async (data) => {

    const res = await fetch('/api/game/', {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
            'content-type': 'application/json'
        }
    })
    return res
}