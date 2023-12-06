import * as React from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useParams } from 'next/navigation';
import type { User } from 'firebase/auth';
import { GameContentsModel, type GameContentsType } from '@/types/GameContents';

export const useGetIdGame = (setIsLoading, setDateValue) => {
    const [user, setUser] = React.useState<User | null>(null);
    const [token, setToken] = React.useState<string | null>(null);
    const [contents, setContents] = React.useState<GameContentsType>(new GameContentsModel);

    const params = useParams()

    const getContents = async (uid: string | undefined) => {
        console.log(params.docId)
        if (uid && params.docId) {
            const getParams = { uid: uid, docId: String(params.docId) };
            const query = new URLSearchParams(getParams);

            fetch(`/api/game/?${query}`)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data)
                    setContents(data)
                    setDateValue(new Date(data.date))
                    setIsLoading(false)
                })
        }
    }

    React.useEffect(() => {
        setIsLoading(true)
        const auth = getAuth();
        return onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(auth.currentUser);
                user.getIdToken().then((token) => {
                    setToken(token);
                });
                getContents(auth.currentUser?.uid)
            } else {
                setUser(null);
                setToken(null);
            }
        });
    }, [])

    return contents
}

export const useGetDateGame = () => {
    const [user, setUser] = React.useState<User | null>(null);
    const [token, setToken] = React.useState<string | null>(null);
    const [contents, setContents] = React.useState<Array<GameContentsType | null>>([null]);

    const params = useParams()

    const getContents = async (uid: string | undefined) => {
        console.log(uid)
        if (uid) {
            const getParams = { uid: uid, date: String(params.date) };
            const query = new URLSearchParams(getParams);

            fetch(`/api/game/?${query}`)
                .then((response) => response.json())
                .then((data) => {
                    setContents(data)
                })
        }
    }

    React.useEffect(() => {
        const auth = getAuth();
        return onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(auth.currentUser);
                user.getIdToken().then((token) => {
                    setToken(token);
                });
                getContents(auth.currentUser?.uid)
            } else {
                setUser(null);
                setToken(null);
            }
        });
    }, [])

    return contents
}