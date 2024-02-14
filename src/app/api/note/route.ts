import { db } from '@/app/firebase-admin';
// import { db } from '@/app/firebase';
import { FieldValue } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from 'next/server';
import dayjs from 'dayjs';


export async function GET(
    req: NextRequest,
    res: NextResponse
) {
    const uid = req.nextUrl.searchParams.get("uid")
    const date = req.nextUrl.searchParams.get("date")
    const contentsId = req.nextUrl.searchParams.get("contentsId")

    if (uid) {
        const gameDocRef = await db.collection('game').where("uid", "==", uid).orderBy('date', 'desc').orderBy('createDate', 'desc').get()
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
                console.log("Error getting game documents: ", error);
            });

        const practiceDocRef = await db.collection('practice').where("uid", "==", uid).orderBy('date', 'desc').orderBy('createDate', 'desc').get()
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
                console.log("Error getting practice documents: ", error);
            });

        const docRef = sortContents(gameDocRef, practiceDocRef)
        // const docRef = []

        return NextResponse.json(docRef, { status: 200 })
    }
}



const sortDateContents = (dateArray, contents, type) => {
    console.log(contents)
    for (let index = 0; index < contents.length; index++) {
        let flag = false
        contents[index].type = type
        for (let index2 = 0; index2 < dateArray.length; index2++) {
            if (dateArray[index2].date === dayjs(String(contents[index].date)).format('YYYY/M/DD')) {
                flag = true
                dateArray[index2].contents.push(contents[index])
                break
            }
        }
        if (!flag) {
            dateArray.push({ date: dayjs(String(contents[index].date)).format('YYYY/M/DD'), contents: [contents[index]] })
        }
    }
    return dateArray
}

const sortContents = (gameContents, practiceContents) => {
    let dateArray = [{ date: null, contents: [] }]
    const contents = []
    if (gameContents[0] != null)
        dateArray = sortDateContents(dateArray, gameContents, "game")
    if (practiceContents[0] != null)
        dateArray = sortDateContents(dateArray, practiceContents, "practice")

    dateArray.splice(0, 1)

    dateArray.sort((a, b) => {
        if (a.date < b.date) return 1;
        else if (a.date > b.date) return -1;
        return 0;
    })

    return dateArray
}