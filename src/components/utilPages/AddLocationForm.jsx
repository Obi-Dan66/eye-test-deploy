import React, { useState } from "react";
import axios from "axios";

const AddLocationForm = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [googleProfileLink, setGoogleProfileLink] = useState("");
  const [message, setMessage] = useState("");
  const [showButton, setShowButton] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "/eye-test-deploy/proxy", // Use Vite proxy
        {
          name,
          address,
          googleProfileLink,
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
        setName("");
        setAddress("");
        setGoogleProfileLink("");
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

  const handleButtonClick = () => {
    // Add your logic here for what should happen when the button is clicked
    console.log("Button clicked!");
  };

  return (
    <div>
      <h2>Add Location</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Address:
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Google Profile Link:
            <input
              type="text"
              value={googleProfileLink}
              onChange={(e) => setGoogleProfileLink(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit">Add Location</button>
      </form>
      {message && <p>{message}</p>}
      {showButton && (
        <button onClick={handleButtonClick}>
          Přidat do mapy a partnerského programu
        </button>
      )}
    </div>
  );
};

export default AddLocationForm;
