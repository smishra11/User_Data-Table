import React, { useState } from 'react';
import './App.css';

import allData from './components/data.json';
import Alluser from './components/Alluser/Alluser';

function App() {
  const [data] = useState(allData);
  return (
    <div className="container px-2">
      <Alluser data={data} itemsPerPage={10} startFrom={1} />
    </div>
  );
}

export default App;
