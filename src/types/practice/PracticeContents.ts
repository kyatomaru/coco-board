// import type { SolutionType } from "./problem/Problem"
import { type PracticeDetailsType, PracticeDetailsModel } from "./PracticeDetails"
import { SolutionCategoryType } from "../SolutionCategory"

export interface PracticeContentsType {
    date: String,
    updateDate: Date,
    title: String,
    uid: string,
    // problems: Array<SolutionType>,
    weather: String,
    place: String,
    createDate: Date,
    contentsId: String,
    comment: string,
    details: Array<PracticeDetailsType>,
    detailsCategory: Array<SolutionCategoryType>
}

const trainingList = [
    { title: "全般", bgColor: "white", color: "black" },
    { title: "技術", bgColor: "#0000ff", color: "white" },
    { title: "戦術", bgColor: "#008000", color: "white" },
    { title: "フィジカル", bgColor: "#ffff00", color: "black" },
    { title: "メンタル", bgColor: "#ff0000", color: "white" },
    { title: "その他", bgColor: "white", color: "black" }
]

export class PracticeContentsModel implements PracticeContentsType {
    date: String
    updateDate: Date
    title: String
    details: Array<PracticeDetailsType>
    uid: string
    // problems: Array<SolutionType>
    weather: String
    place: String
    createDate: Date
    contentsId: String
    comment: string
    detailsCategory: Array<SolutionCategoryType>

    constructor() {
        return {
            uid: undefined,
            contentsId: undefined,
            createDate: new Date(),
            updateDate: new Date(),
            title: "",
            date: undefined,
            details: [new PracticeDetailsModel()],
            detailsCategory: trainingList,
            weather: "",
            // problems: [{ problem: undefined, solution: [undefined] }],
            place: undefined,
            comment: undefined,
        }
    }
}