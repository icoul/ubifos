import React from 'react';
import classNames from 'classnames';
import moment from 'moment';

import { ControlContainer } from './Control.css';

import module_status_lamp_blue from 'static/images/module_status_lamp_blue.png'
import module_status_lamp_danger from 'static/images/module_status_lamp_danger.png'
import module_status_none from 'static/images/module_status_none.png'

const criterionMap = ['o2', 'co2', 'co', 'h2s', 'ch4'];

const Control = ({ logData, serial, setTime, status, setStatus, time }) => {
  const handleClick = (moduleIdx) => {
    serial("LP+WOFF"); 
    setTime(0);
    setStatus((status) => {
      return status.set(moduleIdx, 'alarmOff');
    })
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
            {/* <th className="communication-info">Battery</th> */}
          </tr>
          {/* <tr className="top_legend_box">
            <th className="communication-info">RSSI(dBm)</th>
          </tr> */}
        </thead>
        <tbody>
          <tr>
            <td colSpan="2">경보설정값</td>
            {/* <td>18% 미만</td>
            <td>1.5% 초과</td>
            <td>25ppm 초과</td>
            <td>10ppm 초과</td>
            <td>10LEL% 초과</td> */}
            <td>19.5% 이하</td>
            <td>0.5% 이상</td>
            <td>25ppm 이상</td>
            <td>5ppm 이상</td>
            <td>5LEL% 이상</td>
            <td></td>
          </tr>
          {
            logData.map((data) => {
              return (
                <>
                  <tr key={ data.moduleIdx }>
                    <td className="module_name_box">
                      { data.modelNm }
                      <br/>
                      {
                        data.status !== 'off' && <span>{ moment(data.rgstDt).format('HH:mm:ss') }</span>
                      }
                    </td>
                    <td className="module_status_box">
                      <div className="module_status">
                        {
                          (data.status !== 'none' && data.status !== 'off') && ( 
                            data.status === 'blue' ? 
                            <div className="module_status_lamp">
                              <img src={module_status_lamp_blue} 
                                    alt="module_status_lamp_blue" />
                            </div> :
                            <div className="module_status_lamp">
                              { status.get(data.moduleIdx) === 'alarmOff' && <div className="alarm-off-text"><span>Alarm OFF</span></div> }
                              <img className="danger" 
                                    src={module_status_lamp_danger} 
                                    alt="module_status_lamp_danger" 
                                    onClick={() => { handleClick(data.moduleIdx); }}/>
                            </div>
                          )
                        }
                        <img src={module_status_none} 
                            alt="module_status_none"
                            onClick={() => { handleClick(data.moduleIdx); }} />
                      </div>
                    </td>
                    {
                      criterionMap.map(x => {
                        return (
                          <td key={x} 
                              className={classNames("data_value", (data.status === 'danger' || (data.status === 'none' && time === 2000)) && data[`${x}Status`] === '1' && 'danger')}>
                            {
                              data.status !== 'off' ? data[x] : '-' 
                            }
                            {
                              data.status !== 'off' && (x === 'ch4' ? <sub>LEL%</sub> : ((x === 'o2' || x === 'co2') ? <sub>%</sub> : <sub>ppm</sub>))
                            }
                          </td>
                        )
                      })
                    }
                    {/* <td>{Number(data.battery)} %</td> */}
                  </tr>
                  {/* <tr>
                    <td>{data.rssi}</td>
                  </tr> */}
                </>
              )
            })
          }
        </tbody>
      </table>
    </ControlContainer>
  )
}

export default Control;