import { type GameFeedbackType, GameFeedbackModel } from "./GameFeedback"
import { type GameTeamType, GameTeamModel } from "./GameTeam"
import { type BoardType } from "../board/Board"

export interface GameContentsType {
    contentsId: string,
    createDate: Date,
    updateDate: Date,
    uid: string,
    date: string,
    title: string,
    weather: string,
    place: string,
    injury: string,
    condition: number,
    fatigue: number,
    teams: Array<GameTeamType>,
    name1?: string,
    score1?: string,
    name2?: string,
    score2?: string,
    position: string,
    goodPoints: Array<GameFeedbackType>,
    badPoints: Array<GameFeedbackType>,
    next: string,
    comment: string,
    images?: string[],
    boardIds?: string[]
}

export class GameContentsModel implements GameContentsType {
    contentsId: string
    createDate: Date
    updateDate: Date
    uid: string
    date: string
    title: string
    weather: string
    place: string
    injury: string
    condition: number
    fatigue: number
    teams: Array<GameTeamType>
    name1?: string
    score1?: string
    name2?: string
    score2?: string
    position: string
    goodPoints: Array<GameFeedbackType>
    badPoints: Array<GameFeedbackType>
    next: string
    comment: string
    images?: string[]
    boardIds?: string[]

    constructor(date: string) {
        return {
            contentsId: null,
            createDate: new Date(),
            updateDate: new Date(),
            uid: "",
            date: date,
            title: "",
            weather: "",
            place: "",
            injury: "",
            condition: 0,
            fatigue: 0,
            teams: [new GameTeamModel()],
            position: "",
            goodPoints: [new GameFeedbackModel()],
            badPoints: [new GameFeedbackModel()],
            next: "",
            comment: "",
            images: [],
            boardIds: []
        }
    }
}