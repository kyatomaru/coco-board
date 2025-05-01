import * as React from 'react';

export const useGetNote = (user, date) => {
    const [contents, setContents] = React.useState<any>(undefined);
    const [isNoteLoading, setIsNoteLoading] = React.useState(false);

    React.useEffect(() => {
        if (user) {
            const init = async () => {
                setIsNoteLoading(true)
                setContents(undefined)
                const getParams = { uid: user.uid, date: date };
                const query = new URLSearchParams(getParams);

                const data = await fetchNoteContents(query)
                setContents(data)
                setIsNoteLoading(false)
            }
            init()
        } else {
            setContents([])
        }
    }, [user, date])

    const getContents = async () => {
        const getParams = { uid: user.uid, date: date };
        const query = new URLSearchParams(getParams);
        setContents(await fetchNoteContents(query))
    }

    return [contents, setContents, getContents, isNoteLoading]
}

const fetchNoteContents = async (query) => {
    const gameData = await fetch(`/api/game/?${query}`)
        .then((response) => response.json())
        .then((data) => {
            return data
        })

    const practiceData = await fetch(`/api/practice/?${query}`)
        .then((response) => response.json())
        .then((data) => {
            return data
        })

    const allData = gameData.concat(practiceData)

    allData.sort((a, b) => descTimeSort(a.updateDate, b.updateDate));

    return allData
}

function descTimeSort(a, b) {
    return a < b ? 1 : -1;
}
