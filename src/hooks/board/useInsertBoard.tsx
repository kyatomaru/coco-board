export const useInsertBoard = async (board, image) => {
    return await fetch(`/api/board/`, {
        method: 'POST',
        body: JSON.stringify(board),
        headers: {
            "Content-Type": "application/json",
        },
    }).then((response) => response.json())
        .then(async (data) => {
            const res = await fetch(`/api/board/image/`, {
                method: 'POST',
                body: JSON.stringify({ image: image, id: data }),
                headers: {
                    'content-type': 'application/json'
                }
            })
            return res
        })

}