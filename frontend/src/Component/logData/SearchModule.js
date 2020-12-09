import React from 'react';

const SearchModule = ({ updateSearchMap }) => {
  return (
    <div className="search-condition col-xl-4 col-sm-6" >
      <label>장치</label>
      <select className="table-search-input up-check" onChange={({ target }) => { updateSearchMap('moduleIdx', target.value); }}>
        <option value={0}>전체</option>
        <option value={1}>센서1</option>
        <option value={2}>센서2</option>
        <option value={3}>센서3</option>
      </select>
    </div>
  )
}

export default React.memo(SearchModule);