import { type GameFeedbackType, GameFeedbackModel } from "./GameFeedback"

export interface GameContentsType {
    contentsId: String,
    createDate: Date,
    updateDate: Date,
    uid: String,
    date: String,
    title: String,
    weather: String,
    place: String,
    injury: String,
    condition: Number,
    fatigue: Number,
    name1: String,
    score1: String,
    name2: String,
    score2: String,
    position: String,
    goodPoints: Array<GameFeedbackType>,
    badPoints: Array<GameFeedbackType>,
    next: String,
    comment: String,
    images?: string[]
}

export class GameContentsModel implements GameContentsType {
    contentsId: String
    createDate: Date
    updateDate: Date
    uid: string
    date: String
    title: String
    weather: String
    place: String
    injury: string
    condition: Number
    fatigue: Number
    name1: String
    score1: String
    name2: String
    score2: String
    position: String
    goodPoints: Array<GameFeedbackType>
    badPoints: Array<GameFeedbackType>
    next: String
    comment: String
    images?: string[]

    constructor(date) {
        return {
            contentsId: undefined,
            createDate: new Date(),
            updateDate: new Date(),
            uid: undefined,
            date: date,
            title: undefined,
            weather: "",
            place: undefined,
            injury: undefined,
            condition: 0,
            fatigue: 0,
            name1: undefined,
            score1: undefined,
            name2: undefined,
            score2: undefined,
            position: undefined,
            goodPoints: [new GameFeedbackModel()],
            badPoints: [new GameFeedbackModel()],
            next: undefined,
            comment: undefined,
            images: []
        }
    }
}