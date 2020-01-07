import React from 'react';
import { AppContext } from '../Provider';
import ChartSelect from './ChartSelect';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import revenueChartTheme from './revenueChartTheme.js';
import revenueChartConfig from './revenueChartConfig.js';
import './RevenueChart.css';

Highcharts.setOptions(revenueChartTheme);

const RevenueChart = () => (
  <AppContext.Consumer>
    {
      ({ data, currentChart }) => {
        if (!data) return <div>Loading...</div>
        console.log('data', data)
        return (
          <div className="revenue-chart">
            <ChartSelect className=""/>
            <HighchartsReact
              highcharts={ Highcharts }
              options={ revenueChartConfig(data, currentChart) }
            />
          </div>
        )
      }
    }
  </AppContext.Consumer>
);


export default RevenueChart;