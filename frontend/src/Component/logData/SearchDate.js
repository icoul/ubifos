import React, { useCallback, useState, useEffect } from 'react';
import moment from 'moment';
import GeneralCalendar from 'utils/calendar/GeneralCalendar';

const SearchDate = ({ title, updateSearchMap, name, date }) => {
  const [ dateTime, setDateTime ] = useState({'date': date, 'time': moment(date).format('HH')});
  const updateDateTime = useCallback((key, value) => {
    setDateTime(dateTime => {
      return {
        ...dateTime, 
        [key]: value
      }
    });
  }, [])

  useEffect(() => {
    const date = dateTime.date;
    date.setHours(dateTime.time);
    updateSearchMap(name, date);
  }, [dateTime, name, updateSearchMap])

  return (
    <div className="search-condition col-xl-4 col-sm-6">
      <label>{title}</label>
      <GeneralCalendar date={dateTime.date} 
                       updateDateFunction={updateDateTime}
                       name='date'
                       position={{left: '70', top: '35'}} />
      <select className="table-search-input up-check"
              onChange={(({target}) => updateDateTime('time', target.value))}>
        {
          [...Array(25).keys()].map((v) => {
            return <option value={v} defaultValue={dateTime.time} key={"start_" + v}>{v < 10 ? "0" + v : v}시</option>
          })
        }
      </select>
    </div>
  )
}

export default React.memo(SearchDate);