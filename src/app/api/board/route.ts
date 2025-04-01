import { db } from '@/app/firebase-admin';
import { storage } from '@/app/firebase';
import { FieldValue } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from 'next/server';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Timestamp } from 'firebase-admin/firestore';

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

const COLLECTION_NAME = 'board';

function escapeNewlines(data: any) {
    if (typeof data === 'string') {
        return data.replace(/\n/g, '\\n');
    }
    return data;
}

function unescapeNewlines(data: any) {
    if (typeof data === 'string') {
        return data.replace(/\\n/g, '\n');
    }
    return data;
}

export async function GET(
    req: NextRequest,
    res: NextResponse
) {
    const uid = req.nextUrl.searchParams.get("uid")
    const date = req.nextUrl.searchParams.get("date")
    const contentsId = req.nextUrl.searchParams.get("contentsId")

    if (date && uid) {
        const docRef = await db.collection(COLLECTION_NAME).where("uid", "==", uid).where("date", "==", date).orderBy('updateDate', 'desc').get()
            .then(snapshot => {
                const data = Array()
                snapshot.forEach(doc => {
                    const ob = doc.data()
                    ob.contentsId = doc.id
                    ob.collection = "board"
                    // 改行を復元
                    ob.comment = unescapeNewlines(ob.comment);
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
    else if (contentsId) {
        const docRef = await db.collection(COLLECTION_NAME).doc(contentsId).get()
            .then(snapshot => {
                const data = snapshot.data()
                data.contentsId = contentsId

                // 改行を復元
                data.comment = unescapeNewlines(data.comment);

                return data
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
                return NextResponse.json(null, { status: 500 })
            });
        console.log(docRef)

        return NextResponse.json(docRef, { status: 200 })
    }
    else {
        const docRef = await db.collection(COLLECTION_NAME).where("uid", "==", uid).orderBy('date', 'desc').orderBy('updateDate', 'desc').get()
            .then(snapshot => {
                const data = Array()
                snapshot.forEach((doc) => {
                    const ob = doc.data()
                    ob.contentsId = doc.id
                    ob.collection = "board"
                    data.push(ob)
                })
                return data
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
                return NextResponse.json(null, { status: 500 })
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
        // 保存時にエスケープ
        updateData.comment = escapeNewlines(updateData.comment);
        updateData.updateDate = Timestamp.fromDate(new Date());

        const docRef = await db.collection(COLLECTION_NAME).doc(contentsId).update(updateData)
            .then((res) => {
                console.log("Document successfully updated!");
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });

        // レスポンスを返す前に改行を復元
        updateData.comment = unescapeNewlines(updateData.comment);
    }

    return NextResponse.json(updateData, { status: 200 })
}

export async function POST(
    req: NextRequest,
    res: NextResponse
) {
    const insertData = await req.json()

    // 保存時にエスケープ
    insertData.comment = escapeNewlines(insertData.comment);

    insertData.createDate = Timestamp.fromDate(new Date());
    insertData.updateDate = Timestamp.fromDate(new Date());

    const docId = await db.collection(COLLECTION_NAME).add(insertData)
        .then((res) => {
            console.log("Document successfully created!");
            return res.id
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });

    insertData.contentsId = docId

    // レスポンスを返す前に改行を復元
    insertData.comment = unescapeNewlines(insertData.comment);

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