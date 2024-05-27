import React, { useState } from 'react';

const ColorTest = () => {
  const [currentContent, setCurrentContent] = useState(0);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [clickedButtonId, setClickedButtonId] = useState(null);
  

  const totalContents = 7;

  const handleClick = (buttonId, isCorrect) => {
    setClickedButtonId(buttonId);
  
    setTimeout(() => {
      setCurrentContent((prevContent) => (prevContent + 1) % totalContents);
      setClickedButtonId(null);

      if (isCorrect) {
        setCorrectAnswersCount((prevCount) => prevCount + 1);
      }
    }, 800);  // Delay to show the icon before moving to the next content
  };

  const getContent = (contentIndex) => {
    const correctClicked = clickedButtonId === 'correct' && currentContent === contentIndex;
    const wrongClicked = clickedButtonId !== 'correct' && currentContent === contentIndex;

    switch (contentIndex) {
      case 0:
        return (
            <div>
                <h1><b>Barevné vidění</b></h1>
                <p>1 - Mějte obě oči otevřené.</p>
                <p>2 - Zařízení držte na délku paže.</p>
                <p>3 - Vyberte číslo, které vidíte v kruhu.</p>
                <div className='colorTestCard' style={{backgroundColor:'white'}}>
                <img className= "color-image" src='src\assets\12.svg' width={200} height={200} alt="color test"></img>
                <div>
                <button className={`colorTestBtn ${wrongClicked ? 'wrong' : ''}`} onClick={() => handleClick('wrong', false)}>31</button>
                <button className={`colorTestBtn ${correctClicked ? 'correct' : ''}`} onClick={() => handleClick('correct', true)}>12</button>
                <button className={`colorTestBtn ${wrongClicked ? 'wrong' : ''}`} onClick={() => handleClick('wrong', false)}>71</button>
                <button className={`colorTestBtn ${wrongClicked ? 'wrong' : ''}`} onClick={() => handleClick('wrong', false)}>Nic</button>
              </div>
            </div>
        </div>);
      case 1:
        return (
          <div>
          <h1><b>Barevné vidění</b></h1>
          <p>1 - Mějte obě oči otevřené.</p>
          <p>2 - Zařízení držte na délku paže.</p>
          <p>3 - Vyberte číslo, které vidíte v kruhu.</p>
          <div className='colorTestCard' style={{backgroundColor:'white'}}>
          <img className= "color-image" src='src\assets\8.svg' width={200} height={200} alt="color test"></img>
          <div>
          <button className={`colorTestBtn ${correctClicked ? 'correct' : ''}`} onClick={() => handleClick('correct', true)}>8</button>
          <button className={`colorTestBtn ${wrongClicked ? 'wrong' : ''}`} onClick={() => handleClick('wrong', false)}>3</button>
          <button className={`colorTestBtn ${wrongClicked ? 'wrong' : ''}`} onClick={() => handleClick('wrong', false)}>11</button>
          <button className={`colorTestBtn ${wrongClicked ? 'wrong' : ''}`} onClick={() => handleClick('wrong', false)}>Nic</button>
        </div>
        </div>
  </div>);
      case 2:
        return (
          <div>
          <h1><b>Barevné vidění</b></h1>
          <p>1 - Mějte obě oči otevřené.</p>
          <p>2 - Zařízení držte na délku paže.</p>
          <p>3 - Vyberte číslo, které vidíte v kruhu.</p>
          <div className='colorTestCard' style={{backgroundColor:'white'}}>
          <img className= "color-image" src='src\assets\3.svg' width={200} height={200} alt="color test"></img>
          <div>
          <button className={`colorTestBtn ${wrongClicked ? 'wrong' : ''}`} onClick={() => handleClick('wrong', false)}>5</button>
          <button className={`colorTestBtn ${correctClicked ? 'correct' : ''}`} onClick={() => handleClick('correct', true)}>3</button>
          <button className={`colorTestBtn ${wrongClicked ? 'wrong' : ''}`} onClick={() => handleClick('wrong', false)}>27</button>
          <button className={`colorTestBtn ${wrongClicked ? 'wrong' : ''}`} onClick={() => handleClick('wrong', false)}>Nic</button>
        </div>
      </div>
  </div>);
      case 3:
        return (
          <div>
          <h1><b>Barevné vidění</b></h1>
          <p>1 - Mějte obě oči otevřené.</p>
          <p>2 - Zařízení držte na délku paže.</p>
          <p>3 - Vyberte číslo, které vidíte v kruhu.</p>
          <div className='colorTestCard' style={{backgroundColor:'white'}}>
          <img className= "color-image" src='src\assets\45.svg' width={200} height={200} alt="color test"></img>
          <div>
          <button className={`colorTestBtn ${wrongClicked ? 'wrong' : ''}`} onClick={() => handleClick('wrong', false)}>36</button>
          <button className={`colorTestBtn ${correctClicked ? 'correct' : ''}`} onClick={() => handleClick('correct', true)}>45</button>
          <button className={`colorTestBtn ${wrongClicked ? 'wrong' : ''}`} onClick={() => handleClick('wrong', false)}>60</button>
          <button className={`colorTestBtn ${wrongClicked ? 'wrong' : ''}`} onClick={() => handleClick('wrong', false)}>Nic</button>
        </div>
      </div>
  </div>);
      case 4:
        return (
          <div>
          <h1><b>Barevné vidění</b></h1>
          <p>1 - Mějte obě oči otevřené.</p>
          <p>2 - Zařízení držte na délku paže.</p>
          <p>3 - Vyberte číslo, které vidíte v kruhu.</p>
          <div className='colorTestCard' style={{backgroundColor:'white'}}>
          <img className= "color-image" src='src\assets\5.svg' width={200} height={200} alt="color test"></img>
          <div>
          <button className={`colorTestBtn ${correctClicked ? 'correct' : ''}`} onClick={() => handleClick('correct', true)}>5</button>
          <button className={`colorTestBtn ${wrongClicked ? 'wrong' : ''}`} onClick={() => handleClick('wrong', false)}>57</button>
          <button className={`colorTestBtn ${wrongClicked ? 'wrong' : ''}`} onClick={() => handleClick('wrong', false)}>14</button>
          <button className={`colorTestBtn ${wrongClicked ? 'wrong' : ''}`} onClick={() => handleClick('wrong', false)}>Nic</button>
        </div>
      </div>
  </div>);
      case 5:
        return (
          <div>
          <h1><b>Barevné vidění</b></h1>
          <p>1 - Mějte obě oči otevřené.</p>
          <p>2 - Zařízení držte na délku paže.</p>
          <p>3 - Vyberte číslo, které vidíte v kruhu.</p>
          <div className='colorTestCard' style={{backgroundColor:'white'}}>
            <img className= "color-image" src='src\assets\nic.svg' width={200} height={200} alt="color test"></img>
            <div>
            <button className={`colorTestBtn ${wrongClicked ? 'wrong' : ''}`} onClick={() => handleClick('wrong', false)}>45</button>
            <button className={`colorTestBtn ${wrongClicked ? 'wrong' : ''}`} onClick={() => handleClick('wrong', false)}>70</button>
            <button className={`colorTestBtn ${wrongClicked ? 'wrong' : ''}`} onClick={() => handleClick('wrong', false)}>6</button>
            <button className={`colorTestBtn ${correctClicked ? 'correct' : ''}`} onClick={() => handleClick('correct', true)}>Nic</button>
          </div>
      </div>
  </div>);
      case 6:
        let imageUrl;
        let resultText= "";
        if (correctAnswersCount === 6) {
          imageUrl = 'src/assets/greenface.svg';
          resultText = "Vaše barevné vidění se zdá být vynikající.";
        } else if (correctAnswersCount === 4 || correctAnswersCount === 5) {
          imageUrl = 'src/assets/yellowface.svg';
          resultText = "Vaše barevné vidění se zdá být v pořádku.";
        } else {
          imageUrl = 'src/assets/redface.svg';
          resultText = "Vaše barevné vidění se zdá být omezené.";
        }
      
        return (
          <div>
          <div className='eyes-result-container'>
            <h1><b>Výsledek testu barevného vidění</b></h1>
            <p>{resultText}</p>
            <div className='eyes-result'>
              <div className='eyes-result-images'>
              <div className='eyes-result-left'>
            <img src={imageUrl} alt="ResultLeft" />
            </div>
            <div className="eyes-result-right">
            <img src={imageUrl} alt="ResultRight" />
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
        return null;
    }
  };

  return (
    <div>
      {getContent(currentContent)}
    </div>
  );
}

export default ColorTest ;