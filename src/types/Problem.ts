export interface SolutionType {
    problem: String,
    solution: Array<String>,
}

export interface ProblemType {
    problemList: Array<SolutionType>,
}

export class ProblemModel implements ProblemType {
    problemList: Array<SolutionType>

    constructor() {
        return {
            problemList: [{ problem: "", solution: [""] }],
        }
    }
}


export class HomeProblemModel {
    contentsId: String
    problems: Array<SolutionType>
    date: String
    createDate: Date
    updateDate: Date

    constructor(contentsId, problems, date, createDate, updateDate) {
        return {
            contentsId: contentsId,
            problems: problems,
            date: String(date),
            createDate: createDate,
            updateDate: updateDate
        }
    }


}