export class JaDayModel {
    jaDate: Date

    constructor(date: Date) {
        const timezoneOffset = new Date().getTimezoneOffset() + (9 * 60) * 60 * 1000

        return {
            jaDate: new Date(date.getTime() + timezoneOffset)
        }
    }
}