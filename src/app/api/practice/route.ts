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

const COLLECTION_NAME = 'practice';

export async function GET(
    req: NextRequest,
    res: NextResponse
) {

    const uid = req.nextUrl.searchParams.get("uid")
    const date = req.nextUrl.searchParams.get("date")
    const docRef = await db.collection(COLLECTION_NAME).where("uid", "==", uid).where("date", "==", date).get()
        .then(snapshot => {
            const data = Array()
            snapshot.forEach((doc) => {
                data.push(doc.data())
            })
            return data

        }).catch((error) => {
            console.log("Error getting documents: ", error);
        });

    // const docRef = { data: "test" }

    console.log(docRef)

    return NextResponse.json(docRef, { status: 200 })
}

export async function PATCH(
    req: NextRequest,
    res: NextResponse
) {
    const reqData = await req.json();

    const updateData = reqData.updateData
    const doc = reqData.doc

    console.log(updateData)

    if (updateData && doc) {
        const docRef = db.collection(COLLECTION_NAME).doc(doc).update(updateData)
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
    const doc = req.nextUrl.searchParams.get("doc")
    if (doc) {
        await db.collection(COLLECTION_NAME).doc(doc).delete();
    }
    return NextResponse.json({ status: 200 })
}