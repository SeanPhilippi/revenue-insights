import React from 'react';
import ReactHighcharts from 'react-highcharts';
import revenueChartTheme from './revenueChartTheme.js';
import revenueChartConfig from './revenueChartConfig.js';

ReactHighcharts.HighCharts.setOptions(revenueChartTheme);

const Revenuechart = props => {
  return (
    <ReactHighcharts config={ revenueChartConfig() }/>
  )
}

export default Revenuechart;