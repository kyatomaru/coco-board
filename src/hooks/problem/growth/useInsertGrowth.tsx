export const useInsertGrowth = (contents) => {
    contents
    return fetch(`/api/growth/`, {
        method: 'POST',
        body: JSON.stringify(contents),
        headers: {
            'content-type': 'application/json'
        }
    })
}