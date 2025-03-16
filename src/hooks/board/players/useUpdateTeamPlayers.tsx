export const useUpdateTeamPlayers = async (teamPlayers) => {
    const newData = await fetch(`/api/board/teamPlayers/`, {
        method: 'PATCH',
        body: JSON.stringify(teamPlayers),
        headers: {
            "Content-Type": "application/json",
        },
    })

    return newData
}