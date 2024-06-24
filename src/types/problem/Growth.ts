export interface GrowthType {
    date: string,
    createDate: Date,
    updateDate: Date,
    uid: string,
    contentsId: string,
    problemId: string,
    overcome: Number,
    solutions: Array<string>,
    comment: string
}

export class GrowthModel implements GrowthType {
    date: string
    updateDate: Date
    uid: string
    createDate: Date
    contentsId: string
    problemId: string
    overcome: Number
    solutions: Array<string>
    comment: string

    constructor(date) {
        return {
            date: date,
            updateDate: new Date(),
            uid: undefined,
            solutions: [undefined],
            createDate: new Date(),
            contentsId: undefined,
            problemId: undefined,
            overcome: 0,
            comment: "",
        }
    }
}