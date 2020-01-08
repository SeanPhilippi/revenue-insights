import React from 'react';
import { AppContext } from '../Provider';

const ChartSelect = () => (
  <AppContext.Consumer>
    {
      ({ handleChartSelect, currentChart }) => (
        <div className="d-flex justify-content-between chart-select mb-2">
          <button
            value='1m'
            className={ currentChart === '1m' && 'active-chart'}
            onClick={ handleChartSelect }
          >
            1m
          </button>
          <button
            value='6m'
            className={ currentChart === '6m' && 'active-chart'}
            onClick={ handleChartSelect }
          >
            6m
          </button>
          <button
            value='ytd'
            className={ currentChart === 'ytd' && 'active-chart'}
            onClick={ handleChartSelect }
          >
            YTD
          </button>
          <button
            value='1y'
            className={ currentChart === '1y' && 'active-chart'}
            onClick={ handleChartSelect }
          >
            1y
          </button>
          <button
            value='all'
            className={ currentChart === 'all' && 'active-chart'}
            onClick={ handleChartSelect }
          >
            All
          </button>
        </div>
      )
    }
  </AppContext.Consumer>
);

export default ChartSelect;