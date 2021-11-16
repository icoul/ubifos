import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Route, Switch } from "react-router-dom";

import Control from "./control/Control";
import TableData from "./tableData/TableData";
import GraphData from "./graphData/GraphData";
import LogData from "./logData/LogData";
import Location from "./location/Location";
import MapTableData from "./mapTableData/MapTableData";

import { MainContainer } from "./MainContainer.css";

import { crc_checker } from "utils/serialPortComponent";

/**
 * 장치 케이스
 * 장치가 꺼짐, 장치가 미수신, 정상이었다가 위험이 발견됨, 계속 위험상태, 위험이었다가 정상이 됨
 */
const compareStatusPrevAndNow = (prev, now) => {
  if (
    (prev === "warning" || prev === "danger") &&
    (now === "warning" || now === "danger")
  ) {
    return "constantDanger";
  }
  if (prev === "alarmOff" && (now === "warning" || now === "danger")) {
    return "alarmOff";
  }

  return now;
};

const setWarningLog = (logDataMap, status) => {
  axios
    .post("/api/set/warning", {
      logIdx: logDataMap.logIdx,
      moduleIdx: logDataMap.moduleIdx,
      status: status,
    })
    .then((response) => {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};

const serial = (code) => {
  axios
    .get("/api/serial/lp", { params: { code: crc_checker(code) } })
    .then((response) => {})
    .catch(function (error) {
      console.log(error);
    });
};

const Main = () => {
  const [time, setTime] = useState(0);
  const [criterion, setCriterion] = useState(null);
  const getCriterionData = () => {
    axios
      .get("/api/gasCriterion/getMapData")
      .then((response) => {
        setCriterion(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getCriterionData();
  }, []);

  /**
   * off : 기기가 꺼짐
   * blue : 모두 정상
   * danger : 정상이었다가 위험이 1개라도 발생
   */
  const [status, setStatus] = useState(new Map());
  const [logData, setLogData] = useState(null);

  const getNewGasLogData = () => {
    axios
      .get("/api/get/gas/group", {})
      .then((response) => {
        setLogData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    if (Number(time) !== 0) {
      const timer = window.setInterval(() => {
        serial("LP+WON");
      }, Number(time));

      return () => {
        window.clearInterval(timer);
      };
    }
  }, [time]);

  useEffect(() => {
    // 전체상태체크, 부저여부확인
    if (logData) {
      const statusCopy = new Map(status);

      logData.forEach((data) => {
        const status = data.status;

        // 위험 로그 기록 함수 호출
        if (
          status !== "off" &&
          status !== "blue" &&
          status[data.moduleIdx] === "blue"
        ) {
          setWarningLog(data, status);
        }

        // status state에 해당 장치idx값이 없는 경우
        if (!statusCopy.has(data.moduleIdx)) {
          statusCopy.set(data.moduleIdx, status);
          return;
        }

        statusCopy.set(
          data.moduleIdx,
          compareStatusPrevAndNow(statusCopy.get(data.moduleIdx), status)
        );
      });

      setStatus(() => {
        return new Map(statusCopy);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logData]);

  useEffect(() => {
    const dangerCount = Array.from(status.keys()).filter(
      (x) => status.get(x) === "danger" || status.get(x) === "warning"
    ).length;
    const blueCount = Array.from(status.keys()).filter(
      (x) => status.get(x) === "blue" || status.get(x) === "off"
    ).length;

    if (time === 0 && dangerCount > 0) {
      serial("LP+WON");
      setTime(2000);
    } else if (time === 2000 && blueCount === status.size) {
      serial("LP+WOFF");
      setTime(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, serial]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      getNewGasLogData();
    }, Number(3000));

    return () => {
      window.clearInterval(timer);
    };
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!logData) {
    getNewGasLogData();
    return null;
  }

  return (
    <MainContainer>
      <Switch>
        {/* <Route exact path="/" render={(props) => <Location {...props} />} />
        <Route
          path="/map/table"
          render={(props) => <MapTableData {...props} />}
        /> */}
        <Route
          exact
          path="/"
          render={(props) => (
            <Control
              logData={logData}
              serial={serial}
              setTime={setTime}
              status={status}
              setStatus={setStatus}
              time={time}
              criterion={criterion}
              {...props}
            />
          )}
        />
        <Route
          path="/table"
          render={(props) => <TableData criterion={criterion} {...props} />}
        />
        <Route path="/graph" render={(props) => <GraphData {...props} />} />
        <Route path="/log" render={(props) => <LogData {...props} />} />
      </Switch>
    </MainContainer>
  );
};

export default Main;
