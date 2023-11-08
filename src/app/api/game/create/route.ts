import type { NextApiResponse } from 'next';
import { db } from '@/app/firebase-admin';

export async function POST(
    req: Request,
    res: NextApiResponse
) {
    const COLLECTION_NAME = 'game';

    if (req.method === 'POST') {
        const docRef = db.collection(COLLECTION_NAME).doc();
        const insertData = {
            datano: '1',
            name: 'Symfo',
            email: 'symfo@example.com',
        };
        await docRef.set(insertData);
    }

    return Response.json({ status: 200 })
}