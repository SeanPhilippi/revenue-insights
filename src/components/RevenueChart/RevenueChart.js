import React from 'react';
import { AppContext } from '../Provider';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highchartsHistogram from 'highcharts/modules/histogram-bellcurve';
import revenueChartTheme from './revenueChartTheme.js';
import revenueChartConfig from './revenueChartConfig.js';
import ChartSelect from './ChartSelect';
import highchartsData from 'highcharts/modules/data';

highchartsHistogram(Highcharts);
highchartsData(Highcharts);
Highcharts.setOptions(revenueChartTheme);

const RevenueChart = () => (
  <AppContext.Consumer>
    {
      ({ data }) => (
        <>
          <ChartSelect className=""/>
          <HighchartsReact
            highcharts={ Highcharts }
            options={ revenueChartConfig(data) }
          />
        </>
      )
    }
  </AppContext.Consumer>
);

export default RevenueChart;