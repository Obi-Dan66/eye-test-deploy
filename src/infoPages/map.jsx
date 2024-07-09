import React, { useEffect, useState } from "react";
// import env from "./env"; // Import for development only
import axios from "axios";

const Map = () => {
  const [mapInstance, setMapInstance] = useState(null);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const loadMapScript = () => {
      return new Promise((resolve, reject) => {
        const googleMapScript = document.createElement("script");
        const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ""; // Access API key from environment variables
        googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initMap&loading=async`;
        googleMapScript.async = true;

        window.initMap = () => {
          const map = new window.google.maps.Map(
            document.getElementById("map"),
            {
              center: { lat: 49.8175, lng: 15.473 }, // Center of Czechia
              zoom: 8,
              mapId: process.env.MAP_ID || "", // Custom map ID if available
            }
          );
          setMapInstance(map);
        };

        googleMapScript.addEventListener("load", resolve);
        googleMapScript.addEventListener("error", reject);

        document.body.appendChild(googleMapScript);
      });
    };

    loadMapScript().catch((error) =>
      console.error("Error loading Google Maps script:", error)
    );
  }, []);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get("/path-to-your-backend-endpoint"); // Replace with your backend endpoint to fetch locations
        setLocations(response.data);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, []);

  useEffect(() => {
    if (mapInstance && locations.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      locations.forEach((location) => {
        const { lat, lng, name } = location;
        const marker = new window.google.maps.Marker({
          position: { lat, lng },
          map: mapInstance,
          title: name,
        });
        bounds.extend(marker.position);
      });
      mapInstance.fitBounds(bounds);
    }
  }, [mapInstance, locations]);

  return (
    <div>
      <div id="map" style={{ width: "100%", height: "600px" }}></div>
    </div>
  );
};

export default Map;
