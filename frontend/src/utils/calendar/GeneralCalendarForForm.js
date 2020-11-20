import React, { useCallback, useState } from 'react';
import Calendar from 'react-calendar';
import { nvlDateTypeReturnToStringOnlyDate, nvlDateTypeReturnToDate } from 'utils/nvl';
import { CalendarStyle, ReactCalendarBackground } from './GeneralCalendar.css.js';

const GeneralCalendarForForm = ({ date, name, position, dateValid = true, register = null }) => {
  const [ showFlag, setShowFlag ] = useState(false);
  const [ newDate, setNewDate ] = useState(date);
  const openCalendar = useCallback((flag) => {
    setShowFlag(flag);
  }, []);

  return (
    <>
      <input name={name} ref={register}
             defaultValue={nvlDateTypeReturnToStringOnlyDate(newDate, '')} 
             onClick={() => { if(dateValid) openCalendar(true) }}
             className="table-search-input up-check calendar-input"
             disabled={!dateValid}
             readOnly />
      <CalendarStyle showFlag={showFlag} position={position}>
        <Calendar
          onChange={(d) => { setNewDate(d); openCalendar(false); }}
          value={nvlDateTypeReturnToDate(date + "", new Date())}
        />
      </CalendarStyle>
      <ReactCalendarBackground showFlag={showFlag} onClick={() => {openCalendar(false)}} />
    </>
  )
}

export default React.memo(GeneralCalendarForForm);