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
        row.original.o2 < 18 || row.original.h2s > 25 || row.original.co > 10 || row.original.ch4 > 10 || row.original.co2 > 1.5 ? 
          <span style={{color: '#ff0018'}}>● 위험</span> : <span style={{color: '#50bb5b'}}>● 정상</span>
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