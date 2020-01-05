import React, { createContext, PureComponent } from 'react';
import fetchCSV from './fetchCSV';

export const AppContext = createContext();

class Provider extends PureComponent {
  componentDidMount = async () => {
    const csvData = await fetchCSV();
    this.setState({ data: csvData });
  }

  handleChartSelect = ({
    target: {
      value
    }
  }) => {
    this.setState({ currentChart: value });
  }

  state = {
    currentChart: 'ytd',
    data: null,
    handleChartSelect: this.handleChartSelect
  }

  render() {
    return (
      <AppContext.Provider value={ this.state }>
        { this.props.children }
      </AppContext.Provider>
    )
  }
};

export default Provider;