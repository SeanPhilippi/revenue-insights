// import React, { PureComponent } from 'react';
import Papa from 'papaparse';

// class DataController extends PureComponent {
  // state = {
  //   data: []
  // }

  // componentDidMount = () => {
  //   this.getCSVData();
  // }

const fetchCSV = () => {
  return fetch('insights.csv')
    .then(res => {
      const reader = res.body.getReader();
      const decoder = new TextDecoder('utf-8');

      return reader.read()
        .then(res => decoder.decode(res.value));
    })
}

// const getData = result => {
//   this.setState({ data: result.data });
// }

const getCSVData = async () => {
  const csvData = await fetchCSV();

  return Papa.parse(csvData);
}

// render() {
//   console.log('data', this.state.data)
//   return (
//     <div>
//       a div
//     </div>
//   )
// }
// };

export default function() {
  return getCSVData();
}

// export default DataController;