import React, { useState, useEffect, useCallback, useReducer } from 'react';
import axios from 'axios';
import moment from 'moment';

import { LogDataContainer } from './LogData.css';
import SearchBar from './SearchBar';
import Table from 'utils/Table';
import paramSetterReducer from 'utils/customReducer/paramSetterReducer';
import { getYMDAndHourFormatDate } from 'utils/getCustomFormatDate';
import { columns } from './columns'

const LogData = () => {
  const [data, setData] = useState([]);
  const [searchMap, setSearchMap] = useState({
                                              beginDate: new Date(moment().startOf('date').format('YYYY-MM-DD HH:mm:ss')),
                                              endDate: new Date(moment().add(1, 'days').startOf('date').format('YYYY-MM-DD HH:mm:ss')),
                                              moduleIdx: 0,
                                            })
  const [ canNextPage, setCanNextPage ] = useState(false);
  const [ canPreviousPage, setCanPreviousPage ] = useState(false);

  const [paramState, dispatch] = useReducer(paramSetterReducer, {
                                                                  pageIndex: 0,
                                                                  pageCount: 10,
                                                                  pageSize: 15,
                                                                  elementCount: 0
                                                                })
  
  const getData = useCallback(() => {
    axios.get("/api/get/warning", {params: {moduleIdx: searchMap.moduleIdx,
                                          beginDate: getYMDAndHourFormatDate(searchMap.beginDate),
                                          endDate: getYMDAndHourFormatDate(searchMap.endDate),
                                          pageIndex: paramState.pageIndex,
                                          pageSize: paramState.pageSize }})
    .then(response => {
      setData(response.data.content);
      dispatch({type: 'CHANGE_TOTAL', pageCount: response.data.totalPages, elementCount: response.data.totalElements});
      setCanNextPage(!response.data.last);
      setCanPreviousPage(!response.data.first);
    })
    .catch(function (error) {
      console.log(error);
    })
  }, [searchMap.moduleIdx, searchMap.beginDate, searchMap.endDate, paramState.pageIndex, paramState.pageSize])

  useEffect(() => {
    console.log(searchMap);
    getData();
  }, [getData, searchMap])

  if (!data) {
    getData();
    return null;
  }

  return (
    <LogDataContainer>
      <SearchBar searchMap={searchMap} setSearchMap={setSearchMap} />
      <Table columns={columns} data={data} dispatch={dispatch} canNextPage={canNextPage} canPreviousPage={canPreviousPage} {...paramState} />
    </LogDataContainer>
  )
}

export default LogData;