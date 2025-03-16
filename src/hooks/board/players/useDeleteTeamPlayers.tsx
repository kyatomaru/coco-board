export const useDeleteTeamPlayers = async (contentsId) => {
    if (contentsId) {
        const getParams = { contentsId: contentsId };
        const query = new URLSearchParams(getParams);

        return await fetch(`/api/board/teamPlayers/?${query}`, {
            method: 'DELETE'
        })
    }
}