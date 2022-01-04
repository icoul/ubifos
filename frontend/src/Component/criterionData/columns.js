import React from 'react';
import { isNumber } from 'utils/utils';
import { moduleScnMap } from 'utils/code';

export const columns = [
  {
    Header: '관리기준 설정',
    columns: [
      {
        Header: '기본정보',
        columns: [
          {
            Header: 'No',
            accessor: 'rnum',
          },
          {
            id: 'moduleType',
            Header: () => (
              <span>장치종류</span>
            ),
            Cell: ({ row }) => (
              <>
                {
                  moduleScnMap[row.original.moduleScn].title.split('').map((text, index) => {
                    return isNumber(text) ? <sub key={index}>{text}</sub> : <span key={index}>{text}</span>
                  })
                }
              </>
            ),
          },
          {
            id: 'statusType',
            Header: () => (
              <span>가스종류</span>
            ),
            Cell: ({ row }) => (
              <>
                {
                  row.original.statusType.split('').map((text, index) => {
                    return isNumber(text) ? <sub key={index}>{text}</sub> : <span key={index}>{text}</span>
                  })
                }
              </>
            ),
          },
          {
            Header: '단위',
            accessor: 'utm',
          },
        ]
      },
      {
        Header: '법적기준',
        columns: [
          {
            Header: 'KOSHA GUIDE (H-80-2018)',
            id: 'criterion',
            accessor: 'criterionValueList',
          }
        ]
      },
      {
        Header: '자체 관리기준',
        columns: [
          {
            Header: <span style={{'color': '#E8AD2E'}}>경고</span>,
            id: 'warning',
            accessor: 'criterionValueList',
          },
          {
            Header: <span style={{'color': '#ff0018'}}>위험</span>,
            id: 'danger',
            accessor: 'criterionValueList',
          },
        ]
      }
    ],
  },
]

export default columns;