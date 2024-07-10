export const useUpdateTask = (contents) => {
    return fetch(`/api/task/`, {
        method: 'PATCH',
        body: JSON.stringify(contents),
        headers: {
            'content-type': 'application/json'
        }
    })
}