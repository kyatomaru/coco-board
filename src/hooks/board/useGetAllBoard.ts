import * as React from 'react';

export const useGetAllBoard = (user) => {
    const [contents, setContents] = React.useState<any>(undefined);
    const [isBoardLoading, setIsBoardLoading] = React.useState(false);
    React.useEffect(() => {
        if (user) {
            const init = async () => {
                setIsBoardLoading(true)
                const getParams = { uid: user.uid };
                const query = new URLSearchParams(getParams);

                const data = await fetchBoardContents(query)

                setContents(data)

                if (data != undefined) {
                    if (data.length > 0) {
                        setContents(await fetchBoardImage(data))
                    }
                }

                setIsBoardLoading(false)
            }
            init()
        } else {
            setContents([])
        }
    }, [user])

    const getContents = async () => {
        setIsBoardLoading(true)
        const getParams = { uid: user.uid };
        const query = new URLSearchParams(getParams);
        const data = await fetchBoardContents(query)

        setContents(data)

        if (data != undefined) {
            if (data.length > 0) {
                setContents(await fetchBoardImage(data))
            }
        }

        setIsBoardLoading(false)
    }

    return [contents, getContents, isBoardLoading]
}

const fetchBoardContents = async (query) => {
    const boardData = await fetch(`/api/board/?${query}`)
        .then((response) => response.json())
        .then((data) => {
            return data
        })

    return boardData
}

const fetchBoardImage = async (boardData) => {
    const resultData = JSON.parse(JSON.stringify(boardData))

    for (let index = 0; index < resultData.length; index++) {
        const getImageParams = { id: resultData[index].contentsId };
        const imageQuery = new URLSearchParams(getImageParams);

        await fetch(`/api/board/image?${imageQuery}`)
            .then((imageResponse) => imageResponse.json())
            .then((imageData) => {
                if (imageData != null) {
                    resultData[index].imagePath = imageData
                }
            });
    }

    return resultData
}