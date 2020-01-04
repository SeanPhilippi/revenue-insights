import React, { PureComponent } from 'react';
import { AppContext } from '../Provider';
import ReactHighcharts from 'react-highcharts';
import revenueChartTheme from './revenueChartTheme.js';
import revenueChartConfig from './revenueChartConfig.js';
import ChartSelect from './ChartSelect';

ReactHighcharts.Highcharts.setOptions(revenueChartTheme);

class RevenueChart extends PureComponent {
  state = {
    data: []
  }



  render() {
    return (
      <AppContext.Consumer>
        {
          ({ data }) => (
            <>
              <ChartSelect className=""/>
              <ReactHighcharts config={ revenueChartConfig(data) }/>
            </>
          )
        }
      </AppContext.Consumer>
    )
  }
};

export default RevenueChart;