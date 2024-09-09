import React, { useEffect, useCallback } from "react";

export const useSwipeLock = () => {
    /**
     * イベントリスナーの設定
     */
    useEffect(() => {
        // モバイルスクロール禁止処理
        document.addEventListener("touchstart", (e) => { if (e.touches[0].clientX < 30 || e.touches[0].clientX > window.innerWidth - 30) e.preventDefault() }, false);
        document.addEventListener("touchmove", (e) => { if (e.touches[0].clientX < 30 || e.touches[0].clientX > window.innerWidth - 30) e.preventDefault() }, false);

    }, []);

    /**
     * モバイルスクロール禁止処理
     */
    const scrollNo = (e) => {
        e.preventDefault();

    };
};