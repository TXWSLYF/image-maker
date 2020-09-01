import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import EditorPage from './pages/editor/index';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/editor/:id" children={<EditorPage />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
