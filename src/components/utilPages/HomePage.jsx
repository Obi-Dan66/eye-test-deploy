import React from "react";
import { useNavigate } from "react-router-dom";
import InfoButton from "../InfoButton";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-wrapper">
      <InfoButton />
      <div className="home">
        <img
          src="./logo-prvni-optika.jpg"
          width={200}
          height={150}
          alt="Logo"
        ></img>
        <h1>Online oční test od První Optiky</h1>
        <button
          className="defaultButton"
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

export default HomePage;
