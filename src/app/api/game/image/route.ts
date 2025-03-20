import { storage } from '@/app/firebase';
import { NextRequest, NextResponse } from 'next/server';
import { ref, getDownloadURL } from "firebase/storage";

export async function GET(
    req: NextRequest,
    res: NextResponse
) {
    const url = req.nextUrl.searchParams.get("url");

    if (!url) {
        return NextResponse.json({ error: "URL parameter is missing" }, { status: 400 });
    }

    try {
        const imageUrl = await getDownloadURL(ref(storage, url));
        const imageResponse = await fetch(imageUrl);

        if (!imageResponse.ok) {
            throw new Error('Failed to fetch image');
        }

        const imageBlob = await imageResponse.blob();
        const arrayBuffer = await imageBlob.arrayBuffer();
        const mimeType = imageBlob.type;

        return new NextResponse(arrayBuffer, {
            status: 200,
            headers: {
                'Content-Type': mimeType,
                'Content-Length': imageBlob.size.toString(),
            },
        });
    } catch (error) {
        console.error('Error fetching image:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}