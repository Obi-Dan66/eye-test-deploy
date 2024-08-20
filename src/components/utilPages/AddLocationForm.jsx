import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddLocationForm = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [googleProfileLink, setGoogleProfileLink] = useState("");
  const [openingHours, setOpeningHours] = useState("");
  const [webLink, setWebLink] = useState("");
  const [message, setMessage] = useState("");
  const [showButton, setShowButton] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_CALL_ORIGIN}/proxy`, // Use the correct server URL
        {
          name,
          address,
          googleProfileLink,
          openingHours,
          webLink,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
          },
        }
      );

      if (response.data.result === "success") {
        setMessage(
          "Lokace byla úspěšně přidána do naší databáze. Pro přidání do naší mapy a partnerského programu klikněte na tlačítko níže."
        );
        setShowButton(true);
        setFormSubmitted(true);
        setName("");
        setAddress("");
        setGoogleProfileLink("");
        setOpeningHours("");
        setWebLink("");
      } else {
        setMessage("Error adding location: Unexpected response");
        setShowButton(false);
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response) {
        setMessage(
          "Error adding location: " + JSON.stringify(error.response.data)
        );
      } else if (error.request) {
        setMessage("Network error: Please check your server.");
      } else {
        setMessage("Error: " + error.message);
      }
      setShowButton(false);
    }
  };

  const handleButtonClick = async () => {
    navigate("/platebni-brana"); // Redirect to the Paywall component
  };

  return (
    <div className="add-location-form">
      <h2>Přidat pobočku</h2>

      {!formSubmitted ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Název pobočky:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Název optiky"
                required
                className="form-input"
              />
            </label>
          </div>
          <div>
            <label>
              Adresa pobočky:
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Václavské náměstí 846/1, 110 00 Praha 1 - Nové Město, Česko"
                required
                className="form-input"
              />
            </label>
          </div>
          <div>
            <label>
              <a
                href="https://support.google.com/maps/answer/7047426?hl=cs&co=GENIE.Platform%3DAndroid&oco=0"
                target="_blank"
                rel="noopener noreferrer"
                title="Jak zjistit Plus kód?"
              >
                Plus kód pobočky:
              </a>
              <input
                type="text"
                value={googleProfileLink}
                onChange={(e) => setGoogleProfileLink(e.target.value)}
                placeholder="3CC4+W9 Praha"
                required
                className="form-input"
              />
            </label>
          </div>
          <div>
            <label>
              Otevírací doba:
              <input
                type="text"
                value={openingHours}
                onChange={(e) => setOpeningHours(e.target.value)}
                placeholder="PO-ČT: 10-19:00 / PÁ: 10-17:30"
                required
                className="form-input"
              />
            </label>
          </div>
          <div>
            <label>
              Odkaz na web:
              <input
                type="text"
                value={webLink}
                onChange={(e) => setWebLink(e.target.value)}
                placeholder="https://www.example.com/"
                required
                className="form-input"
              />
            </label>
          </div>
          <button type="submit" className="defaultButton">
            Přidat pobočku
          </button>
        </form>
      ) : (
        <>
          {message && <p>{message}</p>}
          {showButton && (
            <button onClick={handleButtonClick} className="defaultButton">
              Přidat do mapy a partnerského programu
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default AddLocationForm;
