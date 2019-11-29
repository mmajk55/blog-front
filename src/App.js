import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Blog from './Views/Blog/Blog';
import Panel from './Views/Panel/Panel';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/panel" component={Panel} />
          <Route path="/" component={Blog} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
