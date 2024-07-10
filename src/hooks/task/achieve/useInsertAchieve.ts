export const useInsertAchieve = (contents) => {
    return fetch(`/api/task/achieve/`, {
        method: 'POST',
        body: JSON.stringify(contents),
        headers: {
            'content-type': 'application/json'
        }
    })
}