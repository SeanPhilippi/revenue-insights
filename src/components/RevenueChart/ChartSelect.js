import React, { PureComponent } from 'react';

class ChartSelect extends PureComponent {
  state = {
    currentChart: ''
  }

  handleChange = ({
    target: {
      value
    }
  }) => {
    this.setState({ currentChart: value });
  }

  render() {
    return (
      <div className="float-left">
        <button value='1m' onClick={ this.handleChange }>1m</button>
        <button value='6m' onClick={ this.handleChange }>6m</button>
        <button value='ytd' onClick={ this.handleChange }>YTD</button>
        <button value='1y' onClick={ this.handleChange }>1y</button>
        <button value='all' onClick={ this.handleChange }>all</button>
      </div>
    )
  }
};

export default ChartSelect;