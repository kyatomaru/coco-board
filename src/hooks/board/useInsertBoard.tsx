export const useInsertBoard = async (board, image) => {
    const newData = await fetch(`/api/board/`, {
        method: 'POST',
        body: JSON.stringify(board),
        headers: {
            "Content-Type": "application/json",
        },
    }).then((response) => response.json())
        .then(async (data) => {
            const url = await fetch(`/api/board/image/`, {
                method: 'POST',
                body: JSON.stringify({ image: image, id: data.contentsId }),
                headers: {
                    'content-type': 'application/json'
                }
            }).then((response) => { return response.json() })
            data.imagePath = url
            return data
        })

    return newData
}