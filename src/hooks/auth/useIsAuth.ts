import * as React from 'react';
import { useRouter } from 'next/navigation'
import { signOut } from "firebase/auth";
import { auth } from "@/app/firebase"
import { onAuthStateChanged, getAuth } from "firebase/auth"

export const useIsAuth = async (router) => {
    React.useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user == undefined) {
                router.replace('/accounts/login')
            }
            else if (!user.emailVerified) {
                router.push('/accounts/signup/emailsend')
            }
        })
    });
}