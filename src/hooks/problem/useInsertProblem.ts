export const useInsertProblem = (contents) => {
    contents
    return fetch(`/api/problem/`, {
        method: 'POST',
        body: JSON.stringify(contents),
        headers: {
            'content-type': 'application/json'
        }
    })
}