import React from 'react';
import './App.css';
import Console from './components/console';
import Input from './components/input';
import Output from './components/output';

const App = () => {

  return (
    <div className="App">
      <div className="col">
        <Input />
        <Console />
      </div>
      <div className="col">
        <Output />
      </div>
    </div>
  );
}

export default App;
