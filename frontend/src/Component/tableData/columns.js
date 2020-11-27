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
      row.original.o2 < 18 || row.original.h2s > 25 || row.original.co > 10 || row.original.ch4 > 10 || row.original.co2 > 1.5 ? 
        <span style={{color: '#ff0018'}}>● 위험</span> : <span style={{color: '#50bb5b'}}>● 정상</span>
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