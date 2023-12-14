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
            problemList: [{ problem: "", solution: [""] }]
        }
    }
}