import React, { useCallback, useState } from 'react';
import Calendar from 'react-calendar';
import { nvlDateTypeReturnToStringOnlyDate, nvlDateTypeReturnToDate } from 'utils/nvl';
import { CalendarStyle, ReactCalendarBackground } from './GeneralCalendar.css.js';

const GeneralCalendar = ({date, name, updateDateFunction, position}) => {
  const [ showFlag, setShowFlag ] = useState(false);
  const openCalendar = useCallback((flag) => {
    setShowFlag(flag);
  }, []);

  return (
    <>
      <input value={nvlDateTypeReturnToStringOnlyDate(date, '')} 
             onClick={() => { openCalendar(true) }}
             className="table-search-input up-check calendar-input"
             readOnly />
      <CalendarStyle showFlag={showFlag} position={position}>
        <Calendar
          onChange={(d) => {updateDateFunction(name, d); openCalendar(false);}}
          value={nvlDateTypeReturnToDate(date + "", new Date())}
        />
      </CalendarStyle>
      <ReactCalendarBackground showFlag={showFlag} onClick={() => {openCalendar(false)}} />
    </>
  )
}

export default React.memo(GeneralCalendar);