import * as React from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useParams } from 'next/navigation';
import type { User } from 'firebase/auth';
import { GameContentsModel, type GameContentsType } from '@/types/game/GameContents';
import { useRouter } from 'next/navigation'
import { auth } from '@/app/firebase';
import dayjs from 'dayjs';

export const useInsertGame = async (event, contents, dateValue) => {
    event.preventDefault()
    // const formData = new FormData(event.currentTarget)
    // const data = Object.fromEntries(formData)
    const data = contents

    // if (!data.title) {
    //     setTitleError(true)
    // }
    if (false) {

    }
    else {
        const uid = await auth.currentUser?.uid;
        if (uid) {
            data.uid = uid;
            if (dateValue) data.date = dayjs(String(dateValue)).format('YYYY-MM-DD');

            const date = new Date();
            data.createDate = date;
            data.updateDate = date;

            const res = fetch('/api/game/', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'content-type': 'application/json'
                }
            })
        }
    }
}