export const useDeleteGame = async (contentsId) => {
    if (contentsId) {
        const getParams = { contentsId: contentsId };
        const query = new URLSearchParams(getParams);

        return await fetch(`/api/game/?${query}`, {
            method: 'DELETE'
        })
    }
}