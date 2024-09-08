import React, { useEffect, useCallback } from "react";

export const useSwipeLock = () => {
    /**
     * イベントリスナーの設定
     */
    useEffect(() => {
        // モバイルスクロール禁止処理
        document.addEventListener("touchmove", scrollNo);

        return () => {
            // イベントの設定解除
            document.removeEventListener("touchmove", scrollNo);
        };
    }, []);

    /**
     * モバイルスクロール禁止処理
     */
    const scrollNo = useCallback((e) => {
        if (e.touches[0].clientX > 16 && e.touches[0].clientX < window.innerWidth + 16) return
        e.preventDefault();
    }, []);
};