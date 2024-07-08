import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const token = localStorage.getItem("JWT_ID_TOKEN");
  const isAuthenticated = !!token; // Check for JWT ID token presence

  return { isAuthenticated, token };
};

const AfterLogin = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    return () => {
      // Clean up the token when the component unmounts
      localStorage.removeItem("JWT_ID_TOKEN");
    };
  }, []);

  if (isAuthenticated) {
    return (
      <div className="after-login-container">
        <h1>
          Verifikace byla úspěšná, prosím vyberte si pobočku, kterou chcete
          zaregistrovat do našeho partnerského prostředí a mapy.
        </h1>
        <p>
          Pokud se Vám pobočky nenačetly z Vašeho Google účtu, využijte možnost
          manuálního přidání pomocí formuláře.
        </p>
        <button className="defaultButton" onClick={() => navigate("/auth")}>
          Manuální přidání pobočky
        </button>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Nejste přihlášeni</h1>
        <button className="defaultButton" onClick={() => navigate("/auth")}>
          Přihlaste se
        </button>
      </div>
    );
  }
};

export default AfterLogin;
