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
  // chain allows you to chain lodash array methods on a returned collection so you don't have to
  // pass the collection to each lodash method on a seprate line
  const groupedData = _.chain(data)
    // groupBy can take a callback to be executed on each item, the return values serve as
    // the keys the items will be grouped in arrays and assigned to
    .groupBy(row => {
      // console.log('thing', row[dateColIdx].split(' ')[0])
      // each row is a data array from the parsed csv
      // grab the date with format YYYY-MM-DD and reformat into given dateFormat
      return moment(row[dateColIdx].split(' ')[0], 'YYYY-MM-DD').format(dateFormat)})
    // map over the groupBy object, each group is a data array and each bin is a groupBy date key
    .map((group, bin) => {
      // console.log('group', group)
      // console.log('bin', bin)
      // reduce the right number at the right index of each data array row into a single sum
      const revenueSum = _.sum(group.map(row => Number(row[valueColIdx])));
      return {
        bin,
        revenue: revenueSum
      } // return the unwrapped lodash chain value
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
    data: createSeries(seriesData, 9, i, 'MMM YYYY')
  }));

  let dates = seriesObjs[0].data.map(dataObj => dataObj.bin);
  console.log('original dates', dates)
  const ORIGINAL_DATES_LENGTH = dates.length;
  const MILLISECONDS_IN_MONTH = 2592000000;
  const MILLISECONDS_IN_6_MONTHS = 15552000000;
  const MILLISECONDS_IN_YEAR = 31556952000;
  const currentDate = (new Date()).getTime();

  const currentChartFilter = (dates, range) => {
    console.log('currentChartFilter dates', dates)
    // need full dates back for this to work
    const furthestLimit = currentDate - range;
    console.log('currentDate', currentDate)
    console.log('furthestLimit', furthestLimit)
    return dates.filter((date, i) => {
      console.log('lfkslje date', date)
      const ms = (new Date(date)).getTime();
      console.log('idx', i, 'date ms', ms)
      return ms < currentDate && ms > furthestLimit;
    });
  }

  // filter dates array
  switch (currentChart) {
    case '1m':
      dates = currentChartFilter(dates, MILLISECONDS_IN_MONTH);
      console.log('1m dates', dates)
      break;
    case '6m':
      dates = currentChartFilter(dates, MILLISECONDS_IN_6_MONTHS);
      break;
    case 'ytd':
      const currentYear = dates[dates.length - 1].slice(-5);
      dates = dates.filter(date => date.includes(currentYear));
      break;
    case '1y':
      dates = currentChartFilter(dates, MILLISECONDS_IN_YEAR);
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