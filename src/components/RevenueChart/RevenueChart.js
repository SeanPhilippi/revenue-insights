import React from 'react';
import { AppContext } from '../Provider';
import ChartSelect from './ChartSelect';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import revenueChartTheme from './revenueChartTheme.js';
import revenueChartConfig from './revenueChartConfig.js';

Highcharts.setOptions(revenueChartTheme);

const RevenueChart = () => (
  <AppContext.Consumer>
    {
      ({ data }) => {
        if (!data) return <div>Loading...</div>
        console.log('data', data)
        return (
          <>
            <ChartSelect className=""/>
            <HighchartsReact
              highcharts={ Highcharts }
              options={ revenueChartConfig(data) }
            />
          </>
        )
      }
    }
  </AppContext.Consumer>
);


export default RevenueChart;