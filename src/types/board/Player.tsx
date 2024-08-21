import { PlayerColor } from "./Setting"

export interface PlayerType {
    // id: Number,
    x: number,
    y: number,
    diameter: number,
    isHold: Boolean,
    teamNumber: number,
    backNumber: String,
    name: String,
    color: Object,
    position: String
}

export class PlayerModel implements PlayerType {
    // id: Number
    x: number
    y: number
    diameter: number
    isHold: Boolean
    teamNumber: number
    backNumber: String
    name: String
    color: Object
    position: String

    constructor(team, backNumber, name, color) {
        return {
            x: 10,
            y: 10,
            diameter: 20,
            isHold: false,
            teamNumber: team,
            backNumber: backNumber,
            name: name,
            color: color,
            position: ""
        }
    }
}

