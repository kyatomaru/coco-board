import { getAuth, isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { initializeApp, getApps, getApp } from "firebase/app";
import { auth } from '@/app/firebase';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
    req: NextRequest,
    res: NextResponse
) {
    try {
        const code = await req.text()

        const redirectUri = `http://${process.env.NEXT_PUBLIC_DOMAIN}/accounts/login/callback/line` 

        const params = new URLSearchParams({
            grant_type: 'authorization_code',
            code: code as string,
            redirect_uri: redirectUri,
            client_id: process.env.NEXT_PUBLIC_CLIENT_ID as string,
            client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET as string
        })
    
        const tokenResponse = await fetch(
            'https://api.line.me/oauth2/v2.1/token',
            {
                method: 'POST',
                body: params,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        )
        const tokenData = await tokenResponse.json()

        // IDトークンの検証
        const verifyParams = new URLSearchParams({
            id_token: tokenData.id_token,
            client_id: process.env.NEXT_PUBLIC_CLIENT_ID as string
        })

        const verifyResponse = await fetch(
            'https://api.line.me/oauth2/v2.1/verify',
            {
                method: 'POST',
                body: verifyParams.toString(),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        )

        const verifyData = await verifyResponse.json()

        if (verifyData.aud !== process.env.NEXT_PUBLIC_CLIENT_ID) {
            return NextResponse.json({
                success: 500,
                error: 'Invalid client ID'
            })
        } else if (verifyData.exp < 0) {
            return NextResponse.json({
                success: 500,
                error: 'Invalid token'
            })
        }

        const userdataResponse = await fetch(
            'https://api.line.me/v2/profile',
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${tokenData.access_token}`
                }
            }
        )

        const userData = await userdataResponse.json()

        // コンソールで確認
        console.log(userData)

        return NextResponse.json(userData, { status: 200 })

    } catch (error) {
        console.error('LINE認証エラー:', error)
        // エラーレスポンスの返却
        return new Response(JSON.stringify({ error: 'Authentication failed' }), {
            status: 500
        })
    }
}