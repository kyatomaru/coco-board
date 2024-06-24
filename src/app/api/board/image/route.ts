import { db } from '@/app/firebase-admin';
import { storage } from '@/app/firebase';
import { FieldValue } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from 'next/server';
import { ref, uploadBytes, getBytes, getDownloadURL, deleteObject } from "firebase/storage";

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

export async function GET(
    req: NextRequest,
    res: NextResponse
) {
    const id = req.nextUrl.searchParams.get("id")

    const image = await getDownloadURL(ref(storage, id + ".png"))
        .then((url) => {
            return url
        })
        .catch((error) => {
            // Handle any errors
        })

    return NextResponse.json(image, { status: 200 })
}

export async function PATCH(
    req: NextRequest,
    res: NextResponse
) {
    const reqData = await req.json();

    const updateData = reqData.updateData
    const contentsId = reqData.contentsId

    console.log(updateData)

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
    const insertData = await req.json()
    const image = insertData.image
    const id = insertData.id

    const storageRef = ref(storage, id + ".png");

    const buffer = new Uint8Array(image.length);
    for (let i = 0; i < image.length; i++) {
        buffer[i] = image.charCodeAt(i);
    }

    uploadBytes(storageRef, buffer).then((snapshot) => {
        console.log('Uploaded a blob or file!');
    });

    return NextResponse.json({ status: 200 })
}

export async function DELETE(
    req: NextRequest,
    res: NextResponse
) {
    const id = req.nextUrl.searchParams.get("contentsId")

    const storageRef = ref(storage, id + ".png");

    // Delete the file
    deleteObject(storageRef).then(() => {
        console.log('File deleted successfully')
    }).catch((error) => {
        console.log('an error occurred!')
    });

    return NextResponse.json({ status: 200 })
}