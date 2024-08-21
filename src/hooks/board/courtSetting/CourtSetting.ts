export const setVerticaCoordinate = (beforeCourtId, verticalWidth, verticalHeight, besideWidth, besideHeight, x, y, diameter) => {
    let phaseAngle = 0
    let centerX = 0
    if (beforeCourtId == 1) {
        phaseAngle = (Math.PI / 2)
        centerX = besideWidth * 0.92283
    }
    else if (beforeCourtId == 2) {
        phaseAngle = (Math.PI / 2)
        centerX = besideWidth - (besideWidth * 0.92283 + 2 * diameter)
    }

    const centerY = besideHeight / 2
    const newCenterX = verticalWidth / 2
    const newCenterY = verticalHeight / 2

    const convertY = ((y - centerY) + (diameter)) * -1
    const convertX = (x - centerX) + (diameter * besideHeight / verticalWidth)

    const radian = Math.atan2(convertY, convertX)

    const distance = Math.sqrt((convertX ** 2) + (convertY ** 2))
    const ratio = verticalWidth / besideHeight

    const newRadian = radian + phaseAngle

    const newDistance = distance * ratio

    const newX = (newDistance * Math.cos(newRadian)) + newCenterX - diameter
    const newY = (newDistance * -1 * Math.sin(newRadian)) + newCenterY

    return [newX, newY]
}

export const setBesideCoordinate = (courtId, beforeCourtId, verticalWidth, verticalHeight, besideWidth, besideHeight, x, y, diameter) => {
    if (courtId == 1 && beforeCourtId == 2) {
        return [x + (besideWidth * 0.92283), y]
    }
    else if (courtId == 2 && beforeCourtId == 1) {
        return [x - (besideWidth * 0.92283), y]
    }
    else {
        let phaseAngle = 0

        if (beforeCourtId == 0) {
            phaseAngle = -(Math.PI / 2)
        }

        let newCenterX
        const centerX = verticalWidth / 2
        const centerY = verticalHeight / 2
        if (courtId == 1)
            newCenterX = besideWidth * 0.92283
        if (courtId == 2)
            newCenterX = besideWidth - (besideWidth * 0.92283 + 2 * diameter)

        const newCenterY = besideHeight / 2

        const convertY = ((y - centerY) + (diameter)) * -1
        const convertX = (x - centerX) + (diameter)

        const radian = Math.atan2(convertY, convertX)

        const distance = Math.sqrt((convertX ** 2) + (convertY ** 2))
        const ratio = besideHeight / verticalWidth

        const newRadian = radian + phaseAngle

        const newDistance = distance * ratio

        const newX = (newDistance * Math.cos(newRadian)) + newCenterX
        const newY = (newDistance * -1 * Math.sin(newRadian)) + newCenterY - diameter

        return [newX, newY]
    }
}