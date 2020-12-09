import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import classNames from 'classnames';
import SockJS from "sockjs-client";
import Stomp from "stompjs";

import { ControlContainer } from './Control.css';

import module_status_lamp_blue from 'static/images/module_status_lamp_blue.png'
import module_status_lamp_danger from 'static/images/module_status_lamp_danger.png'
import module_status_none from 'static/images/module_status_none.png'

const criterionMap = ['o2', 'co2', 'co', 'h2s', 'ch4'];

const checkStatus = (map) => {
  if (map.noneStatus === '1') {
    return 'none';
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

const Control = (props) => {
  const [ data, setData ] = useState(null);
  // 전체장비의 상태를 관리. DOM에 영향이 없기 때문에 state가 아닌 useRef를 사용
  // blue: 정상, danger: 위험
  let allModuleStatus = useRef('blue'); 
  let sendSiren = useRef(0); 
  let sirenStatus = useRef("1"); 

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const stompConnect = () => {
    stompClient = Stomp.over(sockJS);
    stompClient.connect({},
                        onConnected, 
                        failureWebsocket);
  }

  const onConnected = () => {
    sirenStatus.current = "0";

    stompClient.subscribe('/topic/return', (data) => {
      sirenStatus.current = data.body;
      console.log(`sirenStatus.current : ${sirenStatus.current}`);
    });
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const failureWebsocket = (error) => {
    console.log('STOMP: ' + error);
    setTimeout(window.location.reload(), 10000);
    console.log('STOMP: Reconecting in 10 seconds');
  }

  useEffect(()=>{
    stompConnect();
  }, []);

  const sirenRightCheck = useCallback(() => {
    if (sendSiren.current === 1 && sirenStatus.current === "0") {
      props.serial('LP+WON');

      setTimeout(() => {
        sirenRightCheck();
      }, 3000);
    }
  }, [props])

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
    setData(data => {
      const dataMap = new Map();
      // sirenOnChecker: 5개 수치 모두 정상이었다가 1개라도 위험상태에 돌입한 케이스. 사이렌 작동
      // sirenOffByAllStatusBlueChecker: 3개 장치의 모든 수치가 정상. 사이렌 오프
      let [ sirenOnChecker, sirenOffByAllStatusBlueChecker ] = [false, true];

      newData.forEach(map => {
        const status = checkStatus(map);

        if (data) {
          const oldStatus = data.get(map.moduleIdx).status;

          if (status === 'danger') {
            sirenOffByAllStatusBlueChecker = false;

            if (oldStatus === 'blue') {
              setWarningLog(map, status);
              sirenOnChecker = true;
            }
          }
        }
        else {
          if (status === 'danger') {
            sirenOffByAllStatusBlueChecker = false;
            sirenOnChecker = true;
          }
        }

        dataMap.set(map.moduleIdx, {...map, status: status});
      });

      if (sirenOnChecker && allModuleStatus.current === 'blue') {
        props.serial('LP+WON');
        allModuleStatus.current = 'danger';
        
        if (sendSiren.current === 0) {
          setTimeout(() => {
            sirenRightCheck();
          }, 3000);
        }

        sendSiren.current = 1;
      }
      if (sirenOffByAllStatusBlueChecker && allModuleStatus.current === 'danger') {
        props.serial('LP+WOFF');
        allModuleStatus.current = 'blue';
        sendSiren.current = 0;
        sirenStatus.current = "0"
      }

      return dataMap;
    });
  }, [props, sirenRightCheck])

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
    <ControlContainer>
      <table>
        <thead>
          <tr className="top_legend_box">
            <th>센서명</th>
            <th>상태</th>
            <th className="sign">O₂</th>
            <th className="sign">CO₂</th>
            <th className="sign">CO</th>
            <th className="sign">H₂S</th>
            <th className="sign">CH₄</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="2">경보설정값</td>
            <td>18% 미만</td>
            <td>1.5% 초과</td>
            <td>25ppm 초과</td>
            <td>10ppm 초과</td>
            <td>10% 초과</td>
          </tr>
          {
            Array.from( data.keys() ).map((key) => {
              return (
                <tr key={ data.get(key).moduleIdx }>
                  <td className="module_name_box">{ data.get(key).modelNm }</td>
                  <td className="module_status_box">
                    <div className="module_status">
                      <div className="module_status_lamp">
                        {
                          data.get(key).status !== 'none' && ( 
                            data.get(key).status === 'blue' ? 
                              <img src={module_status_lamp_blue} alt="module_status_lamp_blue" /> :
                              <img className="danger" 
                                   src={module_status_lamp_danger} 
                                   alt="module_status_lamp_danger" 
                                   onClick={() => { props.serial("LP+WOFF");
                                                    sendSiren.current = 0;
                                                    sirenStatus.current = "0" }}/>
                          )
                        }
                      </div>
                      <img src={module_status_none} alt="module_status_none" />
                    </div>
                  </td>
                  {
                    criterionMap.map(x => {
                      return (
                        <td key={x} 
                            className={classNames("data_value", data.get(key).status !== 'none' && data.get(key)[`${x}Status`] === '1' && 'danger')}>
                          {
                            data.get(key).status !== 'none' ? data.get(key)[x] : '-'
                          }
                          {
                            data.get(key).status !== 'none' && 
                              ((x === 'o2' || x === 'co2' || x === 'ch4') ? <sub>%</sub> : <sub>ppm</sub>)
                          }
                        </td>
                      )
                    })
                  }
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </ControlContainer>
  )
}

export default Control;