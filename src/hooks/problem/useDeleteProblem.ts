export const useDeleteProblem = (contentsId) => {
    if (contentsId) {
        const getParams = { contentsId: contentsId };
        const query = new URLSearchParams(getParams);

        return fetch(`/api/problem/?${query}`, {
            method: 'DELETE'
        })
    }
}