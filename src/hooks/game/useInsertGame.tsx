export const useInsertGame = async (contents) => {
    return await fetch(`/api/game/`, {
        method: 'POST',
        body: JSON.stringify(contents),
        headers: {
            "Content-Type": "application/json",
        },
    })
}