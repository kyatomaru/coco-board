import { db } from '@/app/firebase-admin';
import { storage } from '@/app/firebase';
// import { db } from '@/app/firebase';
import { FieldValue } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from 'next/server';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';


const COLLECTION_NAME = 'game';

export async function GET(
    req: NextRequest,
    res: NextResponse
) {
    const uid = req.nextUrl.searchParams.get("uid")
    const date = req.nextUrl.searchParams.get("date")
    const contentsId = req.nextUrl.searchParams.get("contentsId")

    if (date && uid) {
        const docRef = await db.collection(COLLECTION_NAME).where("uid", "==", uid).where("date", "==", date).get()
            .then(snapshot => {
                const data = Array()
                snapshot.forEach((doc) => {
                    const ob = doc.data()
                    ob.contentsId = doc.id
                    ob.collection = COLLECTION_NAME
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
                return NextResponse.json(null, { status: 500 })
            });
        console.log(docRef)

        return NextResponse.json(docRef, { status: 200 })
    }
    else {
        const docRef = await db.collection(COLLECTION_NAME).where("uid", "==", uid).orderBy('date', 'desc').orderBy('createDate', 'desc').get()
            .then(snapshot => {
                const data = Array()
                snapshot.forEach((doc) => {
                    const ob = doc.data()
                    ob.contentsId = doc.id
                    ob.collection = COLLECTION_NAME
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
    try {
        const formData = await req.formData();
        const contentsJson = formData.get('contents') as string;
        const updateData = JSON.parse(contentsJson);

        for (const imageUrl of updateData.images) {
            // URLからファイルパスを抽出
            const fileRef = ref(storage, imageUrl);
            try {
                await deleteObject(fileRef);
            } catch (error) {
                console.error('Error deleting image:', error);
            }
        }

        // 画像のアップロード処理
        const imageUrls: string[] = [];
        for (let i = 0; formData.get(`image${i}`); i++) {
            const file = formData.get(`image${i}`) as File;
            const fileName = `${COLLECTION_NAME}/${updateData.uid}/${Date.now()}_${i}_${file.name}`;

            // Firebase Storageにアップロード
            const storageRef = ref(storage, fileName);
            const fileBuffer = await file.arrayBuffer();
            await uploadBytes(storageRef, new Uint8Array(fileBuffer));

            // 公開URLを取得
            const publicUrl = await getDownloadURL(storageRef);
            imageUrls.push(publicUrl);
        }

        // 画像URLをinsertDataに追加
        updateData.updateDate = new Date();
        updateData.images = imageUrls;

        if (updateData) {
            updateData.updateDate = new Date()
            const docRef = await db.collection(COLLECTION_NAME).doc(updateData.contentsId).update(updateData)
                .then(() => {
                    console.log("Document successfully updated!");
                })
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                });
        }
        return NextResponse.json(updateData, { status: 200 })
    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(
    req: NextRequest,
    res: NextResponse
) {
    try {
        const formData = await req.formData();
        const contentsJson = formData.get('contents') as string;
        const insertData = JSON.parse(contentsJson);

        // 画像のアップロード処理
        const imageUrls: string[] = [];
        for (let i = 0; formData.get(`image${i}`); i++) {
            const file = formData.get(`image${i}`) as File;
            const fileName = `${COLLECTION_NAME}/${insertData.uid}/${Date.now()}_${i}_${file.name}`;

            // Firebase Storageにアップロード
            const storageRef = ref(storage, fileName);
            const fileBuffer = await file.arrayBuffer();
            await uploadBytes(storageRef, new Uint8Array(fileBuffer));

            // 公開URLを取得
            const publicUrl = await getDownloadURL(storageRef);
            imageUrls.push(publicUrl);
        }

        // 画像URLをinsertDataに追加
        insertData.createDate = new Date();
        insertData.updateDate = new Date();
        insertData.images = imageUrls;

        // Firestoreにデータを保存
        const docId = await db.collection(COLLECTION_NAME).add(insertData)
            .then((res) => {
                console.log("Document successfully created!");
                return res.id;
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
                throw error;
            });

        insertData.contentsId = docId;
        return NextResponse.json(insertData, { status: 200 });

    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(
    req: NextRequest,
    res: NextResponse
) {
    const contentsId = req.nextUrl.searchParams.get("contentsId")
    if (contentsId) {
        try {
            // 1. ドキュメントから画像URLを取得
            const doc = await db.collection(COLLECTION_NAME).doc(contentsId).get();
            const data = doc.data();
            const images = data?.images || [];

            // 2. 画像を削除
            for (const imageUrl of images) {
                // URLからファイルパスを抽出
                const fileRef = ref(storage, imageUrl);
                try {
                    await deleteObject(fileRef);
                } catch (error) {
                    console.error('Error deleting image:', error);
                }
            }

            // 3. ドキュメントを削除
            await db.collection(COLLECTION_NAME).doc(contentsId).delete();
        } catch (error) {
            console.error('Error deleting document:', error);
            return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
        }
    }
    return NextResponse.json({ status: 200 });
}