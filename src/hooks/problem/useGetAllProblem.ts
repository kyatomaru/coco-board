import * as React from 'react';

export const useGetAllProblem = (user) => {
    const [contents, setContents] = React.useState<any>(undefined);

    React.useEffect(() => {
        if (user) {
            const init = async () => {
                const getParams = { uid: user.uid };
                const query = new URLSearchParams(getParams);

                setContents(await fetchProblemContents(query))
            }
            init()
        }
    }, [user])

    const getContents = async () => {
        const getParams = { uid: user.uid };
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
