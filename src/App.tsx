import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import EditorPage from './pages/editor/index';
import PlayPage from './pages/play';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/editor/:id" children={<EditorPage />} />
          <Route path="/play" children={<PlayPage />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
