// testSelection.jsx
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import CloseButton from "./CloseButton";

const TestSelection = () => {
  const navigate = useNavigate();

  return (
    <div>
      <CloseButton />
      <h1>Všechny testy zraku</h1>
      <p>
        <b>Pokud chcete začít zvolte jeden z pěti testů zraku.</b>
      </p>

      <div className="test-selection-container">
        <div className="test-selection">
          <img src="./resultSharp.svg" alt="ResultSharp" />
          <h2>
            <b>Nalezněte mezeru</b>
          </h2>
          <p>
            Zkontrolujte, jak ostrý máte zrak pomocí našeho testu ostrosti
            zraku.
          </p>
          <Link to="/info-test-zrakove-ostrosti">Podrobné informace</Link>
          <button
            className="defaultButton"
            onClick={() => navigate("/instrukce-test-ostrosti")}
          >
            Spuštění kontroly ostrosti zraku
          </button>
        </div>
        <div className="test-selection">
          <img src="./resultContrast.svg" alt="ResultContrast" />
          <h2>
            <b>Zjistěte rozdíly.</b>
          </h2>
          <p>
            Naše vyšetření kontrastního vidění zjistí, jak dobře vidíte rozdíly.
          </p>
          <Link to="/info-test-kontrastniho-videni">Podrobné informace</Link>
          <button
            className="defaultButton"
            onClick={() => navigate("/instrukce-test-kontrastniho-videni")}
          >
            Spustit test kontrastního vidění
          </button>
        </div>

        <div className="test-selection">
          <img src="./resultColor.svg" alt="ResultColor" />
          <h2>
            <b>Podívejte se na duhu.</b>
          </h2>
          <p>
            Dokážete bez problémů vyjmenovat jednotlivé barvy? Náš test
            barevného vidění prověří, jak jste na tom.
          </p>
          <Link to="/info-test-barevneho-videni">Podrobné informace</Link>
          <button
            className="defaultButton"
            onClick={() => navigate("/instrukce-test-barevneho-videni")}
          >
            Spustit test barevného vidění
          </button>
        </div>

        <div className="test-selection">
          <img src="./resultAstigmatism.svg" alt="ResultAstigmatism" />
          <h2>
            <b>Vypořádejte se s rozostřeným viděním.</b>
          </h2>
          <p>Zkontrolujte přáznaky astigmatismu.</p>
          <Link to="/info-test-astigmatismu">Podrobné informace</Link>
          <button
            className="defaultButton"
            onClick={() => navigate("/instrukce-test-astigmatismu")}
          >
            Spustit test astigmatismu
          </button>
        </div>

        <div className="test-selection">
          <img src="./resultEyeField.svg" alt="ResultEyeField" />
          <h2>
            <b>Sledujte bod.</b>
          </h2>
          <p>
            Tato kontrola zorného pole může objevit problémy vašeho zorného
            pole.
          </p>
          <Link to="/info-test-zorneho-pole">Podrobné informace</Link>
          <button
            className="defaultButton"
            onClick={() => navigate("/instrukce-test-zorneho-pole")}
          >
            Spustit kontrolu zorného pole
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestSelection;
