import React, { useContext, useEffect, useState } from "react";
import Day from "./Day";
import dayjs from "dayjs";
import EventModal from "./EventModal";
import GlobalContext from "../context/GlobalContext";
export default function Month({ month }: any) {
  const { showEventModal } = useContext(GlobalContext)
  const [monthEvents, setMonthEvents] = useState([]);
  function getEvents() {
    fetch('http://localhost:5000/api/get')
      .then(response => response.json())
      .then(data => {
        const monthWithEvents = month.map((week: dayjs.Dayjs[]) => {
          return week.map((day: dayjs.Dayjs) => {
            const events = data.filter(
              (evt: any) =>
                dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY")
            );
              return {day, events}
          })
        })



        setMonthEvents(monthWithEvents);
      })
  }
  useEffect(() => { getEvents() }, [month]);
  return (
    <>
    {showEventModal && <EventModal onSuccess={() => {getEvents()}}/>  } 
    <div className="flex-1 grid grid-cols-7 grid-rows-5">
      {monthEvents.map((row: any, i: any) => (
        <React.Fragment>
          {row.map(({day, events}:any) => (
            <Day day={day} rowIdx={i} events={events} />
          ))}
        </React.Fragment>
      ))}
    </div>
    </>
    
  );
}
