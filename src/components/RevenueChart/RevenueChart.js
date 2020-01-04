import React, { PureComponent } from 'react';
import ReactHighcharts from 'react-highcharts';
import revenueChartTheme from './revenueChartTheme.js';
import revenueChartConfig from './revenueChartConfig.js';
import fetchCSV from '../fetchCSV';

ReactHighcharts.Highcharts.setOptions(revenueChartTheme);

class RevenueChart extends PureComponent {
  state = {
    data: []
  }

  componentDidMount = async () => {
    const csvData = await fetchCSV();
    this.setState({ data: csvData.data });
    console.log('data', this.state.data)
  }

  render() {
    return (
      <ReactHighcharts config={ revenueChartConfig(this.state.data) }/>
    )
  }
};

export default RevenueChart;