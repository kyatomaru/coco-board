import * as React from 'react';
import { useRouter } from 'next/navigation'
import { signOut } from "firebase/auth";
import { auth } from "@/app/firebase"

export const useSignOut = async (router) => {
    await signOut(auth).then((res) => {
        document.location.reload();
    }).catch((error) => {
        console.log(error)
    })
}