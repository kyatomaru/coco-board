import { FrameType } from "./Frame"
import { SettingType, SettingModel } from "./Setting"

export interface BoardType {
    contentsId: string,
    createDate: Date,
    updateDate: Date,
    uid: string,
    date: string,
    title: string,
    comment: string,
    courtId: number,
    frame: Array<FrameType>,
    setting: SettingType
}

export class BoardModel implements BoardType {
    contentsId: string
    createDate: Date
    updateDate: Date
    uid: string
    date: string
    title: string
    comment: string
    courtId: number
    frame: Array<FrameType>
    setting: SettingType

    constructor(date) {
        return {
            contentsId: undefined,
            createDate: new Date(),
            updateDate: new Date(),
            uid: undefined,
            date: date,
            title: undefined,
            comment: undefined,
            courtId: 0,
            frame: [],
            setting: new SettingModel()
        }
    }
}