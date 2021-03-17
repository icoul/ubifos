import React from 'react';
import classNames from 'classnames';
import moment from 'moment';

import { ControlContainer } from './Control.css';

import module_status_lamp_blue from 'static/images/module_status_lamp_blue.png'
import module_status_lamp_danger from 'static/images/module_status_lamp_danger.png'
import module_status_none from 'static/images/module_status_none.png'

const criterionMap = ['o2', 'co2', 'co', 'h2s', 'ch4'];

const Control = ({ data, serial, setTime, time, flag }) => {
  const handleClick = () => {
    serial("LP+WOFF"); 
    setTime(0);
  }

  return (
    <ControlContainer flag={flag}>
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
            <td>10LEL% 초과</td>
          </tr>
          {
            Array.from( data.keys() ).map((key) => {
              return (
                <>
                  <tr key={ data.get(key).moduleIdx }>
                    <td className="module_name_box" rowspan={flag ? '1' : '2'}>
                      { data.get(key).modelNm }
                      <br/>
                      {
                        data.get(key).moduleStatus === 'danger' && <span>{ moment(data.get(key).rgstDt).format('HH:mm:ss') }</span>
                      }
                    </td>
                    <td className="module_status_box" rowspan={flag ? '1' : '2'}>
                      <div className="module_status">
                        {
                          (data.get(key).moduleStatus !== 'none' && data.get(key).moduleStatus !== 'off') && ( 
                            data.get(key).moduleStatus === 'blue' ? 
                            <div className="module_status_lamp">
                              <img src={module_status_lamp_blue} 
                                    alt="module_status_lamp_blue" />
                            </div> :
                            <div className="module_status_lamp">
                              <img className="danger" 
                                    src={module_status_lamp_danger} 
                                    alt="module_status_lamp_danger" 
                                    onClick={() => { handleClick(); }}/>
                            </div>
                          )
                        }
                        <img src={module_status_none} 
                            alt="module_status_none"
                            onClick={() => { handleClick(); }} />
                      </div>
                    </td>
                    {
                      criterionMap.map(x => {
                        return (
                          <td key={x} 
                              className={classNames("data_value", (data.get(key).moduleStatus === 'danger' || (data.get(key).moduleStatus === 'none' && time === 2000)) && data.get(key)[`${x}Status`] === '1' && 'danger')}>
                            {
                              data.get(key).moduleStatus !== 'off' ? data.get(key)[x] : '-' 
                            }
                            {
                              data.get(key).moduleStatus !== 'off' && (x === 'ch4' ? <sub>LEL%</sub> : ((x === 'o2' || x === 'co2') ? <sub>%</sub> : <sub>ppm</sub>))
                            }
                          </td>
                        )
                      })
                    }
                  </tr>
                  {
                    !flag && 
                    <tr>
                      <td className="module-value">freqeuncy: { data.get(key).freqeuncy }</td>
                      <td className="module-value">sf: { data.get(key).sf }</td>
                      <td className="module-value">rssi: { data.get(key).rssi }</td>
                      <td className="module-value">snr: { data.get(key).snr }</td>
                      <td className="module-value"></td>
                    </tr>
                  }
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