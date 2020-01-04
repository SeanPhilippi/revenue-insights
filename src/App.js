import React from 'react';
import Provider from './components/Provider';
import RevenueChart from './components/RevenueChart/RevenueChart.js';
import './App.css';

function App() {
  return (
    <div className="App">
      <Provider>
        <RevenueChart />
      </Provider>
    </div>
  );
};

export default App;