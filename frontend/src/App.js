import { Route, HashRouter as Router, Switch, withRouter } from "react-router-dom";

import Main from './component/Main';
import AppHeader from './component/AppHeader';

import './App.css';

function App() {
  return (
    <Router basename="/">
      <div className="App">
        <Route
            path="/"
            render={props => <AppHeader {...props} />} />
        <Switch>
          <Route
            exact path="/"
            render={props => <Main {...props} />} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
