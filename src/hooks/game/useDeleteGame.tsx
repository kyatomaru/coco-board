export const useDeleteGame = (docId) => {
    if (docId) {
        const getParams = { docId: docId };
        const query = new URLSearchParams(getParams);

        fetch(`/api/game/?${query}`, {
            method: 'DELETE'
        })
    }
}