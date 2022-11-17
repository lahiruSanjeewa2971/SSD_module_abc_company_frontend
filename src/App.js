import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import {DataProvider} from './GlobalState'
import Pages from './components/mainpages/Pages';
import './App.css';

function App() {
  return (
    <DataProvider>
        <div className="App">
          <Pages />
        </div>
    </DataProvider>
  );
}

export default App;
