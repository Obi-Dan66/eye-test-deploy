import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const token = localStorage.getItem("JWT_ID_TOKEN");
  const isAuthenticated = !!token; // Check for JWT ID token presence

  return { isAuthenticated, token };
};
//test push change
const AfterLogin = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [businessListings, setBusinessListings] = useState(null);

  useEffect(() => {
    const fetchBusinessListings = async () => {
      try {
        // Make API request to fetch Google business listings data
        const response = await fetch(
          "https://mybusiness.googleapis.com/v4/accounts/{accountId}/locations",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("JWT_ID_TOKEN")}`,
              // Add any other required headers
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setBusinessListings(data); // Update state with the fetched listings
        } else {
          console.error("Failed to fetch business listings");
        }
      } catch (error) {
        console.error("Error fetching business listings:", error);
      }
    };

    if (isAuthenticated) {
      fetchBusinessListings(); // Call the function to fetch business listings when authenticated
    }
  }, [isAuthenticated]);

  useEffect(() => {
    return () => {
      // Clean up the token when the component unmounts
      localStorage.removeItem("JWT_ID_TOKEN");
    };
  }, []);

  if (isAuthenticated) {
    if (businessListings) {
      return (
        <div className="after-login-container">
          <h1>
            Verifikace byla úspěšná, prosím vyberte si pobočku, kterou chcete
            zaregistrovat do našeho partnerského prostředí a mapy.
          </h1>
          <ul>
            {businessListings.map((listing) => (
              <li key={listing.id}>{listing.name}</li>
            ))}
          </ul>
        </div>
      );
    } else {
      return (
        <div className="after-login-container">
          <h1>
            Verifikace byla úspěšná, prosím vyberte si pobočku, kterou chcete
            zaregistrovat do našeho partnerského prostředí a mapy.
          </h1>
          <p>
            Pokud se Vám pobočky nenačetly z Vašeho Google účtu, využijte
            možnost manuálního přidání pomocí formuláře.
          </p>
          <button className="defaultButton" onClick={() => navigate("/auth")}>
            Manuální přidání pobočky
          </button>
        </div>
      );
    }
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
