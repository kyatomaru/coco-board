export const useUpdateProblem = (contents) => {
    contents
    return fetch(`/api/problem/`, {
        method: 'PATCH',
        body: JSON.stringify(contents),
        headers: {
            'content-type': 'application/json'
        }
    })
}