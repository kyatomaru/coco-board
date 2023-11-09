"use client"

import * as React from 'react';
import GoogleSignInButton from './GoogleSignInButton';
import GoogleSignOutButton from './GoogleSignOutButton';
import { useRouter } from 'next/navigation'
import { onAuthStateChanged, getAuth } from "firebase/auth"

export default function LoginBox() {
    const router = useRouter()

    const auth = getAuth();
    const user = auth.currentUser

    onAuthStateChanged(auth, (user) => {
        if (user) {
            router.push('/notes/2023-06-27')
        }
    })

    return (
        <div>
            {user !== null
                ? (<GoogleSignOutButton />)
                : (<GoogleSignInButton />)
            }
        </div>
    );
}