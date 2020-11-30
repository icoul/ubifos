import React, { useState, useEffect, useCallback, useReducer } from 'react';
import axios from 'axios';

import { columns } from './columns'

import { TableDataContainer } from './TableData.css';
import SearchBar from './SearchBar';
import Table from 'utils/Table';
import paramSetterReducer from 'utils/customReducer/paramSetterReducer';
import { getYMDAndHourFormatDate } from 'utils/getCustomFormatDate';

const TableData = () => {
  const [data, setData] = useState([]);
  const [searchMap, setSearchMap] = useState({
                                              beginDate: new Date(),
                                              endDate: new Date(),
                                              moduleIdx: 1,
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
    axios.get("/api/get/table", {params: {moduleIdx: searchMap.moduleIdx,
                                          beginDate: getYMDAndHourFormatDate(searchMap.beginDate),
                                          endDate: getYMDAndHourFormatDate(searchMap.endDate),
                                          pageIndex: paramState.pageIndex,
                                          pageSize: paramState.pageSize }})
    .then(response => {
      setData(response.data.content);
      dispatch({type: 'CHANGE_TOTAL', pageCount: response.totalPages, elementCount: response.data.totalElements});
      setCanNextPage(!response.last);
      setCanPreviousPage(!response.first);
    })
    .catch(function (error) {
      console.log(error);
    })
  }, [searchMap.moduleIdx, searchMap.beginDate, searchMap.endDate, paramState.pageIndex, paramState.pageSize])

  useEffect(() => {
    getData();
  }, [getData, searchMap])

  if (!data) {
    getData();
    return null;
  }

  return (
    <TableDataContainer>
      <SearchBar searchMap={searchMap} setSearchMap={setSearchMap} />
      <Table columns={columns} data={data} dispatch={dispatch} canNextPage={canNextPage} canPreviousPage={canPreviousPage} {...paramState} />
    </TableDataContainer>
  )
}

export default TableData;