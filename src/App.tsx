import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Editor from './pages/editor/index';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/editor/:id" children={<Editor />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
