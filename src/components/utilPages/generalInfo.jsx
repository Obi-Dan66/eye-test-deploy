import React from "react";
import { useNavigate } from "react-router-dom";

const GeneralInfo = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>
        This page will contain general information about the company (contact,
        faq and legal documents)
      </h1>
      <div className="loginBtn">
        <button className="defaultButton" onClick={() => navigate("/auth")}>
          Stát se partnerem
        </button>
      </div>
    </div>
  );
};

export default GeneralInfo;
