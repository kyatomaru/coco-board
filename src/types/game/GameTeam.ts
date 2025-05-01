export interface GameTeamType {
    team: string,
    score1: string,
    score2: string,
}

export class GameTeamModel implements GameTeamType {
    team: string
    score1: string
    score2: string

    constructor() {
        return {
            team: "",
            score1: "",
            score2: ""
        }
    }
}