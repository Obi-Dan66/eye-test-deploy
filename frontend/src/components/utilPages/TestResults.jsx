import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CloseButton from "../CloseButton.jsx";

const TestResults = () => {
  const testResults = useSelector((state) => state.testResults);
  const navigate = useNavigate();

  return (
    <div className="results-overview">
      <CloseButton />
      <h1>
        <b>Výsledky testů</b>
      </h1>
      {testResults.testNameSharpTest && (
        <div className="sharptest-result-container">
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
      )}
      {testResults.testNameContrastTest && (
        <div className="contrasttest-result-container">
          <div className="eyes-result-container">
            <h2>
              <b>{testResults.testNameContrastTest}</b>
            </h2>
            <p>{testResults.resultTextContrastTest}</p>
            <div className="eyes-result">
              <div className="eyes-result-images">
                <div className="eyes-result-left">
                  <img
                    src={testResults.imageUrlContrastTest1}
                    alt="ResultLeft"
                  />
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
      )}

      {testResults.testNameColorTest && (
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
      )}

      {testResults.testNameAstigmatismTest && (
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
      )}

      {testResults.testNameEyeFieldTest && (
        <div className="eyefieldtest-result-container">
          <div className="eyes-result-container">
            <h2>
              <b>{testResults.testNameEyeFieldTest}</b>
            </h2>
            <p>{testResults.resultTextEyeFieldTest}</p>
            <div className="eyes-result">
              <div className="eyes-result-images">
                <div className="eyes-result-left">
                  <img
                    src={testResults.imageUrlEyeFieldTest1}
                    alt="ResultLeft"
                  />
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
      )}
      <button className="defaultButton" onClick={() => navigate("/")}>
        Hlavní stránka
      </button>
      <button
        className="defaultButton"
        onClick={() => navigate("/vyber-testu")}
      >
        Výběr testu
      </button>

      <div className="result-map">
        <img src="./resultMap.svg" alt="ResultMap" />
        <p>
          <b>Vyhledejte optika společnosti Erste Optik ve své blízkosti.</b> Pro
          kompletní vyšetření zraku vždy vyhledejte profesionálního očního
          lékaře.
        </p>
        <button className="defaultButton" onClick={() => navigate("/mapa")}>
          Zobrazit specialisty v mé blízkosti
        </button>
      </div>
    </div>
  );
};

export default TestResults;
