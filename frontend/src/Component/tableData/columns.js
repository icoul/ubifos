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
    id: 'modelNm',
    Header: () => (
      <div>장치명</div>
    ),
    Cell: ({ row }) => (
      <>{row.original.module.modelNm}</>
    ),
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
    accessor: 'o2',
  },
  {
    Header: 'CO₂ (%)',
    accessor: 'co2',
  },
  {
    Header: 'CO (ppm)',
    accessor: 'co',
  },
  {
    Header: 'H₂S (ppm)',
    accessor: 'h2s',
  },
  {
    Header: 'CH₄ (%)',
    accessor: 'ch4',
  },
  {
    Header: '날짜',
    accessor: 'rgstDt',
  },
]