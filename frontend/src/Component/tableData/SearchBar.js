import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { CSVLink } from "react-csv";

import SearchDate from './SearchDate';
import SearchModule from './SearchModule';
import { getYMDAndHourFormatDate } from 'utils/getCustomFormatDate';

import { SearchBarConatiner } from './SearchBar.css';

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
  const getDataForCsv = useCallback((searchMap) => {
    axios.get("/api/get/csv", {params: {moduleIdx: searchMap.moduleIdx,
                                        beginDate: getYMDAndHourFormatDate(searchMap.beginDate),
                                        endDate: getYMDAndHourFormatDate(searchMap.endDate)}})
    .then(response => {
      setCsvData(response.data);
    })
    .catch(function (error) {
      console.log(error);
    })
  }, [])

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
  // eslint-disable-next-line no-use-before-define
  }, [getDataForCsv, setSearchMap])

  return (
    <SearchBarConatiner>
      <div className="form-row">
        <SearchDate title='시작날짜' updateSearchMap={updateSearchMap} name='beginDate' date={searchMap.beginDate} />
        <SearchDate title='종료날짜' updateSearchMap={updateSearchMap} name='endDate' date={searchMap.endDate} />
        <SearchModule updateSearchMap={updateSearchMap} />
        <CSVLink className="search-condition csv-btn col-xl-4 col-sm-6" 
                 target="_blank" 
                 filename={`가스 상세 데이터_${getYMDAndHourFormatDate(searchMap.beginDate)} ~ ${getYMDAndHourFormatDate(searchMap.endDate)}.csv`}
                 data={csvData}
                 headers={headers}>
          파일 저장
        </CSVLink>
      </div>
    </SearchBarConatiner>
  )
}

export default React.memo(SearchBar);