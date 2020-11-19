import React from 'react';
import { Route, Switch } from "react-router-dom";

import Control from './control/Control';
import TableData from './tableData/TableData';
import GraphData from './graphData/GraphData';

import { MainContainer } from './MainContainer.css';

const Main = () => {
  return (
    <MainContainer>
      <Switch>
        <Route
          exact path="/"
          render={props => <Control {...props} />} />
        <Route
          exact path="/table"
          render={props => <TableData {...props} />} />
        <Route
          exact path="/graph"
          render={props => <GraphData {...props} />} />
      </Switch>
    </MainContainer>
  )
}

export default Main;