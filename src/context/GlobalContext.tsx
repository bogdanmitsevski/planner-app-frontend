import dayjs from "dayjs";
import React, { Dispatch, SetStateAction } from "react";
export interface IGlobalContext {
    monthIndex: number;
    setMonthIndex: Dispatch<SetStateAction<number>>;
    showEventModal: boolean;
    setShowEventModal: Dispatch<SetStateAction<boolean>>;
    daySelected: dayjs.Dayjs | null;
    setDaySelected: Dispatch<SetStateAction<dayjs.Dayjs>>;
    selectedEvent: any;
    setSelectedEvent: Dispatch<SetStateAction<any>>
}
const GlobalContext = React.createContext<IGlobalContext>({
    monthIndex: 0,
    setMonthIndex: (index) => {},
    showEventModal: false,
    setShowEventModal: () => {},
    daySelected: null,
    setDaySelected: (day) => {},
    selectedEvent: null,
    setSelectedEvent: () => {}
})

export default  GlobalContext