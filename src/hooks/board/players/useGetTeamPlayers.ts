import * as React from 'react';

export const useGetTeamPlayers = (user) => {
    const [teamPlayers, setTeamPlayers] = React.useState<any>(undefined);

    React.useEffect(() => {
        const init = async () => {
            const getParams = { uid: user?.uid };
            const query = new URLSearchParams(getParams);

            setTeamPlayers(await fetchTeamPlayers(query))
        }
        if (user?.uid) {
            init()
        }

    }, [user])

    return [teamPlayers, setTeamPlayers]
}

const fetchTeamPlayers = async (query) => {
    const teamPlayers = await fetch(`/api/board/teamPlayers/?${query}`)
        .then((response) => response.json())
        .then((data) => {
            return data
        })

    const data = [undefined, undefined, undefined]

    for (let index = 0; index < teamPlayers.length; index++) {
        data[teamPlayers[index].teamId] = teamPlayers[index]
    }

    console.log(data)

    return data
}
