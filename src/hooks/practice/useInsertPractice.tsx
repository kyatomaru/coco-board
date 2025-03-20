export const useInsertPractice = async (contents, selectedFiles) => {
    // FormDataを使用して、JSONとファイルを一緒に送信
    const formData = new FormData();
    formData.append('contents', JSON.stringify(contents));

    // 画像ファイルを追加
    selectedFiles.forEach((file, index) => {
        formData.append(`image${index}`, file);
    });

    const newData = await fetch(`/api/practice/`, {
        method: 'POST',
        body: formData,  // Content-Typeヘッダーは自動的に設定される
    }).then((data) => { return data.json() })

    newData.collection = "practice"

    return newData
}