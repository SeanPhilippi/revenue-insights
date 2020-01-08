import React from 'react';
import { AppContext } from '../Provider';

const ChartSelect = () => {
  const chartOptions = ['1m', '6m', 'YTD', '1y', 'All'];
  return (
    <AppContext.Consumer>
      {
        ({ handleChartSelect, currentChart }) => (
          <div className="d-flex justify-content-between chart-select mb-2">
            {chartOptions.map(option => (
                <button
                  value={ option.toLowerCase() }
                  className={ option.toLowerCase() === currentChart && 'active-chart'}
                  onClick={ handleChartSelect }
                >
                  { option }
                </button>
              )
            )}
          </div>
        )
      }
    </AppContext.Consumer>
  )
};

export default ChartSelect;