import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import classNames from 'classnames';

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

const Control = (props) => {
  const [ data, setData ] = useState(null);

  const getData = () => {
    axios.get("/api/get/gas/group", {})
      .then(response => {
        checkData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
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

  const checkData = useCallback((newData) => {
    setData(data => {
      const dataMap = new Map();

      newData.forEach(map => {
        const status = checkStatus(map);

        if (data) {
          const oldStatus = data.get(map.moduleIdx).status;

          if (oldStatus === 'blue' && status !== 'blue') {
            if (status === "danger") {
              props.serial("LP+WON");
            }

            setWarningLog(map, status);
          }
        }

        dataMap.set(map.moduleIdx, {...map, status: status})
      });

      return dataMap;
    });
  }, [setData])

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
                                   onClick={() => { props.serial("LP+WOFF"); }}/>
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