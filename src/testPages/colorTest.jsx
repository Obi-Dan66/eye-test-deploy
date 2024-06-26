import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setTestResult } from "../store/testResultSlice.js";
import CloseButton from "../components/CloseButton.jsx";

const ColorTest = () => {
  const [currentContent, setCurrentContent] = useState(0);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [clickedButtonId, setClickedButtonId] = useState(null);
  const navigate = useNavigate();
  const totalContents = 7;
  const isTestComplete = currentContent === totalContents - 1;
  const dispatch = useDispatch();
  const [showFeedback, setShowFeedback] = useState(false);
  const [isClickable, setIsClickable] = useState(true);

  const handleClick = (buttonId, isCorrect) => {
    if (!isClickable) return; // Prevent handling clicks if not clickable

    setClickedButtonId(buttonId);
    setShowFeedback(true); // Enable feedback visibility
    setIsClickable(false); // Disable further clicks during the timeout

    setTimeout(() => {
      setCurrentContent((prevContent) => (prevContent + 1) % totalContents);
      setShowFeedback(false); // Reset feedback visibility for the next question
      setClickedButtonId(null);
      setIsClickable(true); // Re-enable clicking after the timeout

      if (isCorrect) {
        setCorrectAnswersCount((prevCount) => prevCount + 1);
      }
    }, 800); // Delay to show the icon before moving to the next content
  };

  const getContent = (contentIndex) => {
    const correctClicked =
      clickedButtonId === "correct" && currentContent === contentIndex;

    switch (contentIndex) {
      case 0:
        return (
          <div>
            <CloseButton />
            <h1>
              <b>Barevné vidění</b>
            </h1>
            <p>1 - Mějte obě oči otevřené.</p>
            <p>2 - Zařízení držte na délku paže.</p>
            <p>3 - Vyberte číslo, které vidíte v kruhu.</p>
            <div className="colorTestCard" style={{ backgroundColor: "white" }}>
              <img
                className="color-image"
                src="./12.svg"
                width={200}
                height={200}
                alt="color test"
              ></img>
              <div>
                <button
                  className={`colorTestBtn ${
                    showFeedback && clickedButtonId === "wrong1" ? "wrong" : ""
                  }`}
                  onClick={() => handleClick("wrong1", false)}
                >
                  31
                </button>
                <button
                  className={`colorTestBtn ${
                    showFeedback && correctClicked ? "correct" : ""
                  }`}
                  onClick={() => handleClick("correct", true)}
                >
                  12
                </button>
                <button
                  className={`colorTestBtn ${
                    showFeedback && clickedButtonId === "wrong2" ? "wrong" : ""
                  }`}
                  onClick={() => handleClick("wrong2", false)}
                >
                  71
                </button>
                <button
                  className={`colorTestBtn ${
                    showFeedback && clickedButtonId === "wrong3" ? "wrong" : ""
                  }`}
                  onClick={() => handleClick("wrong3", false)}
                >
                  Nic
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
              <b>Barevné vidění</b>
            </h1>
            <p>1 - Mějte obě oči otevřené.</p>
            <p>2 - Zařízení držte na délku paže.</p>
            <p>3 - Vyberte číslo, které vidíte v kruhu.</p>
            <div className="colorTestCard" style={{ backgroundColor: "white" }}>
              <img
                className="color-image"
                src="./8.svg"
                width={200}
                height={200}
                alt="color test"
              ></img>
              <div>
                <button
                  className={`colorTestBtn ${
                    showFeedback && correctClicked ? "correct" : ""
                  }`}
                  onClick={() => handleClick("correct", true)}
                >
                  8
                </button>
                <button
                  className={`colorTestBtn ${
                    showFeedback && clickedButtonId === "wrong1" ? "wrong" : ""
                  }`}
                  onClick={() => handleClick("wrong1", false)}
                >
                  3
                </button>
                <button
                  className={`colorTestBtn ${
                    showFeedback && clickedButtonId === "wrong2" ? "wrong" : ""
                  }`}
                  onClick={() => handleClick("wrong2", false)}
                >
                  11
                </button>
                <button
                  className={`colorTestBtn ${
                    showFeedback && clickedButtonId === "wrong3" ? "wrong" : ""
                  }`}
                  onClick={() => handleClick("wrong3", false)}
                >
                  Nic
                </button>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <CloseButton />
            <h1>
              <b>Barevné vidění</b>
            </h1>
            <p>1 - Mějte obě oči otevřené.</p>
            <p>2 - Zařízení držte na délku paže.</p>
            <p>3 - Vyberte číslo, které vidíte v kruhu.</p>
            <div className="colorTestCard" style={{ backgroundColor: "white" }}>
              <img
                className="color-image"
                src="./3.svg"
                width={200}
                height={200}
                alt="color test"
              ></img>
              <div>
                <button
                  className={`colorTestBtn ${
                    showFeedback && clickedButtonId === "wrong1" ? "wrong" : ""
                  }`}
                  onClick={() => handleClick("wrong1", false)}
                >
                  5
                </button>
                <button
                  className={`colorTestBtn ${
                    showFeedback && correctClicked ? "correct" : ""
                  }`}
                  onClick={() => handleClick("correct", true)}
                >
                  3
                </button>
                <button
                  className={`colorTestBtn ${
                    showFeedback && clickedButtonId === "wrong2" ? "wrong" : ""
                  }`}
                  onClick={() => handleClick("wrong2", false)}
                >
                  27
                </button>
                <button
                  className={`colorTestBtn ${
                    showFeedback && clickedButtonId === "wrong3" ? "wrong" : ""
                  }`}
                  onClick={() => handleClick("wrong3", false)}
                >
                  Nic
                </button>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            <CloseButton />
            <h1>
              <b>Barevné vidění</b>
            </h1>
            <p>1 - Mějte obě oči otevřené.</p>
            <p>2 - Zařízení držte na délku paže.</p>
            <p>3 - Vyberte číslo, které vidíte v kruhu.</p>
            <div className="colorTestCard" style={{ backgroundColor: "white" }}>
              <img
                className="color-image"
                src="./45.svg"
                width={200}
                height={200}
                alt="color test"
              ></img>
              <div>
                <button
                  className={`colorTestBtn ${
                    showFeedback && clickedButtonId === "wrong1" ? "wrong" : ""
                  }`}
                  onClick={() => handleClick("wrong1", false)}
                >
                  36
                </button>
                <button
                  className={`colorTestBtn ${
                    showFeedback && correctClicked ? "correct" : ""
                  }`}
                  onClick={() => handleClick("correct", true)}
                >
                  45
                </button>
                <button
                  className={`colorTestBtn ${
                    showFeedback && clickedButtonId === "wrong2" ? "wrong" : ""
                  }`}
                  onClick={() => handleClick("wrong2", false)}
                >
                  60
                </button>
                <button
                  className={`colorTestBtn ${
                    showFeedback && clickedButtonId === "wrong3" ? "wrong" : ""
                  }`}
                  onClick={() => handleClick("wrong3", false)}
                >
                  Nic
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
              <b>Barevné vidění</b>
            </h1>
            <p>1 - Mějte obě oči otevřené.</p>
            <p>2 - Zařízení držte na délku paže.</p>
            <p>3 - Vyberte číslo, které vidíte v kruhu.</p>
            <div className="colorTestCard" style={{ backgroundColor: "white" }}>
              <img
                className="color-image"
                src="./5.svg"
                width={200}
                height={200}
                alt="color test"
              ></img>
              <div>
                <button
                  className={`colorTestBtn ${
                    showFeedback && correctClicked ? "correct" : ""
                  }`}
                  onClick={() => handleClick("correct", true)}
                >
                  5
                </button>
                <button
                  className={`colorTestBtn ${
                    showFeedback && clickedButtonId === "wrong1" ? "wrong" : ""
                  }`}
                  onClick={() => handleClick("wrong1", false)}
                >
                  57
                </button>
                <button
                  className={`colorTestBtn ${
                    showFeedback && clickedButtonId === "wrong2" ? "wrong" : ""
                  }`}
                  onClick={() => handleClick("wrong2", false)}
                >
                  14
                </button>
                <button
                  className={`colorTestBtn ${
                    showFeedback && clickedButtonId === "wrong3" ? "wrong" : ""
                  }`}
                  onClick={() => handleClick("wrong3", false)}
                >
                  Nic
                </button>
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div>
            <CloseButton />
            <h1>
              <b>Barevné vidění</b>
            </h1>
            <p>1 - Mějte obě oči otevřené.</p>
            <p>2 - Zařízení držte na délku paže.</p>
            <p>3 - Vyberte číslo, které vidíte v kruhu.</p>
            <div className="colorTestCard" style={{ backgroundColor: "white" }}>
              <img
                className="color-image"
                src="./nic.svg"
                width={200}
                height={200}
                alt="color test"
              ></img>
              <div>
                <button
                  className={`colorTestBtn ${
                    showFeedback && clickedButtonId === "wrong1" ? "wrong" : ""
                  }`}
                  onClick={() => handleClick("wrong1", false)}
                >
                  45
                </button>
                <button
                  className={`colorTestBtn ${
                    showFeedback && clickedButtonId === "wrong2" ? "wrong" : ""
                  }`}
                  onClick={() => handleClick("wrong2", false)}
                >
                  70
                </button>
                <button
                  className={`colorTestBtn ${
                    showFeedback && clickedButtonId === "wrong3" ? "wrong" : ""
                  }`}
                  onClick={() => handleClick("wrong3", false)}
                >
                  6
                </button>
                <button
                  className={`colorTestBtn ${
                    showFeedback && correctClicked ? "correct" : ""
                  }`}
                  onClick={() => handleClick("correct", true)}
                >
                  Nic
                </button>
              </div>
            </div>
          </div>
        );
      case 6:
        var imageUrlColorTest1, imageUrlColorTest2, resultTextColorTest;

        if (correctAnswersCount === 6) {
          imageUrlColorTest1 = "./greenface.svg";
          imageUrlColorTest2 = "./greenface.svg";
          resultTextColorTest = "Vaše barevné vidění se zdá být vynikající.";
        } else if (correctAnswersCount === 4 || correctAnswersCount === 5) {
          imageUrlColorTest1 = "./yellowface.svg";
          imageUrlColorTest2 = "./yellowface.svg";
          resultTextColorTest = "Vaše barevné vidění se zdá být v pořádku.";
        } else {
          imageUrlColorTest1 = "./redface.svg";
          imageUrlColorTest2 = "./redface.svg";
          resultTextColorTest = "Vaše barevné vidění se zdá být omezené.";
        }

        if (isTestComplete) {
          dispatch(
            setTestResult({
              testNameColorTest: "Test barevného vidění",
              resultTextColorTest: resultTextColorTest,
              imageUrlColorTest1: imageUrlColorTest1,
              imageUrlColorTest2: imageUrlColorTest2,
            })
          );
        }

        return (
          <div>
            <CloseButton />
            <div className="eyes-result-container">
              <h1>
                <b>Výsledek testu barevného vidění</b>
              </h1>
              <p>{resultTextColorTest}</p>
              <div className="eyes-result">
                <div className="eyes-result-images">
                  <div className="eyes-result-left">
                    <img src={imageUrlColorTest1} alt="ResultLeft" />
                  </div>
                  <div className="eyes-result-right">
                    <img src={imageUrlColorTest2} alt="ResultRight" />
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
                onClick={() => navigate("/instrukce-test-astigmatismu")}
              >
                Pokračovat dalším testem
              </button>
              <button
                className="defaultButton"
                onClick={() => navigate("/vyber-testu")}
              >
                Nebo si vyberte určitý test
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
              <button
                className="defaultButton"
                onClick={() => navigate("/mapa")}
              >
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

export default ColorTest;
