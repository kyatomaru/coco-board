import React, { useState } from "react";
import { Scheduler } from "@aldabil/react-scheduler";
import ja from 'date-fns/locale/ja'
import { DateCalendar } from '@mui/x-date-pickers';

export default function Calendar() {
    const [state] = useState({
        options: {
            transitionMode: "zoom", // or fade
            startWeekOn: "Mon", // or Sun
            defaultMode: "month", // or week | day | timeline
            minWidth: 540,
            maxWidth: 540,
            minHeight: 540,
            maxHeight: 540
        },
        alertProps: {
            open: false,
            color: "info", // info | success | warning | error
            severity: "info", // info | success | warning | error
            message: "🚀 Let's start with awesome react-mui-scheduler 🔥 🔥 🔥",
            showActionButton: false,
            showNotification: false,
            delay: 1500
        },
        toolbarProps: {
            showSearchBar: true,
            showSwitchModeButtons: true,
            showDatePicker: true
        }
    });

    const events = [
        {
            event_id: "event-1",
            title: "Medical consultation",
            groupLabel: "Dr Shaun Murphy",
            user: "Dr Shaun Murphy",
            color: "#f28f6a",
            startHour: "04:00 AM",
            endHour: "05:00 AM",
            date: "2021-09-28",
            createdAt: new Date(),
            createdBy: "Kristina Mayer"
        },
        {
            event_id: "event-2",
            title: "Medical consultation",
            groupLabel: "Dr Claire Brown",
            user: "Dr Claire Brown",
            color: "#099ce5",
            startHour: "09:00 AM",
            endHour: "10:00 AM",
            date: "2021-09-29",
            createdAt: new Date(),
            createdBy: "Kristina Mayer"
        },
        {
            event_id: "event-3",
            title: "Medical consultation",
            groupLabel: "Dr Menlendez Hary",
            user: "Dr Menlendez Hary",
            color: "#263686",
            startHour: "13 PM",
            endHour: "14 PM",
            date: "2021-09-30",
            createdAt: new Date(),
            createdBy: "Kristina Mayer"
        },
        {
            event_id: "event-4",
            title: "Consultation prénatale",
            groupLabel: "Dr Shaun Murphy",
            user: "Dr Shaun Murphy",
            color: "#f28f6a",
            startHour: "08:00 AM",
            endHour: "09:00 AM",
            date: "2021-10-01",
            createdAt: new Date(),
            createdBy: "Kristina Mayer"
        }
    ];

    const handleCellClick = (event, row, day) => {
        // Do something...
    };

    const handleEventClick = (event, item) => {
        // Do something...
    };

    const handleEventsChange = (item) => {
        // Do something...
    };

    const handleAlertCloseButtonClicked = (item) => {
        // Do something...
    };

    return (
        <Scheduler
            locale={ja}
            view="month"
            agenda={null}
            // events={events}
            // disableViewNavigator={true}

            translations={{
                navigation: {
                    today: "今日"
                }
            }}
            day={null}
            week={null}
            onEventClick={(e) => { console.log(e) }}
        />
    );
}
