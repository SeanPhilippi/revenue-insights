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
  const seriesData = parsedData.slice(1, parsedData.length - 1);
  console.log('seriesData', seriesData) // array of arrays of data rows from parsed csv
  // let dates = seriesData.map(dataRow => dataRow[9])
  // console.log('dates', dates)

  // ! use currentChart value to filter dates here, before grouping
  // filter seriesData to go into createSeries
  const filterSeriesData = (seriesData, numOfMonths) => {
    const currentDate = moment();
    const furthestDateBack = moment().subtract(numOfMonths, 'months');

    const filteredSeriesData = seriesData.filter(dataRow => {
      const momentDate =  moment(dataRow[9], 'YYYY-MM-DD');
      return momentDate < currentDate && momentDate > furthestDateBack;
    })
    return filteredSeriesData;
  }

  let filteredSeriesData;
  switch (currentChart) {
    case '1m':
      filteredSeriesData = filterSeriesData(seriesData, 1);
      console.log('1m filteredSeriesData', filteredSeriesData)
      break;
    case '6m':
      filteredSeriesData = filterSeriesData(seriesData, 6);
      console.log('6m filteredSeriesData', filteredSeriesData)
      break;
    case 'ytd':

      break;
    case '1y':
      filteredSeriesData = filterSeriesData(seriesData, 12);
      console.log('1y filteredSeriesData', filteredSeriesData)
      break;
    default:
      break;
  }

  const seriesObjs = seriesNames.map((name, i) => ({
    name,
    data: createSeries(filteredSeriesData, 9, i, 'MMM YYYY')
  }));

  console.log('seriesObjs', seriesObjs)


  let dates = seriesObjs[0].data.map(dataObj => dataObj.bin);
  console.log('dates', dates)
  const ORIGINAL_DATES_LENGTH = dates.length;
  // const MILLISECONDS_IN_MONTH = 2592000000;
  // const MILLISECONDS_IN_6_MONTHS = 15552000000;
  // const MILLISECONDS_IN_YEAR = 31556952000;
  // const currentDate = (new Date()).getTime();

  // const currentChartFilter = (dates, range) => {
  //   // need full dates back for this to work
  //   const furthestLimit = currentDate - range;

  //   return dates.filter((date, i) => {

  //     const ms = (new Date(date)).getTime();
  //     return ms < currentDate && ms > furthestLimit;
  //   });
  // }

  // // filter dates array
  // switch (currentChart) {
  //   case '1m':
  //     dates = currentChartFilter(dates, MILLISECONDS_IN_MONTH);
  //     break;
  //   case '6m':
  //     dates = currentChartFilter(dates, MILLISECONDS_IN_6_MONTHS);
  //     break;
  //   case 'ytd':
  //     const currentYear = dates[dates.length - 1].slice(-5);
  //     dates = dates.filter(date => date.includes(currentYear));
  //     break;
  //   case '1y':
  //     dates = currentChartFilter(dates, MILLISECONDS_IN_YEAR);
  //     break;
  //   default:
  //     break;
  // }

  // // filter series data array based on number of dates
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