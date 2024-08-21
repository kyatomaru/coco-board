import * as React from 'react';

export const useGetBoard = (user, contentsId) => {
    const [contents, setContents] = React.useState<any>(undefined);

    React.useEffect(() => {
        if (user) {
            const init = async () => {
                const getParams = { uid: user.uid, contentsId: contentsId };
                const query = new URLSearchParams(getParams);

                setContents(await fetchBoardContents(query))
            }
            init()
        }
    }, [user, contentsId])

    const getContents = async () => {
        const getParams = { uid: user.uid, contentsId: contentsId };
        const query = new URLSearchParams(getParams);
        setContents(await fetchBoardContents(query))
    }

    return [contents, getContents]
}

const fetchBoardContents = async (query) => {
    const boardData = await fetch(`/api/board/?${query}`)
        .then((response) => response.json())
        .then((data) => {
            return data
        })

    console.log(boardData)

    return boardData
}
