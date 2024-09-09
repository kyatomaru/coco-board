import React, { useEffect, useCallback } from "react";

export const useSwipeLock = () => {
    let sw = false

    /**
     * イベントリスナーの設定
     */
    useEffect(() => {
        // モバイルスクロール禁止処理
        document.addEventListener("touchstart", (e) => { if (e.touches[0].clientX < 30 || e.touches[0].clientX > window.innerWidth + 30) sw = true; }, false);
        document.addEventListener("touchmove", scrollNo, false);
        document.addEventListener("touchend", () => { sw && (sw = false) }, false);

    }, []);

    /**
     * モバイルスクロール禁止処理
     */
    const scrollNo = (e) => {
        if (sw) {
            e.preventDefault();
        }
    };
};