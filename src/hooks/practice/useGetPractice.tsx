import * as React from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useParams } from 'next/navigation';
import type { User } from 'firebase/auth';
import { PracticeContentsModel, type PracticeContentsType } from '@/types/PracticeContents';

export const useGetIdPractice = (setIsLoading, setDateValue) => {
    const [user, setUser] = React.useState<User | null>(null);
    const [token, setToken] = React.useState<string | null>(null);
    const [contents, setContents] = React.useState<PracticeContentsType>(new PracticeContentsModel);

    const params = useParams()

    React.useEffect(() => {
        const GetContents = async (uid: string | undefined) => {
            console.log(params.docId)
            if (uid && params.docId) {
                const getParams = { uid: uid, docId: String(params.docId) };
                const query = new URLSearchParams(getParams);

                fetch(`/api/practice/?${query}`)
                    .then((response) => response.json())
                    .then((data) => {
                        console.log(data)
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
    }, [params.docId, setDateValue, setIsLoading])

    return contents
}

export const useGetDatePractice = () => {
    const [user, setUser] = React.useState<User | null>(null);
    const [token, setToken] = React.useState<string | null>(null);
    const [contents, setContents] = React.useState<Array<PracticeContentsType | null>>([null]);

    const params = useParams()

    React.useEffect(() => {
        const GetContents = async (uid: string | undefined) => {
            console.log(uid)
            if (uid) {
                const getParams = { uid: uid, date: String(params.date) };
                const query = new URLSearchParams(getParams);

                fetch(`/api/practice/?${query}`)
                    .then((response) => response.json())
                    .then((data) => {
                        setContents(data)
                    })
            }
        }

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
    }, [params.date])

    return contents
}
