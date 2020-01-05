import Papa from 'papaparse';
import _ from 'underscore';
import moment from 'moment';

const fetchCSV = () => {
  return fetch('insights.csv')
    .then(res => {
      const reader = res.body.getReader();
      const decoder = new TextDecoder('utf-8');

      return reader.read()
        .then(res => decoder.decode(res.value));
    });
}

const getCSVData = async () => {
  const csvData = await fetchCSV();
  const parsedCsv = Papa.parse(csvData);
  const parsedData = parsedCsv.data;
  console.log('parsedData', parsedData)
  const seriesNames = parsedData[0].slice(0, 9)
  console.log('seriesNames', seriesNames)
  const seriesData = parsedData.slice(1, parsedData.length - 1)
  console.log('seriesData', seriesData)
  // map over seriesData and format dates for later grouping with groupBy()
  seriesData.forEach(data => data[9] = moment(data[9].split(' ')[0], 'YYYY-MM-DD').format('MMM DD YYYY'));
  console.log('formattedSeriesData', seriesData)


  const seriesDates = seriesData.map((data, idx) => data[9].split(' ')[0])
  console.log('seriesDates', seriesDates)

  // * create array of objects with name prop set to series name and data prop set to array of
  // * numbers for each series/category
  const series = seriesNames.map((name, seriesIndex) => {
    return {
      // series name
      name,
      // match series in each data point (row) using index and make array for Highcharts data
      data: seriesData.map(row => Number(row[seriesIndex]))
    }
  })
  console.log('series', series)
  const seriesByDate = _.groupBy(series, 'date');
  console.log('seriesByDate', seriesByDate)
  return series;
}

export default function() {
  return getCSVData();
}