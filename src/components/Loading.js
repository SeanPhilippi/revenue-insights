import React from 'react';
import loading from '../images/loading.gif';

const Loading = () => (
  <div className="mx-auto d-flex">
    <div>
      <img className="mr-3 d-block" src={ loading } alt=""/>
    </div>
    <div className="text-white">
      Loading Chart Data
    </div>
  </div>
)

export default Loading;