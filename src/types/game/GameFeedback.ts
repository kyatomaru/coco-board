export interface GameFeedbackType {
    type: Number,
    context: string
}

export class GameFeedbackModel implements GameFeedbackType {
    type: Number
    context: string

    constructor() {
        return {
            type: 0,
            context: undefined
        }
    }
}