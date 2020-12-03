import React, { useEffect } from 'react';
import { Route, Switch } from "react-router-dom";

import Control from './control/Control';
import TableData from './tableData/TableData';
import GraphData from './graphData/GraphData';
import LogData from './logData/LogData';

import { MainContainer } from './MainContainer.css';
import { UARTOpen } from '../utils/serialPortComponent';

const Main = () => {
  useEffect(() => {
    UARTOpen(115200);
  }, [])
  return (
    <MainContainer>
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