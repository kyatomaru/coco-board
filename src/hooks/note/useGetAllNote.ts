import * as React from 'react';

export const useGetNote = (user) => {
    const [contents, setContents] = React.useState<any>(undefined);

    React.useEffect(() => {
        if (user) {
            const init = async () => {
                const getParams = { uid: user.uid };
                const query = new URLSearchParams(getParams);

                setContents(await fetchNoteContents(query))
            }
            init()
        }
    }, [user])

    const getContents = async () => {
        const getParams = { uid: user.uid };
        const query = new URLSearchParams(getParams);
        setContents(await fetchNoteContents(query))
    }

    return [contents, getContents]
}

const fetchNoteContents = async (query) => {
    const boardData = await fetch(`/api/board/?${query}`)
        .then((response) => response.json())
        .then(async (data) => {
            const boardData = JSON.parse(JSON.stringify(data))

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

    const gameData = await fetch(`/api/game/?${query}`)
        .then((response) => response.json())
        .then((data) => {
            return data
        })

    const practiceData = await fetch(`/api/practice/?${query}`)
        .then((response) => response.json())
        .then((data) => {
            return data
        })

    const allData = boardData.concat(gameData, practiceData)

    allData.sort((a, b) => descTimeSort(a.updateDate, b.updateDate));

    return allData
}

function descTimeSort(a, b) {
    return a < b ? 1 : -1;
}
