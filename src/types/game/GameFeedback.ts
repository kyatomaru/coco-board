export interface GameFeedbackType {
    type: number,
    context: string
}

export class GameFeedbackModel implements GameFeedbackType {
    type: number
    context: string

    constructor() {
        return {
            type: 0,
            context: ""
        }
    }
}