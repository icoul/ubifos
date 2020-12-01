import { getYMDAndTimeFormatDate } from 'utils/getCustomFormatDate';

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
        row.original.status === 'danger' ? 
          <span style={{color: '#ff0018'}}>● 위험</span> : <span style={{color: '#ababab'}}>● 미수신</span>
      ),
    },
    {
      id: 'o2',
      Header: () => (
        <div>O₂ (%)</div>
      ),
      Cell: ({ row }) => (
        <>{row.original.gas.o2}</>
      ),
    },
    {
      id: 'co2',
      Header: () => (
        <div>CO₂ (%)</div>
      ),
      Cell: ({ row }) => (
        <>{row.original.gas.co2}</>
      ),
    },
    {
      id: 'co',
      Header: () => (
        <div>CO (ppm)</div>
      ),
      Cell: ({ row }) => (
        <>{row.original.gas.co}</>
      ),
    },
    {
      id: 'h2s',
      Header: () => (
        <div>H₂S (ppm)</div>
      ),
      Cell: ({ row }) => (
        <>{row.original.gas.h2s}</>
      ),
    },
    {
      id: 'ch4',
      Header: () => (
        <div>CH₄ (%)</div>
      ),
      Cell: ({ row }) => (
        <>{row.original.gas.ch4}</>
      ),
    },
    {
      id: 'rgstDt',
      Header: () => (
        <div>날짜</div>
      ),
      Cell: ({ row }) => (
        <>{ getYMDAndTimeFormatDate(new Date(row.original.rgstDt)) }</>
      ),
    },
  ]