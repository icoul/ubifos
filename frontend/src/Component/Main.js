import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Route, Switch } from "react-router-dom";

import Location from './location/Location';
import Control from './control/Control';
import MapTableData from './mapTableData/MapTableData';
import TableData from './tableData/TableData';
import GraphData from './graphData/GraphData';
import LogData from './logData/LogData';

import { MainContainer } from './MainContainer.css';

import { crc_checker } from 'utils/serialPortComponent';

const checkStatus = (map) => {
  if (map.offStatus !== '1' && map.noneStatus === '1') {
    return 'none';
  }

  if (map.offStatus === '1') {
    return 'off';
  }

  if (map.o2Status === '1' || map.h2sStatus === '1' || map.coStatus === '1' || map.ch4Status === '1' || map.co2Status === '1') {
    return 'danger'
  }

  return 'blue';
}

/**
  * 장치 케이스
  * 장치가 꺼짐, 장치가 미수신, 정상이었다가 위험이 발견됨, 계속 위험상태, 위험이었다가 정상이 됨
  */
const compareStatusPrevAndNow = (prev, now) => {
  if (prev === 'danger' && now === 'constantDanger') {
    return 'constantDanger';
  }

  return now;
}

const setWarningLog = (dataMap, status) => {
  axios.post("/api/set/warning", { logIdx: dataMap.logIdx, moduleIdx: dataMap.moduleIdx, status: status })
    .then(response => {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    })
}

const serial = (code) => {
  axios.get("/api/serial/lp", {params: {code: crc_checker(code)}})
  .then(response => {
  })
  .catch(function (error) {
    console.log(error);
  })
}

const Main = () => {
  const flag = true;
  const [ time, setTime ] = useState(0);

  /**
  * off : 기기가 꺼짐
  * blue : 모두 정상
  * danger : 정상이었다가 위험이 1개라도 발생
  */
  const [ status, setStatus ] = useState(new Map());
  const [ data, setData ] = useState(null);

  useEffect(() => {
    if(Number(time) !== 0) {
      const timer = window.setInterval(() => { serial('LP+WON'); }, Number(time));

      return () => {
        window.clearInterval(timer);
      };
    }
  }, [time])
  
  const getData = () => {
    axios.get("/api/get/gas/group", {})
      .then(response => {
        checkData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  const checkData = useCallback((newData) => {
    const list = [];
    const dataMap = new Map();
    
    newData.forEach((map) => {
      const moduleStatus = checkStatus(map);
      list.push(moduleStatus);
      dataMap.set(map.moduleIdx, {...map, moduleStatus: moduleStatus});
    });

    setData(() => { return dataMap; });
  }, [])

  useEffect(() => {
    // 전체상태체크, 부저여부확인
    if (data) {
      const statusCopy = new Map(status);

      Array.from( data.keys() ).forEach(( moduleIdx ) => {
        const moduleStatus = data.get(moduleIdx).moduleStatus;
        
        // 위험 로그 기록 함수 호출
        if (moduleStatus !== 'off' && moduleStatus !== 'blue' && status[data.get(moduleIdx).moduleIdx] === 'blue') {
          setWarningLog(data.get(moduleIdx), moduleStatus);
        }

        // status state에 해당 장치idx값이 없는 경우
        if (!statusCopy.has(moduleIdx)) {
          statusCopy.set(moduleIdx, moduleStatus);
          return;
        }

        statusCopy.set(moduleIdx, compareStatusPrevAndNow(status.get(moduleIdx), moduleStatus));
      });

      setStatus(() => { return new Map(statusCopy); })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])
  
  useEffect(() => {
    const dangerCount = Array.from( status.keys() ).filter( x => status.get(x) === 'danger' ).length;
    const blueCount = Array.from( status.keys() ).filter( x => status.get(x) === 'blue' || status.get(x) === 'off' ).length;

    if (time === 0 && dangerCount > 0) {
      serial('LP+WON');
      setTime(2000);
    }
    else if (time === 2000 && blueCount === status.size) {
      serial('LP+WOFF');
      setTime(0);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, serial])

  useEffect(() => {
    const timer = window.setInterval(() => {
      getData();
    }, Number(5000));

    return () => {
      window.clearInterval(timer);
    };
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!data) {
    getData();
    return null;
  }

  return (
    <MainContainer>
      <Switch>
        {/* <Route
          exact path="/"
          render={props => <Location {...props} />} /> 
        <Route
          path="/map/table"
          render={props => <MapTableData {...props} />} />*/}
        <Route
          exact path="/"
          render={props => <Control data={data} serial={serial} setTime={setTime} time={time} flag={flag} {...props} />} />
        <Route
          path="/table"
          render={props => <TableData flag={flag} {...props} />} />
        <Route
          path="/graph"
          render={props => <GraphData {...props} />} />
        <Route
          path="/log"
          render={props => <LogData {...props} />} />
      </Switch>
    </MainContainer>
  )
}

export default Main;