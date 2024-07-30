import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

const Map = () => {
  const [mapInstance, setMapInstance] = useState(null);
  const [locations, setLocations] = useState([]);

  const fetchLocations = useCallback(async () => {
    try {
      const response = await axios.get(
        "/eye-test-deploy/proxy?action=getLocations"
      );
      setLocations(response.data);
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  }, []);

  useEffect(() => {
    const loadMapScript = () => {
      return new Promise((resolve, reject) => {
        const googleMapScript = document.createElement("script");
        const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "";
        googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initMap&loading=async`;
        googleMapScript.async = true;

        window.initMap = () => {
          const map = new window.google.maps.Map(
            document.getElementById("map"),
            {
              center: { lat: 49.8175, lng: 15.473 }, // Center of Czechia
              zoom: 8,
              mapId: import.meta.env.VITE_MAP_ID || "",
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

    fetchLocations();
  }, [fetchLocations]);

  useEffect(() => {
    if (mapInstance && locations.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      const geocoder = new window.google.maps.Geocoder();

      locations.forEach((location) => {
        geocoder.geocode(
          { address: location.googleProfileLink },
          (results, status) => {
            if (status === "OK") {
              const marker = new window.google.maps.Marker({
                position: results[0].geometry.location,
                map: mapInstance,
                title: location.name,
              });

              const infoWindow = new window.google.maps.InfoWindow({
                content: `<div><h3>${location.name}</h3><p>${location.address}</p><a href="https://plus.codes/${location.googleProfileLink}" target="_blank">View on Google Maps</a></div>`,
              });

              marker.addListener("click", () => {
                infoWindow.open(mapInstance, marker);
              });

              bounds.extend(results[0].geometry.location);
              mapInstance.fitBounds(bounds);
            } else {
              console.error(
                "Geocode was not successful for the following reason: " + status
              );
            }
          }
        );
      });
    }
  }, [mapInstance, locations]);

  return (
    <div>
      <div id="map" style={{ width: "100%", height: "600px" }}></div>
    </div>
  );
};

export default Map;
