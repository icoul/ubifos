import React, { useCallback } from 'react';
import SearchDate from './SearchDate';
import SearchModule from './SearchModule';

import { SearchBarConatiner } from './SearchBar.css';

const SearchBar = ({ searchMap, setSearchMap }) => {
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
        <SearchDate updateSearchMap={updateSearchMap} date={searchMap.date} begin={searchMap.begin} end={searchMap.end} />
        <SearchModule updateSearchMap={updateSearchMap} />
      </div>
    </SearchBarConatiner>
  )
}

export default React.memo(SearchBar);