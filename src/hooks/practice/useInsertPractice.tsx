export const useInsertPractice = async (contents) => {
    const newData = await fetch(`/api/practice/`, {
        method: 'POST',
        body: JSON.stringify(contents),
        headers: {
            "Content-Type": "application/json",
        },
    }).then((data) => {
        return data.json()
    })

    newData.collection = "practice"

    return newData
}