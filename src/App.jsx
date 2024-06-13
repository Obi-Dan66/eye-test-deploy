import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import "./index.css";
import InstructionsSharpTest from "./components/instructionsSharpTest.jsx";
import InstructionsContrastTest from "./components/instructionsContrastTest.jsx";
import InstructionsAstigmatismTest from "./components/instructionsAstigmatismTest.jsx";
import InstructionsEyeFieldTest from "./components/instructionsEyeFieldTest.jsx";
import InstructionsColorTest from "./components/instructionsColorTest.jsx";
import SharpTest from "./components/sharptest.jsx";
import ContrastTest from "./components/contrastTest.jsx";
import AstigmatismTest from "./components/astigmatismTest.jsx";
import EyeFieldTest from "./components/eyeFieldTest.jsx";
import ColorTest from "./components/colorTest.jsx";
import TestSelection from "./components/testSelection.jsx";
import InfoSharptest from "./infoPages/infoSharptest.jsx";
import InfoAstigmatismtest from "./infoPages/infoAstigmatismtest.jsx";
import InfoColortest from "./infoPages/infoColortest.jsx";
import InfoEyeFieldtest from "./infoPages/infoEyeFieldtest.jsx";
import InfoContrasttest from "./infoPages/infoContrasttest.jsx";
import TestResults from "./components/TestResults.jsx";
import GeneralInfo from "./infoPages/generalInfo.jsx";
import { useNavigate } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/o-spolecnosti" element={<GeneralInfo />} />
        <Route
          path="/instrukce-test-kontrastniho-videni"
          element={<InstructionsContrastTest />}
        />
        <Route
          path="/instrukce-test-ostrosti"
          element={<InstructionsSharpTest />}
        />
        <Route
          path="/instrukce-test-astigmatismu"
          element={<InstructionsAstigmatismTest />}
        />
        <Route
          path="/instrukce-test-zorneho-pole"
          element={<InstructionsEyeFieldTest />}
        />
        <Route
          path="/instrukce-test-barevneho-videni"
          element={<InstructionsColorTest />}
        />
        <Route path="/vyber-testu" element={<TestSelection />} />
        <Route path="/test-astigmatismu" element={<AstigmatismTest />} />
        <Route path="/test-barevneho-videni" element={<ColorTest />} />
        <Route path="/test-zorneho-pole" element={<EyeFieldTest />} />
        <Route path="/test-kontrastniho-videni" element={<ContrastTest />} />
        <Route path="/test-zrakove-ostrosti" element={<SharpTest />} />
        <Route path="/info-test-zrakove-ostrosti" element={<InfoSharptest />} />
        <Route
          path="/info-test-astigmatismu"
          element={<InfoAstigmatismtest />}
        />
        <Route path="/info-test-barevneho-videni" element={<InfoColortest />} />
        <Route path="/info-test-zorneho-pole" element={<InfoEyeFieldtest />} />
        <Route
          path="/info-test-kontrastniho-videni"
          element={<InfoContrasttest />}
        />
        <Route path="/vysledky-testu" element={<TestResults />} />
      </Routes>
    </Router>
  );
};

const HomePage = () => {
  const navigate = useNavigate();

  const handleSvgClick = () => {
    navigate("/o-spolecnosti");
  };

  return (
    <div>
      <svg
        onClick={handleSvgClick}
        width="24"
        height="24px"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        alt="O OVS"
        style={{
          cursor: "pointer",
          position: "absolute",
          top: "20px",
          right: "20px",
        }} // Make it clickable
      >
        <mask
          id="mask0_4951_22075"
          style={{ maskType: "alpha" }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="24"
          height="24"
        >
          <rect width="24" height="24" fill="#D9D9D9"></rect>
        </mask>
        <g mask="url(#mask0_4951_22075)">
          <path
            d="M11.25 16.75H12.75V11H11.25V16.75ZM12 9.3C12.2333 9.3 12.425 9.22067 12.575 9.062C12.725 8.904 12.8 8.70833 12.8 8.475C12.8 8.25833 12.725 8.07067 12.575 7.912C12.425 7.754 12.2333 7.675 12 7.675C11.7667 7.675 11.575 7.754 11.425 7.912C11.275 8.07067 11.2 8.25833 11.2 8.475C11.2 8.70833 11.275 8.904 11.425 9.062C11.575 9.22067 11.7667 9.3 12 9.3ZM12 21.5C10.6833 21.5 9.446 21.25 8.288 20.75C7.12933 20.25 6.125 19.575 5.275 18.725C4.425 17.875 3.75 16.8707 3.25 15.712C2.75 14.554 2.5 13.3167 2.5 12C2.5 10.6833 2.75 9.44567 3.25 8.287C3.75 7.129 4.425 6.125 5.275 5.275C6.125 4.425 7.12933 3.75 8.288 3.25C9.446 2.75 10.6833 2.5 12 2.5C13.3167 2.5 14.5543 2.75 15.713 3.25C16.871 3.75 17.875 4.425 18.725 5.275C19.575 6.125 20.25 7.129 20.75 8.287C21.25 9.44567 21.5 10.6833 21.5 12C21.5 13.3167 21.25 14.554 20.75 15.712C20.25 16.8707 19.575 17.875 18.725 18.725C17.875 19.575 16.871 20.25 15.713 20.75C14.5543 21.25 13.3167 21.5 12 21.5ZM12 20C14.2333 20 16.125 19.225 17.675 17.675C19.225 16.125 20 14.2333 20 12C20 9.76667 19.225 7.875 17.675 6.325C16.125 4.775 14.2333 4 12 4C9.76667 4 7.875 4.775 6.325 6.325C4.775 7.875 4 9.76667 4 12C4 14.2333 4.775 16.125 6.325 17.675C7.875 19.225 9.76667 20 12 20Z"
            fill="black"
          ></path>
        </g>
      </svg>

      <div className="home">
        <img
          src="./logo-prvni-optika.jpg"
          width={200}
          height={150}
          alt="Logo"
        ></img>
        <h1>Online oční test od První Optiky</h1>
        <button
          className="testBegin homePage"
          onClick={() => navigate("/instrukce-test-ostrosti")}
        >
          Zkontrolujte si svůj zrak
        </button>
        <button
          className="selectTest homePage"
          onClick={() => navigate("/vyber-testu")}
        >
          Nebo si vyberte určitý test
        </button>
      </div>
    </div>
  );
};

export default App;
