import { db } from '@/app/firebase-admin';
// import { db } from '@/app/firebase';
import { FieldValue } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from 'next/server';


type Data = {
    data: Object
}

const COLLECTION_NAME = 'growth';

export async function GET(
    req: NextRequest,
    res: NextResponse
) {
    const uid = req.nextUrl.searchParams.get("uid")
    const problemId = req.nextUrl.searchParams.get("problemId")
    const date = req.nextUrl.searchParams.get("date")

    if (uid && !problemId && !date) {
        const docRef = await db.collection(COLLECTION_NAME).where("uid", "==", uid).get()
            .then(snapshot => {
                const data = Array()
                snapshot.forEach((doc) => {
                    const ob = doc.data()
                    ob.contentsId = doc.id
                    data.push(ob)
                })
                return data

            }).catch((error) => {
                console.log("Error getting documents: ", error);
            });
        return NextResponse.json(docRef, { status: 200 })
    }

    if (uid && problemId && !date) {
        const docRef = await db.collection(COLLECTION_NAME).where("uid", "==", uid).where("problemId", "==", problemId).orderBy('date', 'desc').get()
            .then(snapshot => {
                const data = Array()
                snapshot.forEach((doc) => {
                    const ob = doc.data()
                    ob.contentsId = doc.id
                    data.push(ob)
                })
                return data
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });

        return NextResponse.json(docRef, { status: 200 })
    }

    if (uid && !problemId && date) {
        const docRef = await db.collection(COLLECTION_NAME).where("uid", "==", uid).where("date", "==", date).get()
            .then(snapshot => {
                const data = Array()
                snapshot.forEach((doc) => {
                    const ob = doc.data()
                    ob.contentsId = doc.id
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

    // const updateData = reqData.updateData
    // const contentsId = reqData.contentsId

    console.log(updateData)

    if (updateData) {
        const docRef = db.collection(COLLECTION_NAME).doc(updateData.contentsId).update(updateData)
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
    const contentsId = req.nextUrl.searchParams.get("contentsId")
    if (contentsId) {
        await db.collection(COLLECTION_NAME).doc(contentsId).delete();
    }
    return NextResponse.json({ status: 200 })
}