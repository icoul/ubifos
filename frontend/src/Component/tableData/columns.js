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

export const columns = [
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
    Header: 'O₂ (%)',
    accessor: 'col4',
  },
  {
    Header: 'CO₂ (%)',
    accessor: 'col5',
  },
  {
    Header: 'CO (ppm)',
    accessor: 'col6',
  },
  {
    Header: 'H₂S (ppm)',
    accessor: 'col7',
  },
  {
    Header: 'CH₄ (%)',
    accessor: 'col8',
  },
  {
    Header: '날짜',
    accessor: 'col9',
  },
]