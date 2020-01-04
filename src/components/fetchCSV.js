import Papa from 'papaparse';

const fetchCSV = () => {
  return fetch('insights.csv')
    .then(res => {
      const reader = res.body.getReader();
      const decoder = new TextDecoder('utf-8');

      return reader.read()
        .then(res => decoder.decode(res.value));
    })
}

const getCSVData = async () => {
  const csvData = await fetchCSV();

  return Papa.parse(csvData);
}

export default function() {
  return getCSVData();
}