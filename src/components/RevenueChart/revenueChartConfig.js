export default function(data, currentChart, dateFormat) {
  const formatValue = dateFormat.value;
  return {
    chart: {
      type: 'column',
      height: 'inherit',
      zoomType: 'x',
      resetZoomButton: {
        theme: {
          fill: 'white',
          stroke: 'black',
          r: 4,
          states: {
            hover: {
              fill: 'black',
              style: {
                color: 'white',
              }
            }
          }
        }
      },
      panning: true,
      panKey: 'shift'
    },
    navigation: {
      buttonOptions: {
        symbolStroke: 'black'
      }
    },
    title: {
      align: 'left',
      text: `Revenue Per Service By ${ formatValue.charAt(0).toUpperCase() + formatValue.slice(1, formatValue.length - 1) }`
    },
    subtitle: {
      text: 'Click and drag to zoom in. Hold down shift key while dragging to pan.'
    },
    xAxis: {
      categories: data.dates,
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle'
    },
    yAxis: {
      min: 0,
      className: 'y-axis',
      title: {
        text: 'Revenue (USD)'
      }
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y}</b></td></tr>',
      footerFormat: '</table>',
      shared: false,
      useHTML: true,
      valuePrefix: '$',
      valueSuffix: ' USD'
    },
    plotOptions: {
      column: {
        pointPadding: 0,
        borderWidth: 0,
        groupPadding: currentChart === '1m' ? .05 : .07,
        shadow: false
      }
    },
    series: data.series,
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            legend: {
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom'
            }
          }
        }
      ]
    }
  };
};