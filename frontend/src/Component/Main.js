import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { Route, Switch } from "react-router-dom";

import Control from './control/Control';
import TableData from './tableData/TableData';
import GraphData from './graphData/GraphData';
import LogData from './logData/LogData';

import { MainContainer } from './MainContainer.css';

import { crc_checker } from 'utils/serialPortComponent';

const checkStatus = (map) => {
  if (map.noneStatus === '1') {
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

let sockJS = new SockJS("http://127.0.0.1:9070/ws");
let stompClient = Stomp.over(sockJS);
stompClient.debug= () => {};

const Main = () => {
  const [ time, setTime ] = useState(0);
  useEffect(() => {
    stompConnect();
  }, [])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const stompConnect = () => {
    stompClient = Stomp.over(sockJS);
    stompClient.connect({},
                        onConnected, 
                        failureWebsocket);
  }

  const onConnected = () => {
    stompClient.subscribe('/topic/return', (data) => {
      setTime(Number(data.body));
    });
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const failureWebsocket = (error) => {
    console.log('STOMP: ' + error);
    setTimeout(window.location.reload(), 10000);
    console.log('STOMP: Reconecting in 10 seconds');
  }
  
  const serial = useCallback((code) => {
    axios.get("/api/serial/lp", {params: {code: crc_checker(code)}})
    .then(response => {
    })
    .catch(function (error) {
      console.log(error);
    })
  }, [])

  /**
  * off : 기기가 꺼짐
  * blue : 모두 정상
  * danger : 정상이었다가 위험이 1개라도 발생
  */
  const [ status, setStatus ] = useState({ 0: 'off', 1: 'blue', 2: 'blue', 3: 'blue' })
  const [ data, setData ] = useState(null);

  useEffect(() => {
    if(Number(time) !== 0) {
      const timer = window.setInterval(() => { serial('LP+WON'); }, Number(time));

      return () => {
        window.clearInterval(timer);
      };
    }
  }, [serial, time])
  
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

      if (data && moduleStatus !== 'off') {
        const oldStatus = data.get(map.moduleIdx).status;

        // 이벤트로그기록
        if (oldStatus === 'blue' && moduleStatus !== 'blue') {
          setWarningLog(map, moduleStatus);
        }
      }

      list.push(moduleStatus);
      dataMap.set(map.moduleIdx, {...map, moduleStatus: moduleStatus});
    });

    setData(dataMap);
  }, [data])

  useEffect(() => {
    let first = '', second = '', third = '';

    // 전체상태체크, 부저여부확인
    if (data && data.size === 3) {
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

      // 장치가 꺼짐
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
      if (first === '' && status[1] !== 'danger' && data.get(1).moduleStatus === 'danger') {
        first = 'danger';
      }
      if (second === '' && status[2] !== 'danger' && data.get(2).moduleStatus === 'danger') {
        second = 'danger';
      }
      if (third === '' && status[3] !== 'danger' && data.get(3).moduleStatus === 'danger') {
        third = 'danger';
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
          ...status,
          1: first !== '' ? first : status[1], 
          2: second !== '' ? second : status[2],
          3: third !== '' ? third : status[3],
        }
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])
  
  useEffect(() => {
    if (status[0] === 'off' && (status[1] === 'danger' || status[2] === 'danger' || status[3] === 'danger')) {
      serial('LP+WON');
      setTime(3000);
      setStatus((status) => {
        return {
          ...status,
          0: 'on'
        };
      });
    }
    if (status[0] === 'on' && 
        (status[1] === 'blue' || status[1] === 'off') && (status[2] === 'blue' || status[2] === 'off') && (status[3] === 'blue' || status[3] === 'off')) {
      serial('LP+WOFF');
      setTime(0);
      setStatus((status) => {
        return {
          ...status,
          0: 'off'
        };
      });
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
          render={props => <Control setStatus={setStatus} data={data} serial={serial} setTime={setTime} {...props} />} />
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