import React from 'react';
import { ImArrowUp, ImArrowDown } from 'react-icons/im';

import { ControlContainer } from './Control.css';

import module_status_lamp_blue from 'static/images/module_status_lamp_blue.png'
import module_status_lamp_danger from 'static/images/module_status_lamp_danger.png'
import module_status_none from 'static/images/module_status_none.png'

const Control = () => {
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
            <th className="sign">LEL</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colspan="2">기준값</td>
            <td>18 <sub>%</sub> <ImArrowDown /></td>
            <td>1.5 <sub>%</sub> <ImArrowUp /></td>
            <td>25 <sub>ppm</sub> <ImArrowUp /></td>
            <td>10 <sub>ppm</sub> <ImArrowUp /></td>
            <td>10 <sub>ppm</sub> <ImArrowUp /></td>
          </tr>
          <tr>
            <td className="module_name_box">센서1</td>
            <td className="module_status_box">
              <div className="module_status">
                <div className="module_status_lamp">
                  <img className="danger" src={module_status_lamp_danger} alt="module_status_lamp_danger" />
                </div>
                <img src={module_status_none} alt="module_status_none" />
              </div>
            </td>
            <td className="data_value">18<sub>%</sub></td>
            <td className="data_value">1.5<sub>%</sub></td>
            <td className="data_value">25<sub>ppm</sub></td>
            <td className="data_value">10<sub>ppm</sub></td>
            <td className="data_value">10<sub>ppm</sub></td>
          </tr>
          <tr>
            <td className="module_name_box">센서2</td>
            <td className="module_status_box">
              <div className="module_status">
                <div className="module_status_lamp">
                  <img className="danger" src={module_status_lamp_danger} alt="module_status_lamp_danger" />
                </div>
                <img src={module_status_none} alt="module_status_none" />
              </div>
            </td>
            <td className="data_value">18<sub>%</sub></td>
            <td className="data_value">1.5<sub>%</sub></td>
            <td className="data_value">25<sub>ppm</sub></td>
            <td className="data_value">10<sub>ppm</sub></td>
            <td className="data_value">10<sub>ppm</sub></td>
          </tr>
          <tr>
            <td className="module_name_box">센서3</td>
            <td className="module_status_box">
              <div className="module_status">
                <div className="module_status_lamp">
                  <img className="danger" src={module_status_lamp_danger} alt="module_status_lamp_danger" />
                </div>
                <img src={module_status_none} alt="module_status_none" />
              </div>
            </td>
            <td className="data_value">18<sub>%</sub></td>
            <td className="data_value">1.5<sub>%</sub></td>
            <td className="data_value">25<sub>ppm</sub></td>
            <td className="data_value">10<sub>ppm</sub></td>
            <td className="data_value">10<sub>ppm</sub></td>
          </tr>
        </tbody>
      </table>
      {/* <div className="top_legend_box">
        
      </div>
      <div className="data_box">
        
      </div>
      
      <div className="data_box">
        <div className="module_name_box">센서2</div>
        <div className="module_status_box">
          <div className="module_status">
            <div className="module_status_lamp">
              <img className="danger" src={module_status_lamp_danger} alt="module_status_lamp_danger" />
            </div>
            <img src={module_status_none} alt="module_status_none" />
          </div>
        </div>
        <div className="data_value">18<sub>%</sub></div>
        <div className="data_value">1.5<sub>%</sub></div>
        <div className="data_value">25<sub>ppm</sub></div>
        <div className="data_value">10<sub>ppm</sub></div>
        <div className="data_value">10<sub>ppm</sub></div>
      </div>
      <div className="data_box">
        <div className="module_name_box">센서3</div>
        <div className="module_status_box">
          <div className="module_status">
            <div className="module_status_lamp">
              <img className="danger" src={module_status_lamp_danger} alt="module_status_lamp_danger" />
            </div>
            <img src={module_status_none} alt="module_status_none" />
          </div>
        </div>
        <div className="data_value">18<sub>%</sub></div>
        <div className="data_value">1.5<sub>%</sub></div>
        <div className="data_value">25<sub>ppm</sub></div>
        <div className="data_value">10<sub>ppm</sub></div>
        <div className="data_value">10<sub>ppm</sub></div>
      </div> */}
    </ControlContainer>
  )
}

export default Control;