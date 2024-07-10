export interface AchievementType {
    achievementId: string,
    taskId: string,
    achieve: boolean,
    date: String
}


export class AchievementModel implements AchievementType {
    achievementId: string
    taskId: string
    achieve: boolean
    date: String

    constructor() {
        return {
            achievementId: undefined,
            taskId: undefined,
            achieve: false,
            date: undefined
        }
    }
}