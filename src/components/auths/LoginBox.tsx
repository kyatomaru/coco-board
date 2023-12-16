"use client"

import * as React from 'react';
import GoogleSignInButton from './GoogleSignInButton';
import GoogleSignOutButton from './GoogleSignOutButton';
import { useRouter } from 'next/navigation'
import { onAuthStateChanged, getAuth } from "firebase/auth"
import type { User } from "firebase/auth"

// type UserContextType = User | null | undefined;

export default function LoginBox() {
    const router = useRouter()
    const [user, setUser] = React.useState<User | undefined>()

    React.useEffect(() => {
        const auth = getAuth();

        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(auth.currentUser)
                //router.push('/notes/2023-06-27')
            }
        })
    });

    return (
        <div>
            {user !== undefined
                ? (<GoogleSignOutButton />)
                : (<GoogleSignInButton />)
            }
        </div>
    );
}