import React, { useState, useEffect } from 'react';
import { useTable, usePagination, useRowSelect } from 'react-table';

import { TableDataContainer, PageButton } from './TableData.css';
import { data } from './data';
import SearchBar from './SearchBar';

const statusConverter = (status) => {
  switch (status) {
    case 'none':
      return <span style={{color: '#ececec'}}>● 미수신</span>;
    case 'warning':
      return <span style={{color: '#e8ad2e'}}>● 경고</span>;
    case 'danger':
      return <span style={{color: '#ff0018'}}>● 위험</span>;
    default:
      return <span style={{color: '#50bb5b'}}>● 정상</span>;
  }
}

const TableData = () => {
  const [searchMap, setSearchMap] = useState({
                                              beginDate: new Date(),
                                              endDate: new Date(),
                                              beginTime: 0,
                                              endTime: 24,
                                              moduleIdx: 0,
                                            })
  const columns = React.useMemo(
    () => [
      {
        Header: '',
        accessor: 'col1',
      },
      {
        Header: '장치명',
        accessor: 'col2',
      },
      {
        id: 'status',
        Header: () => (
          <div>상태</div>
        ),
        Cell: ({ row }) => (
          statusConverter(row.original.col3)
        ),
      },
      {
        Header: 'O2',
        accessor: 'col4',
      },
      {
        Header: 'CO2',
        accessor: 'col5',
      },
      {
        Header: 'CO',
        accessor: 'col6',
      },
      {
        Header: 'H2S',
        accessor: 'col7',
      },
      {
        Header: 'LEL',
        accessor: 'col8',
      },
      {
        Header: '날짜',
        accessor: 'col9',
      },
    ],
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
    },
    usePagination,
    useRowSelect,
  )

  const [pageNumbers, setPageNumbers] = useState(null)

  useEffect(() => {
    setPageSize(15);
  }, [setPageSize])

  useEffect(() => {
    const firstPageNumber = Math.floor(pageIndex / 10) * 10 + 1;
    const value = data.length - ((firstPageNumber - 1) * pageSize);
    const pageNumberRangeCount = value > 150 ? 10 : (value <= 0 ? 1 : Math.floor((value - 1) / pageSize) + 1);
    const pageNumbersObject = [...Array(pageNumberRangeCount).keys()].map((i) => {
      return (
        <PageButton selected={firstPageNumber + i === pageIndex + 1}
                    onClick={() => gotoPage(firstPageNumber + i - 1)}
                    key={i}>
          {firstPageNumber + i}
        </PageButton>
      )
    });

    setPageNumbers(pageNumbersObject)
  }, [gotoPage, pageIndex, pageSize])

  return (
    <TableDataContainer>
      <SearchBar searchMap={searchMap} setSearchMap={setSearchMap} />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className="page_box">
       <button onClick={() => previousPage()} disabled={!canPreviousPage}>
        { '<' }
       </button>
       { pageNumbers }
       <button onClick={() => nextPage()} disabled={!canNextPage}>
        { '>' }
       </button>
     </div>
    </TableDataContainer>
  )
}

export default TableData;