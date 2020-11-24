import React from 'react';
import { ImArrowUp, ImArrowDown } from 'react-icons/im';

import { ControlContainer } from './Control.css';

import module_status_lamp_blue from 'static/images/module_status_lamp_blue.png'
import module_status_lamp_warning from 'static/images/module_status_lamp_warning.png'
import module_status_lamp_danger from 'static/images/module_status_lamp_danger.png'
import module_status_none from 'static/images/module_status_none.png'

const Control = () => {
  return (
    <ControlContainer>
      <div className="top_legend_box">
        <div></div>
        <div><span>O₂</span></div>
        <div><span>CO₂</span></div>
        <div><span>CO</span></div>
        <div><span>H₂S</span></div>
        <div><span>LEL</span></div>
      </div>
      <div className="data_box">
        <div><span>기준값</span></div>
        <div><span>18 <sub>%</sub></span> <ImArrowDown /></div>
        <div><span>1.5 <sub>%</sub></span> <ImArrowUp /></div>
        <div><span>25 <sub>ppm</sub></span> <ImArrowUp /></div>
        <div><span>10 <sub>ppm</sub></span> <ImArrowUp /></div>
        <div><span>10 <sub>ppm</sub></span> <ImArrowUp /></div>
      </div>
      <div className="data_box">
        <div className="module_name_box">
          <div className="module_status">
            <div className="module_status_lamp">
              <img className="danger" src={module_status_lamp_danger} alt="module_status_lamp_danger" />
            </div>
            <img src={module_status_none} alt="module_status_none" />
          </div>
          <div className="module_name">장치1</div>
        </div>
        <div className="data_value"><span>18<sub>%</sub></span></div>
        <div className="data_value"><span>1.5<sub>%</sub></span></div>
        <div className="data_value"><span>25<sub>ppm</sub></span></div>
        <div className="data_value"><span>10<sub>ppm</sub></span></div>
        <div className="data_value"><span>10<sub>ppm</sub></span></div>
      </div>
      <div className="data_box">
        <div className="module_name_box">
          <div className="module_status">
            <div className="module_status_lamp">
              <img src={module_status_lamp_blue} alt="module_status_lamp_blue" />
            </div>
            <img src={module_status_none} alt="module_status_none" />
          </div>
          <div className="module_name">장치2</div>
        </div>
        <div className="data_value"><span>18<sub>%</sub></span></div>
        <div className="data_value"><span>1.5<sub>%</sub></span></div>
        <div className="data_value"><span>25<sub>ppm</sub></span></div>
        <div className="data_value"><span>10<sub>ppm</sub></span></div>
        <div className="data_value"><span>10<sub>ppm</sub></span></div>
      </div>
      <div className="data_box">
        <div className="module_name_box">
          <div className="module_status">
            <img src={module_status_none} alt="module_status_none" />
          </div>
          <div className="module_name">장치3</div>
        </div>
        <div className="data_value"><span>18<sub>%</sub></span></div>
        <div className="data_value"><span>1.5<sub>%</sub></span></div>
        <div className="data_value"><span>25<sub>ppm</sub></span></div>
        <div className="data_value"><span>10<sub>ppm</sub></span></div>
        <div className="data_value"><span>10<sub>ppm</sub></span></div>
      </div>
    </ControlContainer>
  )
}

export default Control;