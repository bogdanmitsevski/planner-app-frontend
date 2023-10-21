import dayjs from "dayjs"
import React, { useContext, useEffect, useState } from "react"
import GlobalContext from "../context/GlobalContext"
export default function Day({ day, rowIdx, events }: any) {
    
    const { setDaySelected, setShowEventModal, setSelectedEvent } = useContext(GlobalContext)
    function getCurrentDay() {
        return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY") ? 'bg-blue-600 text-white rounded-full w-7 ' : ' '
    }
    return (
        <div className="border border-gray-200 flex flex-col">
            <header className="flex flex-col items-center">
                {rowIdx === 0 && (
                    <p className="text-sm mt-1">{day.format('ddd').toUpperCase()}</p>
                )}
                <p className={`text-sm p-1 my-1 text-center  ${getCurrentDay()}`}>
                    {day.format('DD')}
                </p>
            </header>
            <div className="flex-1 cursor-pointer " onClick={() => {
                setDaySelected(day)
                setShowEventModal(true)
            }}>
                {events.map((evt: any) => (
                    <div
                        onClick={() => setSelectedEvent(evt)}
                        className={`bg-${evt.label}-200 p-1 mr-3 text-gray-600 text-sm rounded mb-1 truncate`}>
                        {evt.title}
                    </div>
                ))}
            </div>
        </div>
    )
}  