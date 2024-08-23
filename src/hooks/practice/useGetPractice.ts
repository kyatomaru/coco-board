import * as React from 'react';

export const useGetPractice = (user, contentsId) => {
    const [contents, setContents] = React.useState<any>(undefined);

    React.useEffect(() => {
        if (user) {
            const init = async () => {
                const getParams = { uid: user.uid, contentsId: contentsId };
                const query = new URLSearchParams(getParams);

                setContents(await fetchPracticeContents(query))
            }
            init()
        }
    }, [user, contentsId])

    const getContents = async () => {
        const getParams = { uid: user.uid, contentsId: contentsId };
        const query = new URLSearchParams(getParams);
        setContents(await fetchPracticeContents(query))
    }

    return [contents, setContents]
}

const fetchPracticeContents = async (query) => {
    const practiceData = await fetch(`/api/practice/?${query}`)
        .then((response) => response.json())
        .then((data) => {
            return data
        })

    return practiceData
}

function descTimeSort(a, b) {
    return a < b ? 1 : -1;
}
