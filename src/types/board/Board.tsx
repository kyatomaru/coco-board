import { FrameType } from "./Frame"

export interface BoardType {
    contentsId: String,
    createDate: Date,
    updateDate: Date,
    uid: string,
    date: String,
    title: string,
    comment: string,
    boardFrame: Array<FrameType>,
}

export class BoardModel implements BoardType {
    contentsId: String
    createDate: Date
    updateDate: Date
    uid: string
    date: String
    title: string
    comment: string
    boardFrame: Array<FrameType>

    constructor(date) {
        return {
            contentsId: undefined,
            createDate: new Date(),
            updateDate: new Date(),
            uid: undefined,
            date: date,
            title: undefined,
            comment: undefined,
            boardFrame: [],
        }
    }
}