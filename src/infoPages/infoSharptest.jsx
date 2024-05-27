import React, { useState, useRef } from 'react';


const InfoSharptest = () => {
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
      <h1>Zraková ostrost</h1>
      <h2><b>Nalezněte mezeru</b></h2>
        <p>Zkontrolujte, jak ostrý máte zrak pomocí našeho testu ostrosti zraku.</p>
        
      <button className='defaultButton' onClick={() => window.location.href='/instrukce-test-ostrosti'}>Spuštění kontroly ostrosti zraku</button>
      <div className='info-sharp-decription'>
      <h2><b>Proč kontrolovat ostrost svého zraku?</b></h2>
      <p>Zraková ostrost &#40;schopnost rozpoznat malé detaily&#41; se může postupně měnit, což znamená, že si nemusíte malých změn ve svém zraku všimnout. Proto je důležité pravidelně si kontrolovat zrak. Zrak si můžete kontrolovat s pomocí našich vyšetření a následné konzultace s optikem, který provede kompletní vyšetření.</p>
      
      <div className="image-comparison-container" style={{ position: 'relative', width: '100%', height: '425px' }}>
        <img src='src/assets/infoSharp1.jpg' style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 1 }} alt="Normální vidění" />
        <img src='src/assets/infoSharp2.jpg' style={{ position: 'absolute', width: '100%', height: '100%', clipPath: `inset(0 ${100 - dividerPosition}% 0 0)`, zIndex: 2 }} alt="Rozmazané vidění" />
        <div className="divider" style={{ position: 'absolute', left: `${dividerPosition}%`, top: 0, bottom: 0, width: '2px', background: '#FFF', cursor: 'ew-resize', zIndex: 3 }} onMouseDown={startDrag}>
          <div style={{ position: 'absolute', top: '50%', left: '-12px', width: '25px', height: '25px', background: '#FFF', borderRadius: '50%', transform: 'translateY(-50%)' }}></div>
    </div>
    </div>
    </div>
    <div className='info-sharp-decription'>
      <h2><b>Jak kontrolujeme ostrost vašeho zraku?</b></h2>
      <p>Kontrolu ostrosti zraku provádí specialista jako test s čísly nebo písmeny různých velikostí. Naše kontrola používá písmeno C jako symbol zvaný Landoltovo písmeno C, které se popisuje jako kruh s otvorem na vymezením místě.</p>

      <p>Jednoduše určete polohu mezery a označte ji v příslušném kruhu. Landoltova písmena C se zmenšují, dokud nedosáhnete nejmenšího symbolu, který jste schopni rozpoznat.</p>
    </div>
    </div>

  );
}

export default InfoSharptest;