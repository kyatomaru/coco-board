"use client"

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation'
import BallSettingBox from './ball/BallSettingBox';
import PlayerSettingBox from './player/PlayerSettingBox';
import Box from '@mui/material/Box';

type PageProps = {
    frame: any,
    setFrame: any,
    selectItem: any,
    setSelectItem: any,
}

export default function ItemSettingBox({ frame, setFrame, selectItem, setSelectItem }: PageProps) {
    return (
        <>
            {/* ball */}
            {
                selectItem.target == "ball" &&
                <BallSettingBox frame={frame} setFrame={setFrame} setSelectItem={setSelectItem} />
            }

            {/* player */}
            {
                selectItem.target == "player" &&
                <PlayerSettingBox frame={frame} setFrame={setFrame} index={selectItem.item} setSelectItem={setSelectItem} />
            }
        </>
    )
}
