import * as React from 'react';

export const useGetDateProblem = (user, date) => {
    const [contents, setContents] = React.useState<any>(undefined);

    React.useEffect(() => {
        if (user) {
            const init = async () => {
                const getParams = { uid: user.uid, date: date };
                const query = new URLSearchParams(getParams);

                setContents(await fetchProblemContents(query))
            }
            init()
        }
    }, [user])

    const getContents = async () => {
        const getParams = { uid: user.uid, date: date };
        const query = new URLSearchParams(getParams);
        setContents(await fetchProblemContents(query))
    }

    return [contents, getContents]
}

const fetchProblemContents = async (query) => {
    const problemData = await fetch(`/api/problem/?${query}`)
        .then((response) => response.json())
        .then((data) => {
            return data
        })

    return problemData
}

function descTimeSort(a, b) {
    return a < b ? 1 : -1;
}
