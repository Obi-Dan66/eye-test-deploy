import React, { useState } from "react";
import axios from "axios";

const Sidebar = ({ onAddressSubmit, locations, userLocation }) => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleInputChange = async (e) => {
    setInput(e.target.value);
    if (e.target.value.length > 2) {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${
          e.target.value
        }&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`
      );
      setSuggestions(response.data.predictions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === "") {
      console.error("Invalid address input:", input);
      return;
    }
    onAddressSubmit(input);
  };

  const sortedLocations = userLocation
    ? locations.sort((a, b) => {
        const distanceA = Math.sqrt(
          Math.pow(a.lat - userLocation.lat, 2) +
            Math.pow(a.lng - userLocation.lng, 2)
        );
        const distanceB = Math.sqrt(
          Math.pow(b.lat - userLocation.lat, 2) +
            Math.pow(b.lng - userLocation.lng, 2)
        );
        return distanceA - distanceB;
      })
    : locations;

  return (
    <div
      style={{
        width: isCollapsed ? "50px" : "300px",
        transition: "width 0.3s",
      }}
    >
      <button
        className="defaultButton"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? "Rozšířit" : "Skrýt"}
      </button>
      {!isCollapsed && (
        <div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Enter address"
            />
            <button className="defaultButton" type="submit">
              Vyhledat
            </button>
          </form>
          <ul>
            {suggestions.map((suggestion) => (
              <li key={suggestion.place_id}>{suggestion.description}</li>
            ))}
          </ul>
          <div>
            {sortedLocations.map((location) => (
              <div key={location.id}>
                <h3>{location.name}</h3>
                <p>{location.address}</p>
                <p>{location.distance} km</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
