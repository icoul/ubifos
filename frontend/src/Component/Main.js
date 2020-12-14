import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Route, Switch } from "react-router-dom";

import Control from './control/Control';
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
  const [ time, setTime ] = useState(0);

  /**
  * off : 기기가 꺼짐
  * blue : 모두 정상
  * danger : 정상이었다가 위험이 1개라도 발생
  */
  const [ status, setStatus ] = useState({ 1: 'blue', 2: 'blue', 3: 'blue' })
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

    setData(dataMap);
  }, [])

  useEffect(() => {
    let first = '', second = '', third = '';

    // 전체상태체크, 부저여부확인
    if (data && data.size === 3) {
      // eslint-disable-next-line array-callback-return
      Array.from( data.keys() ).map((key) => {
        const moduleStatus = data.get(key).moduleStatus;
        
        if (moduleStatus !== 'off' && moduleStatus !== 'blue' && status[data.get(key).moduleIdx] === 'blue') {
          setWarningLog(data.get(key), moduleStatus);
        }
      });

      // 장치가 꺼짐
      if (status[1] !== 'off' && data.get(1).moduleStatus === 'off') {
        first = 'off';
      }
      if (status[2]  !== 'off' && data.get(2).moduleStatus === 'off') {
        second = 'off';
      }
      if (status[3]  !== 'off' && data.get(3).moduleStatus === 'off') {
        third = 'off';
      }

      // 장치가 미수신
      if (status[1] !== 'off' && data.get(1).moduleStatus === 'none') {
        first = 'none';
      }
      if (status[2]  !== 'off' && data.get(2).moduleStatus === 'none') {
        second = 'none';
      }
      if (status[3]  !== 'off' && data.get(3).moduleStatus === 'none') {
        third = 'none';
      }

      // 멀쩡했는데 위험이 발견됨
      if (first === '' && (status[1] !== 'danger' && status[1] !== 'constantDanger') && data.get(1).moduleStatus === 'danger') {
        first = 'danger';
      }
      if (second === '' && (status[2] !== 'danger' && status[2] !== 'constantDanger') && data.get(2).moduleStatus === 'danger') {
        second = 'danger';
      }
      if (third === '' && (status[3] !== 'danger' && status[3] !== 'constantDanger') && data.get(3).moduleStatus === 'danger') {
        third = 'danger';
      }

      // 계속 위험인 상태
      if (first === '' && status[1] === 'danger' && data.get(1).moduleStatus === 'danger') {
        first = 'constantDanger';
      }
      if (second === '' && status[2] === 'danger' && data.get(2).moduleStatus === 'danger') {
        second = 'constantDanger';
      }
      if (third === '' && status[3] === 'danger' && data.get(3).moduleStatus === 'danger') {
        third = 'constantDanger';
      }

      // 정상이 됨
      if (first === '' && status[1] !== 'blue' && data.get(1).moduleStatus === 'blue') {
        first = 'blue';
      }
      if (second === '' && status[2] !== 'blue' && data.get(2).moduleStatus === 'blue') {
        second = 'blue';
      }
      if (third === '' && status[3] !== 'blue' && data.get(3).moduleStatus === 'blue') {
        third = 'blue';
      }

      setStatus((status) => {
        return {
          1: first !== '' ? first : status[1], 
          2: second !== '' ? second : status[2],
          3: third !== '' ? third : status[3],
        }
      })
    }
    else if(!data) {
      setStatus((status) => {
        return {
          1: status[1], 
          2: status[2],
          3: status[3],
        }
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])
  
  useEffect(() => {
    if (time === 0 && (status[1] === 'danger' || status[2] === 'danger' || status[3] === 'danger')) {
      serial('LP+WON');
      setTime(2000);
    }
    else if (time === 2000 && 
        (status[1] === 'blue' || status[1] === 'off') && (status[2] === 'blue' || status[2] === 'off') && (status[3] === 'blue' || status[3] === 'off')) {
      serial('LP+WOFF');
      setTime(0);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status[1], status[2], status[3], serial])

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
        <Route
          exact path="/"
          render={props => <Control data={data} serial={serial} setTime={setTime} time={time} {...props} />} />
        <Route
          path="/table"
          render={props => <TableData {...props} />} />
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