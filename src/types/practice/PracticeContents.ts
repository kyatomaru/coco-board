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
    details: Array<PracticeDetailsType>,
    goodPoints?: Array<PracticeDetailsType>,
    badPoints?: Array<PracticeDetailsType>,
    next: String,
    comment: string,
    images?: string[]
}


export class PracticeContentsModel implements PracticeContentsType {
    date: String
    updateDate: Date
    title: String
    details: Array<PracticeDetailsType>
    goodPoints?: Array<PracticeDetailsType>
    badPoints?: Array<PracticeDetailsType>
    uid: string
    weather: String
    place: String
    createDate: Date
    contentsId: String
    next: String
    comment: string
    images?: string[]

    constructor(date) {
        return {
            uid: undefined,
            contentsId: undefined,
            createDate: new Date(),
            updateDate: new Date(),
            title: undefined,
            date: date,
            details: [new PracticeDetailsModel()],
            weather: "",
            place: undefined,
            goodPoints: [new PracticeDetailsModel()],
            badPoints: [new PracticeDetailsModel()],
            next: undefined,
            comment: undefined,
            images: []
        }
    }
}