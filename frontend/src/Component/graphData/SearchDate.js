import React from 'react';
import GeneralCalendar from 'utils/calendar/GeneralCalendar';

const SearchDate = ({ updateSearchMap, date, begin, end }) => {
  return (
    <div className="search-condition col-xl-4 col-sm-6">
      <label>날짜</label>
      <GeneralCalendar date={date} 
                       updateDateFunction={updateSearchMap}
                       name='date'
                       position={{left: '70', top: '35'}} />
      <label>시작시각</label>
      <select className="table-search-input up-check"
              defaultValue={begin}
              onChange={(({target}) => updateSearchMap('begin', target.value))}>
        {
          [...Array(Number(end)).keys()].map((v) => {
            return <option value={v} key={"start_" + v}>{v < 10 ? "0" + v : v}시</option>
          })
        }
      </select>
      <label>종료시각</label>
      <select className="table-search-input up-check"
              value={end}
              onChange={(({target}) => updateSearchMap('end', target.value))}>
        {
          [...Array(24 - begin).keys()].map((i) => {
            const v = Number(i + 1) + Number(begin);
            return <option value={v} key={"start_" + (v + begin)}>{v < 10 ? "0" + v : v}시</option>
          })
        }
      </select>
    </div>
  )
}

export default React.memo(SearchDate);