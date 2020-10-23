import React, { useState } from 'react';
import './App.css';

import allData from './components/data.json';
import Alluser from './components/Alluser/Alluser';
import Userdetails from './components/Userdetails/Userdetails';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

function App() {
  const [data] = useState(allData);
  return (
    <Router>
      <Switch>
        <Route path="/users/:id" component={Userdetails} />
        <Route path="/">
          <Alluser data={data} itemsPerPage={10} startFrom={1} />
          <Redirect to="/users" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
