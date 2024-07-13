import * as React from 'react';

export const useGetAllTask = (user) => {
    const [contents, setContents] = React.useState<any>(undefined);

    React.useEffect(() => {
        if (user) {
            const init = async () => {
                const getParams = { uid: user.uid };
                const query = new URLSearchParams(getParams);

                setContents(await fetchTask(query))
            }
            init()
        }
    }, [user])

    const getContents = async () => {
        const getParams = { uid: user.uid };
        const query = new URLSearchParams(getParams);
        setContents(await fetchTask(query))
    }

    return [contents, getContents]
}

const fetchTask = async (query) => {
    const taskData = await fetch(`/api/task/?${query}`)
        .then((response) => response.json())
        .then((data) => {
            return data
        })

    return taskData
}

function descTimeSort(a, b) {
    return a < b ? 1 : -1;
}
