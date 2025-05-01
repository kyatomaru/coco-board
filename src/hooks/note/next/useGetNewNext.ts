import * as React from 'react';

export const useGetNewNext = (user) => {
    const [contents, setContents] = React.useState<any>(undefined);

    React.useEffect(() => {
        if (user) {
            const init = async () => {
                const getParams = { uid: user.uid };
                const query = new URLSearchParams(getParams);

                setContents(await fetchNextContents(query))
            }
            init()
        }
    }, [user])

    const getContents = async () => {
        const getParams = { uid: user.uid };
        const query = new URLSearchParams(getParams);
        setContents(await fetchNextContents(query))
    }

    return [contents, getContents]
}

const fetchNextContents = async (query) => {
    const data = await fetch(`/api/note/?${query}`)
        .then((response) => response.json())
        .then((data) => {
            return data
        })

    const nextData = data.map((item) => {
        return item.next
    })

    return nextData
}