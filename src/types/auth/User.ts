import { Timestamp } from "firebase/firestore";

export type User = {
    uid: string;
    email: string;
    isNewUser: boolean;
    createDate: Timestamp;
}   

export class UserModel implements User {
    uid: string
    createDate: Timestamp
    email: string
    isNewUser: boolean
    
    constructor(uid: string, email: string) {
        return {
            uid: uid,
            email: email,
            isNewUser: false,
            createDate: Timestamp.now(),
        }
    }
}