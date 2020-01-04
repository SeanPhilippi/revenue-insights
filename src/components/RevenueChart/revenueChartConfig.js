export default function(data) {
  return {
    title: {
      align: "left",
      text: "Revenue Per Service By Month"
    },
    data: {
      csv: data,
      startRow: 1,
      endRow: 87,
      startColumn: 0,
      endColumn: 8,
      firstRowAsNames: true
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
      histogram: {

      }
    },
    series: [
      {
        // name: 'Data',
        type: 'histogram',
        color: '#c4392d',
        borderColor: 'white',
        negativeColor: '#5679c4',
        fillOpacity: 0.5,
        // data: data,
        id: 's1',
        marker: {
          radius: 1.5
        }
      }
    ],
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