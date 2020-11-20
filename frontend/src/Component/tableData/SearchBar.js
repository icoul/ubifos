import React, { useState, useCallback } from 'react';
import SearchDate from './SearchDate';
// import SearchTime from './SearchTime';
// import SearchModule from './SearchModule';

import { SearchBarConatiner } from './SearchBar.css';

const SearchBar = ({ searchMap, setSearchMap }) => {
  const [ dateValid, setDateValid ] = useState(true);
  const updateSearchMap = useCallback((key, value) => {
    setSearchMap(searchMap => {
      return {
        ...searchMap,
        [key]: value
      }
    })
  }, [setSearchMap])

  return (
    <SearchBarConatiner>
      <div className="form-row">
        <SearchDate title='시작날짜' dateValid={dateValid} updateSearchMap={updateSearchMap} name='beginDate'/>
        <SearchDate title='종료날짜' dateValid={dateValid} updateSearchMap={updateSearchMap} name='endDate'/>
        <div className="search-condition col-xl-4 col-sm-6">
          <label>장치</label>
          <select className="table-search-input up-check">
            <option value=''>ROT 001</option>
            <option value=''>ROT 002</option>
            <option value=''>ROT 003</option>
          </select>
        </div>
        <div className="search-condition col-xl-4 col-sm-6">
          <button>저장</button>
        </div>
      </div>
    </SearchBarConatiner>
  )
}

export default React.memo(SearchBar);