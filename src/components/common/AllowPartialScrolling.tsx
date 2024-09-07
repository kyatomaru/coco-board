import React, { useEffect, useRef, useCallback } from "react";
import Box from '@mui/material/Box';

const AllowPartialScrolling = React.memo(function useAllowPartialScrolling(props: any) {
    // スクロール可能DOM格納
    const scrollArea = useRef(null);

    useEffect(() => {
        scrollArea.current = document.getElementById("scroll_item");
        scrollArea.current.scrollTop = 1;

        // モバイルスクロール禁止処理
        window.addEventListener("resize", setFillHeight);
        window.addEventListener("touchmove", scrollNo, { passive: false });
        scrollArea.current.addEventListener("focusout", onFocusOut);
        scrollArea.current.addEventListener("scroll", scrollControl);
        scrollArea.current.addEventListener("touchstart", touchHandler, {
            passive: false,
        });

        return () => {
            // イベントの設定解除
            window.removeEventListener("resize", setFillHeight);
            window.removeEventListener("touchmove", scrollNo);
            scrollArea.current.removeEventListener("focusout", onFocusOut);
            scrollArea.current.removeEventListener("scroll", scrollControl);
            scrollArea.current.removeEventListener("touchstart", touchHandler);
        };
    }, []);

    /**
     * 高さを調整する処理
     */
    const setFillHeight = useCallback(() => {
        window.scroll(0, 0);
    }, []);

    /**
     * モバイルスクロール禁止処理
     */
    const scrollNo = useCallback((e) => {
        if (
            e.target.closest("#scroll_item") === scrollArea.current &&
            scrollArea.current.scrollTop !== 0 &&
            scrollArea.current.scrollTop + scrollArea.current.clientHeight !==
            scrollArea.current.scrollHeight
        ) {
            e.stopPropagation();
        } else {
            e.preventDefault();
        }
    }, []);
    /**
     * ピンチズームをしない処理(2本指で操作させないようにする)
     */
    const touchHandler = useCallback((event) => {
        if (event.touches.length > 1) {
            event.preventDefault();
        }
    }, []);

    /**
     * フォーカスアウトした時の処理
     */
    const onFocusOut = useCallback(() => {
        window.scroll(0, 0);
    }, []);
    /**
     * スクロールリロードさせない処理
     */
    const scrollControl = useCallback(() => {
        if (scrollArea.current.scrollTop === 0) {
            scrollArea.current.scrollTop = 1;
        } else if (
            scrollArea.current.scrollTop + scrollArea.current.clientHeight ===
            scrollArea.current.scrollHeight
        ) {
            scrollArea.current.scrollTop = scrollArea.current.scrollTop - 1;
        }
    }, []);


    return (
        <Box sx={{ overflowY: "scroll", height: "100%", "-webkit-overflow-scrolling": "touch", }} id="scroll_item">
            <Box sx={{ overflowY: "scroll", minHeight: "100%", "-webkit-overflow-scrolling": "touch" }}>{props.children}</Box>
        </Box>
    );
});

export default AllowPartialScrolling;
