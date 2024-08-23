import * as React from 'react';

export const useGetGame = (user, contentsId) => {
    const [contents, setContents] = React.useState<any>(undefined);

    React.useEffect(() => {
        if (user) {
            const init = async () => {
                const getParams = { uid: user.uid, contentsId: contentsId };
                const query = new URLSearchParams(getParams);

                setContents(await fetchGameContents(query))
            }
            init()
        }
    }, [user, contentsId])

    const getContents = async () => {
        const getParams = { uid: user.uid, contentsId: contentsId };
        const query = new URLSearchParams(getParams);
        setContents(await fetchGameContents(query))
    }

    return [contents, setContents]
}

const fetchGameContents = async (query) => {
    const gameData = await fetch(`/api/game/?${query}`)
        .then((response) => response.json())
        .then((data) => {
            return data
        })

    return gameData
}

function descTimeSort(a, b) {
    return a < b ? 1 : -1;
}
