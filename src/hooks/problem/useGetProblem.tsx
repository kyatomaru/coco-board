import * as React from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useParams } from 'next/navigation';
import type { User } from 'firebase/auth';
import type { GameContentsType } from "@/types/game/GameContents";
import type { PracticeContentsType } from "@/types/practice/PracticeContents";
import { ProblemContentsModel, ProblemContentsType } from '@/types/problem/ProblemContents';

export const useGetProblem = (gameContents: Array<GameContentsType>, practiceContents: Array<PracticeContentsType>) => {
    const problem = []

    gameContents.forEach(contents => {
        if (contents) {
            contents.problems.forEach(problems => {
                problem.push(problems)
            });
        }
    });

    practiceContents.forEach(contents => {
        if (contents) {
            contents.problems.forEach(problems => {
                problem.push(problems)
            });
        }
    });
    return problem
}

export const useGetAllProblem = (setIsLoading) => {
    const [user, setUser] = React.useState<User | null>(null);
    const [token, setToken] = React.useState<string | null>(null);
    const [contents, setContents] = React.useState<[ProblemContentsType]>([new ProblemContentsModel()]);

    const params = useParams()

    React.useEffect(() => {
        const GetContents = async (uid: string) => {
            if (uid) {
                const getParams = { uid: uid };
                const query = new URLSearchParams(getParams);

                fetch(`/api/problem/?${query}`)
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
    }, [setIsLoading])

    return contents
}

export const useGetIdProblem = (setIsLoading) => {
    const [user, setUser] = React.useState<User | null>(null);
    const [token, setToken] = React.useState<string | null>(null);
    const [contents, setContents] = React.useState<ProblemContentsType>(new ProblemContentsModel());

    const params = useParams()

    React.useEffect(() => {
        const GetContents = async (uid: string | undefined) => {
            if (uid && params.contentsId) {
                const getParams = { uid: uid, contentsId: String(params.contentsId) };
                const query = new URLSearchParams(getParams);

                fetch(`/api/problem/?${query}`)
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
    }, [params.contentsId, setIsLoading])

    return contents
}

export const useGetDisplayProblem = (setIsLoading) => {
    const [user, setUser] = React.useState<User | null>(null);
    const [token, setToken] = React.useState<string | null>(null);
    const [contents, setContents] = React.useState<[ProblemContentsType]>([new ProblemContentsModel()]);

    const params = useParams()

    React.useEffect(() => {
        const GetContents = async (uid: string) => {
            if (uid) {
                const getParams = { uid: uid };
                const query = new URLSearchParams(getParams);

                fetch(`/api/problem/?${query}`)
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
    }, [setIsLoading])

    return contents
}