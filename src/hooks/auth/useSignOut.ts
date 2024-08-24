import * as React from 'react';
import { useRouter } from 'next/navigation'
import { signOut } from "firebase/auth";
import { auth } from "@/app/firebase"

export const useSignOut = async (router) => {
    signOut(auth).then(() => {
        router.push('/accounts/login')
    }).catch((error) => {
        console.log(error)
        // An error happened.
    });
}