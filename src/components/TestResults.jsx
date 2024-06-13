import React from "react";
import { useSelector } from "react-redux";

const TestResults = () => {
  const testResults = useSelector((state) => state.testResults);

  return (
    <div className="results-overview">
      <div className="sharptest-result-container">
        <h1>
          <b>Výsledky testů</b>
        </h1>
        <div className="eyes-result-container">
          <h2>
            <b>{testResults.testNameSharpTest}</b>
          </h2>
          <p>{testResults.resultTextSharpTest}</p>
          <div className="eyes-result">
            <div className="eyes-result-images">
              <div className="eyes-result-left">
                <img src={testResults.imageUrlSharpTest1} alt="ResultLeft" />
              </div>
              <div className="eyes-result-right">
                <img src={testResults.imageUrlSharpTest2} alt="ResultRight" />
              </div>
            </div>
            <div className="resultDescriptionLeft">
              <p>Levé</p>
              <div className="resultDescriptionRight">
                <p>Pravé</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="contrasttest-result-container">
        <div className="eyes-result-container">
          <h2>
            <b>{testResults.testNameContrastTest}</b>
          </h2>
          <p>{testResults.resultTextContrastTest}</p>
          <div className="eyes-result">
            <div className="eyes-result-images">
              <div className="eyes-result-left">
                <img src={testResults.imageUrlContrastTest1} alt="ResultLeft" />
              </div>
              <div className="eyes-result-right">
                <img
                  src={testResults.imageUrlContrastTest2}
                  alt="ResultRight"
                />
              </div>
            </div>
            <div className="resultDescriptionLeft">
              <p>Levé</p>
              <div className="resultDescriptionRight">
                <p>Pravé</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="colortest-result-container">
        <div className="eyes-result-container">
          <h2>
            <b>{testResults.testNameColorTest}</b>
          </h2>
          <p>{testResults.resultTextColorTest}</p>
          <div className="eyes-result">
            <div className="eyes-result-images">
              <div className="eyes-result-left">
                <img src={testResults.imageUrlColorTest1} alt="ResultLeft" />
              </div>
              <div className="eyes-result-right">
                <img src={testResults.imageUrlColorTest2} alt="ResultRight" />
              </div>
            </div>
            <div className="resultDescriptionLeft">
              <p>Levé</p>
              <div className="resultDescriptionRight">
                <p>Pravé</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="astigmatismtest-result-container">
        <div className="eyes-result-container">
          <h2>
            <b>{testResults.testNameAstigmatismTest}</b>
          </h2>
          <p>{testResults.resultTextAstigmatismTest}</p>
          <div className="eyes-result">
            <div className="eyes-result-images">
              <div className="eyes-result-left">
                <img
                  src={testResults.imageUrlAstigmatismTest1}
                  alt="ResultLeft"
                />
              </div>
              <div className="eyes-result-right">
                <img
                  src={testResults.imageUrlAstigmatismTest2}
                  alt="ResultRight"
                />
              </div>
            </div>
            <div className="resultDescriptionLeft">
              <p>Levé</p>
              <div className="resultDescriptionRight">
                <p>Pravé</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="eyefieldtest-result-container">
        <div className="eyes-result-container">
          <h2>
            <b>{testResults.testNameEyeFieldTest}</b>
          </h2>
          <p>{testResults.resultTextEyeFieldTest}</p>
          <div className="eyes-result">
            <div className="eyes-result-images">
              <div className="eyes-result-left">
                <img src={testResults.imageUrlEyeFieldTest1} alt="ResultLeft" />
              </div>
              <div className="eyes-result-right">
                <img
                  src={testResults.imageUrlEyeFieldTest2}
                  alt="ResultRight"
                />
              </div>
            </div>
            <div className="resultDescriptionLeft">
              <p>Levé</p>
              <div className="resultDescriptionRight">
                <p>Pravé</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestResults;
