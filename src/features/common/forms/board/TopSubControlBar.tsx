"use client"

import * as React from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import AddItemBox from './addItem/AddItemBox';
import ItemSettingBox from './itemSetting/ItemSettingBox';
import PlayersSettingBox from './playersSetting/PlayersSettingBox';
import CourtSettingBox from './courtSetting/CourtSettingBox';
import SettingBox from './setting/SettingBox';
import { useScrollLock } from '@/hooks/common/useScrollLock';

type PageProps = {
    board: any,
    frame: any,
    setFrame: any,
    selectItem: any,
    setSelectItem: any,
    menu: number,
    setMenu: any,
    isPlay: boolean
}


export default function TopSubControlBar({ board, frame, setFrame, selectItem, setSelectItem, menu, setMenu, isPlay }: PageProps) {
    useScrollLock()

    return (
        <>
            {isPlay ?
                <Box sx={{ height: 25, width: "100%", backgroundColor: "white", position: "relative", zIndex: 2000 }}></Box>
                :
                <Stack direction="row" justifyContent="flex-start" spacing={2} sx={{ height: "25px", position: "relative", zIndex: 2000, margin: "auto", backgroundColor: "white", borderTop: "solid 0.5px #b2b2b2", borderRight: "solid 0.5px #b2b2b2", borderLeft: "solid 0.5px #b2b2b2", }}>
                    {
                        menu == 0 &&
                        <ItemSettingBox frame={frame} setFrame={setFrame} setSelectItem={setSelectItem} selectItem={selectItem} />
                    }
                    {
                        menu == 1 &&
                        <AddItemBox frame={frame} setFrame={setFrame} board={board} />
                    }
                    {
                        menu == 2 &&
                        <PlayersSettingBox frame={frame} setFrame={setFrame} board={board} setMenu={setMenu} />
                    }
                    {
                        menu == 3 &&
                        <CourtSettingBox frame={frame} setFrame={setFrame} board={board} setMenu={setMenu} />
                    }
                    {
                        menu == 4 &&
                        <SettingBox frame={frame} setFrame={setFrame} board={board} />
                    }
                </Stack>
            }
        </>
    )
}
