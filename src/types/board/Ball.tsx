export interface BallType {
    x: number,
    y: number,
}

export class BallModel implements BallType {
    x: number
    y: number

    constructor() {
        return {
            x: -10,
            y: -10,
        }
    }
}