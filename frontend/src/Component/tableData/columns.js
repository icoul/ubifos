import { getYMDAndTimeFormatDate } from 'utils/getCustomFormatDate';

export const columns = (criterion) => {
  return [
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
        return checkGasStatus(row.original, criterion) === 'danger' ? (
          <span style={{ color: '#ff0018' }}>● 위험</span>
        ) : checkGasStatus(row.original, criterion) === 'warning' ? (
          <span style={{ color: '#e8ad2e' }}>● 경고</span>
        ) : (
          <span style={{ color: '#50bb5b' }}>● 정상</span>
        );
      },
    },
    {
      Header: 'O₂ (%)',
      accessor: 'o2',
    },
    {
      Header: 'CO₂ (ppm)',
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
    {
      id: 'battery',
      Header: () => {
        return <div>battery</div>;
      },
      Cell: ({ row }) => {
        return <>{Number(row.original.battery)} %</>;
      },
    },
    {
      id: 'rgstDt',
      Header: () => {
        return <div style={{ width: '100px' }}>날짜</div>;
      },
      Cell: ({ row }) => {
        return <>{getYMDAndTimeFormatDate(new Date(row.original.rgstDt))}</>;
      },
    },
  ];
};

const checker = (value, standType, standVal, standRange) => {
  if (standRange === 'A' && value > standVal) {
    return standType;
  }
  if (standRange === 'B' && value >= standVal) {
    return standType;
  }
  if (standRange === 'C' && value <= standVal) {
    return standType;
  }
  if (standRange === 'D' && value < standVal) {
    return standType;
  }

  return 'blue';
};

export const checkGasStatus = (checkTheLog, criterions) => {
  let result = 'blue';
  const gasCriterionMap = ['o2', 'h2s', 'co', 'ch4', 'co2'];

  gasCriterionMap.forEach((x) => {
    criterions[x]
      .filter((y) => {
        return y.standType !== 'criterion';
      })
      .forEach((gasCriterion) => {
        const check = checker(checkTheLog[x], gasCriterion.standType, gasCriterion.standVal, gasCriterion.standRange);

        if (check === 'danger') {
          result = 'danger';
        } else if (check === 'warning' && result === 'blue') {
          result = 'warning';
        }
      });
  });

  if (checkTheLog.coStatus === 3) {
    result = 'danger';
  } else if (checkTheLog.coStatus === 2 && result === 'blue') {
    result = 'warning';
  }

  return result;
};
