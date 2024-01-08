import * as React from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useParams } from 'next/navigation';
import type { User } from 'firebase/auth';
import type { GameContentsType } from "@/types/GameContents";
import type { PracticeContentsType } from "@/types/PracticeContents";
import { ProblemModel, ProblemType } from '@/types/Problem';

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

export const useGetIdProblem = (setIsLoading) => {
    const [user, setUser] = React.useState<User | null>(null);
    const [token, setToken] = React.useState<string | null>(null);
    const [contents, setContents] = React.useState<ProblemType>(new ProblemModel());

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