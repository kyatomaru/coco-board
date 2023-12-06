import * as React from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useParams, useRouter } from 'next/navigation'

export const useDeleteGame = (docId) => {
    if (docId) {
        const getParams = { docId: docId };
        const query = new URLSearchParams(getParams);

        fetch(`/api/game/?${query}`, {
            method: 'DELETE'
        })
    }
}