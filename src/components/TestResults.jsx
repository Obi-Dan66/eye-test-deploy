import React from "react";
import { useSelector } from "react-redux";

const TestResults = () => {
  const testResults = useSelector((state) => state.testResults);

  return (
    <div>
      <h2>{testResults.testName}</h2>
      <p>Result Text: {testResults.resultText}</p>
      <div>
        <img src={testResults.imageUrl1} alt="Result Image 1" />
        <img src={testResults.imageUrl2} alt="Result Image 2" />
      </div>
    </div>
  );
};

export default TestResults;
