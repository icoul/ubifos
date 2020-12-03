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
    axios.get("/api/serial/lp", {params: {code: crc_checker(code)}})
    .then(response => {
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  return (
    <MainContainer>
      <div>
        <button onClick={() => { serial("LP+WON") }}>LP+WON</button>
        <button onClick={() => { serial("LP+WOFF") }}>LP+WOFF</button>
        <button onClick={() => { serial("LP+EON") }}>LP+EON</button>
        <button onClick={() => { serial("LP+EOFF") }}>LP+EOFF</button>
        <button onClick={() => { serial("LP+AON") }}>LP+AON</button>
        <button onClick={() => { serial("LP+AOF") }}>LP+AOF</button>
        <button onClick={() => { serial("PW+BATT") }}>PW+BATT</button>
        <button onClick={() => { serial("PW+OFF") }}>PW+OFF</button>
        <button onClick={() => { serial("CR+ON") }}>CR+ON</button>
        <button onClick={() => { serial("CR+OFF") }}>CR+OFF</button>
        <button onClick={() => { serial("CR+CHK") }}>CR+CHK</button>
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