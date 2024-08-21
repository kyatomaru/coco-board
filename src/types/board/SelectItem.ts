export interface SelectItemType {
    target: String,
    item: number | null,
}

export class SelectItemModel implements SelectItemType {
    target: String
    item: number | null

    constructor() {
        return {
            target: null,
            item: null,
        }
    }
}