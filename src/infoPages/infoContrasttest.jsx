import React, { useState, useRef } from 'react';


const InfoContrasttest = () => {
  const [dividerPosition, setDividerPosition] = useState(50); // Initial position of the divider
  const containerRef = useRef(null);

  const startDrag = (e) => {
    e.preventDefault(); // Prevent default behavior such as text selection
    const startX = e.clientX;

    const onDrag = (moveEvent) => {
      const currentX = moveEvent.clientX;
      const rect = containerRef.current.getBoundingClientRect();
      const newDividerPosition = ((currentX - rect.left) / rect.width) * 100;
      setDividerPosition(Math.max(0, Math.min(100, newDividerPosition)));
    };

    const stopDrag = () => {
      document.removeEventListener('mousemove', onDrag);
      document.removeEventListener('mouseup', stopDrag);
    };

    document.addEventListener('mousemove', onDrag);
    document.addEventListener('mouseup', stopDrag);
  };
  return (
    <div className="test-info-page" ref={containerRef}>
      <h1>Kontrastní vidění</h1>
      <h2><b>Zjistěte rozdíly.</b></h2>
        <p>Naše vyšetření kontrastního vidění zjistí, jak dobře vidíte rozdíly.</p>
        
      <button className='defaultButton' onClick={() => window.location.href='/instrukce-test-kontrastniho-videni'}>Spustit test kontrastního vidění</button>
      <div className='info-sharp-decription'>
      <h2><b>Proč si otestovat Kontrastní vidění?</b></h2>
      <p>Kontrastní vidění &#40;schopnost rozpoznat různé odstíny šedé&#41; je důležité z mnoha důvodů, včetně dobrého vidění ve tmě. Může se postupně měnit, což znamená, že si nemusíte všimnout malých změn svého zraku. Proto je důležité pravidelně si kontrolovat zrak. Zrak si můžete kontrolovat s pomocí našich vyšetření a následné konzultace s optikem, který provede kompletní vyšetření.</p>

      <div className="image-comparison-container" style={{ position: 'relative', width: '100%', height: '425px' }}>
        <img src='src/assets/infoContrast1.jpg' style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 1 }} alt="Normální vidění" />
        <img src='src/assets/infoContrast2.jpg' style={{ position: 'absolute', width: '100%', height: '100%', clipPath: `inset(0 ${100 - dividerPosition}% 0 0)`, zIndex: 2 }} alt="Rozmazané vidění" />
        <div className="divider" style={{ position: 'absolute', left: `${dividerPosition}%`, top: 0, bottom: 0, width: '2px', background: '#FFF', cursor: 'ew-resize', zIndex: 3 }} onMouseDown={startDrag}>
          <div style={{ position: 'absolute', top: '50%', left: '-12px', width: '25px', height: '25px', background: '#FFF', borderRadius: '50%', transform: 'translateY(-50%)' }}></div>
    </div>
    </div>
    </div>
    <div className='info-sharp-decription'>
      <h2><b>Jak otestujeme vaše kontrastní vidění?</b></h2>
      <p>Test kontrastního vidění je podobný jako test ostrosti vašeho zraku. Naše kontrola používá písmeno C jako symbol zvaný Landoltovo písmeno C, které se popisuje jako kruh s otvorem na vymezném místě.</p>

      <p>V testu kontrastního vidění jsou stíny šedé daleko jasnější. Stačí určit pozici této mezery a označit ji na příslušném kruhu dole.</p>
    </div>
    </div>

  );
}

export default InfoContrasttest;