import React, { useState, useEffect } from 'react';
import { useTable, usePagination, useRowSelect } from 'react-table';

import { TableContainer, PageBox, PageButton } from './Table.css';

const Table = ({ columns, data, dispatch, canNextPage, canPreviousPage, pageIndex, pageCount, pageSize, elementCount }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    setPageSize,
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
    setPageSize(pageSize);
  }, [pageSize, setPageSize]);

  useEffect(() => {
    const firstPageNumber = Math.floor(pageIndex / 10) * 10 + 1;
    const value = elementCount - ((firstPageNumber - 1) * pageSize);
    const pageNumberRangeCount = value > 150 ? 10 : (value <= 0 ? 1 : Math.floor((value - 1) / pageSize) + 1);
    const pageNumbersObject = [...Array(pageNumberRangeCount).keys()].map((i) => {
      return (
        <PageButton selected={firstPageNumber + i === pageIndex + 1}
                    onClick={() => dispatch({type: 'PAGE_SELECT', pageIndex: (firstPageNumber + i - 1)})}
                    key={i}>
          {firstPageNumber + i}
        </PageButton>
      )
    });

    setPageNumbers(pageNumbersObject)
  }, [elementCount, dispatch, pageIndex, pageSize])

  return (
    <>
      <TableContainer {...getTableProps()}>
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
      </TableContainer>
      <PageBox>
       <button onClick={() => dispatch({type: 'PAGE_SELECT', pageIndex: pageIndex - 1})} disabled={!canPreviousPage}>
        { '<' }
       </button>
       { pageNumbers }
       <button onClick={() => dispatch({type: 'PAGE_SELECT', pageIndex: pageIndex + 1})} disabled={!canNextPage}>
        { '>' }
       </button>
      </PageBox>
    </>
  )
}

export default Table;