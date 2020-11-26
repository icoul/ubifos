import React, { useState } from 'react';

import { columns } from './columns'

import { TableDataContainer } from './TableData.css';
import { data } from './data';
import SearchBar from './SearchBar';
import Table from 'utils/Table';

const TableData = () => {
  const [searchMap, setSearchMap] = useState({
                                              beginDate: new Date(),
                                              endDate: new Date(),
                                              beginTime: 0,
                                              endTime: 24,
                                              moduleIdx: 1,
                                            })

  return (
    <TableDataContainer>
      <SearchBar searchMap={searchMap} setSearchMap={setSearchMap} />
      <Table columns={columns} data={data} />
    </TableDataContainer>
  )
}

export default TableData;