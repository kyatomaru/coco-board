export interface BallType {
    x: number,
    y: number,
    diameter: number
}

export class BallModel implements BallType {
    x: number
    y: number
    diameter: number

    constructor() {
        return {
            x: -500,
            y: -500,
            diameter: 18,
        }
    }
}