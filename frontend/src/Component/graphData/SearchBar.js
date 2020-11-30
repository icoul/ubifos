import React, { useCallback } from 'react';
import SearchDate from './SearchDate';
import SearchModule from './SearchModule';

import { SearchBarConatiner } from './SearchBar.css';

const SearchBar = ({ setSearchMap }) => {
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
        <SearchDate updateSearchMap={updateSearchMap}/>
        <SearchModule updateSearchMap={updateSearchMap} />
        <div className="search-condition col-xl-4 col-sm-6">
          <button>파일 저장</button>
        </div>
      </div>
    </SearchBarConatiner>
  )
}

export default React.memo(SearchBar);