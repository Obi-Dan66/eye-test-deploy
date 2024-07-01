import React, { useEffect } from "react";
//import env from "./env"; //import for development only

const Map = () => {
  useEffect(() => {
    let mapInstance; // Define mapInstance variable

    const loadMapScript = () => {
      return new Promise((resolve, reject) => {
        const googleMapScript = document.createElement("script");
        const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ""; // Access API key from environment variables
        googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initMap&loading=async`;
        googleMapScript.async = true; // Load the script asynchronously for better performance

        window.initMap = () => {
          mapInstance = new window.google.maps.Map(
            document.getElementById("map"),
            {
              center: { lat: 0, lng: 0 }, // Default center at (0, 0)
              zoom: 2, // Default zoom level
            }
          );
        };

        googleMapScript.addEventListener("load", () => {
          resolve();
        });

        googleMapScript.addEventListener("error", (error) => {
          reject(error);
        });

        window.document.body.appendChild(googleMapScript);
      });
    };

    loadMapScript().catch((error) => console.error(error)); // Handle any errors in the promise chain

    return () => {
      // Clean up to prevent memory leaks
      if (mapInstance) {
        mapInstance = null; // Reset mapInstance
      }
    };
  }, []);

  return <div id="map" style={{ width: "100%", height: "600px" }}></div>;
};

export default Map;
