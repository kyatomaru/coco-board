export const useUpdatePractice = async (contents, selectedFiles) => {
    // FormDataを使用して、JSONとファイルを一緒に送信
    const formData = new FormData();
    formData.append('contents', JSON.stringify(contents));

    // 画像ファイルを追加
    selectedFiles.forEach((file, index) => {
        formData.append(`image${index}`, file);
    });

    const newData = await fetch(`/api/practice/`, {
        method: 'PATCH',
        body: formData,  // Content-Typeヘッダーは自動的に設定される
    }).then((data) => { return data.json() })

    return newData
}