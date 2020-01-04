export default function(data) {
  return {
    title: {
      text: "Revenue Per Service By Month"
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
      series: {
        label: {
          connectorAllowed: false
        },
        pointStart: 2010
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