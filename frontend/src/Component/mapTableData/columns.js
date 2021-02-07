import { getYMDAndTimeFormatDate } from 'utils/getCustomFormatDate';

export const columns = (flag) => {
    return [
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
        Header: '위도',
        accessor: 'latitude',
      },
      {
        Header: '경도',
        accessor: 'longitude',
      },
      // {
      //   Header: 'GPS time',
      //   accessor: 'gpstime',
      // },
      {
        Header: 'major',
        accessor: 'major',
      },
      {
        Header: 'minor',
        accessor: 'minor',
      },
      {
        Header: 'macAddr',
        accessor: 'macAddr',
      },
      {
        Header: 'bssi',
        accessor: 'bssi',
      },
      {
        Header: 'freqeuncy',
        accessor: 'freqeuncy',
      },
      {
        Header: 'sf',
        accessor: 'sf',
      },
      {
        Header: 'rssi',
        accessor: 'rssi',
      },
      {
        Header: 'snr',
        accessor: 'snr',
      },
      // {
      //   Header: 'battery',
      //   accessor: 'battery',
      // },
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
} 