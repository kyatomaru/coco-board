export const useDeleteBoard = async (contentsId) => {
    if (contentsId) {
        const getParams = { contentsId: contentsId };
        const query = new URLSearchParams(getParams);

        return await fetch(`/api/board/?${query}`, {
            method: 'DELETE'
        }).then(async (res) => {
            return await fetch(`/api/board/image/?${query}`, {
                method: 'DELETE'
            })
        })
    }
}