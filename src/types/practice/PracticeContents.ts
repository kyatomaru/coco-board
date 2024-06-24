import { type PracticeDetailsType, PracticeDetailsModel } from "./PracticeDetails"

export interface PracticeContentsType {
    date: String,
    updateDate: Date,
    title: String,
    uid: string,
    weather: String,
    place: String,
    createDate: Date,
    contentsId: String,
    comment: string,
    details: Array<PracticeDetailsType>,
}


export class PracticeContentsModel implements PracticeContentsType {
    date: String
    updateDate: Date
    title: String
    details: Array<PracticeDetailsType>
    uid: string
    weather: String
    place: String
    createDate: Date
    contentsId: String
    comment: string

    constructor(date) {
        return {
            uid: undefined,
            contentsId: undefined,
            createDate: new Date(),
            updateDate: new Date(),
            title: "",
            date: date,
            details: [new PracticeDetailsModel()],
            weather: "",
            place: undefined,
            comment: undefined,
        }
    }
}