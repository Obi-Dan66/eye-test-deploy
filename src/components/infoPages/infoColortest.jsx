import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import CloseButton from "../CloseButton.jsx";

const InfoColortest = () => {
  const navigate = useNavigate();

  const [dividerPosition, setDividerPosition] = useState(50); // Initial position of the divider
  const containerRef = useRef(null);

  const startDrag = (e) => {
    e.preventDefault();

    const onDrag = (moveEvent) => {
      let clientX;
      if (moveEvent.type === "touchmove") {
        clientX = moveEvent.touches[0].clientX; // Get touch event clientX for mobile
      } else {
        clientX = moveEvent.clientX; // Get mouse event clientX for desktop
      }

      const rect = containerRef.current.getBoundingClientRect();
      const newDividerPosition = ((clientX - rect.left) / rect.width) * 100;
      setDividerPosition(Math.max(0, Math.min(100, newDividerPosition)));
    };

    const stopDrag = () => {
      document.removeEventListener("mousemove", onDrag);
      document.removeEventListener("mouseup", stopDrag);
      document.removeEventListener("touchmove", onDrag); // Remove touch event listener
      document.removeEventListener("touchend", stopDrag); // Remove touch event listener
    };

    document.addEventListener("mousemove", onDrag);
    document.addEventListener("mouseup", stopDrag);
    document.addEventListener("touchmove", onDrag); // Add touch event listener for mobile
    document.addEventListener("touchend", stopDrag); // Add touch event listener for mobile
  };
  return (
    <div className="test-info-page" ref={containerRef}>
      <CloseButton />
      <h1>Barevné vidění</h1>
      <h2>
        <b>Podívejte se na duhu.</b>
      </h2>
      <p>
        Dokážete bez problémů vyjmenovat jednotlivé barvy? Náš test barevného
        vidění prověří, jak jste na tom.
      </p>
      <div className="next_test_buttons">
        <button
          className="defaultButton"
          onClick={() => navigate("/instrukce-test-barevneho-videni")}
        >
          Spuštění testu barevného vidění
        </button>
        <button
          className="defaultButton"
          onClick={() => navigate("/vyber-testu")}
        >
          Zpět na výběr testů
        </button>
      </div>
      <div className="info-sharp-decription">
        <h2>
          <b>Proč byste měli kontrolovat své barevné vidění?</b>
        </h2>
        <p>
          Barevné vidění &#40;schopnost rozpoznat různé barvy a odstíny&#41;
          patří mezi nejdůležitější principy lidského vidění. "Barvoslepost" je
          termínem často používaným k popisu nedostatků barevného vidění.
          Pozvolné změny barevného vidění jsou často dědičné. Dobré barevné
          vidění je důležité a může mít dopad na mnoho každodenních aspektů,
          jako je vzdělání, výsledky zkoušek a volba kariéry.
        </p>

        <div
          className="image-comparison-container"
          style={{ position: "relative", width: "100%", height: "425px" }}
        >
          <img
            src="./infoColor1.jpg"
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              zIndex: 1,
            }}
            alt="Normální barevné vidění"
          />
          <img
            src="./infoColor2.jpg"
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              clipPath: `inset(0 ${100 - dividerPosition}% 0 0)`,
              zIndex: 2,
            }}
            alt="Barevné anomálie (protanopie)"
          />
          <div
            className="divider"
            style={{
              position: "absolute",
              left: `${dividerPosition}%`,
              top: 0,
              bottom: 0,
              width: "2px",
              background: "#FFF",
              cursor: "ew-resize",
              zIndex: 3,
            }}
            onMouseDown={startDrag}
            onTouchStart={startDrag}
          >
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "-12px",
                width: "25px",
                height: "25px",
                background: "#FFF",
                borderRadius: "50%",
                transform: "translateY(-50%)",
              }}
            ></div>
          </div>
        </div>
      </div>
      <div className="info-sharp-decription">
        <h2>
          <b>Jak barevné vidění testujeme?</b>
        </h2>
        <p>
          Test barevného vidění je vyšetření vycházející z klinicky prověřené
          práce doktora Shinobu Ishihary. Lidé s neporušeným viděním budou
          schopni přečíst čísla na Isiharových barevných destičkách bez
          problémů, ale ti s nějakým problémem je neuvidí ostře. Provádějí se
          oběma očima najednou, jelikož jednostranné vady jsou vzácné.
        </p>

        <p>
          Náš test je dobrým indikátorem, ale nemůže nahradit plnohodnotné
          vyšetření očním lékařem.
        </p>
      </div>
    </div>
  );
};

export default InfoColortest;
