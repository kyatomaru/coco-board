import { db } from '@/app/firebase-admin';
// import { db } from '@/app/firebase';
import { FieldValue } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from 'next/server';

async function streamToString(stream: any) {
    const chunks = [];
    for await (const chunk of stream) {
        chunks.push(chunk);
    }
    return Buffer.concat(chunks).toString('utf8');
}

type Data = {
    data: Object
}

const COLLECTION_NAME = 'game';

export async function GET(
    req: NextRequest,
    res: NextResponse
) {
    const uid = req.nextUrl.searchParams.get("uid")
    const date = req.nextUrl.searchParams.get("date")
    const docId = req.nextUrl.searchParams.get("docId")
    if (uid && date) {
        const docRef = await db.collection(COLLECTION_NAME).where("uid", "==", uid).where("date", "==", date).get()
            .then(snapshot => {
                const data = Array()
                snapshot.forEach((doc) => {
                    const ob = doc.data()
                    ob.docId = doc.id
                    data.push(ob)
                })
                return data

            }).catch((error) => {
                console.log("Error getting documents: ", error);
            });
        console.log(docRef)
        return NextResponse.json(docRef, { status: 200 })
    }
    if (docId) {
        const docRef = await db.collection(COLLECTION_NAME).doc(docId).get()
            .then(snapshot => {
                const data = snapshot.data()
                data.docId = docId

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
    const reqData = await req.json();

    const updateData = reqData.updateData
    const docId = reqData.docId

    console.log(updateData)

    if (updateData && docId) {
        const docRef = db.collection(COLLECTION_NAME).doc(docId).update(updateData)
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
    const docId = req.nextUrl.searchParams.get("docId")
    if (docId) {
        await db.collection(COLLECTION_NAME).doc(docId).delete();
    }
    return NextResponse.json({ status: 200 })
}