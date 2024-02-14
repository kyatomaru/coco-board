import * as React from "react";
import { Box, styled, TextField } from "@mui/material";
import {
    LocalizationProvider,
    DatePicker,
    PickersDayProps,
    PickersDay,
} from "@mui/x-date-pickers-pro";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import ja from "date-fns/locale/ja";
import endOfWeek from "date-fns/endOfWeek";
import isSameDay from "date-fns/isSameDay";
import isWithinInterval from "date-fns/isWithinInterval";
import startOfWeek from "date-fns/startOfWeek";

type CustomPickerDayProps = PickersDayProps<Date> & {
    dayIsBetween: boolean;
    isFirstDay: boolean;
    isLastDay: boolean;
};
const CustomPickersDay = styled(PickersDay, {
    shouldForwardProp: (prop) =>
        prop !== "dayIsBetween" && prop !== "isFirstDay" && prop !== "isLastDay",
})<CustomPickerDayProps>(({ theme, dayIsBetween, isFirstDay, isLastDay }) => ({
    ...(dayIsBetween && {
        borderRadius: 0,
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        "&:hover, &:focus": {
            backgroundColor: theme.palette.primary.dark,
        },
    }),
    ...(isFirstDay && {
        borderTopLeftRadius: "50%",
        borderBottomLeftRadius: "50%",
    }),
    ...(isLastDay && {
        borderTopRightRadius: "50%",
        borderBottomRightRadius: "50%",
    }),
})) as React.ComponentType<CustomPickerDayProps>;

const DatePickerDay: React.FC = () => {
    const [value, setValue] = React.useState<Date | null>(null);
    const handleChange = (newValue: Date | null) => {
        console.log(newValue);
        setValue(newValue);
    };
    const styles = {
        mobiledialogprops: {
            ".MuiDatePickerToolbar-title": {
                fontSize: "1.5rem",
            },
            'div[class^="PrivatePickers"] div[class^="css-"]>span:nth-of-type(1)': {
                color: "rgba(255, 0, 0, 0.6)", // 日 = 赤
            },
            'div[class^="PrivatePickers"] div[class^="css-"]>span:nth-of-type(7)': {
                color: "rgba(0, 0, 255, 0.6)", // 土 = 青
            },
            'div[class^="PrivatePickers"] div[class^="css-"]>span': {
                margin: 0, // 見だしの曜日のところのマージン
            },
        },
        paperprops: {
            'div[class^="PrivatePickers"] div[class^="css-"]>span:nth-of-type(1)': {
                color: "rgba(255, 0, 0, 0.6)", // 日 = 赤
            },
            'div[class^="PrivatePickers"] div[class^="css-"]>span:nth-of-type(7)': {
                color: "rgba(0, 0, 255, 0.6)", // 土 = 青
            },
            'div[class^="PrivatePickers"] div[class^="css-"]>span': {
                margin: 0, // 見だしの曜日のところのマージン
            },
        },
    };
    const renderWeekPickerDay = (
        date: Date,
        selectedDates: Array<Date | null>,
        pickersDayProps: PickersDayProps<Date>
    ) => {
        const switchDayColor = (getday: number) => {
            switch (
            getday // Sun=0,Sat=6
            ) {
                case 0:
                    return { color: "red" };
                case 6:
                    return { color: "blue" };
                default:
                    return {};
            }
        };
        const newPickersDayProps = {
            ...pickersDayProps, // デフォルトのPickersDayコンポーネントのプロパティ
            ...{
                showDaysOutsideCurrentMonth: true, // カレンダーの表示月以外の日もレンダリング
                disableMargin: true, // 日付同士の margin: 0
                disabled: pickersDayProps.outsideCurrentMonth // カレンダーの表示月以外の日は選択不可
                    ? true
                    : pickersDayProps.disabled,
                sx: switchDayColor(date.getDay()),
            },
        };
        if (!value) {
            return <PickersDay {...newPickersDayProps} />; // 選択されていない場合、色塗り無しでレンダリング
        }

        const start = startOfWeek(value);
        const end = endOfWeek(value);

        const dayIsBetween = isWithinInterval(date, { start, end });
        const isFirstDay = isSameDay(date, start);
        const isLastDay = isSameDay(date, end);

        return (
            // 選択されている場合、色塗り有りでレンダリング
            <CustomPickersDay
                {...newPickersDayProps}
                dayIsBetween={dayIsBetween}
                isFirstDay={isFirstDay}
                isLastDay={isLastDay}
            />
        );
    };
    return (
        <LocalizationProvider
            dateAdapter={AdapterDateFns}
            adapterLocale={ja} // ja追加
            dateFormats={{ monthAndYear: "yyyy年 MM月", year: "yyyy年" }} // カレンダー左上の日付表示 年選択を○○年表示
            localeText={{
                previousMonth: "前月を表示", // < のツールチップ
                nextMonth: "次月を表示", // > のツールチップ
                cancelButtonLabel: "キャンセル", // スマホ画面のCANCELボタン
                okButtonLabel: "選択", // スマホ画面のOKボタン
            }}
        >
            <Box
                sx={{
                    m: 2,
                    width: "250px",
                }}
            >
                <DatePicker
                    label="週選択"
                    minDate={new Date("2021-01-01")} // 選択範囲は2021年～
                    maxDate={new Date()} // 未来の日付無効
                    value={value}
                    onChange={handleChange}
                    format="yyyy年MM月dd日の週"
                // inputFormat="yyyy年MM月dd日の週" // 選択済みの日付の表示
                // mask="____年__月__日の週"

                // toolbarFormat="yyyy年MM月dd日の週" // スマホ画面の左上 選択中日付表示

                // renderInput={(params) => (
                //     <TextField
                //         {...params}
                //         fullWidth
                //         inputProps={{
                //             ...params.inputProps,
                //             placeholder: "****年**月**日の週", // プレースホルダー（フォーカスを合わせたときに薄く表示される入力例）
                //         }}
                //     />
                // )}
                // DialogProps={{ sx: styles.mobiledialogprops }} // スマホ画面の左上 選択中日付表示 文字の大きさ調整
                // PaperProps={{ sx: styles.paperprops }} // 見だしの "土" "日" 表示色調整
                // renderDay={renderWeekPickerDay} // 週末の色調整 週選択対応
                />
            </Box>
        </LocalizationProvider>
    );
};

export default DatePickerDay;