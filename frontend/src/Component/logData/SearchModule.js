import React, { useState, useEffect, useCallback} from 'react';
import axios from 'axios';

const SearchModule = ({ updateSearchMap }) => {
  const [ modules, setModules ] = useState([]);

  const getData = useCallback(() => {
    axios.get("/api/get/modules")
    .then(response => { 
      setModules(response.data);
    })
    .catch(function (error) {
      console.log(error);
    })
  }, [])

  useEffect(() => {
    getData();
  }, [getData])

  return (
    <div className="search-condition col-xl-4 col-sm-6" >
      <label>장치</label>
      <select className="table-search-input up-check" onChange={({ target }) => { updateSearchMap('moduleIdx', target.value); }}>
        <option value={0}>전체</option>
        {
          modules.map((module) => {
            return (
              <option value={module.moduleIdx}>{ module.modelNm }</option>
            )
          })
        }
      </select>
    </div>
  )
}

export default React.memo(SearchModule);