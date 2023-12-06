import * as React from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useParams } from 'next/navigation'
import type { User } from 'firebase/auth';

export const useDeletePractice = () => {
    const [user, setUser] = React.useState<User | null>(null);
    const [token, setToken] = React.useState<string | null>(null);
    const [contents, setContents] = React.useState<string | null>(null);

    const DeleteContents = async (uid: string | undefined) => {
        const params = useParams()
        const contents_id = String(params.contents_id)
        if (contents_id && uid) {
            const getParams = { uid: uid, contents_id: contents_id };
            const query = new URLSearchParams(getParams);

            fetch(`/api/practice/?${query}`, {
                method: 'DELETE'
            })
                .then((response) => response.json())
                .then((data) => {
                    setContents(data.data)
                })
        }
    }

    React.useEffect(() => {
        const auth = getAuth();
        return onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(auth.currentUser);
                user.getIdToken().then((token) => {
                    setToken(token);
                });
                DeleteContents(auth.currentUser?.uid)
            } else {
                setUser(null);
                setToken(null);
            }
        });
    }, [])

    return contents
}