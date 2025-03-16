export const useInsertTeamPlayers = async (teamPlayers) => {
    const newData = await fetch(`/api/board/teamPlayers/`, {
        method: 'POST',
        body: JSON.stringify(teamPlayers),
        headers: {
            "Content-Type": "application/json",
        },
    }).then((response) => { return response.json() })

    return newData
}