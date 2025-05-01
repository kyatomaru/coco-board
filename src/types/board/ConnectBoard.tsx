export interface ConnectBoardType {
    boardId: string,
    imagePath: string,
}

export class ConnectBoardModel implements ConnectBoardType {
    boardId: string
    imagePath: string
    constructor() {
        return {
            boardId: null,
            imagePath: null
        }
    }
}