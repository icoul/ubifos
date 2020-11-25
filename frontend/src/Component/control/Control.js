import React from 'react';

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
            <th className="sign">CH₄</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colspan="2">경보설정값</td>
            <td>18% 미만</td>
            <td>1.5% 초과</td>
            <td>25ppm 초과</td>
            <td>10ppm 초과</td>
            <td>10% 초과</td>
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
            <td className="data_value">10<sub>%</sub></td>
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
            <td className="data_value">10<sub>%</sub></td>
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
            <td className="data_value danger">25<sub>ppm</sub></td>
            <td className="data_value">10<sub>ppm</sub></td>
            <td className="data_value">10<sub>%</sub></td>
          </tr>
        </tbody>
      </table>
    </ControlContainer>
  )
}

export default Control;