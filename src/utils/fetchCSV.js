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

const getCSVData = async (currentChart, dateFormat) => {
  const csvData = await fetchCSV();
  const parsedCsv = Papa.parse(csvData);
  const parsedData = parsedCsv.data;
  const seriesNames = parsedData[0].slice(0, 9);
  const seriesData = parsedData.slice(1, parsedData.length - 1);

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
    data: createSeries(filteredSeriesData, 9, i, dateFormat)
  }));

  const dates = seriesObjs[0].data.map(dataObj => dataObj.bin);
  const series = seriesObjs.map(obj => ({
    name: obj.name,
    data: obj.data.map(dataObj => dataObj.revenue)
  }));

  return ({
    series,
    dates
  });
}

const createSeries = (data, dateColIdx, valueColIdx, dateFormat) => {
  const groupedData = _.chain(data)
    .groupBy(row => {
      return moment(row[dateColIdx].split(' ')[0], 'YYYY-MM-DD').format(dateFormat)})
    .map((group, bin) => {
      const revenueSum = _.sum(group.map(row => Number(row[valueColIdx])));
      return {
        bin,
        revenue: revenueSum
      }
    }).value();
  return groupedData;
}

export default function(currentChart, dateFormat) {
  return getCSVData(currentChart, dateFormat);
}