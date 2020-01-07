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
  // let dateColIdx = 9;
  // let dateFormat = 'MMM DD YYYY';
  // switch (currentChart) {
  //   case '1m':
  //     dateColIdx =
  //   default:
  //     dateColIdx = 9;
  //     dateFormat = 'MMM DD YYYY';
  // }
  const csvData = await fetchCSV();
  const parsedCsv = Papa.parse(csvData);
  const parsedData = parsedCsv.data;
  console.log('parsedData', parsedData)
  const seriesNames = parsedData[0].slice(0, 9);
  const seriesData = parsedData.slice(1, parsedData.length - 1);
  const seriesObjs = seriesNames.map((name, i) => ({
    name,
    data: createSeries(seriesData, 9, i, 'MMM DD YYYY')
  }));
  console.log('seriesObjs', seriesObjs)

  const series = seriesObjs.map(obj => ({
    name: obj.name,
    data: obj.data.map(dataObj => dataObj.revenue)
  }));
  // ! filter dates based on currentChart value
  // group by first 3 characters of each date string
  let dates = seriesObjs[0].data.map(dataObj => dataObj.bin);
  console.log('dates', dates)
  if (currentChart === '1m') {
    const month = dates[dates.length - 1].slice(0, 3);
    dates = dates.filter(date => date.includes(month));
    console.log('dates in if', dates)
  } else if (currentChart === '6m') {
    const months = dates.map(date => date.slice(0, 3));
    const sixMonths = months.slice(-5);
    dates = dates.filter(date => date.includes(sixMonths));
  } else if (currentChart === 'ytd') {
    const currentYear = dates[dates.length - 1].slice(-5);
    console.log('currentYear', currentYear)
    dates = dates.filter(date => date.includes(currentYear))
    console.log('ytd dates', dates)
  } else if (currentChart === '1y') {
    const currentDate = moment().format('MMM DD YYYY');
    console.log('currentDate', currentDate)
    const furthestLimit = moment().subtract(12, 'months').format('MMM DD YYYY');
    // const furthestLimit = currentDate.slice(0, -5) + ` ${Number(currentDate.slice(-5)) - 1}`;
    console.log('furthestLimit', furthestLimit)
  }

  return ({
    series,
    dates
  });
}

export default function(currentChart) {
  return getCSVData(currentChart);
}