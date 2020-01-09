import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Router, Route, Switch } from "react-router-dom";
import { authorizationActions } from './Views/Auth/duck';
import history from "./history";
import _ from "lodash";
import Blog from "./Views/Blog/Blog";
import Panel from "./Views/Panel/Panel";
import "./App.css";

const App = () => {
  const { token, expiryDate} = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (expiryDate) {
      const remainingMilliseconds =
      new Date(expiryDate).getTime() - new Date().getTime();
      setTimeout(() => {
        dispatch(authorizationActions.logout());
        history.push('/')
      }, remainingMilliseconds);
    }
  }, [expiryDate]);

  return (
    <div className="App">
      <Router history={history}>
        <Switch>
          {token && <Route path="/panel" component={Panel} />}
          <Route path="/" component={Blog} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
