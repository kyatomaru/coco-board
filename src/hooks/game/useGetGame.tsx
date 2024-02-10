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

    React.useEffect(() => {
        const GetContents = async (uid: string | undefined) => {
            if (uid && params.contentsId) {
                const getParams = { uid: uid, contentsId: String(params.contentsId) };
                const query = new URLSearchParams(getParams);

                fetch(`/api/game/?${query}`)
                    .then((response) => response.json())
                    .then((data) => {
                        setContents(data)
                        setDateValue(new Date(data.date))
                        setIsLoading(false)
                    })
            }
        }

        setIsLoading(true)
        const auth = getAuth();
        return onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(auth.currentUser);
                user.getIdToken().then((token) => {
                    setToken(token);
                });
                GetContents(auth.currentUser?.uid)
            } else {
                setUser(null);
                setToken(null);
            }
        });
    }, [params.contentsId, setDateValue, setIsLoading])

    return contents
}

export const useGetDateGame = (setIsLoading) => {
    const [user, setUser] = React.useState<User | null>(null);
    const [token, setToken] = React.useState<string | null>(null);
    const [contents, setContents] = React.useState<Array<GameContentsType | null>>([null]);

    const params = useParams()


    React.useEffect(() => {
        const GetContents = async (uid: string | undefined) => {
            if (uid) {
                const getParams = { uid: uid, date: String(params.date) };
                const query = new URLSearchParams(getParams);

                fetch(`/api/game/?${query}`)
                    .then((response) => response.json())
                    .then((data) => {
                        setContents(data)
                        setIsLoading(false)
                    })
            }
        }

        setIsLoading(true)
        const auth = getAuth();
        return onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(auth.currentUser);
                user.getIdToken().then((token) => {
                    setToken(token);
                });
                GetContents(auth.currentUser?.uid)
            } else {
                setUser(null);
                setToken(null);
            }
        });
    }, [params.date, setIsLoading])

    return contents
}