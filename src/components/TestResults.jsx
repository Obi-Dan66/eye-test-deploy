import React from 'react';

const TestResults = ({ imageUrl1, imageUrl2, resultText }) => {
  return (
    <div className='eyes-result-container'>
      <h1><b>Výsledek testu zrakové ostrosti</b></h1>
      <p>{resultText}</p>
      <div className='eyes-result'>
        <div className='eyes-result-images'>
          <div className='eyes-result-left'>
            <img src={imageUrl1} alt="ResultLeft" />
          </div>
          <div className="eyes-result-right">
            <img src={imageUrl2} alt="ResultRight" />
          </div>
        </div>
        <div className='resultDescriptionLeft'>
          <p>Levé</p>
          <div className='resultDescriptionRight'>
            <p>Pravé</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestResults;