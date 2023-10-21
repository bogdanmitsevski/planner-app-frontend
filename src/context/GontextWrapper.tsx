import React, { useState } from "react";
import GlobalContext from "./GlobalContext";
import dayjs from "dayjs";
export default function ContextWrapper(props: any) {
   const [monthIndex, setMonthIndex] = useState(dayjs().month()); 
   const [showEventModal, setShowEventModal] = useState(false); 
   const [daySelected, setDaySelected] = useState(dayjs());
   const [selectedEvent, setSelectedEvent] = useState(null); 
   return (
      <GlobalContext.Provider value={{ 
         monthIndex,
         setMonthIndex,
         showEventModal,
         setShowEventModal,
         daySelected,
         setDaySelected,
         selectedEvent,
         setSelectedEvent
         }}>
         {props.children}
      </GlobalContext.Provider>
   )
}