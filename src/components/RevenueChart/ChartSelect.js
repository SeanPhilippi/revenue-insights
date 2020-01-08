import React from 'react';
import { AppContext } from '../Provider';

const ChartSelect = () => {
  const chartOptions = ['1m', '6m', 'YTD', '1y', 'All'];
  return (
    <AppContext.Consumer>
      {
        ({ handleChartSelect, currentChart }) => (
          <div className="chart-select">
            <label className="text-white">
              Date Range
            </label>
            <div className="d-flex justify-content-between mb-2">
              {chartOptions.map((option, i) => (
                  <button
                    key={ `${option}-${i}` }
                    value={ option.toLowerCase() }
                    className={ option.toLowerCase() === currentChart ? 'active-chart' : '' }
                    onClick={ handleChartSelect }
                  >
                    { option }
                  </button>
                )
              )}
            </div>
          </div>
        )
      }
    </AppContext.Consumer>
  )
};

export default ChartSelect;