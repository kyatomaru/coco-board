export interface PracticeDetailsType {
    type: Number,
    context: string
}

export class PracticeDetailsModel implements PracticeDetailsType {
    type: Number
    context: string

    constructor() {
        return {
            type: 0,
            context: undefined
        }
    }
}