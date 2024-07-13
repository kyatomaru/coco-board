export const useUpdateAchieve = (contents) => {
    return fetch(`/api/task/achieve/`, {
        method: 'PATCH',
        body: JSON.stringify(contents),
        headers: {
            'content-type': 'application/json'
        }
    })
}