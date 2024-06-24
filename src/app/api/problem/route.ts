import { db } from '@/app/firebase-admin';
// import { db } from '@/app/firebase';
import { FieldValue } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from 'next/server';


type Data = {
    data: Object
}

const COLLECTION_NAME = 'problem';

export async function GET(
    req: NextRequest,
    res: NextResponse
) {
    const uid = req.nextUrl.searchParams.get("uid")
    const contentsId = req.nextUrl.searchParams.get("contentsId")

    if (uid && !contentsId) {
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

    if (contentsId) {
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
}

export async function PATCH(
    req: NextRequest,
    res: NextResponse
) {
    const updateData = await req.json();
    const contentsId = updateData.contentsId

    if (updateData && contentsId) {
        const docRef = db.collection(COLLECTION_NAME).doc(contentsId).update(updateData)
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