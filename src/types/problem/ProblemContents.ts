import { type SolutionCategoryType } from "../SolutionCategory"
import { type ProblemSolutionType, ProblemSolutionModel } from "./ProblemSolution"

export interface ProblemContentsType {
    date: Date,
    updateDate: Date,
    uid: string,
    problem: string,
    solutionsCategory: Array<SolutionCategoryType>,
    solutions: Array<ProblemSolutionType>,
    createDate: Date,
    contentsId: string,
    overcome: Number,
    category: Array<SolutionCategoryType>,
    categoryId: number,
    feedback: Array<string>,
    detail: string,
    completionDate: Date,
    importance: Number,
}

const categoryList = [
    { title: "カテゴリなし", bgColor: "white", color: "black" },
    { title: "ドリブル", bgColor: "#0000ff", color: "white" },
    { title: "パス", bgColor: "#008000", color: "white" },
    { title: "トラップ", bgColor: "#ffff00", color: "white" },
    { title: "シュート", bgColor: "#ff0000", color: "white" },
    { title: "ボールタッチ", bgColor: "#1e90ff", color: "white" },
    { title: "ヘディング", bgColor: "#008080", color: "white" },
    { title: "スピード", bgColor: "#87cefa", color: "white" },
    { title: "スタミナ", bgColor: "#ffa500", color: "white" },
    { title: "フィジカル", bgColor: "#7cfc00", color: "black" },
    { title: "アジリティ", bgColor: "#ff1493", color: "white" },
    { title: "OF", bgColor: "#ff4500", color: "white" },
    { title: "DF", bgColor: "#00008b", color: "white" },
    { title: "GK", bgColor: "#ffd700", color: "white" },
    { title: "その他", bgColor: "#b0c4de", color: "white" },
]

const solutionList = [
    { title: "全般", bgColor: "white", color: "black" },
    { title: "技術", bgColor: "#0000ff", color: "white" },
    { title: "戦術", bgColor: "#008000", color: "white" },
    { title: "フィジカル", bgColor: "#ffff00", color: "black" },
    { title: "メンタル", bgColor: "#ff0000", color: "white" },
    { title: "その他", bgColor: "white", color: "black" }
]

export class ProblemContentsModel implements ProblemContentsType {
    date: Date
    updateDate: Date
    uid: string
    problem: string
    solutionsCategory: Array<SolutionCategoryType>
    solutions: Array<ProblemSolutionType>
    createDate: Date
    contentsId: string
    overcome: Number
    category: Array<SolutionCategoryType>
    categoryId: number
    feedback: Array<string>
    detail: string
    completionDate: Date
    importance: Number

    constructor() {
        return {
            date: new Date(),
            createDate: new Date(),
            updateDate: new Date(),
            uid: undefined,
            contentsId: undefined,
            problem: undefined,
            detail: "",
            overcome: 0,
            solutionsCategory: solutionList,
            solutions: [new ProblemSolutionModel()],
            category: categoryList,
            categoryId: 0,
            completionDate: new Date(),
            importance: 1,
            feedback: [],
        }
    }
}

export class contentsCheckModel {
    constructor(ProblemContents) {
        const array = []
        for (let index = 0; index < ProblemContents.length; index++) {
            array.push([])
            for (let index2 = 0; index2 < ProblemContents[index].solutions.length; index2++) {
                array[index].push(false);
            }
        }
        return array
    }
}