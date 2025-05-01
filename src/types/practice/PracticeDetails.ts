export interface PracticeDetailsType {
    type: number,
    context: string
}

export class PracticeDetailsModel implements PracticeDetailsType {
    type: number
    context: string

    constructor() {
        return {
            type: 0,
            context: ""
        }
    }
}