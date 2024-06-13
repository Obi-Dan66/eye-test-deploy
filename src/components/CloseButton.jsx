import React from "react";
import { useNavigate } from "react-router-dom";

const CloseButton = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
  };

  return (
    <svg
      onClick={goToHome}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      alt="Zrušit"
      style={{
        cursor: "pointer",
        position: "absolute",
        top: "20px",
        right: "20px",
      }}
    >
      <path
        d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
        fill="#32373E"
      ></path>
    </svg>
  );
};

export default CloseButton;
