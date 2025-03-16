export interface SettingType {
    color: Object,
    isSeeNumber: boolean,
    isSeePosition: boolean,
    isSeeName: boolean,
    teamSize?: number,
    formation?: Array<number>
}

export const PlayerColor = [
    { background: "#0000ff", number: "#ffffff", name: "#000000" },
    { background: "#ff0000", number: "#ffffff", name: "#000000" },
]

export class SettingModel implements SettingType {
    color: Object
    isSeeNumber: boolean
    isSeePosition: boolean
    isSeeName: boolean
    teamSize?: number
    formation?: Array<number>

    constructor() {
        return {
            color: PlayerColor,
            isSeeNumber: true,
            isSeePosition: false,
            isSeeName: true,
            teamSize: 11,
            formation: [0, 0]
        }
    }
}

