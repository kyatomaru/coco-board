export const useDeleteGame = (contentsId) => {
    if (contentsId) {
        const getParams = { contentsId: contentsId };
        const query = new URLSearchParams(getParams);

        return fetch(`/api/game/?${query}`, {
            method: 'DELETE'
        })
    }
}