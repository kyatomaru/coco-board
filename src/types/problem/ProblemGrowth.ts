export interface ProblemGrowthType {
    date: Date,
    createDate: Date,
    updateDate: Date,
    uid: string,
    contentsId: string,
    problemId: string,
    overcome: Number,
    solutions: Array<string>,
    comment: string
}

export class ProblemGrowthModel implements ProblemGrowthType {
    date: Date
    updateDate: Date
    uid: string
    createDate: Date
    contentsId: string
    problemId: string
    overcome: Number
    solutions: Array<string>
    comment: string

    constructor() {
        return {
            date: new Date(),
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