export const useUpdateGame = async (contents, selectedFiles: File[]) => {
    // FormDataを使用して、JSONとファイルを一緒に送信
    const formData = new FormData();
    formData.append('contents', JSON.stringify(contents));

    // 画像ファイルを追加
    selectedFiles.forEach((file, index) => {
        formData.append(`image${index}`, file);
    });

    const newData = await fetch(`/api/game/`, {
        method: 'PATCH',
        body: formData,  // Content-Typeヘッダーは自動的に設定される
    }).then((data) => { return data.json() })

    return newData
}