export const useUpdateGame = async (contents) => {
    return await fetch(`/api/game/`, {
        method: 'PATCH',
        body: JSON.stringify(contents),
        headers: {
            "Content-Type": "application/json",
        },
    })
}