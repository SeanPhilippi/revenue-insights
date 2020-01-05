import Papa from 'papaparse';

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
  // group arrays in 2d array based on category, so values can be added up
  // loop through 2d array and check 11 index of each array
  // for each array, loop through again and find matches at index 11
  // if match, += data[0] to match[0] and repeat through data[8]

  // * create array of objects with name prop set to name and data prop set to array of
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
  return series;
}

export default function() {
  return getCSVData();
}