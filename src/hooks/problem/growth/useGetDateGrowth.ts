import * as React from 'react';

export const useGetDateGrowth = (user, date) => {
    const [contents, setContents] = React.useState<any>(undefined);

    React.useEffect(() => {
        if (user) {
            const init = async () => {
                const getParams = { uid: user.uid, date: date };
                const query = new URLSearchParams(getParams);

                setContents(await fetchGrowthContents(query))
            }
            init()
        }
    }, [user])

    const getContents = async () => {
        const getParams = { uid: user.uid, date: date };
        const query = new URLSearchParams(getParams);
        setContents(await fetchGrowthContents(query))
    }

    return [contents, getContents]
}

const fetchGrowthContents = async (query) => {
    const growthData = await fetch(`/api/growth/?${query}`)
        .then((response) => response.json())
        .then((data) => {
            return data
        })

    growthData.sort((a, b) => descTimeSort(a.date, b.date));

    return growthData
}

function descTimeSort(a, b) {
    return a < b ? 1 : -1;
}
