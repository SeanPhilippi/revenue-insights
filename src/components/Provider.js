import React, { createContext, PureComponent } from 'react';
import fetchCSV from '../utils/fetchCSV';

export const AppContext = createContext();

class Provider extends PureComponent {
  componentDidMount = async () => {
    const { currentChart, dateFormat } = this.state;
    const csvData = await fetchCSV(currentChart, dateFormat.name);
    this.setState({ data: csvData });
  }

  handleChartSelect = async ({
    target: {
      value
    }
  }) => {
    this.setState({ currentChart: value });
    // refetch data, call fetchCSV with new currentChart value
    const newCsvData = await fetchCSV(value, this.state.dateFormat.name);
    this.setState({ data: newCsvData });
  }

  handleDateFormat = async ({
    target: {
      name,
      value
    }
  }) => {
    this.setState({ dateFormat: { name, value } });
    const newCsvData = await fetchCSV(this.state.currentChart, name);
    this.setState({ data: newCsvData });
  }

  state = {
    currentChart: '6m',
    dateFormat: {
      name: 'MMM YYYY',
      value: 'months'
    },
    data: null,
    handleChartSelect: this.handleChartSelect,
    handleDateFormat: this.handleDateFormat
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