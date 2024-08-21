import * as React from 'react';

export const useGetBoard = (user, date) => {
    const [contents, setContents] = React.useState<any>(undefined);

    React.useEffect(() => {
        if (user) {
            const init = async () => {
                const getParams = { uid: user.uid, date: date };
                const query = new URLSearchParams(getParams);

                setContents(await fetchBoardContents(query))
            }
            init()
        }
    }, [user, date])

    const getContents = async () => {
        const getParams = { uid: user.uid, date: date };
        const query = new URLSearchParams(getParams);
        setContents(await fetchBoardContents(query))
    }

    return [contents, getContents]
}

const fetchBoardContents = async (query) => {
    const boardData = await fetch(`/api/board/?${query}`)
        .then((response) => response.json())
        .then(async (data) => {
            const boardData = JSON.parse(JSON.stringify(data))

            console.log(boardData)

            for (let index = 0; index < boardData.length; index++) {
                const getImageParams = { id: boardData[index].contentsId };
                const imageQuery = new URLSearchParams(getImageParams);

                await fetch(`/api/board/image?${imageQuery}`)
                    .then((imageResponse) => imageResponse.json())
                    .then((imageData) => {
                        boardData[index].imagePath = imageData
                    });
            }
            return boardData
        })

    return boardData
}

function descTimeSort(a, b) {
    return a < b ? 1 : -1;
}
