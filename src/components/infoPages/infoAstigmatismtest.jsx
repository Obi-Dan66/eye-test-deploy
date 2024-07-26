import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import CloseButton from "../CloseButton.jsx";

const InfoAstigmatismtest = () => {
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
      <h1>Astigmatismus</h1>
      <h2>
        <b>Vypořádejte se s rozostřeným viděním.</b>
      </h2>
      <p>Zkontrolujte příznaky astigmatismu.</p>
      <div className="next_test_buttons">
        <button
          className="defaultButton"
          onClick={() => navigate("/instrukce-test-astigmatismu")}
        >
          Spustit test astigmatismu
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
          <b>Proč kontrolovat příznaky astigmatismu?</b>
        </h2>
        <p>
          AStigmatismus je vada zakřivení oční rohovky nebo čočky. Jedná se o
          běžný stav, který způsobuje rozmazané nebo zkreslené vidění, a s
          přibývajícím věkem se může zhoršovat. Astigmatismus může způsobovat
          také únavu očí, bolesti hlavy a špatné vidění ve tmě. Lze ho napravit
          správně osazenými brýlemi nebo kontaktními čočkami.
        </p>

        <div
          className="image-comparison-container"
          style={{ position: "relative", width: "100%", height: "425px" }}
        >
          <img
            src="./infoAstigmatism1.jpg"
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              zIndex: 1,
            }}
            alt="Normální vidění"
          />
          <img
            src="./infoAstigmatism2.jpg"
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              clipPath: `inset(0 ${100 - dividerPosition}% 0 0)`,
              zIndex: 2,
            }}
            alt="Vidění s astigmatismem"
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
          <b>Jak kontrolujeme výskyt astigmatismu?</b>
        </h2>
        <p>
          Náš test astigmatismu využívá půlkruh černých čar, které mají vypadat,
          že jsou v různých odstínech šedé, je-li astigmatismus přítomen.
          Zeptáme se vás, zda vidíte různé odstíny šedé.
        </p>

        <p>Upozornění: náš test zraku nenahrazuje odborné vyšetření zraku.</p>
      </div>
    </div>
  );
};

export default InfoAstigmatismtest;
