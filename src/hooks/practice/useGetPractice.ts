import * as React from 'react';

export const useGetPractice = (contentsId) => {
    const [contents, setContents] = React.useState<any>(undefined);
    const [boards, setBoards] = React.useState<any>([]);

    React.useEffect(() => {
        const init = async () => {
            const getParams = { contentsId: contentsId };
            const query = new URLSearchParams(getParams);

            const practice = await fetchPracticeContents(query)

            setContents(practice)


            if (practice.boardIds) {
                const getBoardParams = { uid: practice.uid, date: practice.date };
                const boardQuery = new URLSearchParams(getBoardParams);

                const boardData = await fetchBoardContents(boardQuery)

                setBoards(boardData)

                if (boardData != undefined) {
                    if (boardData.length > 0) {
                        setBoards(await fetchBoardImage(boardData))
                    }
                }
            }
        }
        init()
    }, [contentsId])

    React.useEffect(() => {
        if (boards != undefined) {
            setBoards(boards)
        }
    }, [boards])

    const getContents = async () => {
        const getParams = { contentsId: contentsId };
        const query = new URLSearchParams(getParams);
        setContents(await fetchPracticeContents(query))
    }

    return [contents, setContents, boards, setBoards]
}

const fetchPracticeContents = async (query) => {
    const practiceData = await fetch(`/api/practice/?${query}`)
        .then((response) => response.json())
        .then((data) => {
            return data
        })

    return practiceData
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
                resultData[index].imagePath = imageData
            });
    }

    return resultData
}
