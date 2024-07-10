import * as React from 'react';

export const useGetAllAchieve = (user, taskId) => {
    const [achieve, setAchieve] = React.useState<any>(undefined);

    React.useEffect(() => {
        if (user) {
            const init = async () => {
                const getParams = { uid: user.uid, taskId: taskId };
                const query = new URLSearchParams(getParams);

                setAchieve(await fetchAchieve(query))
            }
            init()
        }
    }, [user])

    const getAchieve = async () => {
        const getParams = { uid: user.uid, taskId: taskId };
        const query = new URLSearchParams(getParams);
        setAchieve(await fetchAchieve(query))
    }

    return [achieve, getAchieve]
}

const fetchAchieve = async (query) => {
    const achieveData = await fetch(`/api/task/achieve/?${query}`)
        .then((response) => response.json())
        .then((data) => {
            return data
        })

    return achieveData
}

function descTimeSort(a, b) {
    return a < b ? 1 : -1;
}
