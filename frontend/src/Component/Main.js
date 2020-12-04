import React from 'react';
import axios from 'axios';
import { Route, Switch } from "react-router-dom";

import Control from './control/Control';
import TableData from './tableData/TableData';
import GraphData from './graphData/GraphData';
import LogData from './logData/LogData';

import { MainContainer } from './MainContainer.css';

import { crc_checker } from 'utils/serialPortComponent';

const Main = () => {
  const serial = (code) => {
    axios.get("/api/serial/lp", {params: {code: code}})
    .then(response => {
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  return (
    <MainContainer>
      <div>
        <button onClick={() => { serial("LP+WON*3236\r") }}>LP+WON</button>
        <button onClick={() => { serial("LP+WOFF*81BA\r") }}>LP+WOFF</button>
        <button onClick={() => { serial("LP+EON*1F35\r") }}>LP+EON</button>
        <button onClick={() => { serial("LP+EOFF*7775\r") }}>LP+EOFF</button>
        <button onClick={() => { serial("LP+AON*C3F5\r") }}>LP+AON</button>
        <button onClick={() => { serial("LP+AOFF*BD84\r") }}>LP+AOF</button>
        <button onClick={() => { serial("PW+BATT*C76A\r") }}>PW+BATT</button>
        <button onClick={() => { serial("PW+OFF*95D7\r") }}>PW+OFF</button>
        {/* <button onClick={() => { serial("CR+ON") }}>CR+ON</button>
        <button onClick={() => { serial("CR+OFF") }}>CR+OFF</button>
        <button onClick={() => { serial("CR+CHK") }}>CR+CHK</button> */}
      </div>
      <Switch>
        <Route
          exact path="/"
          render={props => <Control {...props} />} />
        <Route
          path="/table"
          render={props => <TableData {...props} />} />
        <Route
          path="/graph"
          render={props => <GraphData {...props} />} />
        <Route
          path="/log"
          render={props => <LogData {...props} />} />
      </Switch>
    </MainContainer>
  )
}

export default Main;