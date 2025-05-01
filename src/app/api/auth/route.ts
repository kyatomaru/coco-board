import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/app/firebase-admin';
import { UserModel } from '@/types/auth/User';

const COLLECTION_NAME = "user"

export async function GET(
    req: NextRequest,
    res: NextResponse
) {
    const userId = req.nextUrl.searchParams.get('userId')

    try {
        const docRef = await db.collection(COLLECTION_NAME).where("uid", "==", userId).get()

        if (docRef.docs.length === 0) {
            return NextResponse.json({ status: 404 })
        }

        return NextResponse.json(docRef.docs[0].data(), { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ status: 500 })
    }
}

export async function POST(
    req: NextRequest,
    res: NextResponse
) {
    const insertData = await req.json();

    // docRefを生成
    const docRef = db.collection(COLLECTION_NAME).doc()

    const newUser = new UserModel(insertData.uid, insertData.email)

    console.log(newUser)

    if (insertData) {
        docRef.set(newUser)
            .then(() => {
                console.log("Document successfully created!");
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    }

    return NextResponse.json({ status: 200 })
}
