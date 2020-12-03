import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';

import SearchDate from './SearchDate';
import SearchModule from './SearchModule';
import { getYMDAndHourFormatDate } from 'utils/getCustomFormatDate';

import { SearchBarConatiner } from './SearchBar.css';

import { toCSV } from 'utils/core';

const headers = [
  { label: '장치명', key: 'modelNm' },
  { label: 'O₂', key: 'o2' },
  { label: 'CO₂', key: 'co2' },
  { label: 'CO', key: 'co' },
  { label: 'H₂S', key: 'h2s' },
  { label: 'CH₄', key: 'ch4' },
  { label: '배터리', key: 'battery' },
  { label: '날짜', key: 'rgstDt' },
];

const SearchBar = ({ searchMap, setSearchMap }) => {
  const [ csvData, setCsvData ] = useState([]);
  const [ test, setTest ] = useState(null);
  
  const getDataForCsv = useCallback((searchMap) => {
    axios.get("/api/get/log/csv", {params: {moduleIdx: searchMap.moduleIdx,
                                            beginDate: getYMDAndHourFormatDate(searchMap.beginDate),
                                            endDate: getYMDAndHourFormatDate(searchMap.endDate)}})
    .then(response => {
      setCsvData(toCSV(response.data, headers));
    })
    .catch(function (error) {
      console.log(error);
    })
  }, [])

  useEffect(() => {
    var blob = new Blob(['\uFEFF', csvData]);
    setTest(window.URL.createObjectURL(blob));
    //window.navigator.msSaveBlob(blob, `이벤트 로그 데이터_${getYMDAndHourFormatDate(searchMap.beginDate)} ~ ${getYMDAndHourFormatDate(searchMap.endDate)}.csv`);
  }, [csvData])

  const fileDownload = () => {
    const blob = new Blob(['\uFEFF', csvData]);
    saveAs(blob, `이벤트 로그 데이터_${getYMDAndHourFormatDate(searchMap.beginDate)} ~ ${getYMDAndHourFormatDate(searchMap.endDate)}.csv`)
  }

  const updateSearchMap = useCallback((key, value) => {
    setSearchMap(searchMap => {
      getDataForCsv({
        ...searchMap,
        [key]: value
      });

      return {
        ...searchMap,
        [key]: value
      }
    })
  }, [getDataForCsv, setSearchMap])

  return (
    <SearchBarConatiner>
      <div className="form-row">
        <SearchDate title='시작날짜' updateSearchMap={updateSearchMap} name='beginDate'/>
        <SearchDate title='종료날짜' updateSearchMap={updateSearchMap} name='endDate'/>
        <SearchModule updateSearchMap={updateSearchMap} />
        {/* <CSVLink className="search-condition csv-btn col-xl-4 col-sm-6" 
                 target="_blank" 
                 filename={`이벤트 로그 데이터_${getYMDAndHourFormatDate(searchMap.beginDate)} ~ ${getYMDAndHourFormatDate(searchMap.endDate)}.csv`}
                 data={csvData}
                 headers={headers}>
          파일 저장
        </CSVLink> */}
        <button className="search-condition csv-btn col-xl-4 col-sm-6" onClick={() => { fileDownload(); }}>
          파일 저장
        </button>
      </div>
    </SearchBarConatiner>
  )
}

export default React.memo(SearchBar);