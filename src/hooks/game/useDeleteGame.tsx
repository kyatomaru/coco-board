export const useDeleteGame = (contentsId) => {
    if (contentsId) {
        const getParams = { contentsId: contentsId };
        const query = new URLSearchParams(getParams);

        fetch(`/api/game/?${query}`, {
            method: 'DELETE'
        })
    }
}