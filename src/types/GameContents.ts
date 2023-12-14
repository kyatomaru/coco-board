import type { SolutionType } from "./Problem"

export interface GameContentsType {
    date: Date,
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
    docId: String
}


export class GameContentsModel implements GameContentsType {
    date: Date
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
    docId: String

    constructor() {
        return {
            date: new Date(),
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
            docId: undefined
        }
    }
}