export const useInsertTask = (contents) => {
    return fetch(`/api/task/`, {
        method: 'POST',
        body: JSON.stringify(contents),
        headers: {
            'content-type': 'application/json'
        }
    })
}