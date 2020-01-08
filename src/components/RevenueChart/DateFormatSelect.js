import React from 'react';
import { AppContext } from '../Provider';

const DateFormatSelect = () => {
  const dateFormats = [
    {
      name: 'MMM DD YYYY',
      value: 'days'
    },
    {
      name: 'MMM YYYY',
      value: 'months'
    },
    {
      name: '[Q]Q YYYY',
      value: 'quarters'
    },
    {
      name: 'YYYY',
      value: 'years'
    }
  ];
  return (
    <AppContext.Consumer>
      {
        ({ handleDateFormat, dateFormat }) => (
          <div className="chart-select">
            <label className="text-white">
              Summarize By
            </label>
            <div className="d-flex justify-content-center mb-2">
              {dateFormats.map(format => (
                  <button
                    name={ format.name }
                    value={ format.value }
                    className={ format.value === dateFormat.value && 'active-chart'}
                    onClick={ handleDateFormat }
                  >
                    { format.value }
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

export default DateFormatSelect;