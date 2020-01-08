import React from 'react';
import loading from '../images/loading.gif';

const Loading = () => (
  <>
    <div>
      <img className="mr-2" src={ loading } alt=""/>
    </div>
    <div>
      Loading Chart Data
    </div>
  </>
)

export default Loading;