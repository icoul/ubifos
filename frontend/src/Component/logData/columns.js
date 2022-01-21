import { getYMDAndTimeFormatDate } from 'utils/getCustomFormatDate';

export const columns = [
  {
    Header: '',
    accessor: 'col1',
  },
  {
    id: 'modelNm',
    Header: () => {
      return <div>장치명</div>;
    },
    Cell: ({ row }) => {
      return <>{row.original.module.modelNm}</>;
    },
  },
  {
    id: 'status',
    Header: () => {
      return <div>상태</div>;
    },
    Cell: ({ row }) => {
      return row.original.status === 'danger' ? <span style={{ color: '#ff0018' }}>● 위험</span> : <span style={{ color: '#ababab' }}>● 미수신</span>;
    },
  },
  {
    id: 'o2',
    Header: () => {
      return <div>O₂ (%)</div>;
    },
    Cell: ({ row }) => {
      return <>{row.original.gas.o2}</>;
    },
  },
  {
    id: 'co2',
    Header: () => {
      return <div>CO₂ (ppm)</div>;
    },
    Cell: ({ row }) => {
      return <>{row.original.gas.co2}</>;
    },
  },
  {
    id: 'co',
    Header: () => {
      return <div>CO (ppm)</div>;
    },
    Cell: ({ row }) => {
      return <>{row.original.gas.co}</>;
    },
  },
  {
    id: 'h2s',
    Header: () => {
      return <div>H₂S (ppm)</div>;
    },
    Cell: ({ row }) => {
      return <>{row.original.gas.h2s}</>;
    },
  },
  {
    id: 'ch4',
    Header: () => {
      return <div>CH₄ (%)</div>;
    },
    Cell: ({ row }) => {
      return <>{row.original.gas.ch4}</>;
    },
  },
  {
    id: 'rgstDt',
    Header: () => {
      return <div>날짜</div>;
    },
    Cell: ({ row }) => {
      return <>{getYMDAndTimeFormatDate(new Date(row.original.rgstDt))}</>;
    },
  },
];
