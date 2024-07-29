import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import InstructionsSharpTest from "./components/instructionsPages/instructionsSharpTest.jsx";
import InstructionsContrastTest from "./components/instructionsPages/instructionsContrastTest.jsx";
import InstructionsAstigmatismTest from "./components/instructionsPages/instructionsAstigmatismTest.jsx";
import InstructionsEyeFieldTest from "./components/instructionsPages/instructionsEyeFieldTest.jsx";
import InstructionsColorTest from "./components/instructionsPages/instructionsColorTest.jsx";
import SharpTest from "./components/testPages/sharptest.jsx";
import ContrastTest from "./components/testPages/contrastTest.jsx";
import AstigmatismTest from "./components/testPages/astigmatismTest.jsx";
import EyeFieldTest from "./components/testPages/eyeFieldTest.jsx";
import ColorTest from "./components/testPages/colorTest.jsx";
import TestSelection from "./components/utilPages/testSelection.jsx";
import InfoSharptest from "./components/infoPages/infoSharptest.jsx";
import InfoAstigmatismtest from "./components/infoPages/infoAstigmatismtest.jsx";
import InfoColortest from "./components/infoPages/infoColortest.jsx";
import InfoEyeFieldtest from "./components/infoPages/infoEyeFieldtest.jsx";
import InfoContrasttest from "./components/infoPages/infoContrasttest.jsx";
import TestResults from "./components/utilPages/TestResults.jsx";
import GeneralInfo from "./components/utilPages/generalInfo.jsx";
import GoogleLogin from "./components/authPages/googleLogin.jsx";
import AfterLogin from "./components/authPages/afterLogin.jsx";
import Map from "./components/utilPages/map.jsx";
import HomePage from "./components/utilPages/HomePage.jsx";
import AddLocationForm from "./components/utilPages/AddLocationForm.jsx";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/mapa" element={<Map />} />
        <Route path="/o-spolecnosti" element={<GeneralInfo />} />
        <Route path="/auth" element={<GoogleLogin />} />
        <Route path="/auth/callback" element={<AfterLogin />} />
        <Route path="/manualni-pridani" element={<AddLocationForm />} />
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

export default AppRouter;
