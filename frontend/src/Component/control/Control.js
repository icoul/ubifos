import React from 'react';
import classNames from 'classnames';

import { ControlContainer } from './Control.css';

import module_status_lamp_blue from 'static/images/module_status_lamp_blue.png'
import module_status_lamp_danger from 'static/images/module_status_lamp_danger.png'
import module_status_none from 'static/images/module_status_none.png'

const criterionMap = ['o2', 'co2', 'co', 'h2s', 'ch4'];

const Control = ({ data, serial, setTime }) => {
  const handleClick = () => {
    serial("LP+WOFF"); 
    setTime(0);
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
                          (data.get(key).moduleStatus !== 'none' && data.get(key).moduleStatus !== 'off') && ( 
                            data.get(key).moduleStatus === 'blue' ? 
                              <img src={module_status_lamp_blue} 
                                   alt="module_status_lamp_blue" /> :
                              <img className="danger" 
                                   src={module_status_lamp_danger} 
                                   alt="module_status_lamp_danger" 
                                   onClick={() => { handleClick(); }}/>
                          )
                        }
                      </div>
                      <img src={module_status_none} 
                           alt="module_status_none"
                           onClick={() => { handleClick(); }} />
                    </div>
                  </td>
                  {
                    criterionMap.map(x => {
                      return (
                        <td key={x} 
                            className={classNames("data_value", (data.get(key).moduleStatus !== 'none' && data.get(key).moduleStatus !== 'off') && data.get(key)[`${x}Status`] === '1' && 'danger')}>
                          {
                            (data.get(key).moduleStatus !== 'none' && data.get(key).moduleStatus !== 'off')  ? data.get(key)[x] : '-'
                          }
                          {
                            (data.get(key).moduleStatus !== 'none' && data.get(key).moduleStatus !== 'off') && 
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