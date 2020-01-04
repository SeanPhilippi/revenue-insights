export default function(data) {
  return {
    title: {
      align: "left",
      text: "Revenue Per Service By Month"
    },
    // subtitle: {
    //   text: ""
    // },
    data: {
      csv: data
    },
    yAxis: {
      title: {
        text: "Revenue (USD)"
      }
    },
    xAxis: { type: 'datetime' },
    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "middle"
    },
    plotOptions: {
      type: 'histogram',
      series: {
        pointStart: 2019
      }
    },
    // series: data,
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