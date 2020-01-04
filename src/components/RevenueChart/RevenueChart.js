import React, { PureComponent } from 'react';
import ReactHighcharts from 'react-highcharts';
import revenueChartTheme from './revenueChartTheme.js';
import revenueChartConfig from './revenueChartConfig.js';
import fetchCSV from '../fetchCSV';
import ChartSelect from './ChartSelect';

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
      <>
        <ChartSelect className=""/>
        <ReactHighcharts config={ revenueChartConfig(this.state.data) }/>
      </>
    )
  }
};

export default RevenueChart;