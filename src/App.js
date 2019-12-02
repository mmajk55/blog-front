import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import _ from 'lodash';
import Blog from './Views/Blog/Blog';
import Panel from './Views/Panel/Panel';
import './App.css';

function App() {
  const [accessToken, setAccessToken] = useState(undefined);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(!_.isEmpty(token)) {
      setAccessToken(token);
    }
  }, [accessToken])

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/panel" render={props => (
            <Panel token={accessToken}/>
          )} />
          <Route path="/" component={Blog} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
