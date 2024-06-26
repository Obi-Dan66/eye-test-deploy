import React, { useEffect } from "react";

const Map = () => {
  useEffect(() => {
    // Load the Google Maps JavaScript API script
    const googleMapScript = document.createElement("script");
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`;
    window.document.body.appendChild(googleMapScript);

    googleMapScript.addEventListener("load", () => {
      // Initialize the map
      const map = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: YOUR_LATITUDE, lng: YOUR_LONGITUDE },
        zoom: 10,
      });

      // Add markers for store locations
      // You can fetch store locations from your database and add markers here
    });

    return () => {
      // Clean up to prevent memory leaks
      window.document.body.removeChild(googleMapScript);
    };
  }, []);

  return <div id="map" style={{ width: "100%", height: "400px" }}></div>;
};

export default Map;
