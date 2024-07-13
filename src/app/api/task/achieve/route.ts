import { db } from '@/app/firebase-admin';
// import { db } from '@/app/firebase';
import { FieldValue } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from 'next/server';
import { AchievementModel } from '@/types/task/Achievement';

type Data = {
    data: Object
}

const COLLECTION_NAME = 'achieve';

export async function GET(
    req: NextRequest,
    res: NextResponse
) {
    const uid = req.nextUrl.searchParams.get("uid")
    const taskId = req.nextUrl.searchParams.get("taskId")
    const date = req.nextUrl.searchParams.get("date")

    if (taskId && date) {
        const docRef = await db.collection(COLLECTION_NAME).where("taskId", "==", taskId).where("date", "==", date).get()
            .then(snapshot => {
                if (snapshot.size > 0) {
                    let ob
                    snapshot.forEach((doc) => {
                        ob = doc.data()
                        ob.achievementId = doc.id
                    })
                    return ob
                } else {
                    return new AchievementModel()
                }
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });

        return NextResponse.json(docRef, { status: 200 })
    } else if (taskId) {
        const docRef = await db.collection(COLLECTION_NAME).where("taskId", "==", taskId).get()
            .then(snapshot => {
                const data = Array()
                snapshot.forEach((doc) => {
                    const ob = doc.data()
                    ob.achievementId = doc.id
                    data.push(ob)
                })
                return data
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });

        return NextResponse.json(docRef, { status: 200 })
    }
}

export async function PATCH(
    req: NextRequest,
    res: NextResponse
) {
    const updateData = await req.json();
    const achievementId = updateData.achievementId

    if (updateData && achievementId) {
        const docRef = db.collection(COLLECTION_NAME).doc(achievementId).update(updateData)
            .then(() => {
                console.log("Document successfully updated!");
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    }

    return NextResponse.json({ status: 200 })
}

export async function POST(
    req: NextRequest,
    res: NextResponse
) {
    const insertData = await req.json();

    if (insertData) {
        const docRef = db.collection(COLLECTION_NAME).add(insertData)
            .then(() => {
                console.log("Document successfully created!");
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    }

    return NextResponse.json({ status: 200 })
}

export async function DELETE(
    req: NextRequest,
    res: NextResponse
) {
    const taskId = req.nextUrl.searchParams.get("taskId")
    if (taskId) {
        await db.collection(COLLECTION_NAME).doc(taskId).delete();
    }
    return NextResponse.json({ status: 200 })
}