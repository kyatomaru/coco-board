export interface GameContentsType {
    date: Date,
    updateDate: Date,
    score2: Number,
    badPoint: String,
    title: String,
    goodPoint: String,
    uid: string,
    problem: String,
    weather: String,
    place: String,
    score1: Number,
    position: String,
    name2: String,
    name1: String,
    createDate: Date
    docId: String
}

export class GameContentsModel implements GameContentsType {
    date: Date
    updateDate: Date
    score2: Number
    badPoint: String
    title: String
    goodPoint: String
    uid: string
    problem: String
    weather: String
    place: String
    score1: Number
    position: String
    name2: String
    name1: String
    createDate: Date
    docId: String

    constructor() {
        return {
            date: new Date(),
            updateDate: new Date(),
            score2: 0,
            badPoint: undefined,
            title: undefined,
            goodPoint: undefined,
            uid: undefined,
            problem: undefined,
            weather: undefined,
            place: undefined,
            score1: 0,
            position: undefined,
            name2: undefined,
            name1: undefined,
            createDate: new Date(),
            docId: undefined
        }
    }
}