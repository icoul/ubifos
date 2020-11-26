import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames';

import { ControlContainer } from './Control.css';

import module_status_lamp_blue from 'static/images/module_status_lamp_blue.png'
import module_status_lamp_danger from 'static/images/module_status_lamp_danger.png'
import module_status_none from 'static/images/module_status_none.png'

const criterionMap = ['o2', 'co2', 'co', 'h2s', 'ch4']

const Control = () => {
  const [ data, setData ] = useState(null);

  const getData = () => {
    axios.get("/api/get/gas/group", {})
      .then(response => {
        setData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
  }

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
            data.map((d) => {
              return (
                <tr key={ d.modelIdx }>
                  <td className="module_name_box">{ d.modelNm }</td>
                  <td className="module_status_box">
                    <div className="module_status">
                      <div className="module_status_lamp">
                        {
                          d.noneStatus === 0 && ( 
                            d.o2Status === 0 && d.h2sStatus === 0 && d.coStatus === 0 && d.ch4Status === 0 && d.co2Status === 0 ? 
                              <img src={module_status_lamp_blue} alt="module_status_lamp_blue" /> :
                              <img className="danger" src={module_status_lamp_danger} alt="module_status_lamp_danger" />
                          )
                        }
                      </div>
                      <img src={module_status_none} alt="module_status_none" />
                    </div>
                  </td>
                  {
                    criterionMap.map(key => {
                      return (
                        <td key={key} 
                            className={classNames("data_value", d[`${key}Status`] === 1 && 'danger')}>
                          { d[key] }<sub>%</sub>
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