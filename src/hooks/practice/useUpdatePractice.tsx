export const useUpdatePractice = async (contents) => {
    return await fetch(`/api/practice/`, {
        method: 'PATCH',
        body: JSON.stringify(contents),
        headers: {
            "Content-Type": "application/json",
        },
    }).then((data) => {
        return data.json()
    })
}