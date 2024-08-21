export const CourtRatio = [
    {
        image: "/images/board/court1.jpg",
        width: 400,
        height: 620
    },
    {
        image: "/images/board/court2.jpg",
        width: 400,
        height: 500
    },
    {
        image: "/images/board/court3.jpg",
        width: 400,
        height: 500
    },
]

export const setRatio = (innerWidth, innerHeight) => {
    const frame_menu_width = 85
    const window_width = innerWidth - frame_menu_width;
    const window_height = innerHeight - frame_menu_width;

    const court_verticalWidth_ratio = CourtRatio[0].width
    const court_verticalHeight_ratio = CourtRatio[0].height

    const verticalHeight = (window_height - 5)
    const verticalWidth = ((court_verticalWidth_ratio * (window_height - 5)) / court_verticalHeight_ratio);

    const court_besideWidth_ratio = CourtRatio[1].width
    const court_besideHeight_ratio = CourtRatio[1].height

    const besideHeight = (window_height - 5)
    const besideWidth = ((court_besideWidth_ratio * (window_height - 5)) / court_besideHeight_ratio);

    return [verticalWidth, verticalHeight, besideWidth, besideHeight]
}