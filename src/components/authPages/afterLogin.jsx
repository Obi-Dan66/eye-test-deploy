import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const useAuth = () => {
  const token = localStorage.getItem("JWT_ID_TOKEN");
  const isAuthenticated = !!token;

  return { isAuthenticated, token };
};

const AfterLogin = () => {
  const navigate = useNavigate();
  const { isAuthenticated, token } = useAuth();
  const [businessListings, setBusinessListings] = useState(null);

  useEffect(() => {
    const fetchBusinessListings = async (accountId, token) => {
      try {
        const response = await fetch(
          `http://localhost:3000/business-listings?accountId=${accountId}&token=${token}`
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch business listings: ${response.statusText}`
          );
        }

        const data = await response.json();
        setBusinessListings(data.locations);
      } catch (error) {
        console.error("Error fetching business listings:", error);
      }
    };

    if (isAuthenticated) {
      const decoded = jwtDecode(token);
      console.log("Decoded JWT:", decoded); // Log the decoded token to verify its structure
      const accountId = decoded.sub; // Ensure the appropriate field for accountId

      fetchBusinessListings(accountId, token); // Pass accountId and token to fetch function
    }
  }, [isAuthenticated, token]);

  useEffect(() => {
    return () => {
      localStorage.removeItem("JWT_ID_TOKEN");
    };
  }, []);

  if (!isAuthenticated) {
    return (
      <div>
        <h1>Nejste přihlášeni</h1>
        <button className="defaultButton" onClick={() => navigate("/auth")}>
          Přihlaste se
        </button>
      </div>
    );
  }

  if (businessListings) {
    return (
      <div className="after-login-container">
        <h1>
          Verifikace byla úspěšná, prosím vyberte si pobočku, kterou chcete
          zaregistrovat do našeho partnerského prostředí a mapy.
        </h1>
        <p>Můžete také využít možnost manuálního přidání pobočky.</p>
        <button
          className="defaultButton"
          onClick={() => navigate("/manualni-pridani")}
        >
          Manuální přidání pobočky
        </button>
        <ul>
          {businessListings.map((listing) => (
            <li key={listing.name}>{listing.name}</li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="after-login-container">
      <h1>Verifikace byla úspěšná.</h1>
      <p>
        Bohužel se nepodařilo načíst pobočky z Vašeho profilu, prosím využijte
        možnost manuálního přidání skrze formulář.
      </p>
      <button
        className="defaultButton"
        onClick={() => navigate("/manualni-pridani")}
      >
        Manuální přidání pobočky
      </button>
    </div>
  );
};

export default AfterLogin;
