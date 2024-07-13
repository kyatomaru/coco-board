export interface TaskType {
    taskId: string,
    date: Date,
    createDate: Date,
    updateDate: Date,
    uid: string,
    title: string,
    goal: string,
    detail: string,
    doday: any,
}


export class TaskModel implements TaskType {
    taskId: string
    date: Date
    createDate: Date
    updateDate: Date
    uid: string
    title: string
    goal: string
    detail: string
    doday: any

    constructor() {
        return {
            date: new Date(),
            createDate: new Date(),
            updateDate: new Date(),
            uid: undefined,
            taskId: undefined,
            title: undefined,
            goal: undefined,
            detail: undefined,
            doday: [false, false, false, false, false, false, false],
        }
    }
}