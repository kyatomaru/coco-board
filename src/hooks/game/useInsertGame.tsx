export const useInsertGame = async (contents) => {
    const newData = await fetch(`/api/game/`, {
        method: 'POST',
        body: JSON.stringify(contents),
        headers: {
            "Content-Type": "application/json",
        },
    }).then((data) => { return data.json() })

    newData.collection = "game"

    return newData
}