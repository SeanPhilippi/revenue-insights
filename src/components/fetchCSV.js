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


const getCSVData = async () => {
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

  const dates = seriesObjs[0].data.map(dataObj => dataObj.bin);

  return ({
    series,
    dates
  });
}

export default function() {
  return getCSVData();
}