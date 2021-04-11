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

const RevenueChart = () => {
  return (
    <AppContext.Consumer>
      {
        ({ data, currentChart, dateFormat }) => {
          if (!data) return <Loading />
          return (
            <div className='chart-container'>
              <div className='settings'>
                <ChartSelect />
                <DateFormatSelect />
              </div>
              <div>
                <HighchartsReact
                  highcharts={ Highcharts }
                  options={ revenueChartConfig(data, currentChart, dateFormat) }
                />
              </div>
            </div>
          )
        }
      }
    </AppContext.Consumer>
  )
};

export default RevenueChart;