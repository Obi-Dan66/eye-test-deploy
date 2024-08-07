import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import CloseButton from "../CloseButton.jsx";

const InfoEyeFieldtest = () => {
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
      <h1>Zorné pole</h1>
      <h2>
        <b>Sledujte bod.</b>
      </h2>
      <p>
        Tato kontrola zorného pole může objevit problémy vašeho zorného pole.
      </p>
      <div className="next_test_buttons">
        <button
          className="defaultButton"
          onClick={() => navigate("/instrukce-test-zorneho-pole")}
        >
          Spustit kontrolu zorného pole
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
          <b>Proč je třeba, abych si kontroloval/a zorného pole?</b>
        </h2>
        <p>
          Zorné pole je definováno jako prostor, ve kterém vnímáme světlo a
          rozpoznáváme předměty. Tento prostor může být omezený různými očními
          onemocněními nebo neurologickými příčinami a v průběhu času se může
          zhoršovat. Normální centrální zorní pole je důležité při provádění
          mnoha každodenních činností, jako je čtení nebo práce v kanceláři.
          Naše periferní zorné pole nám poskytuje důležité vjemy, pokud se
          díváme do dálky a řídíme například automobil.
        </p>

        <div
          className="image-comparison-container"
          style={{ position: "relative", width: "100%", height: "425px" }}
        >
          <img
            src="./infoEyeField1.jpg"
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              zIndex: 1,
            }}
            alt="Normální vidění"
          />
          <img
            src="./infoEyeField2.jpg"
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              clipPath: `inset(0 ${100 - dividerPosition}% 0 0)`,
              zIndex: 2,
            }}
            alt="Vidění s vadou zorného pole"
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
          <b>Jak kontrolujeme vaše zorné pole?</b>
        </h2>
        <p>
          Naše kontrola zorného pole probíhá s pomocí mřížky a vychází z
          klinicky proveřeného Amslerova testu. Během kontroly vás požádáme,
          abyste se zaměřili na středový bod a zjistili, zda vidíte všechny
          části mřížky stejně. Nepravidelnosti se mohou jevit jako narušené nebo
          neviditelné linie.
        </p>

        <p>
          Pokud používáte telefon nebo malou obrazovku, Amslerova mřížka se může
          zmenšit na menší než doporučenou velikost.
        </p>
      </div>
    </div>
  );
};

export default InfoEyeFieldtest;
