import React, { PureComponent } from 'react';

class ChartSelect extends PureComponent {
  state = {
    currentChart: ''
  }

  render() {
    return (
      <div>
        <button>1m</button>
        <button>6m</button>
        <button>YTD</button>
        <button>1y</button>
        <button>all</button>
      </div>
    )
  }
}