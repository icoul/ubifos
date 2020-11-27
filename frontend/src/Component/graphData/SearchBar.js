import React, { useState, useCallback } from 'react';
import SearchDate from './SearchDate';
import SearchModule from '../common/SearchModule';

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
        <SearchDate dateValid={dateValid} updateSearchMap={updateSearchMap}/>
        <SearchModule updateSearchMap={updateSearchMap} />
        <div className="search-condition col-xl-4 col-sm-6">
          <button>파일 저장</button>
        </div>
      </div>
    </SearchBarConatiner>
  )
}

export default React.memo(SearchBar);