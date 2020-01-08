import Papa from 'papaparse';
import _ from 'lodash';
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

const getCSVData = async (currentChart) => {
  const csvData = await fetchCSV();
  const parsedCsv = Papa.parse(csvData);
  const parsedData = parsedCsv.data;
  const seriesNames = parsedData[0].slice(0, 9);
  // array of arrays of data rows from parsed csv
  const seriesData = parsedData.slice(1, parsedData.length - 1);

  // filter seriesData to go into createSeries
  const filterSeriesData = (seriesData, numOfMonths) => {
    const currentDate = moment();
    const furthestDateBack = moment().subtract(numOfMonths, 'months');
    const filteredSeriesData = seriesData.filter(dataRow => {
      const momentDate =  moment(dataRow[9], 'YYYY-MM-DD');
      if (typeof numOfMonths === 'number') {
        return momentDate < currentDate && momentDate > furthestDateBack;
      } else {
        const beginningOfYear = moment().startOf('year')
        return momentDate >= beginningOfYear;
      }
    })
    return filteredSeriesData;
  }

  let filteredSeriesData = seriesData;
  switch (currentChart) {
    case '1m':
      filteredSeriesData = filterSeriesData(seriesData, 1);
      break;
    case '6m':
      filteredSeriesData = filterSeriesData(seriesData, 6);
      break;
    case 'ytd':
      filteredSeriesData = filterSeriesData(seriesData, 'ytd');
      break;
    case '1y':
      filteredSeriesData = filterSeriesData(seriesData, 12);
      break;
    default:
      break;
  }

  const seriesObjs = seriesNames.map((name, i) => ({
    name,
    data: createSeries(filteredSeriesData, 9, i, 'MMM YYYY')
  }));

  // grab dates from first series object bin names
  const dates = seriesObjs[0].data.map(dataObj => dataObj.bin);
  // format series objectes for Highcharts.js
  const series = seriesObjs.map(obj => ({
    name: obj.name,
    // create array of revenue numbers for date bins
    data: obj.data.map(dataObj => dataObj.revenue)
  }));

  return ({
    series,
    dates
  });
}

const createSeries = (data, dateColIdx, valueColIdx, dateFormat) => {
  // chain allows you to chain lodash array methods on a returned collection so you don't have to
  // pass the collection to each lodash method on a seprate line
  const groupedData = _.chain(data)
    // groupBy can take a callback to be executed on each item, the return values serve as
    // the keys the items will be grouped in arrays and assigned to
    .groupBy(row => {
      // each row is a data array from the parsed csv
      // grab the date with format YYYY-MM-DD and reformat into given dateFormat
      return moment(row[dateColIdx].split(' ')[0], 'YYYY-MM-DD').format(dateFormat)})
    // map over the groupBy object, each group is a data array and each bin is a groupBy date key
    .map((group, bin) => {
      // reduce the right number at the right index of each data array row into a single sum
      const revenueSum = _.sum(group.map(row => Number(row[valueColIdx])));
      return {
        bin,
        revenue: revenueSum
      } // return the unwrapped lodash chain value
    }).value();
  return groupedData;
}

export default function(currentChart) {
  return getCSVData(currentChart);
}