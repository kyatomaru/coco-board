export interface PracticeContentsType {
    date: Date,
    updateDate: Date,
    title: String,
    detail: Text,
    uid: string,
    problem: Text,
    weather: String,
    place: String,
    createDate: Date
}

export class PracticeContentsModel implements PracticeContentsType {
    date: Date
    updateDate: Date
    title: String
    detail: Text
    uid: string
    problem: Text
    weather: String
    place: String
    createDate: Date

    constructor() {
        return {
            date: new Date(),
            updateDate: new Date(),
            detail: undefined,
            title: "undefined",
            uid: undefined,
            weather: undefined,
            problem: undefined,
            place: undefined,
            createDate: new Date()
        }
    }
}