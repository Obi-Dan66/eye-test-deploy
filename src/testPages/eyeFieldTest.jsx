import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setTestResult } from "../store/testResultSlice.js";
import CloseButton from "../components/CloseButton.jsx";

const EyeFieldTest = () => {
  const [currentContent, setCurrentContent] = useState(0);
  const [correctAnswersRight, setCorrectAnswersRight] = useState(0);
  const [correctAnswersLeft, setCorrectAnswersLeft] = useState(0);
  const navigate = useNavigate();
  const [clickedButtonId, setClickedButtonId] = useState(null);
  const totalContents = 6;
  const isTestComplete = currentContent === totalContents - 1;
  const dispatch = useDispatch();
  const [isClickable, setIsClickable] = useState(true);

  const handleClick = (buttonId, isCorrect, caseNumber) => {
    if (!isClickable) return; // Prevent handling clicks if not clickable

    setClickedButtonId(buttonId);
    // Logic to handle correct answers
    if (isCorrect) {
      if (caseNumber === 0 || caseNumber === 1) {
        setCorrectAnswersRight((prevCount) => prevCount + 1);
      } else if (caseNumber === 3 || caseNumber === 4) {
        setCorrectAnswersLeft((prevCount) => prevCount + 1);
      }
    }

    setIsClickable(false); // Disable further clicks during the timeout

    // Delay before moving to the next content to allow feedback to be visible
    setTimeout(() => {
      setCurrentContent((prevContent) => (prevContent + 1) % totalContents);
      setClickedButtonId(null); // Reset the clicked button ID for the next interaction
      setIsClickable(true); // Re-enable clicking after the timeout
    }, 800); // Adjust the delay time as needed
  };

  const getContent = (contentIndex) => {
    switch (contentIndex) {
      case 0:
        return (
          <div>
            <CloseButton />
            <h1>
              <b>Zorné pole</b>
            </h1>
            <p>
              1 - Zakryjte si <b>levé</b> oko.
            </p>
            <p>
              2 - Posuňte své zařízení trochu blíže -{" "}
              <b>na půl délky paže nebo na vzdálenost 30 cm.</b>
            </p>
            <p>
              3 -{" "}
              <b>
                Soustřeďte se na černou tečku uprostřed. Vypadají všechny čáry a
                čtverce stejně a pravidelně?
              </b>{" "}
            </p>
            <div className="colorTestCard" style={{ backgroundColor: "white" }}>
              <img
                className="astigmatism-image"
                src="./imageEyeFieldTest.svg"
                width={200}
                height={200}
                alt="color test"
              ></img>
              <div>
                <button
                  className={`colorTestBtn ${
                    clickedButtonId === "correct0" ? "correct" : ""
                  }`}
                  onClick={() => handleClick("correct0", true, 0)}
                >
                  Ano
                </button>
                <button
                  className={`colorTestBtn ${
                    clickedButtonId === "wrong0" ? "wrong" : ""
                  }`}
                  onClick={() => handleClick("wrong0", false, 0)}
                >
                  Ne
                </button>
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div>
            <CloseButton />
            <h1>
              <b>Zorné pole</b>
            </h1>
            <p>
              1 - Zakryjte si <b>levé</b> oko.
            </p>
            <p>
              2 - Posuňte své zařízení trochu blíže -{" "}
              <b>na půl délky paže nebo na vzdálenost 30 cm.</b>
            </p>
            <p>
              3 -{" "}
              <b>
                Soustřeďte se na černou tečku uprostřed. Chybí některé části
                mřížky nebo jsou některé části zkreslené nebo tmavší než
                ostatní?
              </b>{" "}
            </p>
            <div className="colorTestCard" style={{ backgroundColor: "white" }}>
              <img
                className="astigmatism-image"
                src="./imageEyeFieldTest.svg"
                width={200}
                height={200}
                alt="color test"
              ></img>
              <div>
                <button
                  className={`colorTestBtn ${
                    clickedButtonId === "wrong1" ? "wrong" : ""
                  }`}
                  onClick={() => handleClick("wrong1", false, 1)}
                >
                  Ano
                </button>
                <button
                  className={`colorTestBtn ${
                    clickedButtonId === "correct1" ? "correct" : ""
                  }`}
                  onClick={() => handleClick("correct1", true, 1)}
                >
                  Ne
                </button>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <CloseButton />
            <svg
              _ngcontent-ng-c226631475=""
              xmlns="http://www.w3.org/2000/svg"
              width="200"
              height="54"
              viewBox="0 0 200 54"
            >
              <g _ngcontent-ng-c226631475="" transform="translate(-395 -315)">
                <path
                  _ngcontent-ng-c226631475=""
                  d="M484.657 341.401a50.985 50.985 0 00-89.312 0l-.345.614.344.612A51.45 51.45 0 00439.996 369a51.455 51.455 0 0044.655-26.375l.344-.614zm-2.088.6c-8.209 14.931-25.289 24.948-42.571 24.948s-34.352-10.009-42.568-24.937c8.212-14.932 25.29-24.948 42.57-24.948s34.358 10.014 42.57 24.942z"
                ></path>
                <path
                  _ngcontent-ng-c226631475=""
                  d="M440 361.001a19 19 0 1119-19 19 19 0 01-19 19z"
                ></path>
                <circle
                  _ngcontent-ng-c226631475=""
                  fill="#ECF0F4"
                  cx="17"
                  cy="17"
                  r="17"
                  transform="translate(423 325)"
                ></circle>
              </g>
              <g _ngcontent-ng-c226631475="" transform="translate(24 -1040)">
                <path
                  _ngcontent-ng-c226631475=""
                  d="M175.657 1066.401a50.985 50.985 0 00-89.312 0l-.345.614.344.612A51.45 51.45 0 00130.996 1094a51.455 51.455 0 0044.655-26.375l.344-.614zm-2.088.6c-8.209 14.931-25.289 24.948-42.571 24.948s-34.352-10.009-42.568-24.937c8.212-14.932 25.29-24.948 42.57-24.948s34.358 10.014 42.57 24.942z"
                ></path>
                <path
                  _ngcontent-ng-c226631475=""
                  d="M131 1086.001a19 19 0 1119-19 19 19 0 01-19 19z"
                ></path>
                <circle
                  _ngcontent-ng-c226631475=""
                  fill="#ECF0F4"
                  cx="17"
                  cy="17"
                  r="17"
                  transform="translate(114 1050)"
                ></circle>
              </g>
            </svg>
            <div
              _ngcontent-ng-c226631475=""
              className="right-hand ng-star-inserted"
            >
              <svg
                _ngcontent-ng-c226631475=""
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="48"
              >
                <path
                  _ngcontent-ng-c226631475=""
                  d="M2.142 9.181A4.745 4.745 0 015.453 7.85a4.128 4.128 0 012.295.646V6.934a4.423 4.423 0 014.225-3.99 3.966 3.966 0 012.561.985 4.06 4.06 0 014-2.928 3.987 3.987 0 013.134 1.39 4.8 4.8 0 011.072 2.673 5.271 5.271 0 012.246-.634 4.365 4.365 0 014.523 4.187 4.066 4.066 0 01-.017.614v15.033a13.084 13.084 0 012.327-2.172c1.371-.686 2.958-1.721 4.35-1.1a4.87 4.87 0 012.679 2.86 5.034 5.034 0 01-.476 4.358l-9.95 13.6a14.329 14.329 0 01-5.647 3.966 21.717 21.717 0 01-7.74 1.422h-.027A13.652 13.652 0 011.002 33.291V11.862a3.684 3.684 0 011.14-2.681z"
                  fill="#ECF0F4"
                ></path>
                <path
                  _ngcontent-ng-c226631475=""
                  d="M39.694 23.748a5.078 5.078 0 00-2.8-2.968 5.366 5.366 0 00-4.618.127 13.652 13.652 0 00-2.391 2.227V8.589a4.382 4.382 0 00.02-.672 4.56 4.56 0 00-4.745-4.351 5.574 5.574 0 00-2.351.657A4.357 4.357 0 0018.409 0a4.26 4.26 0 00-4.205 3.042 4.2 4.2 0 00-2.7-1.024 4.624 4.624 0 00-4.416 4.18v1.593a4.36 4.36 0 00-2.406-.671A5.029 5.029 0 001.21 8.501a3.821 3.821 0 00-1.2 2.787v22.264c0 8.239 6.316 14.451 14.692 14.451h.025a22.954 22.954 0 008.121-1.478 15.038 15.038 0 005.939-4.142L39.22 28.257a5.183 5.183 0 00.474-4.509zm-2.306 3.619L27.067 41.191a13.754 13.754 0 01-5.052 3.4 21.716 21.716 0 01-7.32 1.376h-.054a12.109 12.109 0 01-12.585-12.42V11.281c0-1.04 1.319-2.1 2.62-2.1h.038a2.366 2.366 0 012.363 2.1v10.3a.967.967 0 001.014 1.073.962.962 0 001.039-1.063V6.242a2.425 2.425 0 012.373-2.157 2.46 2.46 0 012.411 2.119v13.861a1.032 1.032 0 102.064 0l.01-14.787a3.674 3.674 0 01.79-2.692 2.189 2.189 0 011.61-.531 2.226 2.226 0 011.6.6 3.616 3.616 0 01.794 2.622l-.01 14.787a.964.964 0 001.026 1.071.975.975 0 001.032-1.071V7.622a2.316 2.316 0 012.353-2 2.6 2.6 0 011.892.659 3.09 3.09 0 01.744 2.279l.032 17.875c0 .331 0 .885.757.963.568.058.934-.406 1.2-.74l2.944-3.49c1.046-1.325 3.028-.722 3.818-.228a3.03 3.03 0 011.354 2.286 4.343 4.343 0 01-.536 2.141z"
                  fill="#0072EF"
                ></path>
              </svg>
            </div>
            <h1>
              <b>Jsou vaše oči připraveny?</b>
            </h1>
            <p>Zakryjte si pravé oko.</p>
            <button className="defaultButton" onClick={handleClick}>
              Další krok
            </button>
          </div>
        );
      case 3:
        return (
          <div>
            <CloseButton />
            <h1>
              <b>Zorné pole</b>
            </h1>
            <p>
              1 - Zakryjte si <b>pravé</b> oko.
            </p>
            <p>
              2 - Posuňte své zařízení trochu blíže -{" "}
              <b>na půl délky paže nebo na vzdálenost 30 cm.</b>
            </p>
            <p>
              3 -{" "}
              <b>
                Soustřeďte se na černou tečku uprostřed. Vypadají všechny čáry a
                čtverce stejně a pravidelně?
              </b>{" "}
            </p>
            <div className="colorTestCard" style={{ backgroundColor: "white" }}>
              <img
                className="astigmatism-image"
                src="./imageEyeFieldTest.svg"
                width={200}
                height={200}
                alt="color test"
              ></img>
              <div>
                <button
                  className={`colorTestBtn ${
                    clickedButtonId === "correct3" ? "correct" : ""
                  }`}
                  onClick={() => handleClick("correct3", true, 3)}
                >
                  Ano
                </button>
                <button
                  className={`colorTestBtn ${
                    clickedButtonId === "wrong3" ? "wrong" : ""
                  }`}
                  onClick={() => handleClick("wrong3", false, 3)}
                >
                  Ne
                </button>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div>
            <CloseButton />
            <h1>
              <b>Zorné pole</b>
            </h1>
            <p>
              1 - Zakryjte si <b>pravé</b> oko.
            </p>
            <p>
              2 - Posuňte své zařízení trochu blíže -{" "}
              <b>na půl délky paže nebo na vzdálenost 30 cm.</b>
            </p>
            <p>
              3 -{" "}
              <b>
                Soustřeďte se na černou tečku uprostřed. Chybí některé části
                mřížky nebo jsou některé části zkreslené nebo tmavší než
                ostatní?
              </b>{" "}
            </p>
            <div className="colorTestCard" style={{ backgroundColor: "white" }}>
              <img
                className="astigmatism-image"
                src="./imageEyeFieldTest.svg"
                width={200}
                height={200}
                alt="color test"
              ></img>
              <div>
                <button
                  className={`colorTestBtn ${
                    clickedButtonId === "wrong4" ? "wrong" : ""
                  }`}
                  onClick={() => handleClick("wrong4", false, 4)}
                >
                  Ano
                </button>
                <button
                  className={`colorTestBtn ${
                    clickedButtonId === "correct4" ? "correct" : ""
                  }`}
                  onClick={() => handleClick("correct4", true, 4)}
                >
                  Ne
                </button>
              </div>
            </div>
          </div>
        );
      case 5:
        var imageUrlEyeFieldTest1,
          imageUrlEyeFieldTest2,
          resultTextEyeFieldTest;

        if (correctAnswersRight === 2 && correctAnswersLeft === 2) {
          imageUrlEyeFieldTest1 = "./greenface.svg";
          imageUrlEyeFieldTest2 = "./greenface.svg";
          resultTextEyeFieldTest =
            "Zorné pole vašich obou očí se zdá být vynikající.";
        } else if (correctAnswersRight < 2 && correctAnswersLeft === 2) {
          imageUrlEyeFieldTest1 = "./greenface.svg";
          imageUrlEyeFieldTest2 = "./redface.svg";
          resultTextEyeFieldTest =
            "Zorné pole vašeho jednoho oka se zdá být omezené.";
        } else if (correctAnswersRight === 2 && correctAnswersLeft < 2) {
          imageUrlEyeFieldTest1 = "./redface.svg";
          imageUrlEyeFieldTest2 = "./greenface.svg";
          resultTextEyeFieldTest =
            "Zorné pole vašeho jednoho oka se zdá být omezené.";
        } else {
          imageUrlEyeFieldTest1 = "./redface.svg";
          imageUrlEyeFieldTest2 = "./redface.svg";
          resultTextEyeFieldTest =
            "Zorné pole vašich obou očí se zdá být omezené.";
        }

        if (isTestComplete) {
          dispatch(
            setTestResult({
              testNameEyeFieldTest: "Test zorného pole",
              resultTextEyeFieldTest: resultTextEyeFieldTest,
              imageUrlEyeFieldTest1: imageUrlEyeFieldTest1,
              imageUrlEyeFieldTest2: imageUrlEyeFieldTest2,
            })
          );
        }

        return (
          <div>
            <CloseButton />
            <div className="eyes-result-container">
              <h1>
                <b>Výsledek testu zorného pole</b>
              </h1>
              <p>{resultTextEyeFieldTest}</p>
              <div className="eyes-result">
                <div className="eyes-result-images">
                  <div className="eyes-result-left">
                    <img src={imageUrlEyeFieldTest1} alt="ResultLeft" />
                  </div>
                  <div className="eyes-result-right">
                    <img src={imageUrlEyeFieldTest2} alt="ResultRight" />
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
            <div className="next_test_buttons">
              <button
                className="defaultButton"
                onClick={() => navigate("/vysledky-testu")}
              >
                Zobrazit výsledky testů
              </button>
              <button
                className="defaultButton"
                onClick={() => navigate("/vyber-testu")}
              >
                Vyberte si jiný test
              </button>
            </div>
            <div className="result-map">
              <img src="./resultMap.svg" alt="ResultMap" />
              <p>
                <b>
                  Vyhledejte optika společnosti Erste Optik ve své blízkosti.
                </b>{" "}
                Pro kompletní vyšetření zraku vždy vyhledejte profesionálního
                očního lékaře.
              </p>
              <button className="defaultButton">
                Zobrazit specialisty v mé blízkosti
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return <div>{getContent(currentContent)}</div>;
};

export default EyeFieldTest;
