export interface PlayersType {
    uid: string,
    contentsId: string
    teamId: string,
    title?: string,
    players: Array<PlayersType>,
    teamSize: number,
    formation: number,
    createDate: Date,
    updateDate: Date
}

export class PlayersModel implements PlayersType {
    uid: string
    contentsId: string
    teamId: string
    title?: string
    players: Array<PlayersType>
    teamSize: number
    formation: number
    createDate: Date
    updateDate: Date

    constructor(teamId, players, teamSize, formation) {
        return {
            uid: undefined,
            contentsId: undefined,
            teamId: teamId,
            players: players,
            teamSize: teamSize,
            formation: formation,
            createDate: new Date(),
            updateDate: new Date()
        }
    }
}
