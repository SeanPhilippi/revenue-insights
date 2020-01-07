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

const createSeries = (data, dateColIdx, valueColIdx, dateFormat) => {
  const groupedData = _.chain(data)
    .groupBy(row => {
      return moment(row[dateColIdx].split(' ')[0], 'YYYY-MM-DD').format(dateFormat)})
    .map((rows, bin) => {
      const revenue = _.sum(rows.map(row => Number(row[valueColIdx])));
      return {
        bin,
        revenue
      }
    }).value();
  return groupedData;
}

const getCSVData = async (currentChart) => {
  const csvData = await fetchCSV();
  const parsedCsv = Papa.parse(csvData);
  const parsedData = parsedCsv.data;
  const seriesNames = parsedData[0].slice(0, 9);
  const seriesData = parsedData.slice(1, parsedData.length - 1);
  const seriesObjs = seriesNames.map((name, i) => ({
    name,
    data: createSeries(seriesData, 9, i, 'MMM DD YYYY')
  }));

  let dates = seriesObjs[0].data.map(dataObj => dataObj.bin);
  const ORIGINAL_DATES_LENGTH = dates.length;
  const MILLISECONDS_IN_MONTH = 2592000000;
  const MILLISECONDS_IN_6_MONTHS = 15552000000;
  const MILLISECONDS_IN_YEAR = 31556952000;
  const currentDate = (new Date()).getTime();

  const currentChartFilter = (dates, range) => {
    const furthestLimit = currentDate - range;
    return dates.filter(date => {
      const ms = (new Date(date)).getTime();
      return ms < currentDate && ms > furthestLimit;
    });
  }

  // filter dates array
  switch (currentChart) {
    case '1m':
      dates = currentChartFilter(dates, MILLISECONDS_IN_MONTH)
      break;
    case '6m':
      dates = currentChartFilter(dates, MILLISECONDS_IN_6_MONTHS)
      break;
    case 'ytd':
      const currentYear = dates[dates.length - 1].slice(-5);
      dates = dates.filter(date => date.includes(currentYear))
      break;
    case '1y':
      dates = currentChartFilter(dates, MILLISECONDS_IN_YEAR)
      break;
    default:
      break;
  }

  // filter series data array based on number of dates
  let series;
  if (dates.length < ORIGINAL_DATES_LENGTH) {
    series = seriesObjs.map(obj => ({
      name: obj.name,
      data: obj.data.slice(-dates.length).map(dataObj => dataObj.revenue)
    }));
  } else {
    series = seriesObjs.map(obj => ({
      name: obj.name,
      data: obj.data.map(dataObj => dataObj.revenue)
    }));
  }

  return ({
    series,
    dates
  });
}

export default function(currentChart) {
  return getCSVData(currentChart);
}