import { PlayerModel, PlayerType } from "./Player"
import { BallModel, BallType } from "./Ball"

export interface FrameType {
    players: Array<PlayerType>,
    ball: BallType,
}

export class FrameModel implements FrameType {
    players: Array<PlayerType>
    ball: BallType

    constructor(players: Array<PlayerType>, ball: BallType) {
        return {
            players: players,
            ball: ball
        }
    }
}