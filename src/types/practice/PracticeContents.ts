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
    images?: string[],
    boardIds?: string[]
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
    boardIds?: string[]
    constructor(date) {
        return {
            uid: null,
            contentsId: null,
            createDate: new Date(),
            updateDate: new Date(),
            title: null,
            date: date,
            details: [new PracticeDetailsModel()],
            weather: "",
            place: null,
            goodPoints: [new PracticeDetailsModel()],
            badPoints: [new PracticeDetailsModel()],
            next: null,
            comment: null,
            images: [],
            boardIds: []
        }
    }
}