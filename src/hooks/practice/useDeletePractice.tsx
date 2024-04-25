export const useDeletePractice = (contentsId) => {
    if (contentsId) {
        const getParams = { contentsId: contentsId };
        const query = new URLSearchParams(getParams);

        return fetch(`/api/practice/?${query}`, {
            method: 'DELETE'
        })
    }
}