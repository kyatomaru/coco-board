export interface ProblemContentsType {
    date: string,
    updateDate: Date,
    uid: string,
    problem: string,
    solutions: Array<string>,
    createDate: Date,
    contentsId: string,
}


export class ProblemContentsModel implements ProblemContentsType {
    date: string
    updateDate: Date
    uid: string
    problem: string
    solutions: Array<string>
    createDate: Date
    contentsId: string

    constructor() {
        return {
            date: undefined,
            updateDate: new Date(),
            uid: undefined,
            problem: undefined,
            solutions: [undefined],
            createDate: new Date(),
            contentsId: undefined,
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