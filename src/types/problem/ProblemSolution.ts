export interface ProblemSolutionType {
    type: Number,
    context: string
}

export class ProblemSolutionModel implements ProblemSolutionType {
    type: Number
    context: string

    constructor() {
        return {
            type: 0,
            context: undefined
        }
    }
}