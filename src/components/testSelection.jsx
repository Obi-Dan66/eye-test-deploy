// testSelection.jsx
import React from 'react';

const TestSelection = () => {
  return (
    <div>
      <h1>Všechny testy zraku</h1>
      <p><b>Pokud chcete začít zvolte jeden z pěti testů zraku.</b></p>

      <div className='test-selection-container'>

        <div className='test-selection'>
        <img src="src/assets/resultSharp.svg" alt="ResultSharp" />
        <h2><b>Nalezněte mezeru</b></h2>
        <p>Zkontrolujte, jak ostrý máte zrak pomocí našeho testu ostrosti zraku.</p>
        <a href='/info-test-zrakove-ostrosti'>Podrobné informace</a>
      <button className='defaultButton' onClick={() => window.location.href='/instrukce-test-ostrosti'}>Spuštění kontroly ostrosti zraku</button>

      </div>
        <div className='test-selection'>
        <img src="src/assets/resultContrast.svg" alt="ResultContrast" />
        <h2><b>Zjistěte rozdíly.</b></h2>
        <p>Naše vyšetření kontrastního vidění zjistí, jak dobře vidíte rozdíly.</p>
        <a href='/info-test-kontrastniho-videni'>Podrobné informace</a>
      <button className='defaultButton' onClick={() => window.location.href='/instrukce-test-kontrastniho-videni'}>Spustit test kontrastního vidění</button>
      </div>

      <div className='test-selection'>
        <img src="src/assets/resultColor.svg" alt="ResultColor" />
        <h2><b>Podívejte se na duhu.</b></h2>
        <p>Dokážete bez problémů vyjmenovat jednotlivé barvy? Náš test barevného vidění prověří, jak jste na tom.</p>
        <a href='/info-test-barevneho-videni'>Podrobné informace</a>
      <button className='defaultButton' onClick={() => window.location.href='/instrukce-test-barevneho-videni'}>Spustit test barevného vidění</button>
      </div>

      <div className='test-selection'>
        <img src="src/assets/resultAstigmatism.svg" alt="ResultAstigmatism" />
        <h2><b>Vypořádejte se s rozostřeným viděním.</b></h2>
        <p>Zkontrolujte přáznaky astigmatismu.</p>
        <a href = '/info-test-astigmatismu'>Podrobné informace</a>
      <button className='defaultButton' onClick={() => window.location.href='/instrukce-test-astigmatismu'}>Spustit test astigmatismu</button>
      </div>

      <div className='test-selection'>
        <img src="src/assets/resultEyeField.svg" alt="ResultEyeField" />
        <h2><b>Sledujte bod.</b></h2>
        <p>Tato kontrola zorného pole může objevit problémy vašeho zorného pole.</p>
        <a href='/info-test-zorneho-pole'>Podrobné informace</a>
      <button className='defaultButton' onClick={() => window.location.href='/instrukce-test-zorneho-pole'}>Spustit kontrolu zorného pole</button>
      </div>
      
    </div>
    </div>
  );
}

export default TestSelection;