export default function(data, categories) {
  return {
    chart: {
      type: 'column'
    },
    title: {
      align: "left",
      text: "Revenue Per Service By Month"
    },
    xAxis: {
      // type: 'datetime',
      // categories: [
      //   'Jan',
      //   'Feb',
      //   'Mar',
      //   'Apr',
      //   'May',
      //   'Jun',
      //   'Jul',
      //   'Aug',
      //   'Sep',
      //   'Oct',
      //   'Nov',
      //   'Dec'
      // ],
    },
    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "middle"
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Revenue (USD)'
      }
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
      footerFormat: '</table>',
      shared: false,
      useHTML: true
    },
    plotOptions: {
      column: {
        pointPadding: 1,
        borderWidth: 0,
        groupPadding: 0,
        shadow: false
      }
    },
    series: data,
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            legend: {
              layout: "horizontal",
              align: "center",
              verticalAlign: "bottom"
            }
          }
        }
      ]
    }
  };
};