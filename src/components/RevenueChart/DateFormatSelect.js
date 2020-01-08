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
    }
  ];
  return (
    <AppContext.Consumer>
      {
        ({ handleDateFormat, dateFormat }) => (
          <div className="d-flex justify-content-center chart-select mb-2">
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
        )
      }
    </AppContext.Consumer>
  )
};

export default DateFormatSelect;