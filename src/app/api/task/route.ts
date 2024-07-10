import { db } from '@/app/firebase-admin';
// import { db } from '@/app/firebase';
import { FieldValue } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from 'next/server';


type Data = {
    data: Object
}

const COLLECTION_NAME = 'task';

export async function GET(
    req: NextRequest,
    res: NextResponse
) {
    const uid = req.nextUrl.searchParams.get("uid")
    const taskId = req.nextUrl.searchParams.get("taskId")

    if (uid && !taskId) {
        const docRef = await db.collection(COLLECTION_NAME).where("uid", "==", uid).get()
            .then(snapshot => {
                const data = Array()
                snapshot.forEach((doc) => {
                    const ob = doc.data()
                    ob.taskId = doc.id
                    data.push(ob)
                })
                return data

            }).catch((error) => {
                console.log("Error getting documents: ", error);
            });
        return NextResponse.json(docRef, { status: 200 })
    }

    if (taskId) {
        const docRef = await db.collection(COLLECTION_NAME).doc(taskId).get()
            .then(snapshot => {
                const data = snapshot.data()
                data.taskId = taskId

                return data
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });

        console.log(docRef)

        return NextResponse.json(docRef, { status: 200 })
    }
}

export async function PATCH(
    req: NextRequest,
    res: NextResponse
) {
    const updateData = await req.json();
    const taskId = updateData.taskId

    if (updateData && taskId) {
        const docRef = db.collection(COLLECTION_NAME).doc(taskId).update(updateData)
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