import { db } from '@/app/firebase-admin';
// import { db } from '@/app/firebase';
import { FieldValue } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from 'next/server';


type Data = {
    data: Object
}

const COLLECTION_NAME = 'practice';

export async function GET(
    req: NextRequest,
    res: NextResponse
) {
    const uid = req.nextUrl.searchParams.get("uid")
    const date = req.nextUrl.searchParams.get("date")
    const contentsId = req.nextUrl.searchParams.get("contentsId")

    if (uid) {
        if (date) {
            const docRef = await db.collection(COLLECTION_NAME).where("uid", "==", uid).where("date", "==", date).get()
                .then(snapshot => {
                    const data = Array()
                    snapshot.forEach((doc) => {
                        const ob = doc.data()
                        ob.contentsId = doc.id
                        ob.collection = "practice"
                        data.push(ob)
                    })
                    return data

                }).catch((error) => {
                    console.log("Error getting documents: ", error);
                });

            return NextResponse.json(docRef, { status: 200 })
        }
        else if (contentsId) {
            const docRef = await db.collection(COLLECTION_NAME).doc(contentsId).get()
                .then(snapshot => {
                    const data = snapshot.data()
                    data.contentsId = contentsId

                    return data
                })
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                });

            return NextResponse.json(docRef, { status: 200 })
        }
        else {
            const docRef = await db.collection(COLLECTION_NAME).where("uid", "==", uid).orderBy('date', 'desc').orderBy('createDate', 'desc').get()
                .then(snapshot => {
                    const data = Array()
                    snapshot.forEach((doc) => {
                        const ob = doc.data()
                        ob.contentsId = doc.id
                        ob.collection = "practice"
                        data.push(ob)
                    })
                    return data
                })
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                });
            console.log(docRef)

            return NextResponse.json(docRef, { status: 200 })
        }
    }
}

export async function PATCH(
    req: NextRequest,
    res: NextResponse
) {
    const updateData = await req.json();
    const contentsId = updateData.contentsId

    if (updateData && contentsId) {
        updateData.updateDate = new Date()
        const docRef = await db.collection(COLLECTION_NAME).doc(contentsId).update(updateData)
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

    insertData.createDate = new Date()
    insertData.updateDate = new Date()

    if (insertData) {
        db.collection(COLLECTION_NAME).add(insertData)
            .then((res) => {
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