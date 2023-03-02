import React from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Database from './containers/Database';
import Authentication from './containers/Authentification';

const App = () => {
  return (
    <Router>
      <Route component={Authentication} path="/" exact />
      <Route component={Database} path="/database" />
    </Router>
  );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
