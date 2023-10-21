import React, { useState, useContext, useEffect } from 'react';
import './App.css';
import { getMonth } from './util';
import CalendarHeader from './components/CalendarHeader';
import Sidebar from './components/Sidebar';
import Month from './components/Month';
import GlobalContext from './context/GlobalContext';
import dayjs from 'dayjs';

function App() {
  console.table(getMonth());
  const [currentMonth, setCurrentMonth] = useState<dayjs.Dayjs[][] | null>(null);
  const { monthIndex } = useContext(GlobalContext)
  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex))
  }, [monthIndex])
  if(!currentMonth) {
    return <div>Loadding</div>
  }
  return (
    <React.Fragment>
      <div className="h-screen flex flex-col">
        <CalendarHeader />
        <div className="flex flex-1">
          <Sidebar />
          <Month month={currentMonth} />
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
