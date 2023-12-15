import type { SolutionType } from "./Problem"

export interface PracticeContentsType {
    date: String,
    updateDate: Date,
    title: String,
    details: Array<String>,
    uid: string,
    problems: Array<SolutionType>,
    weather: String,
    place: String,
    createDate: Date,
    contentsId: String
}

export class PracticeContentsModel implements PracticeContentsType {
    date: String
    updateDate: Date
    title: String
    details: Array<String>
    uid: string
    problems: Array<SolutionType>
    weather: String
    place: String
    createDate: Date
    contentsId: String

    constructor() {
        return {
            date: undefined,
            updateDate: new Date(),
            details: [undefined],
            title: "",
            uid: undefined,
            weather: "",
            problems: [{ problem: undefined, solution: [undefined] }],
            place: undefined,
            createDate: new Date(),
            contentsId: undefined
        }
    }
}