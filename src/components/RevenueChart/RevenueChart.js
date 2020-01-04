import React from 'react';
import ReactHighcharts from 'react-highcharts';
// import revenueChartTheme from './revenueChartTheme.js';
import revenueChartConfig from './revenueChartConfig.js';
import fetchCSV from '../fetchCSV';

// ReactHighcharts.HighCharts.setOptions(revenueChartTheme);

const Revenuechart = props => {
  return (
    <ReactHighcharts config={ revenueChartConfig(fetchCSV()) }/>
  )
}

export default Revenuechart;