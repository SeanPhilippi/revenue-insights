import React from 'react';
import Provider from './components/Provider';
import RevenueChart from './components/RevenueChart/RevenueChart.js';
import './App.css';

const App = () => {
  return (
    <div className="App d-flex align-items-center">
      <Provider>
        <RevenueChart />
      </Provider>
    </div>
  );
};

export default App;