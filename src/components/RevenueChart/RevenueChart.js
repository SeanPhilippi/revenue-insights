import React from 'react';
import { AppContext } from '../Provider';
import ChartSelect from './ChartSelect';
import DateFormatSelect from './DateFormatSelect';
import Loading from '../Loading';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highchartsExporting from 'highcharts/modules/exporting';
import revenueChartTheme from './revenueChartTheme.js';
import revenueChartConfig from './revenueChartConfig.js';
import './RevenueChart.css';

highchartsExporting(Highcharts);
Highcharts.setOptions(revenueChartTheme);

const RevenueChart = () => (
  <AppContext.Consumer>
    {
      ({ data, currentChart, dateFormat }) => {
        if (!data) return <Loading />
        console.log('data', data)
        return (
          <div className="chart-container">
            <ChartSelect />
            <DateFormatSelect />
            <HighchartsReact
              highcharts={ Highcharts }
              options={ revenueChartConfig(data, currentChart, dateFormat) }
            />
          </div>
        )
      }
    }
  </AppContext.Consumer>
);


export default RevenueChart;