export interface PlayerType {
    // id: Number,
    x: number,
    y: number,
    isHold: Boolean,
    teamNumber: number,
    backNumber: String,
    name: String,
    color: Object
}

const playerColor = {
    home: { background: "blue", font: "white" },
    away: { background: "red", font: "white" },
}

export class PlayerModel implements PlayerType {
    // id: Number
    x: number
    y: number
    isHold: Boolean
    teamNumber: number
    backNumber: String
    name: String
    color: Object

    constructor(team, backNumber, name) {
        return {
            x: 10,
            y: 10,
            isHold: false,
            teamNumber: team,
            backNumber: backNumber,
            name: name,
            color: (team == 0) ? playerColor.home : playerColor.away,
        }
    }
}