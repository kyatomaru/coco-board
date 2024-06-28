import { getAuth, isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { initializeApp, getApps, getApp } from "firebase/app";
import { auth } from '@/app/firebase';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    req: NextRequest,
    res: NextResponse
) {
    // Get the action to complete.
    const mode = req.nextUrl.searchParams.get('mode');
    // Get the one-time code from the query parameter.
    const actionCode = req.nextUrl.searchParams.get('oobCode');
    // (Optional) Get the continue URL from the query parameter if available.
    const continueUrl = req.nextUrl.searchParams.get('continueUrl');
    // (Optional) Get the language code if available.
    const lang = req.nextUrl.searchParams.get('lang') || 'en';

    // Configure the Firebase SDK.
    // This is the minimum configuration required for the API to be used.
    // const config = {
    //     'apiKey': "YOU_API_KEY" // Copy this key from the web initialization
    //     // snippet found in the Firebase console.
    // };
    // const app = initializeApp(config);
    // const auth = getAuth(app);

    // Handle the user management action.
    switch (mode) {
        case 'resetPassword':
            // Display reset password handler and UI.
            console.log("test")
            if (verifyPasswordResetCode(auth, actionCode).then((email) => {
                return true
            }).catch(() => {
                return false
            }))
                return NextResponse.redirect(new URL(`/accounts/password/reset/${actionCode}`, req.url))
        // handleResetPassword(auth, actionCode, continueUrl, lang);

        case 'recoverEmail':
        // Display email recovery handler and UI.
        // handleRecoverEmail(auth, actionCode, lang);
        // break;
        case 'verifyEmail':
            // Display email verification handler and UI.
            // return NextResponse.redirect(`/accounts/verifyemail/${actionCode}`)
            if (handleVerifyEmail(auth, actionCode, continueUrl, lang))
                return NextResponse.redirect(new URL(`/accounts/verifyemail/${actionCode}`, req.url))
            else
                return NextResponse.redirect(new URL(`/accounts/verifyemail/error`, req.url))
        default:
            return NextResponse.redirect(new URL(`/accounts/login`, req.url))
        // Error: invalid mode.
    }
    return NextResponse.redirect(new URL(`/home`, req.url))
}

import { verifyPasswordResetCode, confirmPasswordReset, applyActionCode } from "firebase/auth";

function handleResetPassword(auth, actionCode, continueUrl, lang) {
    // Localize the UI to the selected language as determined by the lang
    // parameter.

    // Verify the password reset code is valid.
    verifyPasswordResetCode(auth, actionCode).then((email) => {
        const accountEmail = email;

        // TODO: Show the reset screen with the user's email and ask the user for
        // the new password.
        const newPassword = "...";

        // Save the new password.
        confirmPasswordReset(auth, actionCode, newPassword).then((resp) => {
            // Password reset has been confirmed and new password updated.

            // TODO: Display a link back to the app, or sign-in the user directly
            // if the page belongs to the same domain as the app:
            // auth.signInWithEmailAndPassword(accountEmail, newPassword);

            // TODO: If a continue URL is available, display a button which on
            // click redirects the user back to the app via continueUrl with
            // additional state determined from that URL's parameters.
        }).catch((error) => {
            // Error occurred during confirmation. The code might have expired or the
            // password is too weak.
        });
    }).catch((error) => {
        // Invalid or expired action code. Ask user to try to reset the password
        // again.
    });
}


function handleVerifyEmail(auth, actionCode, continueUrl, lang) {
    // Localize the UI to the selected language as determined by the lang
    // parameter.
    // Try to apply the email verification code.
    applyActionCode(auth, actionCode).then((resp) => {
        // Email address has been verified.

        // TODO: Display a confirmation message to the user.
        // You could also provide the user with a link back to the app.

        // TODO: If a continue URL is available, display a button which on
        // click redirects the user back to the app via continueUrl with
        // additional state determined from that URL's parameters.
        return true
    }).catch((error) => {
        // Code is invalid or expired. Ask the user to verify their email address
        // again.

    });
    return false
}