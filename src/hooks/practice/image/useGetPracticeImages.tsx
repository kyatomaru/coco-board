import * as React from 'react';

export const useGetPracticeImages = (urls, setIsImagesLoading) => {
    const [contents, setContents] = React.useState<File[]>([]);

    React.useEffect(() => {
        const init = async () => {
            setIsImagesLoading(true)
            setContents(await fetchPracticeImages(urls))
            setIsImagesLoading(false)
        }
        init()
    }, [urls])

    return [contents, setContents]
}

const fetchPracticeImages = async (urls) => {
    const files = []

    for (let index = 0; index < urls.length; index++) {
        const getParams = { url: urls[index] };
        const query = new URLSearchParams(getParams);

        const blob = await fetch(`/api/practice/image/?${query}`)
            .then((response) => response.blob())
            .then((data) => {
                return data
            })

        const file = new File([blob], `image_${Date.now()}.jpg`, { type: blob.type })

        files.push(file)
    }

    return files
}