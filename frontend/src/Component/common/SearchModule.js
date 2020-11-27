import React from 'react';

const SearchModule = ({ updateSearchMap }) => {
  return (
    <div className="search-condition col-xl-4 col-sm-6" >
      <label>장치</label>
      <select className="table-search-input up-check" onChange={({ target }) => { updateSearchMap('moduleIdx', target.value); }}>
        <option value={1}>ROT 001</option>
        <option value={2}>ROT 002</option>
        <option value={3}>ROT 003</option>
      </select>
    </div>
  )
}

export default React.memo(SearchModule);