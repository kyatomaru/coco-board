export const useUpdateBoard = async (board, image) => {
    const newData = await fetch(`/api/board/`, {
        method: 'PATCH',
        body: JSON.stringify(board),
        headers: {
            "Content-Type": "application/json",
        },
    }).then((response) => response.json())
        .then(async (data) => {
            await fetch(`/api/board/image/`, {
                method: 'POST',
                body: JSON.stringify({ image: image, id: data.contentsId }),
                headers: {
                    'content-type': 'application/json'
                }
            })
            return data
        })

    return newData
}