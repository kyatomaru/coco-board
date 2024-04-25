import type { SolutionCategoryType } from "../SolutionCategory"
import { type GameFeedbackType, GameFeedbackModel } from "./GameFeedback"

export interface GameContentsType {
    contentsId: String,
    createDate: Date,
    updateDate: Date,
    uid: string,
    date: String,
    title: String,
    weather: String,
    place: String,
    injury: string,
    condition: Number,
    fatigue: Number,
    name1: String,
    score1: String,
    name2: String,
    score2: String,
    position: String,
    goodPoints: Array<GameFeedbackType>,
    badPoints: Array<GameFeedbackType>,
    feedbackCategory: Array<SolutionCategoryType>,
    comment: string,
    // problems: Array<ProblemSolutionType>,
}

const feedbackList = [
    { title: "全般", bgColor: "white", color: "black" },
    { title: "技術", bgColor: "#0000ff", color: "white" },
    { title: "戦術", bgColor: "#008000", color: "white" },
    { title: "フィジカル", bgColor: "#ffff00", color: "black" },
    { title: "メンタル", bgColor: "#ff0000", color: "white" },
    { title: "その他", bgColor: "white", color: "black" }
]

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
    feedbackCategory: Array<SolutionCategoryType>
    comment: string

    constructor() {
        return {
            contentsId: undefined,
            createDate: new Date(),
            updateDate: new Date(),
            uid: undefined,
            date: undefined,
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
            feedbackCategory: feedbackList,
            comment: undefined
        }
    }
}