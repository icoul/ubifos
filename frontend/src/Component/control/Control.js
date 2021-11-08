import React from "react";
import classNames from "classnames";
import moment from "moment";

import { ControlContainer } from "./Control.css";

import module_status_lamp_blue from "static/images/module_status_lamp_blue.png";
import module_status_lamp_danger from "static/images/module_status_lamp_danger.png";
import module_status_none from "static/images/module_status_none.png";

const criterionMap = ["o2", "co2", "co", "h2s", "ch4"];

const Control = ({ logData, serial, setTime, status, setStatus, time }) => {
  const handleClick = (moduleIdx) => {
    serial("LP+WOFF");
    setTime(0);
    setStatus((status) => {
      return status.set(moduleIdx, "alarmOff");
    });
  };

  return (
    <ControlContainer>
      <table>
        <thead>
          <tr className="top_legend_box">
            <th rowspan="2">센서명</th>
            <th rowspan="2">상태</th>
            <th rowspan="2" className="sign">
              O₂
            </th>
            <th rowspan="2" className="sign">
              CO₂
            </th>
            <th rowspan="2" className="sign">
              CO
            </th>
            <th rowspan="2" className="sign">
              H₂S
            </th>
            <th rowspan="2" className="sign">
              CH₄
            </th>
            <th className="communication-info">Battery</th>
            {/* <th className="communication-info">
              RSSI
              (dBm)
            </th> */}
          </tr>
          <tr className="top_legend_box">
            <th className="communication-info">RSSI(dBm)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="2">경보설정값</td>
            {/* <td>18% 미만</td>
            <td>1.5% 초과</td>
            <td>25ppm 초과</td>
            <td>10ppm 초과</td>
            <td>10LEL% 초과</td> */}
            <td style={{ fontSize: "27px" }}>19.5% 미만 23.5% 초과</td>
            <td>0.8% 초과</td>
            <td>179ppm 초과</td>
            <td>9ppm 초과</td>
            <td>9LEL% 초과</td>
            <td></td>
          </tr>
          {logData.map((data) => {
            return (
              <>
                <tr key={data.moduleIdx}>
                  <td rowspan="2" className="module_name_box">
                    {data.modelNm}
                    <br />
                    {data.status !== "off" && (
                      <span>{moment(data.rgstDt).format("HH:mm:ss")}</span>
                    )}
                  </td>
                  <td rowspan="2" className="module_status_box">
                    <div className="module_status">
                      {data.status !== "none" &&
                        data.status !== "off" &&
                        (data.status === "blue" ? (
                          <div className="module_status_lamp">
                            <img
                              src={module_status_lamp_blue}
                              alt="module_status_lamp_blue"
                            />
                          </div>
                        ) : (
                          <div className="module_status_lamp">
                            {status.get(data.moduleIdx) === "alarmOff" && (
                              <div className="alarm-off-text">
                                <span>Alarm OFF</span>
                              </div>
                            )}
                            <img
                              className="danger"
                              src={module_status_lamp_danger}
                              alt="module_status_lamp_danger"
                              onClick={() => {
                                handleClick(data.moduleIdx);
                              }}
                            />
                          </div>
                        ))}
                      <img
                        src={module_status_none}
                        alt="module_status_none"
                        onClick={() => {
                          handleClick(data.moduleIdx);
                        }}
                      />
                    </div>
                  </td>
                  {criterionMap.map((x) => {
                    return (
                      <td
                        rowspan="2"
                        key={x}
                        className={classNames(
                          "data_value",
                          (data.status === "danger" ||
                            (data.status === "none" && time === 2000)) &&
                            data[`${x}Status`] === "1" &&
                            "danger"
                        )}
                      >
                        {data.status !== "off" ? data[x] : "-"}
                        {data.status !== "off" &&
                          (x === "ch4" ? (
                            <sub>LEL%</sub>
                          ) : x === "o2" || x === "co2" ? (
                            <sub>%</sub>
                          ) : (
                            <sub>ppm</sub>
                          ))}
                      </td>
                    );
                  })}
                  <td
                    className="communication-info"
                    style={{ borderBottom: "2px #fff solid" }}
                  >
                    {Number(data.battery)} %
                  </td>
                </tr>
                <tr>
                  <td className="communication-info">{data.rssi}</td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </ControlContainer>
  );
};

export default Control;
