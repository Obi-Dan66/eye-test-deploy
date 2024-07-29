import React, { useState } from "react";
import axios from "axios";

const AddLocationForm = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [googleProfileLink, setGoogleProfileLink] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a JSON object with the form data
    const formData = JSON.stringify({
      name,
      address,
      googleProfileLink,
    });

    try {
      const response = await axios.post(
        "/eye-test-deploy/proxy", // Use Vite proxy
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
          },
        }
      );

      console.log("Response:", response.data);
      setMessage("Location added successfully");
      setName("");
      setAddress("");
      setGoogleProfileLink("");
    } catch (error) {
      console.error("Error:", error);
      if (error.response) {
        // Server responded with a status other than 200 range
        console.error("Error adding location:", error.response.data);
        setMessage(
          "Error adding location: " + JSON.stringify(error.response.data)
        );
      } else if (error.request) {
        // Request was made but no response received
        console.error("Network error:", error.request);
        setMessage("Network error: Please check your server.");
      } else {
        // Something else happened
        console.error("Error:", error.message);
        setMessage("Error: " + error.message);
      }
    }
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
    </div>
  );
};

export default AddLocationForm;
