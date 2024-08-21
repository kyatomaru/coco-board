import { PlayerModel } from "@/types/board/Player";

export const TeamArray = (team, color) => {
    const teamArray = []

    // const teamplayers = []
    // currentPlayers.forEach(currentPlayer => {
    //     if (currentPlayer.teamNumber == team)
    //         teamplayers.push(currentPlayer)
    // });


    for (let index = 0; index < 11; index++) {
        // if (teamplayers.length > index)
        //     teamArray.push(new PlayerModel(team, teamplayers[index].backNumber, teamplayers[index].name))
        // else
        teamArray.push(new PlayerModel(team, index + 1, "player" + (index + 1), color))
    }

    return teamArray
}