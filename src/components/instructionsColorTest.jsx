import React, { useState } from 'react';

const InstructionsColorTest = () => {
  const [currentContent, setCurrentContent] = useState(0);
  const [sliderValue, setSliderValue] = useState(50); // Define sliderValue here
  const [sliderChanged, setSliderChanged] = useState(false);

  const totalContents = 7;

  const handleNext = () => {
    setCurrentContent((prevContent) => (prevContent + 1) % totalContents);
  };

  
  const startTest = () => {
    // Redirect to '/another-page' when a button is clicked
    window.location.href = '/test-barevneho-videni';
  };

  const handleSliderChange = (e) => {
    setSliderValue(e.target.value);
    setSliderChanged(true);
  };

  const getContent = (contentIndex) => {
    switch (contentIndex) {
      case 0:
        return (
          <div className='consent'>
          <h1><b>Před zahájením si tyto informace prosím přečtěte a přijměte je.</b></h1>
          <p>Toto online vyšetření zraku slouží k tomu, aby vám poskytlo první posouzení vašeho aktuálního zraku. Nejedná se o lékařské vyšetření a nenahrazuje oční péči poskytovanou odborným lékařem. Není určeno k diagnóze onemocnění či zmírnění, léčbě či prevenci nemoci. Toto vyšetření vám má pouze poskytnout obecný přehled o vaší zrakové ostrosti a informaci, zda je pro vás vhodné absolvovat odborné vyšetření očí. Doporučujeme, abyste si oči nechali kontrolovat odborným lékařem každé dva roky či dříve, pokud si povšimnete změn svého zraku. Společnost Erste Optik s.r.o. ani žádná jiná společnost, která náleží do skupiny spřátelných optik, nepřijímá odpovědnost za škody či následky plynoucí z online vyšetření zraku a/nebo poskytnutých informací.</p>
          <button className='defaultButton' onClick={handleNext}>Souhlasím</button>

    </div>);
      case 1:
        return (
          <div className="media-space-container">
          <div className="media-space">
              <app-icon id="preparation_brightness" name="preparation_brightness" alt="">
                 <svg width="74" height="175" viewBox="0 0 74 175" fill="none" xmlns="http://www.w3.org/2000/svg" alt="">
                      <rect x="0.5" y="0.5" width="72.7098" height="174" rx="20.5" fill="#32373E" stroke="#C2CDD6"></rect>
                      <path d="M1 80.7772H72.7098V154C72.7098 165.046 63.7555 174 52.7098 174H21C9.95429 174 1 165.046 1 154V80.7772Z" fill="white"></path>
                      <g mask="url(#mask0_1769_17326)">
                      <path d="M36.183 141.91V138.616H37.5276V141.91H36.183ZM41.6285 144.173L40.7097 143.254L43.0179 140.879L43.9591 141.843L41.6285 144.173ZM42.9507 148.677V147.333H46.2448V148.677H42.9507ZM36.183 157.395V154.1H37.5276V157.395H36.183ZM32.1046 144.151L29.7292 141.843L30.6928 140.901L33.0457 143.232L32.1046 144.151ZM42.9955 155.131L40.7097 152.756L41.6061 151.86L43.9591 154.145L42.9955 155.131ZM27.4658 148.677V147.333H30.76V148.677H27.4658ZM30.6928 155.131L29.7516 154.168L32.0597 151.86L32.5527 152.308L33.0457 152.778L30.6928 155.131ZM36.8553 152.935C35.4809 152.935 34.3156 152.457 33.3595 151.501C32.4033 150.545 31.9253 149.38 31.9253 148.005C31.9253 146.631 32.4033 145.465 33.3595 144.509C34.3156 143.553 35.4809 143.075 36.8553 143.075C38.2298 143.075 39.3951 143.553 40.3512 144.509C41.3073 145.465 41.7854 146.631 41.7854 148.005C41.7854 149.38 41.3073 150.545 40.3512 151.501C39.3951 152.457 38.2298 152.935 36.8553 152.935ZM36.8553 151.591C37.8413 151.591 38.6854 151.24 39.3876 150.537C40.0897 149.835 40.4408 148.991 40.4408 148.005C40.4408 147.019 40.0897 146.175 39.3876 145.473C38.6854 144.771 37.8413 144.42 36.8553 144.42C35.8693 144.42 35.0252 144.771 34.3231 145.473C33.6209 146.175 33.2698 147.019 33.2698 148.005C33.2698 148.991 33.6209 149.835 34.3231 150.537C35.0252 151.24 35.8693 151.591 36.8553 151.591Z" fill="#32373E"></path>
                      </g>
                      <g mask="url(#mask0_1769_17326)">
                      <path d="M36.183 141.91V138.616H37.5276V141.91H36.183ZM41.6285 144.173L40.7097 143.254L43.0179 140.879L43.9591 141.843L41.6285 144.173ZM42.9507 148.677V147.333H46.2448V148.677H42.9507ZM36.183 157.395V154.1H37.5276V157.395H36.183ZM32.1046 144.151L29.7292 141.843L30.6928 140.901L33.0457 143.232L32.1046 144.151ZM42.9955 155.131L40.7097 152.756L41.6061 151.86L43.9591 154.145L42.9955 155.131ZM27.4658 148.677V147.333H30.76V148.677H27.4658ZM30.6928 155.131L29.7516 154.168L32.0597 151.86L32.5527 152.308L33.0457 152.778L30.6928 155.131ZM36.8553 152.935C35.4809 152.935 34.3156 152.457 33.3595 151.501C32.4033 150.545 31.9253 149.38 31.9253 148.005C31.9253 146.631 32.4033 145.465 33.3595 144.509C34.3156 143.553 35.4809 143.075 36.8553 143.075C38.2298 143.075 39.3951 143.553 40.3512 144.509C41.3073 145.465 41.7854 146.631 41.7854 148.005C41.7854 149.38 41.3073 150.545 40.3512 151.501C39.3951 152.457 38.2298 152.935 36.8553 152.935ZM36.8553 151.591C37.8413 151.591 38.6854 151.24 39.3876 150.537C40.0897 149.835 40.4408 148.991 40.4408 148.005C40.4408 147.019 40.0897 146.175 39.3876 145.473C38.6854 144.771 37.8413 144.42 36.8553 144.42C35.8693 144.42 35.0252 144.771 34.3231 145.473C33.6209 146.175 33.2698 147.019 33.2698 148.005C33.2698 148.991 33.6209 149.835 34.3231 150.537C35.0252 151.24 35.8693 151.591 36.8553 151.591Z" fill="#32373E"></path>
                      <path d="M37.5616 38.8369C37.1711 38.4464 36.5379 38.4464 36.1474 38.8369L29.7834 45.2009C29.3929 45.5914 29.3929 46.2246 29.7834 46.6151C30.1739 47.0056 30.8071 47.0056 31.1976 46.6151L36.8545 40.9582L42.5113 46.6151C42.9019 47.0056 43.535 47.0056 43.9256 46.6151C44.3161 46.2246 44.3161 45.5914 43.9256 45.2009L37.5616 38.8369ZM37.8545 69.5725L37.8545 39.544L35.8545 39.544L35.8545 69.5725L37.8545 69.5725Z" fill="#0072EF"></path>
                      </g>
                 </svg>
              </app-icon>
          </div>
            <h1>Abyste dosáhli co nejpřesnějších výsledků, <b>nastavte na svém zařízení jas obrazovky na maximum.</b></h1>

            <button className='defaultButton' onClick={handleNext}>Další krok</button>
    </div>);
      case 2:
          const scaleFactor = 0.5 + (sliderValue / 100);
          return (
              <div className='card-container-wrapper'>
             <div className="page-container">
        <div className="card-container">
          <div
            className="card"
            style={{
              transform: `scale(${scaleFactor})`, // Apply scale factor here
              transition: 'transform 0.1s linear',
            }}
          ><p>Můžete použít jakýkoliv běžný průkaz, kreditní či bankovní kartu. Tak si nastavíte velikost stínítka své obrazovky pro daný test. Ničeho se nebojte, tento test je zdarma. Nechceme tímto způsobem shromažďovat žádné informace.</p></div>
        </div>
        <div className="slider-container">
          <input
            type="range"
            min="0"
            max="100"
            value={sliderValue}
            onChange={handleSliderChange}
            className="slider"
            style={{
              height: '200px',
            }}
          />
        </div>
      </div>
                  <h1><b>Abyste nastavili velikost obrazovky</b>, umístěte kartu na rámeček a k vyrovnání použijte posuvník.</h1>
                  <button className='defaultButton' onClick={handleNext}>Další krok</button>
          </div>);
      case 3:
        return (
          <div className='be-ready'>
            <div>
            <img className= "eyeAndLenses" src='src\assets\imageCase3.svg' width={200} height={200} alt="circle"></img>
            </div>
              <h1><b>Budte připraveni.</b></h1>
              <p>Nasadte si brýle nebo kontaktní čočky (pokud nějaké nosíte).</p>
              <button className='defaultButton' onClick={handleNext}>Další krok</button>
      </div>);
      case 4:
        return (
            <div>
              <svg _ngcontent-ng-c226631475="" xmlns="http://www.w3.org/2000/svg" width="200" height="54" viewBox="0 0 200 54"><g _ngcontent-ng-c226631475="" transform="translate(-395 -315)"><path _ngcontent-ng-c226631475="" d="M484.657 341.401a50.985 50.985 0 00-89.312 0l-.345.614.344.612A51.45 51.45 0 00439.996 369a51.455 51.455 0 0044.655-26.375l.344-.614zm-2.088.6c-8.209 14.931-25.289 24.948-42.571 24.948s-34.352-10.009-42.568-24.937c8.212-14.932 25.29-24.948 42.57-24.948s34.358 10.014 42.57 24.942z"></path><path _ngcontent-ng-c226631475="" d="M440 361.001a19 19 0 1119-19 19 19 0 01-19 19z"></path><circle _ngcontent-ng-c226631475="" fill="#ECF0F4" cx="17" cy="17" r="17" transform="translate(423 325)"></circle></g><g _ngcontent-ng-c226631475="" transform="translate(24 -1040)"><path _ngcontent-ng-c226631475="" d="M175.657 1066.401a50.985 50.985 0 00-89.312 0l-.345.614.344.612A51.45 51.45 0 00130.996 1094a51.455 51.455 0 0044.655-26.375l.344-.614zm-2.088.6c-8.209 14.931-25.289 24.948-42.571 24.948s-34.352-10.009-42.568-24.937c8.212-14.932 25.29-24.948 42.57-24.948s34.358 10.014 42.57 24.942z"></path><path _ngcontent-ng-c226631475="" d="M131 1086.001a19 19 0 1119-19 19 19 0 01-19 19z"></path><circle _ngcontent-ng-c226631475="" fill="#ECF0F4" cx="17" cy="17" r="17" transform="translate(114 1050)"></circle></g></svg>
                <h1><b>Jsou vaše oči připraveny?</b></h1>
                <p>Mějte obě oči otevřené.</p>
                <button className='defaultButton' onClick={handleNext}>Další krok</button>
        </div>);
      case 5:
        return (
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" width="264px" height="172px" viewBox="0 0 160 104.825" alt=""><path d="M90.8 26.246s2.771-10.062 6.18-13.833 9.866-10.113 18.006-11 16.148.314 20.644 3.255 10.18 7.727 11.821 14.391.336 14.821-1.62 19.825-5.587 10.675-7.217 12.014a11.8 11.8 0 01-2.984 1.848l-5.767-13.861-3.716-9.515-5.863 7.776-1.175-1.646-.943-7.337-2.78-7.659-1.484-1.445-9.726 3.905z" fill="none"></path><path d="M19 92.112H7v-80h12zm-10-2h8v-76H9z"></path><rect width="2" height="10" transform="translate(12 92.112)"></rect><rect width="26" height="2" transform="translate(0 102.112)"></rect><path d="M156.428 73.944a17.992 17.992 0 00-9.517-7.981.966.966 0 01-.482-.371c-1.262-1.9-6.678-10.267-6.877-14.264 0-.1 0-.2-.008-.3v-.064c6.462-6.715 9.407-17.554 9.407-24.824a24.939 24.939 0 00-8.373-19 30.057 30.057 0 00-20.02-7.132c-7.152 0-13.431 1.861-18.177 5.4l-1.826 1.51a35.9 35.9 0 00-9.846 14.381l-2.281 6.151h1.555c.483-.01.967-.038 1.449-.084a1 1 0 011.086 1.111 313.014 313.014 0 00-.379 3.455l-.044.413a1.166 1.166 0 01-.117.41 18.419 18.419 0 01-3.5 4.841l-1.367 1.347-.075.087a1.973 1.973 0 00.36 2.767 1.9 1.9 0 00.314.2l3.417 1.73-.045.757c-.482 8.715 4.073 16.129 5.787 17.844 3.985 3.984 11.41 2.921 15.444 2.344.373-.053.722-.1 1.024-.141a1 1 0 011.01.517 28.922 28.922 0 011.839 4.774 1 1 0 01-.271 1.028 36.877 36.877 0 00-5.669 6.808l-.574.888h.005c-6.479 9.92-7.548 21.31-7.724 24.786a1 1 0 001 1.046 1 1 0 001.007-.939c.2-3.453 1.349-15.469 8.493-25.227l.3-.395a33.93 33.93 0 014.308-5.084l.042.15c1.173 4.188 2.1 8.343 2.112 8.383l.307 1.415 6.236-3.476 19.419-11.186a1.017 1.017 0 01.832-.086c7.423 2.543 11.831 10.129 11.831 20.445v15.37a1.071 1.071 0 00.314.764 1.04 1.04 0 00.765.317 1.075 1.075 0 001.077-1.079V88.389a28.167 28.167 0 00-3.568-14.445zm-35.432 5.449a178.108 178.108 0 00-1.925-7.479 63.616 63.616 0 00-2.029-6.188c-.835-2.063-1.64-3.437-2.872-3.437a18.853 18.853 0 00-2.193.245c-3.615.518-10.345 1.483-13.571-1.74-1.47-1.472-5.594-8.319-5.158-16.2l.082-1.418a1.069 1.069 0 00-.584-1.062l-3.82-1.92 1.073-1.067a20.556 20.556 0 003.914-5.413 2.708 2.708 0 00.233-.676 1.214 1.214 0 00.073-.28c.2-1.941.43-3.954.678-5.994a146.175 146.175 0 0018.473-6.03c2.107 2.807 3.815 10.088 4.727 16.1a1.616 1.616 0 002.891.722l3.941-5.282a7.312 7.312 0 011.048 3.9c0 3.216-1.772 5.832-3.95 5.832a1.078 1.078 0 100 2.156c2.847 0 5.213-2.488 5.9-5.93a164.9 164.9 0 006.875 15.063l.57 1.02.971-.652c.421-.285.834-.59 1.232-.91.928 4.4 4.961 10.853 6.6 13.345l-19.477 11.231zm15.1-28.209a219.117 219.117 0 01-9.36-22.123l-.664-1.934-6.047 8.114c-.774-4.66-2.6-13.563-5.583-16.557l-.51-.5-.658.267c-.149.06-14.542 5.854-21.71 6.727l1.161-3.143a33.747 33.747 0 019.257-13.515l.413-.366c.238-.2.486-.409.757-.625l.085-.067c4.388-3.461 10.373-5.29 17.312-5.29 15.2 0 26.234 10.077 26.234 23.96-.001 8.291-3.988 19.79-10.688 25.052zm-42.329-18.47z"></path><g fill="#0072EF" transform="translate(2 2)"><rect width="6" height="2" transform="translate(28 48.086)"></rect><rect width="6" height="2" transform="translate(38 48.086)"></rect><rect width="6" height="2" transform="translate(58 48.086)"></rect><rect width="6" height="2" transform="translate(68 48.086)"></rect></g><path d="M26 51l6-6v12z" fill="#0072EF"></path><path d="M80 51l-6 6V45z" fill="#0072EF"></path></svg>
                <h1><b>Nepřibližujte.</b></h1>
                <p>Zařízení držte během testu na délku paže.</p>
                <button className='defaultButton' onClick={startTest}>Jsem připraven/a</button>
        </div>);
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

export default InstructionsColorTest;