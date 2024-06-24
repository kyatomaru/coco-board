export const useDeletePractice = async (contentsId) => {
    if (contentsId) {
        const getParams = { contentsId: contentsId };
        const query = new URLSearchParams(getParams);

        return await fetch(`/api/practice/?${query}`, {
            method: 'DELETE'
        })
    }
}