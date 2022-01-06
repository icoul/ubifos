import React from "react";
// import axios from "axios";
import classNames from "classnames";
import moment from "moment";

import { ControlContainer } from "./Control.css";

import module_status_lamp_blue from "static/images/module_status_lamp_blue.png";
import module_status_lamp_warning from "static/images/module_status_lamp_warning.png";
import module_status_lamp_danger from "static/images/module_status_lamp_danger.png";
import module_status_none from "static/images/module_status_none.png";

import ModuleNameBox from "./ModuleNameBox";

const criterionMap = ["o2", "co2", "co", "h2s", "ch4"];
const utmMap = {
  o2: "%",
  co2: "%",
  h2s: "ppm",
  co: "ppm",
  ch4: "%",
  leakage: "",
  hf: "ppm",
  nh3: "ppm",
  ph: "pH",
  ph_leakage: "pH",
  vibration: "%",
  temperature: "℃",
  humidity: "%",
};
const reverseRangeMap = {
  A: "초과",
  B: "이상",
  C: "이하",
  D: "미만",
};

const Control = ({
  logData,
  serial,
  setTime,
  status,
  setStatus,
  time,
  criterion,
}) => {
  const handleClick = (moduleIdx) => {
    serial("LP+WOFF");
    setTime(0);
    setStatus((status) => {
      return status.set(moduleIdx, "alarmOff");
    });
  };

  // const updateModule = () => {
  //   axios
  //     .post('/api/module/update', (req, res) => {
  //     axios.update({modelNm: req.body.change.modelNm}, {
  //       where: {moduleIdx: req.body.change.moduleIdx}})
  //     .then(result => res.send(result))
  //     .catch(err=>{throw err})
  //   })
  // }

  return (
    <ControlContainer>
      <table>
        <thead>
          <tr className="top_legend_box">
            <th rowSpan="2">센서명</th>
            <th rowSpan="2">상태</th>
            <th rowSpan="2" className="sign">
              O₂
            </th>
            <th rowSpan="2" className="sign">
              CO₂
            </th>
            <th rowSpan="2" className="sign">
              CO
            </th>
            <th rowSpan="2" className="sign">
              H₂S
            </th>
            <th rowSpan="2" className="sign">
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
            <td style={{ fontSize: "17px" }}>
              {criterion &&
                criterion["o2"]
                  .filter((x) => x.standType !== "criterion")
                  .map((data) => {
                    return `${data.standVal}${utmMap["o2"]}${
                      reverseRangeMap[data.standRange]
                    } ${data.standType === "danger" ? "위험" : "경고"}`;
                  })
                  .join(" ")}
            </td>
            <td style={{ fontSize: "17px" }}>
              {criterion &&
                criterion["co2"]
                  .filter((x) => x.standType !== "criterion")
                  .map((data) => {
                    return `${data.standVal}${utmMap["co2"]}${
                      reverseRangeMap[data.standRange]
                    } ${data.standType === "danger" ? "위험" : "경고"}`;
                  })
                  .join(" ")}
            </td>
            <td style={{ fontSize: "17px" }}>
              {criterion &&
                criterion["co"]
                  .filter((x) => x.standType !== "criterion")
                  .map((data) => {
                    return `${data.standVal}${utmMap["co"]}${
                      reverseRangeMap[data.standRange]
                    } ${data.standType === "danger" ? "위험" : "경고"}`;
                  })
                  .join(" ")}
            </td>
            <td style={{ fontSize: "17px" }}>
              {criterion &&
                criterion["h2s"]
                  .filter((x) => x.standType !== "criterion")
                  .map((data) => {
                    return `${data.standVal}${utmMap["h2s"]}${
                      reverseRangeMap[data.standRange]
                    } ${data.standType === "danger" ? "위험" : "경고"}`;
                  })
                  .join(" ")}
            </td>
            <td style={{ fontSize: "17px" }}>
              {criterion &&
                criterion["ch4"]
                  .filter((x) => x.standType !== "criterion")
                  .map((data) => {
                    return `${data.standVal}${utmMap["ch4"]}${
                      reverseRangeMap[data.standRange]
                    } ${data.standType === "danger" ? "위험" : "경고"}`;
                  })
                  .join(" ")}
            </td>
            <td></td>
          </tr>
          {logData.map((data) => {
            return (
              <>
                <tr key={data.moduleIdx}>
                  <td rowSpan="2" className="module_name_box">
                    <ModuleNameBox moduleIdx={data.moduleIdx} modelNm={data.modelNm} />
                    {data.status !== "off" && (
                      <span>{moment(data.rgstDt).format("HH:mm:ss")}</span>
                    )}
                  </td>
                  <td rowSpan="2" className="module_status_box">
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
                        ) : data.status === "warning" ? (
                          <div className="module_status_lamp">
                            {status.get(data.moduleIdx) === "alarmOff" && (
                              <div className="alarm-off-text">
                                <span>Alarm OFF</span>
                              </div>
                            )}
                            <img
                              className="warning"
                              src={module_status_lamp_warning}
                              alt="module_status_lamp_warning"
                              onClick={() => {
                                handleClick(data.moduleIdx);
                              }}
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
                        rowSpan="2"
                        key={x}
                        className={classNames(
                          "data_value",
                          (data.status === "danger" ||
                            data.status === "warning" ||
                            (data.status === "none" && time === 2000)) &&
                            data[`${x}Status`] === "danger" &&
                            "danger",
                          (data.status === "danger" ||
                            data.status === "warning") &&
                            data[`${x}Status`] === "warning" &&
                            "warning"
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
