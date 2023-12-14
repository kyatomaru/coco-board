export interface TargetType {
    target: String,
}

export class TargetModel implements TargetType {
    target: String

    constructor() {
        return {
            target: undefined
        }
    }
}