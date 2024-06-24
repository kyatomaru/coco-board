import { type ProblemSolutionType, ProblemSolutionModel } from "./ProblemSolution"

export interface ProblemContentsType {
    date: Date,
    updateDate: Date,
    uid: string,
    problem: string,
    solutions: Array<ProblemSolutionType>,
    createDate: Date,
    contentsId: string,
    overcome: Number,
    categoryId: number,
    feedback: Array<string>,
    detail: string,
    completionDate: Date,
    importance: Number,
    achieve: Boolean
}


export class ProblemContentsModel implements ProblemContentsType {
    date: Date
    updateDate: Date
    uid: string
    problem: string
    solutions: Array<ProblemSolutionType>
    createDate: Date
    contentsId: string
    overcome: Number
    categoryId: number
    feedback: Array<string>
    detail: string
    completionDate: Date
    importance: Number
    achieve: Boolean

    constructor() {
        return {
            date: new Date(),
            createDate: new Date(),
            updateDate: new Date(),
            uid: undefined,
            contentsId: undefined,
            problem: undefined,
            detail: "",
            overcome: 0,
            solutions: [new ProblemSolutionModel()],
            categoryId: 0,
            completionDate: new Date(),
            importance: 1,
            feedback: [],
            achieve: false
        }
    }
}

export class contentsCheckModel {
    constructor(ProblemContents) {
        const array = []
        for (let index = 0; index < ProblemContents.length; index++) {
            array.push([])
            for (let index2 = 0; index2 < ProblemContents[index].solutions.length; index2++) {
                array[index].push(false);
            }
        }
        return array
    }
}