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

    if (uid && !date) {
        const docRef = Array()
        await db.collection('game').where("uid", "==", uid).get()
            .then(snapshot => {
                snapshot.forEach((doc) => {
                    const ob = doc.data()
                    ob.collection = "game"
                    docRef.push(ob)
                })

            })
            .catch((error) => {
                console.log("Error getting game documents: ", error);
            });

        await db.collection('practice').where("uid", "==", uid).get()
            .then(snapshot => {
                snapshot.forEach((doc) => {
                    const ob = doc.data()
                    ob.collection = "practice"
                    docRef.push(ob)
                })
            })
            .catch((error) => {
                console.log("Error getting practice documents: ", error);
            });

        return NextResponse.json(docRef, { status: 200 })

    } else if (uid && date) {
        console.log(date)
        const docRef = Array()
        const gameDocRef = await db.collection("game").where("uid", "==", uid).where("date", "==", date).get()
            .then(snapshot => {
                // const data = Array()
                snapshot.forEach((doc) => {
                    const ob = doc.data()
                    ob.contentsId = doc.id
                    ob.collection = "game"
                    // data.push(ob)
                    docRef.push([ob])
                })
                // return data

            }).catch((error) => {
                console.log("Error getting documents: ", error);
            });

        const practiceDocRef = await db.collection("practice").where("uid", "==", uid).where("date", "==", date).get()
            .then(snapshot => {
                // const data = Array()
                snapshot.forEach((doc) => {
                    const ob = doc.data()
                    ob.contentsId = doc.id
                    // data.push(ob)
                    ob.collection = "practice"
                    docRef.push([ob])
                })
                // return data

            }).catch((error) => {
                console.log("Error getting documents: ", error);
            });

        // const docRef = sortContents(gameDocRef, practiceDocRef)
        console.log(docRef)

        return NextResponse.json(docRef, { status: 200 })
    }
}




const sortDateContents = (dateArray, contents, collection) => {

    for (let index = 0; index < contents.length; index++) {
        let flag = false
        contents[index].collection = collection
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