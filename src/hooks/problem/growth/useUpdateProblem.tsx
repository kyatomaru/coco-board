export const useUpdateGrowth = (contents) => {
    contents
    return fetch(`/api/growth/`, {
        method: 'PATCH',
        body: JSON.stringify(contents),
        headers: {
            'content-type': 'application/json'
        }
    })
}