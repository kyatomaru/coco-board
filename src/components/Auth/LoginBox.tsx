"use client"

import * as React from 'react';
import GoogleSignInButton from './GoogleSignInButton';
import GoogleSignOutButton from './GoogleSignOutButton';
import { auth } from "@/app/firebase"

export default function LoginBox() {
    const user = auth.currentUser;
    console.log(user)

    return (
        <div>
            {user ? (<GoogleSignOutButton />) : (<GoogleSignInButton />)}
        </div>
    );
}