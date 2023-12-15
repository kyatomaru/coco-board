import type { SolutionType } from "./Problem"

export interface GameContentsType {
    date: String,
    updateDate: Date,
    score2: Number,
    badPoints: Array<String>,
    title: String,
    goodPoints: Array<String>,
    uid: string,
    problems: Array<SolutionType>,
    weather: String,
    place: String,
    score1: Number,
    position: String,
    name2: String,
    name1: String,
    createDate: Date
    contentsId: String
}


export class GameContentsModel implements GameContentsType {
    date: String
    updateDate: Date
    score2: Number
    badPoints: Array<String>
    title: String
    goodPoints: Array<String>
    uid: string
    problems: Array<SolutionType>
    weather: String
    place: String
    score1: Number
    position: String
    name2: String
    name1: String
    createDate: Date
    contentsId: String

    constructor() {
        return {
            date: undefined,
            updateDate: new Date(),
            score2: 0,
            badPoints: [undefined],
            title: undefined,
            goodPoints: [undefined],
            uid: undefined,
            problems: [{ problem: undefined, solution: [undefined] }],
            weather: "",
            place: undefined,
            score1: 0,
            position: undefined,
            name2: undefined,
            name1: undefined,
            createDate: new Date(),
            contentsId: undefined
        }
    }
}