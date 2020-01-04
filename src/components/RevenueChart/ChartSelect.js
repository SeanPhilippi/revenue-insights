import React from 'react';
import { AppContext } from '../Provider';

const ChartSelect = () => (
  <AppContext.Consumer>
    {
      ({ handleChartSelect }) => (
        <div className="float-left">
          <button value='1m' onClick={ handleChartSelect }>1m</button>
          <button value='6m' onClick={ handleChartSelect }>6m</button>
          <button value='ytd' onClick={ handleChartSelect }>YTD</button>
          <button value='1y' onClick={ handleChartSelect }>1y</button>
          <button value='all' onClick={ handleChartSelect }>all</button>
        </div>
      )
    }
  </AppContext.Consumer>
);

export default ChartSelect;