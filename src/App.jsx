import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import './index.css'
import InstructionsSharpTest from './components/instructionsSharpTest.jsx';
import InstructionsContrastTest from './components/instructionsContrastTest.jsx';
import InstructionsAstigmatismTest from './components/instructionsAstigmatismTest.jsx';
import InstructionsEyeFieldTest from './components/instructionsEyeFieldTest.jsx';
import InstructionsColorTest from './components/instructionsColorTest.jsx';
import SharpTest from './components/sharptest.jsx';
import ContrastTest from './components/contrastTest.jsx';
import AstigmatismTest from './components/astigmatismTest.jsx';
import EyeFieldTest from './components/eyeFieldTest.jsx';
import ColorTest from './components/colorTest.jsx';
import TestSelection from './components/testSelection.jsx';
import InfoSharptest from './infoPages/infoSharptest.jsx';
import InfoAstigmatismtest from './infoPages/infoAstigmatismtest.jsx';
import InfoColortest from './infoPages/infoColortest.jsx';
import InfoEyeFieldtest from './infoPages/infoEyeFieldtest.jsx';
import InfoContrasttest from './infoPages/infoContrasttest.jsx';
import { useNavigate } from 'react-router-dom';



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/instrukce-test-kontrastniho-videni" element={<InstructionsContrastTest />} />
        <Route path="/instrukce-test-ostrosti" element={<InstructionsSharpTest />} />
        <Route path="/instrukce-test-astigmatismu" element={<InstructionsAstigmatismTest />} />
        <Route path="/instrukce-test-zorneho-pole" element={<InstructionsEyeFieldTest />} />
        <Route path="/instrukce-test-barevneho-videni" element={<InstructionsColorTest />} />
        <Route path="/vyber-testu" element={<TestSelection />} />
        <Route path="/test-astigmatismu" element={<AstigmatismTest />} />
        <Route path="/test-barevneho-videni" element={<ColorTest />} />
        <Route path="/test-zorneho-pole" element={<EyeFieldTest />} />
        <Route path="/test-kontrastniho-videni" element={<ContrastTest />} />
        <Route path="/test-zrakove-ostrosti" element={<SharpTest />}/>
        <Route path="/info-test-zrakove-ostrosti" element={<InfoSharptest />}/>
        <Route path="/info-test-astigmatismu" element={<InfoAstigmatismtest />}/>
        <Route path="/info-test-barevneho-videni" element={<InfoColortest />}/>
        <Route path="/info-test-zorneho-pole" element={<InfoEyeFieldtest />}/>
        <Route path="/info-test-kontrastniho-videni" element={<InfoContrasttest />}/>
      </Routes>
    </Router>
  );
}

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className='home'>
      <img src="/logo-prvni-optika.jpg" width={200} height={150} alt="Logo"></img>
      <h1>Online oční test od První Optiky</h1>
      <button className='testBegin homePage' onClick={() => navigate('/instrukce-test-ostrosti')}>Zkontrolujte si svůj zrak</button>
      <button className='selectTest homePage' onClick={() => navigate('/vyber-testu')}>Nebo si vyberte určitý test</button>
    </div>
  );
}

export default App;