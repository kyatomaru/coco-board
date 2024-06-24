export const useInsertPractice = async (contents) => {
    return await fetch(`/api/practice/`, {
        method: 'POST',
        body: JSON.stringify(contents),
        headers: {
            "Content-Type": "application/json",
        },
    })
}