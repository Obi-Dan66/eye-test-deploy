import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setTestResult } from "../../store/testResultSlice"; // Adjust the import path as needed
import CloseButton from "../CloseButton.jsx";

const SharpTest = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentContent, setCurrentContent] = useState(0);
  const [clickedButton, setClickedButton] = useState(null);
  const [correctAnswersRange1, setCorrectAnswersRange1] = useState(0); // For cases 0-7
  const [correctAnswersRange2, setCorrectAnswersRange2] = useState(0); // For cases 9-16
  const totalCases = 20; // Adjust based on your actual cases
  const [, setShowTick] = useState(false);
  const [iconType, setIconType] = useState(null);
  const isTestComplete = currentContent === totalCases - 1;
  const rangeValue = useSelector((state) => state.slider.rangeValue);
  const [isClickable, setIsClickable] = useState(true);

  const getSvgScale = () => {
    switch (rangeValue) {
      case 1:
        return 0.5; // Decrease by 50%
      case 2:
        return 0.75; // Decrease by 25%
      case 3:
        return 1; // Default size
      case 4:
        return 1.25; // Increase by 25%
      case 5:
        return 1.5; // Increase by 50%
      default:
        return 1; // Default size
    }
  };

  // Define correctButtonForCase here for simplicity
  const correctButtonForCase = {
    0: "RIGHT",
    1: "TOP",
    2: "TOPLEFT",
    3: "BOTTOM",
    4: "LEFT",
    5: "TOPRIGHT",
    6: "BOTTOMRIGHT",
    7: "BOTTOMLEFT",
    8: "BOTTOM",
    9: "",
    10: "RIGHT",
    11: "TOP",
    12: "TOPLEFT",
    13: "BOTTOM",
    14: "LEFT",
    15: "TOPRIGHT",
    16: "BOTTOMRIGHT",
    17: "BOTTOMLEFT",
    18: "BOTTOM",
  };

  const handleClick = (buttonId) => {
    if (!isClickable) return; // Prevent handling clicks if not clickable

    if (currentContent === 9) {
      setCurrentContent((prevContent) => (prevContent + 1) % totalCases);
      setClickedButton(null);
      setShowTick(false);
      setIconType(null); // Reset icon type
      return;
    }

    if (correctButtonForCase[currentContent] === buttonId) {
      if (currentContent >= 0 && currentContent <= 8) {
        setCorrectAnswersRange1((prevCount) => prevCount + 1);
      } else if (currentContent >= 10 && currentContent <= 18) {
        setCorrectAnswersRange2((prevCount) => prevCount + 1);
      }

      setClickedButton(buttonId);
      setShowTick(true); // Show the tick animation
      setIconType("checkmark"); // Set icon to checkmark for correct answer
      setIsClickable(false); // Disable further clicks during the timeout

      setTimeout(() => {
        setCurrentContent((prevContent) => (prevContent + 1) % totalCases);
        setClickedButton(null);
        setShowTick(false); // Hide the tick after the animation
        setIconType(null); // Reset icon type
        setIsClickable(true); // Re-enable clicking after the timeout
      }, 800);
    } else {
      setCurrentContent((prevContent) => (prevContent + 1) % totalCases);
      setIconType("cross"); // Set icon to cross for incorrect answer
      setIsClickable(false); // Disable further clicks during the timeout

      setTimeout(() => {
        setIconType(null); // Reset icon type after showing cross
        setIsClickable(true); // Re-enable clicking after the timeout
      }, 800);
    }
  };

  const getContent = (currentContent) => {
    // Define transformation styles directly within the switch cases
    const transformStyles = [
      "rotate(90deg) scale(1)", // Case 0
      "rotate(0deg) scale(0.9)", // Case 1
      "rotate(315deg) scale(0.8)", // Case 2
      "rotate(180deg) scale(0.7)", // Case 3
      "rotate(270deg) scale(0.6)", // Case 4
      "rotate(45deg) scale(0.5)", // Case 5
      "rotate(135deg) scale(0.4)", // Case 6
      "rotate(225deg) scale(0.3)", // Case 7
      "rotate(180deg) scale(0.2)", // Case 8
      "rotate(0deg) scale(1)", // Case 9 - placeholder
      "rotate(90deg) scale(1)", // Case 10
      "rotate(0deg) scale(0.9)", // Case 11
      "rotate(315deg) scale(0.8)", // Case 12
      "rotate(180deg) scale(0.7)", // Case 13
      "rotate(270deg) scale(0.6)", // Case 14
      "rotate(45deg) scale(0.5)", // Case 15
      "rotate(135deg) scale(0.4)", // Case 16
      "rotate(225deg) scale(0.3)", // Case 17
      "rotate(180deg) scale(0.2)", // Case 18
    ];

    const renderSvgContainer = (clickedButton, handleClick, transformStyle) => {
      return (
        <div className="sharptestCircle">
          <CloseButton />
          <h1>
            <b>Zraková ostrost</b>
          </h1>
          <p>1 - Zakryjte si levé oko.</p>
          <p>2 - Zařízení držte na délku paže.</p>
          <p>3 - Vidíte horní kruh? Označte příslušný výřez.</p>

          <div className="sharpTestContainer">
            <div
              className="sharpTestCircleSmall"
              style={{ transform: transformStyle }}
            >
              <svg
                width="25"
                height="25"
                viewBox="0 0 3 3"
                xmlns="http://www.w3.org/2000/svg"
                style={{ transform: `scale(${getSvgScale()})` }}
              >
                <path d="M1.785,0.015c0.684,0.139 1.2,0.745 1.2,1.47c0,0.828 -0.672,1.5 -1.5,1.5c-0.828,0 -1.5,-0.672 -1.5,-1.5c0,-0.725 0.516,-1.331 1.2,-1.47l0,0.69c-0.321,0.119 -0.55,0.424 -0.55,0.78c0,0.46 0.381,0.833 0.85,0.833c0.469,0 0.85,-0.373 0.85,-0.833c0,-0.356 -0.229,-0.661 -0.55,-0.78l0,-0.69Z"></path>
              </svg>
            </div>
            <div className="circle1">
              <div className="svg-container">
                <svg viewBox="0 0 260 260" xmlns="http://www.w3.org/2000/svg">
                  <path
                    id="TOP"
                    onClick={() => handleClick("TOP")}
                    style={{ opacity: clickedButton === "TOP" ? 0 : 1 }}
                    d="M158.934 57.545a77.47 77.47 0 00-13.211-3.957 78.642 78.642 0 00-31.437 0 77.47 77.47 0 00-13.211 3.957l-19.9-48.059a130.162 130.162 0 0197.674 0z"
                  ></path>
                  <path
                    id="TOPRIGHT"
                    onClick={() => handleClick("TOPRIGHT")}
                    style={{ opacity: clickedButton === "TOPRIGHT" ? 0 : 1 }}
                    d="M201.693 99.226a78.216 78.216 0 00-40.914-40.914l19.906-48.059a130.414 130.414 0 0169.066 69.066l-48.059 19.907z"
                  ></path>
                  <path
                    id="RIGHT"
                    onClick={() => handleClick("RIGHT")}
                    style={{ opacity: clickedButton === "RIGHT" ? 0 : 1 }}
                    d="M202.459 158.933a77.41 77.41 0 003.959-13.213 78.785 78.785 0 000-31.437 77.477 77.477 0 00-3.957-13.209l48.057-19.9a129.319 129.319 0 016.844 22.635 130.2 130.2 0 01-6.844 75.036z"
                  ></path>
                  <path
                    id="BOTTOMRIGHT"
                    onClick={() => handleClick("BOTTOMRIGHT")}
                    style={{ opacity: clickedButton === "BOTTOMRIGHT" ? 0 : 1 }}
                    d="M160.779 201.692a78.193 78.193 0 0024.379-16.535 78.8 78.8 0 009.525-11.545 77.993 77.993 0 007.008-12.833l48.061 19.907a130.393 130.393 0 01-69.068 69.064z"
                  ></path>
                  <path
                    id="BOTTOM"
                    onClick={() => handleClick("BOTTOM")}
                    style={{ opacity: clickedButton === "BOTTOM" ? 0 : 1 }}
                    d="M130 260.001a130.826 130.826 0 01-26.2-2.641 129.332 129.332 0 01-22.639-6.846l19.906-48.058a77.615 77.615 0 0013.213 3.957 78.642 78.642 0 0031.438 0 77.47 77.47 0 0013.211-3.957l19.906 48.058a129.181 129.181 0 01-22.639 6.846A130.778 130.778 0 01130 260.001z"
                  ></path>
                  <path
                    id="BOTTOMLEFT"
                    onClick={() => handleClick("BOTTOMLEFT")}
                    style={{ opacity: clickedButton === "BOTTOMLEFT" ? 0 : 1 }}
                    d="M79.316 249.75a130.42 130.42 0 01-69.066-69.063l48.057-19.9a78.285 78.285 0 0028.084 33.9 77.645 77.645 0 0012.836 7.015z"
                  ></path>
                  <path
                    id="LEFT"
                    onClick={() => handleClick("LEFT")}
                    style={{ opacity: clickedButton === "LEFT" ? 0 : 1 }}
                    d="M9.486 178.84a130.148 130.148 0 010-97.673l48.055 19.9a78.1 78.1 0 000 57.865z"
                  ></path>
                  <path
                    id="TOPLEFT"
                    onClick={() => handleClick("TOPLEFT")}
                    style={{ opacity: clickedButton === "TOPLEFT" ? 0 : 1 }}
                    d="M10.252 79.316a130.414 130.414 0 0169.064-69.064l19.908 48.059a77.664 77.664 0 00-12.834 7.014 78.166 78.166 0 00-28.084 33.9z"
                  ></path>
                </svg>
                <div className="icon-overlay">
                  {iconType === "checkmark" && (
                    <img
                      src="./checkmark.svg"
                      className="tick-animation"
                      alt="Tick"
                    />
                  )}
                  {iconType === "cross" && (
                    <img
                      src="./cross.svg"
                      className="tick-animation"
                      alt="Cross"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    };

    const renderSvgContainer2 = (
      clickedButton,
      handleClick,
      transformStyle
    ) => {
      return (
        <div className="sharptestCircle">
          <CloseButton />
          <h1>
            <b>Zraková ostrost</b>
          </h1>
          <p>1 - Zakryjte si pravé oko.</p>
          <p>2 - Zařízení držte na délku paže.</p>
          <p>3 - Vidíte horní kruh? Označte příslušný výřez.</p>

          <div className="sharpTestContainer">
            <div
              className="sharpTestCircleSmall"
              style={{ transform: transformStyle }}
            >
              <svg
                width="25"
                height="25"
                viewBox="0 0 3 3"
                xmlns="http://www.w3.org/2000/svg"
                style={{ transform: `scale(${getSvgScale()})` }}
              >
                <path d="M1.785,0.015c0.684,0.139 1.2,0.745 1.2,1.47c0,0.828 -0.672,1.5 -1.5,1.5c-0.828,0 -1.5,-0.672 -1.5,-1.5c0,-0.725 0.516,-1.331 1.2,-1.47l0,0.69c-0.321,0.119 -0.55,0.424 -0.55,0.78c0,0.46 0.381,0.833 0.85,0.833c0.469,0 0.85,-0.373 0.85,-0.833c0,-0.356 -0.229,-0.661 -0.55,-0.78l0,-0.69Z"></path>
              </svg>
            </div>
            <div className="circle1">
              <div className="svg-container">
                <svg viewBox="0 0 260 260" xmlns="http://www.w3.org/2000/svg">
                  <path
                    id="TOP"
                    onClick={() => handleClick("TOP")}
                    style={{ opacity: clickedButton === "TOP" ? 0 : 1 }}
                    d="M158.934 57.545a77.47 77.47 0 00-13.211-3.957 78.642 78.642 0 00-31.437 0 77.47 77.47 0 00-13.211 3.957l-19.9-48.059a130.162 130.162 0 0197.674 0z"
                  ></path>
                  <path
                    id="TOPRIGHT"
                    onClick={() => handleClick("TOPRIGHT")}
                    style={{ opacity: clickedButton === "TOPRIGHT" ? 0 : 1 }}
                    d="M201.693 99.226a78.216 78.216 0 00-40.914-40.914l19.906-48.059a130.414 130.414 0 0169.066 69.066l-48.059 19.907z"
                  ></path>
                  <path
                    id="RIGHT"
                    onClick={() => handleClick("RIGHT")}
                    style={{ opacity: clickedButton === "RIGHT" ? 0 : 1 }}
                    d="M202.459 158.933a77.41 77.41 0 003.959-13.213 78.785 78.785 0 000-31.437 77.477 77.477 0 00-3.957-13.209l48.057-19.9a129.319 129.319 0 016.844 22.635 130.2 130.2 0 01-6.844 75.036z"
                  ></path>
                  <path
                    id="BOTTOMRIGHT"
                    onClick={() => handleClick("BOTTOMRIGHT")}
                    style={{ opacity: clickedButton === "BOTTOMRIGHT" ? 0 : 1 }}
                    d="M160.779 201.692a78.193 78.193 0 0024.379-16.535 78.8 78.8 0 009.525-11.545 77.993 77.993 0 007.008-12.833l48.061 19.907a130.393 130.393 0 01-69.068 69.064z"
                  ></path>
                  <path
                    id="BOTTOM"
                    onClick={() => handleClick("BOTTOM")}
                    style={{ opacity: clickedButton === "BOTTOM" ? 0 : 1 }}
                    d="M130 260.001a130.826 130.826 0 01-26.2-2.641 129.332 129.332 0 01-22.639-6.846l19.906-48.058a77.615 77.615 0 0013.213 3.957 78.642 78.642 0 0031.438 0 77.47 77.47 0 0013.211-3.957l19.906 48.058a129.181 129.181 0 01-22.639 6.846A130.778 130.778 0 01130 260.001z"
                  ></path>
                  <path
                    id="BOTTOMLEFT"
                    onClick={() => handleClick("BOTTOMLEFT")}
                    style={{ opacity: clickedButton === "BOTTOMLEFT" ? 0 : 1 }}
                    d="M79.316 249.75a130.42 130.42 0 01-69.066-69.063l48.057-19.9a78.285 78.285 0 0028.084 33.9 77.645 77.645 0 0012.836 7.015z"
                  ></path>
                  <path
                    id="LEFT"
                    onClick={() => handleClick("LEFT")}
                    style={{ opacity: clickedButton === "LEFT" ? 0 : 1 }}
                    d="M9.486 178.84a130.148 130.148 0 010-97.673l48.055 19.9a78.1 78.1 0 000 57.865z"
                  ></path>
                  <path
                    id="TOPLEFT"
                    onClick={() => handleClick("TOPLEFT")}
                    style={{ opacity: clickedButton === "TOPLEFT" ? 0 : 1 }}
                    d="M10.252 79.316a130.414 130.414 0 0169.064-69.064l19.908 48.059a77.664 77.664 0 00-12.834 7.014 78.166 78.166 0 00-28.084 33.9z"
                  ></path>
                </svg>
                <div className="icon-overlay">
                  {iconType === "checkmark" && (
                    <img
                      src="./checkmark.svg"
                      className="tick-animation"
                      alt="Tick"
                    />
                  )}
                  {iconType === "cross" && (
                    <img
                      src="./cross.svg"
                      className="tick-animation"
                      alt="Cross"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    };

    switch (currentContent) {
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
      case 8: {
        const transformStyle1 =
          transformStyles[currentContent] || "rotate(0deg)";
        return renderSvgContainer(clickedButton, handleClick, transformStyle1);
      }
      case 9:
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
      case 10:
      case 11:
      case 12:
      case 13:
      case 14:
      case 15:
      case 16:
      case 17:
      case 18: {
        const transformStyle2 =
          transformStyles[currentContent] || "rotate(0deg)";
        return renderSvgContainer2(clickedButton, handleClick, transformStyle2);
      }
      case 19:
        var imageUrlSharpTest1, imageUrlSharpTest2, resultTextSharpTest;

        // Determine imageUrlSharpTest2 based on correctAnswersRange1
        if (correctAnswersRange1 >= 8) {
          imageUrlSharpTest2 = "./greenface.svg";
        } else if (correctAnswersRange1 == 7) {
          imageUrlSharpTest2 = "./yellowface.svg";
        } else {
          imageUrlSharpTest2 = "./redface.svg";
        }

        // Determine imageUrlSharpTest1 based on correctAnswersRange2
        if (correctAnswersRange2 >= 8) {
          imageUrlSharpTest1 = "./greenface.svg";
        } else if (correctAnswersRange2 == 7) {
          imageUrlSharpTest1 = "./yellowface.svg";
        } else {
          imageUrlSharpTest1 = "./redface.svg";
        }

        // Determine resultTextSharpTest based on the combination of imageUrlSharpTest1 and imageUrlSharpTest2
        if (
          imageUrlSharpTest1 === "./greenface.svg" &&
          imageUrlSharpTest2 === "./greenface.svg"
        ) {
          resultTextSharpTest =
            "Vaše zraková ostrost obou očí se zdá být vynikající."; // Both are green
        } else if (
          imageUrlSharpTest1 === "./redface.svg" &&
          imageUrlSharpTest2 === "./redface.svg"
        ) {
          resultTextSharpTest =
            "Vaše zraková ostrost obou očí se zdá být omezená."; // Both are red
        } else if (
          imageUrlSharpTest1 === "./yellowface.svg" &&
          imageUrlSharpTest2 === "./yellowface.svg"
        ) {
          resultTextSharpTest =
            "Vaše zraková ostrost obou očí se zdá být v pořádku."; // Both are yellow
        } else if (
          imageUrlSharpTest1 === "./redface.svg" ||
          imageUrlSharpTest2 === "./redface.svg"
        ) {
          resultTextSharpTest =
            "Vaše zraková ostrost jednoho oka se zdá být omezená."; // At least one is red
        } else if (
          imageUrlSharpTest1 === "./yellowface.svg" ||
          imageUrlSharpTest2 === "./yellowface.svg"
        ) {
          resultTextSharpTest =
            "Vaše zraková ostrost jednoho oka se zdá být v pořádku."; // At least one is yellow
        }

        if (isTestComplete) {
          dispatch(
            setTestResult({
              testNameSharpTest: "Test zrakové ostrosti",
              resultTextSharpTest: resultTextSharpTest,
              imageUrlSharpTest1: imageUrlSharpTest1,
              imageUrlSharpTest2: imageUrlSharpTest2,
            })
          );
        }

        return (
          <div>
            <CloseButton />
            <div className="eyes-result-container">
              <h1>
                <b>Výsledek testu zrakové ostrosti</b>
              </h1>
              <p>{resultTextSharpTest}</p>
              <div className="eyes-result">
                <div className="eyes-result-images">
                  <div className="eyes-result-left">
                    <img src={imageUrlSharpTest1} alt="ResultLeft" />
                  </div>
                  <div className="eyes-result-right">
                    <img src={imageUrlSharpTest2} alt="ResultRight" />
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
                onClick={() => navigate("/instrukce-test-kontrastniho-videni")}
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
        // Handle any other cases or provide a default case
        return <div>No content available for this case.</div>;
    }
  };

  return <div>{getContent(currentContent)}</div>;
};

export default SharpTest;
