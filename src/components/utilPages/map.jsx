import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

const Map = () => {
  const [mapInstance, setMapInstance] = useState(null);
  const [locations, setLocations] = useState([]);
  const [openInfoWindow, setOpenInfoWindow] = useState(null);

  const fetchLocations = useCallback(async () => {
    try {
      const response = await axios.get(
        "/eye-test-deploy/proxy?action=getLocations"
      );
      console.log("Fetched locations:", response.data);
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
        googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,marker&callback=initMap&loading=async`;
        googleMapScript.async = true;

        window.initMap = () => {
          const pragueCenter = {
            lat: 50.09113288663482,
            lng: 14.43177035459569,
          };
          const map = new window.google.maps.Map(
            document.getElementById("map"),
            {
              center: pragueCenter,
              zoom: 12,
              mapId: import.meta.env.VITE_MAP_ID,
              streetViewControl: false,
              fullscreenControl: false,
              mapTypeControl: false,
              zoomControlOptions: {
                position: window.google.maps.ControlPosition.TOP_RIGHT,
              },
            }
          );
          setMapInstance(map);

          console.log("Initial map center:", map.getCenter().toJSON());
          console.log("Initial zoom level:", map.getZoom());

          map.addListener("zoom_changed", () => {
            console.log("Zoom changed to:", map.getZoom());
          });

          map.addListener("center_changed", () => {
            console.log("Center changed to:", map.getCenter().toJSON());
          });
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
    if (mapInstance && locations.length > 0 && window.google.maps.marker) {
      console.log("Creating markers for locations:", locations);

      mapInstance.data.forEach((feature) => {
        mapInstance.data.remove(feature);
      });

      const geocoder = new window.google.maps.Geocoder();

      const createCustomPin = (fillColor = "#FF0000") => {
        return `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="30" height="40">
            <path fill="${fillColor}" d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"/>
          </svg>
        `;
      };

      locations.forEach((location) => {
        const address = `${location.googleProfileLink}, Czechia`;

        geocoder.geocode({ address: address }, (results, status) => {
          if (status === "OK" && results[0]) {
            const position = results[0].geometry.location;
            console.log(
              `Geocoded position for ${location.name}:`,
              position.toJSON()
            );

            const pinSvg = createCustomPin();
            const pinElement = new DOMParser().parseFromString(
              pinSvg,
              "image/svg+xml"
            ).documentElement;

            const markerView =
              new window.google.maps.marker.AdvancedMarkerElement({
                map: mapInstance,
                position: position,
                title: location.name,
                content: pinElement,
              });

            const infoWindow = new window.google.maps.InfoWindow({
              content: `<div><h1>${location.name}</h1><p>${location.address}</p></div>`,
              pixelOffset: new window.google.maps.Size(0, -40),
            });

            markerView.addListener("click", () => {
              console.log(`Pin clicked: ${location.name}`);
              console.log("Current zoom level:", mapInstance.getZoom());
              console.log("Current center:", mapInstance.getCenter().toJSON());

              if (openInfoWindow) {
                openInfoWindow.close();
              }

              mapInstance.panTo(position);
              console.log("Panning to:", position.toJSON());

              infoWindow.open({
                map: mapInstance,
                anchor: markerView,
                shouldFocus: false,
              });
              console.log("InfoWindow opened");
              setOpenInfoWindow(infoWindow);
            });

            markerView.addListener("mouseover", () => {
              if (!openInfoWindow || openInfoWindow !== infoWindow) {
                infoWindow.open({
                  map: mapInstance,
                  anchor: markerView,
                  shouldFocus: false,
                });
                console.log(`InfoWindow opened on mouseover: ${location.name}`);
              }
            });

            markerView.addListener("mouseout", () => {
              if (!openInfoWindow || openInfoWindow !== infoWindow) {
                infoWindow.close();
                console.log(`InfoWindow closed on mouseout: ${location.name}`);
              }
            });
          } else {
            console.error(
              "Geocode was not successful for the following reason: " + status
            );
          }
        });
      });
    }
  }, [mapInstance, locations, openInfoWindow]);

  return (
    <div>
      <div id="map" style={{ width: "100%", height: "600px" }}></div>
    </div>
  );
};

export default Map;
