import React, { useCallback, useState, useEffect } from 'react';
import GeneralCalendar from 'utils/calendar/GeneralCalendar';

function cloneObject(obj) {
  return JSON.parse(JSON.stringify(obj));
}

const SearchDate = ({ updateSearchMap }) => {
  const [ dateTime, setDateTime ] = useState({'date': new Date(), 'beginTime': '00', 'endTime': '24'});
  const updateDateTime = useCallback((key, value) => {
    setDateTime(dateTime => {
      return {
        ...dateTime, 
        [key]: value
      }
    });
  }, [])

  useEffect(() => {
    const beginDate = new Date(cloneObject(dateTime.date));
    beginDate.setHours(dateTime.beginTime);
    updateSearchMap('beginDate', beginDate);

    const endDate = new Date(cloneObject(dateTime.date));
    endDate.setHours(dateTime.endTime);
    updateSearchMap('endDate', endDate);
  }, [dateTime, updateSearchMap])

  return (
    <div className="search-condition col-xl-4 col-sm-6">
      <label>날짜</label>
      <GeneralCalendar date={dateTime.date} 
                       updateDateFunction={updateDateTime}
                       name='date'
                       position={{left: '70', top: '35'}} />
      <label>시작시각</label>
      <select className="table-search-input up-check"
              defaultValue={dateTime.beginTime}
              onChange={(({target}) => updateDateTime('beginTime', target.value))}>
        {
          [...Array(25).keys()].map((v) => {
            return <option value={v} key={"start_" + v}>{v < 10 ? "0" + v : v}시</option>
          })
        }
      </select>
      <label>종료시각</label>
      <select className="table-search-input up-check"
              defaultValue={dateTime.endTime}
              onChange={(({target}) => updateDateTime('endTime', target.value))}>
        {
          [...Array(25).keys()].map((v) => {
            return <option value={v} key={"start_" + v}>{v < 10 ? "0" + v : v}시</option>
          })
        }
      </select>
    </div>
  )
}

export default React.memo(SearchDate);