import * as React from 'react';

export const useGetBoard = (user, date) => {
    const [contents, setContents] = React.useState<any>(undefined);

    React.useEffect(() => {
        if (user) {
            const init = async () => {
                const getParams = { uid: user.uid, date: date };
                const query = new URLSearchParams(getParams);

                const data = await fetchBoardContents(query)

                setContents(data)

                if (data != undefined) {
                    if (data.length > 0) {
                        setContents(await fetchBoardImage(data))
                    }
                }
            }
            init()
        }
    }, [user, date])

    // React.useEffect(() => {

    // }, [contents])

    const getContents = async () => {
        const getParams = { uid: user.uid, date: date };
        const query = new URLSearchParams(getParams);
        setContents(await fetchBoardContents(query))
    }

    return [contents, setContents]
}

// const fetchBoardContents = async (query) => {
//     const boardData = await fetch(`/api/board/?${query}`)
//         .then((response) => response.json())
//         .then(async (data) => {
//             const boardData = JSON.parse(JSON.stringify(data))

//             console.log(boardData)

//             for (let index = 0; index < boardData.length; index++) {
//                 const getImageParams = { id: boardData[index].contentsId };
//                 const imageQuery = new URLSearchParams(getImageParams);

//                 await fetch(`/api/board/image?${imageQuery}`)
//                     .then((imageResponse) => imageResponse.json())
//                     .then((imageData) => {
//                         boardData[index].imagePath = imageData
//                     });
//             }
//             return boardData
//         })

//     return boardData
// }

const fetchBoardContents = async (query) => {
    const boardData = await fetch(`/api/board/?${query}`)
        .then((response) => response.json())
        .then(async (data) => {
            return data
        })

    return boardData
}

const fetchBoardImage = async (boardData) => {
    const resultData = JSON.parse(JSON.stringify(boardData))

    console.log(resultData)

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

function descTimeSort(a, b) {
    return a < b ? 1 : -1;
}
