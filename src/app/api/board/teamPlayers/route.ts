import { db } from '@/app/firebase-admin';
import { storage } from '@/app/firebase';
import { FieldValue } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from 'next/server';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";


type Data = {
    data: Object
}

const COLLECTION_NAME = 'teamPlayers';

export async function GET(
    req: NextRequest,
    res: NextResponse
) {
    const uid = req.nextUrl.searchParams.get("uid")

    if (uid) {
        const docRef = await db.collection(COLLECTION_NAME).where("uid", "==", uid).orderBy('teamId', 'desc').get()
            .then(snapshot => {
                const data = Array()
                snapshot.forEach(doc => {
                    const ob = doc.data()
                    ob.contentsId = doc.id
                    data.push(ob)
                })
                return data

            }).catch((error) => {
                console.log("Error getting documents: ", error);
                return NextResponse.json(null, { status: 500 })
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
    const contentsId = updateData.contentsId

    if (updateData && contentsId) {
        updateData.updateDate = new Date()
        const docRef = await db.collection(COLLECTION_NAME).doc(contentsId).update(updateData)
            .then((res) => {
                console.log("Document successfully updated!");
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    }

    return NextResponse.json(updateData, { status: 200 })
}

export async function POST(
    req: NextRequest,
    res: NextResponse
) {
    const insertData = await req.json()

    insertData.createDate = new Date()
    insertData.updateDate = new Date()

    console.log(insertData)

    const docId = await db.collection(COLLECTION_NAME).add(insertData)
        .then((res) => {
            console.log("Document successfully created!");
            return res.id
        })
        .catch((error) => {
            console.log("Error creating documents: ", error);
        });

    insertData.contentsId = docId

    return NextResponse.json(insertData, { status: 200 })
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