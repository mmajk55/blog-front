import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Feed from './Views/Feed/Feed';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" component={Feed} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
