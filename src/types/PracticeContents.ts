import type { SolutionType } from "./Problem"

export interface PracticeContentsType {
    date: Date,
    updateDate: Date,
    title: String,
    details: Array<String>,
    uid: string,
    problems: Array<SolutionType>,
    weather: String,
    place: String,
    createDate: Date
}

export class PracticeContentsModel implements PracticeContentsType {
    date: Date
    updateDate: Date
    title: String
    details: Array<String>
    uid: string
    problems: Array<SolutionType>
    weather: String
    place: String
    createDate: Date

    constructor() {
        return {
            date: new Date(),
            updateDate: new Date(),
            details: [undefined],
            title: undefined,
            uid: undefined,
            weather: undefined,
            problems: [{ problem: undefined, solution: [undefined] }],
            place: undefined,
            createDate: new Date()
        }
    }
}