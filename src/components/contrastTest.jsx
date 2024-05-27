import React, { useState } from 'react';

const ContrastTest = () => {
  const [currentContent, setCurrentContent] = useState(0);
  const [clickedButton, setClickedButton] = useState(null);
  const [correctAnswersRange1, setCorrectAnswersRange1] = useState(0); // For cases 0-7
  const [correctAnswersRange2, setCorrectAnswersRange2] = useState(0); // For cases 9-16
  const totalCases = 18; // Adjust based on your actual cases
  const [showTick, setShowTick] = useState(false);
  const [iconType, setIconType] = useState(null);

  // Define correctButtonForCase here for simplicity
  const correctButtonForCase = {
    0: 'TOPRIGHT',
    1: 'TOP',
    2: 'LEFT',
    3: 'BOTTOM',
    4: 'TOPLEFT',
    5: 'RIGHT',
    6: 'BOTTOMRIGHT',
    7: 'BOTTOMLEFT',
    8: '',
    9: 'TOPRIGHT',
    10: 'TOP',
    11: 'LEFT',
    12: 'BOTTOM',
    13: 'TOPLEFT',
    14: 'RIGHT',
    15: 'BOTTOMRIGHT',
    16: 'BOTTOMLEFT',
  };

  const handleClick = (buttonId) => {
    if (currentContent === 8) {
      setCurrentContent(prevContent => (prevContent + 1) % totalCases);
      setClickedButton(null);
      setShowTick(false);
      setIconType(null);  // Reset icon type
      return;
    }
  
    if (correctButtonForCase[currentContent] === buttonId) {
      if (currentContent >= 0 && currentContent <= 7) {
        setCorrectAnswersRange1(prevCount => prevCount + 1);
      } else if (currentContent >= 9 && currentContent <= 16) {
        setCorrectAnswersRange2(prevCount => prevCount + 1);
      }
  
      setClickedButton(buttonId);
      setShowTick(true); // Show the tick animation
      setIconType('checkmark'); // Set icon to checkmark for correct answer

      setTimeout(() => {
        setCurrentContent(prevContent => (prevContent + 1) % totalCases);
        setClickedButton(null);
        setShowTick(false); // Hide the tick after the animation
        setIconType(null);  // Reset icon type
      }, 800);
    } else {
      setCurrentContent(prevContent => (prevContent + 1) % totalCases);
      setIconType('cross'); // Set icon to cross for incorrect answer

      setTimeout(() => {
        setIconType(null);  // Reset icon type after showing cross
      }, 800);
    }
  };

  const getContent = (currentContent) => {
    // Define rotation styles for each case
    const transformStyles = [
      'rotate(45deg)',    // Case 0
      'rotate(0deg)',   // Case 1
      'rotate(270deg)',   // Case 2
      'rotate(180deg)',  // Case 3
      'rotate(315deg)',  // Case 4
      'rotate(90deg)',  // Case 5
      'rotate(135deg)',  // Case 6
      'rotate(225deg)',  // Case 7
      'rotate(90deg)', // Placeholder for Case 8
      'rotate(45deg)',    // Case 9
      'rotate(0deg)',   // Case 10
      'rotate(270deg)',   // Case 11
      'rotate(180deg)',  // Case 12
      'rotate(315deg)',  // Case 13
      'rotate(90deg)',  // Case 14
      'rotate(135deg)',  // Case 15
      'rotate(225deg)',  // Case 16
    ];

    // Define color styles for each case
    const colorStyles = [
      'rgba(0, 0, 0, 0.498)', // Case 0
      'rgba(0, 0, 0, 0.298)', // Case 1
      'rgba(0, 0, 0, 0.098)', // Case 2
      'rgba(0, 0, 0, 0.04)',  // Case 3
      'rgba(0, 0, 0, 0.02)',  // Case 4
      'rgba(0, 0, 0, 0.01)',  // Case 5
      'rgba(0, 0, 0, 0.01)',  // Case 6
      'rgba(0, 0, 0, 0.01)',  // Case 7
      'rgba(0, 0, 0, 0.498)', // Paceholder Case 8
      'rgba(0, 0, 0, 0.498)', // Case 9
      'rgba(0, 0, 0, 0.298)', // Case 10
      'rgba(0, 0, 0, 0.098)', // Case 11
      'rgba(0, 0, 0, 0.04)',  // Case 12
      'rgba(0, 0, 0, 0.02)',  // Case 13
      'rgba(0, 0, 0, 0.01)',  // Case 14
      'rgba(0, 0, 0, 0.01)',  // Case 15
      'rgba(0, 0, 0, 0.01)',  // Case 16

    ];

    // Use a default style if the case index is out of bounds
    const renderSvgContainer = (clickedButton, handleClick, transformStyle, colorStyle) => {
      return (
        <div className='sharptestCircle'>
      <h1><b>Kontrastní vidění</b></h1>
      <p>1 - Zakryjte si levé oko.</p>
      <p>2 - Zařízení držte na délku paže.</p>
      <p>3 - Vidíte horní kruh? Označte příslušný bod.</p>

      <div className='sharpTestContainer'>
      <div className="sharpTestCircleSmall"style={{ transform: transformStyle }}>
        <svg width="25" height="25" viewBox="0 0 3 3" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.785,0.015c0.684,0.139 1.2,0.745 1.2,1.47c0,0.828 -0.672,1.5 -1.5,1.5c-0.828,0 -1.5,-0.672 -1.5,-1.5c0,-0.725 0.516,-1.331 1.2,-1.47l0,0.69c-0.321,0.119 -0.55,0.424 -0.55,0.78c0,0.46 0.381,0.833 0.85,0.833c0.469,0 0.85,-0.373 0.85,-0.833c0,-0.356 -0.229,-0.661 -0.55,-0.78l0,-0.69Z" style={{ fill: colorStyle }}></path>
        </svg>
      </div>
      <div className='circle1'>
      {iconType === 'checkmark' && (
           <img src='src/assets/checkmark.svg' className="tick-animation" alt="Tick" />
         )}
         {iconType === 'cross' && (
           <img src='src/assets/cross.svg' className="tick-animation" alt="Cross" />
         )}
      <svg viewBox="0 0 100% 100%" xmlns="http://www.w3.org/2000/svg">
      <path id="TOP" onClick={() => handleClick('TOP')} style={{ opacity: clickedButton === 'TOP' ? 0 : 1 }} d="M158.934 57.545a77.47 77.47 0 00-13.211-3.957 78.642 78.642 0 00-31.437 0 77.47 77.47 0 00-13.211 3.957l-19.9-48.059a130.162 130.162 0 0197.674 0z"></path>
      <path id="TOPRIGHT" onClick={() => handleClick('TOPRIGHT')} style={{ opacity: clickedButton === 'TOPRIGHT' ? 0 : 1 }} d="M201.693 99.226a78.216 78.216 0 00-40.914-40.914l19.906-48.059a130.414 130.414 0 0169.066 69.066l-48.059 19.907z"></path>
      <path id="RIGHT" onClick={() => handleClick('RIGHT')} style={{ opacity: clickedButton === 'RIGHT' ? 0 : 1 }} d="M202.459 158.933a77.41 77.41 0 003.959-13.213 78.785 78.785 0 000-31.437 77.477 77.477 0 00-3.957-13.209l48.057-19.9a129.319 129.319 0 016.844 22.635 130.2 130.2 0 01-6.844 75.036z"></path>
      <path id="BOTTOMRIGHT" onClick={() => handleClick('BOTTOMRIGHT')} style={{ opacity: clickedButton === 'BOTTOMRIGHT' ? 0 : 1 }} d="M160.779 201.692a78.193 78.193 0 0024.379-16.535 78.8 78.8 0 009.525-11.545 77.993 77.993 0 007.008-12.833l48.061 19.907a130.393 130.393 0 01-69.068 69.064z"></path>
      <path id="BOTTOM" onClick={() => handleClick('BOTTOM')} style={{ opacity: clickedButton === 'BOTTOM' ? 0 : 1 }} d="M130 260.001a130.826 130.826 0 01-26.2-2.641 129.332 129.332 0 01-22.639-6.846l19.906-48.058a77.615 77.615 0 0013.213 3.957 78.642 78.642 0 0031.438 0 77.47 77.47 0 0013.211-3.957l19.906 48.058a129.181 129.181 0 01-22.639 6.846A130.778 130.778 0 01130 260.001z"></path>
      <path id="BOTTOMLEFT" onClick={() => handleClick('BOTTOMLEFT')} style={{ opacity: clickedButton === 'BOTTOMLEFT' ? 0 : 1 }} d="M79.316 249.75a130.42 130.42 0 01-69.066-69.063l48.057-19.9a78.285 78.285 0 0028.084 33.9 77.645 77.645 0 0012.836 7.015z"></path>
      <path id="LEFT" onClick={() => handleClick('LEFT')} style={{ opacity: clickedButton === 'LEFT' ? 0 : 1 }} d="M9.486 178.84a130.148 130.148 0 010-97.673l48.055 19.9a78.1 78.1 0 000 57.865z"></path>
      <path id="TOPLEFT" onClick={() => handleClick('TOPLEFT')} style={{ opacity: clickedButton === 'TOPLEFT' ? 0 : 1 }} d="M10.252 79.316a130.414 130.414 0 0169.064-69.064l19.908 48.059a77.664 77.664 0 00-12.834 7.014 78.166 78.166 0 00-28.084 33.9z"></path>
      </svg>
      </div>
    </div>
  </div>
  );
};

const renderSvgContainer2 = (clickedButton, handleClick, transformStyle, colorStyle) => {
  return (
    <div className='sharptestCircle'>
  <h1><b>Kontrastní vidění</b></h1>
  <p>1 - Zakryjte si pravé oko.</p>
  <p>2 - Zařízení držte na délku paže.</p>
  <p>3 - Vidíte horní kruh? Označte příslušný bod.</p>

  <div className='sharpTestContainer'>
  <div className="sharpTestCircleSmall"style={{ transform: transformStyle }}>
    <svg width="25" height="25" viewBox="0 0 3 3" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.785,0.015c0.684,0.139 1.2,0.745 1.2,1.47c0,0.828 -0.672,1.5 -1.5,1.5c-0.828,0 -1.5,-0.672 -1.5,-1.5c0,-0.725 0.516,-1.331 1.2,-1.47l0,0.69c-0.321,0.119 -0.55,0.424 -0.55,0.78c0,0.46 0.381,0.833 0.85,0.833c0.469,0 0.85,-0.373 0.85,-0.833c0,-0.356 -0.229,-0.661 -0.55,-0.78l0,-0.69Z" style={{ fill: colorStyle }}></path>
    </svg>
  </div>
  <div className='circle1'>
  {iconType === 'checkmark' && (
           <img src='src/assets/checkmark.svg' className="tick-animation" alt="Tick" />
         )}
         {iconType === 'cross' && (
           <img src='src/assets/cross.svg' className="tick-animation" alt="Cross" />
         )}
  <svg viewBox="0 0 100% 100%" xmlns="http://www.w3.org/2000/svg">
  <path id="TOP" onClick={() => handleClick('TOP')} style={{ opacity: clickedButton === 'TOP' ? 0 : 1 }} d="M158.934 57.545a77.47 77.47 0 00-13.211-3.957 78.642 78.642 0 00-31.437 0 77.47 77.47 0 00-13.211 3.957l-19.9-48.059a130.162 130.162 0 0197.674 0z"></path>
  <path id="TOPRIGHT" onClick={() => handleClick('TOPRIGHT')} style={{ opacity: clickedButton === 'TOPRIGHT' ? 0 : 1 }} d="M201.693 99.226a78.216 78.216 0 00-40.914-40.914l19.906-48.059a130.414 130.414 0 0169.066 69.066l-48.059 19.907z"></path>
  <path id="RIGHT" onClick={() => handleClick('RIGHT')} style={{ opacity: clickedButton === 'RIGHT' ? 0 : 1 }} d="M202.459 158.933a77.41 77.41 0 003.959-13.213 78.785 78.785 0 000-31.437 77.477 77.477 0 00-3.957-13.209l48.057-19.9a129.319 129.319 0 016.844 22.635 130.2 130.2 0 01-6.844 75.036z"></path>
  <path id="BOTTOMRIGHT" onClick={() => handleClick('BOTTOMRIGHT')} style={{ opacity: clickedButton === 'BOTTOMRIGHT' ? 0 : 1 }} d="M160.779 201.692a78.193 78.193 0 0024.379-16.535 78.8 78.8 0 009.525-11.545 77.993 77.993 0 007.008-12.833l48.061 19.907a130.393 130.393 0 01-69.068 69.064z"></path>
  <path id="BOTTOM" onClick={() => handleClick('BOTTOM')} style={{ opacity: clickedButton === 'BOTTOM' ? 0 : 1 }} d="M130 260.001a130.826 130.826 0 01-26.2-2.641 129.332 129.332 0 01-22.639-6.846l19.906-48.058a77.615 77.615 0 0013.213 3.957 78.642 78.642 0 0031.438 0 77.47 77.47 0 0013.211-3.957l19.906 48.058a129.181 129.181 0 01-22.639 6.846A130.778 130.778 0 01130 260.001z"></path>
  <path id="BOTTOMLEFT" onClick={() => handleClick('BOTTOMLEFT')} style={{ opacity: clickedButton === 'BOTTOMLEFT' ? 0 : 1 }} d="M79.316 249.75a130.42 130.42 0 01-69.066-69.063l48.057-19.9a78.285 78.285 0 0028.084 33.9 77.645 77.645 0 0012.836 7.015z"></path>
  <path id="LEFT" onClick={() => handleClick('LEFT')} style={{ opacity: clickedButton === 'LEFT' ? 0 : 1 }} d="M9.486 178.84a130.148 130.148 0 010-97.673l48.055 19.9a78.1 78.1 0 000 57.865z"></path>
  <path id="TOPLEFT" onClick={() => handleClick('TOPLEFT')} style={{ opacity: clickedButton === 'TOPLEFT' ? 0 : 1 }} d="M10.252 79.316a130.414 130.414 0 0169.064-69.064l19.908 48.059a77.664 77.664 0 00-12.834 7.014 78.166 78.166 0 00-28.084 33.9z"></path>
  </svg>
  </div>
</div>
</div>
);
};

const transformStyle1 = transformStyles[currentContent] || 'rotate(0deg)';
const colorStyle1 = colorStyles[currentContent] || 'rgba(0, 0, 0, 1)';
const transformStyle2 = transformStyles[currentContent] || 'rotate(0deg)';
const colorStyle2 = colorStyles[currentContent] || 'rgba(0, 0, 0, 1)';

switch (currentContent) {
  case 0:
  case 1:
  case 2:
  case 3:
  case 4:
  case 5:
  case 6:
  case 7:
    // Logic for cases 0-7
    const transformStyle1 = transformStyles[currentContent] || 'rotate(0deg)';
    const colorStyle1 = colorStyles[currentContent] || 'rgba(0, 0, 0, 1)';
    return renderSvgContainer(clickedButton, handleClick, transformStyle1, colorStyle1);
  case 8:
    return(
      <div>
              <svg _ngcontent-ng-c226631475="" xmlns="http://www.w3.org/2000/svg" width="200" height="54" viewBox="0 0 200 54"><g _ngcontent-ng-c226631475="" transform="translate(-395 -315)"><path _ngcontent-ng-c226631475="" d="M484.657 341.401a50.985 50.985 0 00-89.312 0l-.345.614.344.612A51.45 51.45 0 00439.996 369a51.455 51.455 0 0044.655-26.375l.344-.614zm-2.088.6c-8.209 14.931-25.289 24.948-42.571 24.948s-34.352-10.009-42.568-24.937c8.212-14.932 25.29-24.948 42.57-24.948s34.358 10.014 42.57 24.942z"></path><path _ngcontent-ng-c226631475="" d="M440 361.001a19 19 0 1119-19 19 19 0 01-19 19z"></path><circle _ngcontent-ng-c226631475="" fill="#ECF0F4" cx="17" cy="17" r="17" transform="translate(423 325)"></circle></g><g _ngcontent-ng-c226631475="" transform="translate(24 -1040)"><path _ngcontent-ng-c226631475="" d="M175.657 1066.401a50.985 50.985 0 00-89.312 0l-.345.614.344.612A51.45 51.45 0 00130.996 1094a51.455 51.455 0 0044.655-26.375l.344-.614zm-2.088.6c-8.209 14.931-25.289 24.948-42.571 24.948s-34.352-10.009-42.568-24.937c8.212-14.932 25.29-24.948 42.57-24.948s34.358 10.014 42.57 24.942z"></path><path _ngcontent-ng-c226631475="" d="M131 1086.001a19 19 0 1119-19 19 19 0 01-19 19z"></path><circle _ngcontent-ng-c226631475="" fill="#ECF0F4" cx="17" cy="17" r="17" transform="translate(114 1050)"></circle></g></svg>
              <div _ngcontent-ng-c226631475="" className="right-hand ng-star-inserted"><svg _ngcontent-ng-c226631475="" xmlns="http://www.w3.org/2000/svg" width="40" height="48"><path _ngcontent-ng-c226631475="" d="M2.142 9.181A4.745 4.745 0 015.453 7.85a4.128 4.128 0 012.295.646V6.934a4.423 4.423 0 014.225-3.99 3.966 3.966 0 012.561.985 4.06 4.06 0 014-2.928 3.987 3.987 0 013.134 1.39 4.8 4.8 0 011.072 2.673 5.271 5.271 0 012.246-.634 4.365 4.365 0 014.523 4.187 4.066 4.066 0 01-.017.614v15.033a13.084 13.084 0 012.327-2.172c1.371-.686 2.958-1.721 4.35-1.1a4.87 4.87 0 012.679 2.86 5.034 5.034 0 01-.476 4.358l-9.95 13.6a14.329 14.329 0 01-5.647 3.966 21.717 21.717 0 01-7.74 1.422h-.027A13.652 13.652 0 011.002 33.291V11.862a3.684 3.684 0 011.14-2.681z" fill="#ECF0F4"></path><path _ngcontent-ng-c226631475="" d="M39.694 23.748a5.078 5.078 0 00-2.8-2.968 5.366 5.366 0 00-4.618.127 13.652 13.652 0 00-2.391 2.227V8.589a4.382 4.382 0 00.02-.672 4.56 4.56 0 00-4.745-4.351 5.574 5.574 0 00-2.351.657A4.357 4.357 0 0018.409 0a4.26 4.26 0 00-4.205 3.042 4.2 4.2 0 00-2.7-1.024 4.624 4.624 0 00-4.416 4.18v1.593a4.36 4.36 0 00-2.406-.671A5.029 5.029 0 001.21 8.501a3.821 3.821 0 00-1.2 2.787v22.264c0 8.239 6.316 14.451 14.692 14.451h.025a22.954 22.954 0 008.121-1.478 15.038 15.038 0 005.939-4.142L39.22 28.257a5.183 5.183 0 00.474-4.509zm-2.306 3.619L27.067 41.191a13.754 13.754 0 01-5.052 3.4 21.716 21.716 0 01-7.32 1.376h-.054a12.109 12.109 0 01-12.585-12.42V11.281c0-1.04 1.319-2.1 2.62-2.1h.038a2.366 2.366 0 012.363 2.1v10.3a.967.967 0 001.014 1.073.962.962 0 001.039-1.063V6.242a2.425 2.425 0 012.373-2.157 2.46 2.46 0 012.411 2.119v13.861a1.032 1.032 0 102.064 0l.01-14.787a3.674 3.674 0 01.79-2.692 2.189 2.189 0 011.61-.531 2.226 2.226 0 011.6.6 3.616 3.616 0 01.794 2.622l-.01 14.787a.964.964 0 001.026 1.071.975.975 0 001.032-1.071V7.622a2.316 2.316 0 012.353-2 2.6 2.6 0 011.892.659 3.09 3.09 0 01.744 2.279l.032 17.875c0 .331 0 .885.757.963.568.058.934-.406 1.2-.74l2.944-3.49c1.046-1.325 3.028-.722 3.818-.228a3.03 3.03 0 011.354 2.286 4.343 4.343 0 01-.536 2.141z" fill="#0072EF"></path></svg></div>
                <h1><b>Jsou vaše oči připraveny?</b></h1>
                <p>Zakryjte si pravé oko.</p>
                <button className='defaultButton' onClick={handleClick}>Další krok</button>
          </div>
    );
  case 9:
  case 10:
  case 11:
  case 12:
  case 13:
  case 14:
  case 15:
  case 16:
    const transformStyle2 = transformStyles[currentContent] || 'rotate(0deg)';
    const colorStyle2 = colorStyles[currentContent] || 'rgba(0, 0, 0, 1)';
    return renderSvgContainer2(clickedButton, handleClick, transformStyle2, colorStyle2);
  case 17:
      let imageUrl1, imageUrl2, resultText;
    
      // Determine imageUrl2 based on correctAnswersRange1
      if (correctAnswersRange1 >= 7) {
        imageUrl2 = 'src/assets/greenface.svg';
      } else if (correctAnswersRange1 >= 5 && correctAnswersRange1 <= 6) {
        imageUrl2 = 'src/assets/yellowface.svg';
      } else {
        imageUrl2 = 'src/assets/redface.svg';
      }
    
      // Determine imageUrl1 based on correctAnswersRange2
      if (correctAnswersRange2 >= 7) {
        imageUrl1 = 'src/assets/greenface.svg';
      } else if (correctAnswersRange2 >= 5 && correctAnswersRange1 <= 6) {
        imageUrl1 = 'src/assets/yellowface.svg';
      } else {
        imageUrl1 = 'src/assets/redface.svg';
      }
    
      // Determine resultText based on the combination of imageUrl1 and imageUrl2
      if (imageUrl1 === 'src/assets/greenface.svg' && imageUrl2 === 'src/assets/greenface.svg') {
        resultText = "Vaše kontrastní vidění obou očí se zdá být vynikající."; // Both are green
      } else if (imageUrl1 === 'src/assets/redface.svg' && imageUrl2 === 'src/assets/redface.svg') {
        resultText = "Vaše kontrastní vidění obou očí se zdá být omezené."; // Both are red
      } else if (imageUrl1 === 'src/assets/yellowface.svg' && imageUrl2 === 'src/assets/yellowface.svg') {
        resultText = "Vaše kontrastní vidění obou očí se zdá být v pořádku."; // Both are yellow
      } else if (imageUrl1 === 'src/assets/redface.svg' || imageUrl2 === 'src/assets/redface.svg') {
        resultText = "Vaše kontrastní vidění jednoho oka se zdá být omezené."; // At least one is red
      } else if (imageUrl1 === 'src/assets/yellowface.svg' || imageUrl2 === 'src/assets/yellowface.svg') {
        resultText = "Vaše kontrastní vidění jednoho oka se zdá být v pořádku."; // At least one is yellow
      }
    
      return (
        <div>
        <div className='eyes-result-container'>
          <h1><b>Výsledek testu zorného pole</b></h1>
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
        <div className='result-map'>
        <img src="src/assets/resultMap.svg" alt="ResultMap" />
        <p><b>Vyhledejte optika společnosti Erste Optik ve své blízkosti.</b> Pro kompletní vyšetření zraku vždy vyhledejte profesionálního očního lékaře.</p>
        <button className='defaultButton'>Zobrazit specialisty v mé blízkosti</button>
        </div>
      </div>
      );
  default:
    // Handle any other cases or provide a default case
    return null;
  };
  };


  return (
    <div>
      {getContent(currentContent)}
    </div>
  );
};

export default ContrastTest;