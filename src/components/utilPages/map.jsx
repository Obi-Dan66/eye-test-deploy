import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import Sidebar from "../MapSidebar";
import loadGoogleMapsApi from "../loadGoogleMapsApi";

const Map = () => {
  const [mapInstance, setMapInstance] = useState(null);
  const [locations, setLocations] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [openInfoWindow, setOpenInfoWindow] = useState(null);
  const [googleMaps, setGoogleMaps] = useState(null); // New state to hold Google Maps object
  const [markers, setMarkers] = useState({}); // Define setMarkers state
  const mapInstanceRef = useRef(null);

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
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY; // Replace with your actual API key
    loadGoogleMapsApi(apiKey)
      .then((google) => {
        setGoogleMaps(google); // Set Google Maps object
        const pragueCenter = {
          lat: 50.09113288663482,
          lng: 14.43177035459569,
        };
        const map = new google.maps.Map(document.getElementById("map"), {
          center: pragueCenter,
          zoom: 12,
          mapId: import.meta.env.VITE_MAP_ID, // Replace with your actual Map ID
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          zoomControlOptions: {
            position: google.maps.ControlPosition.TOP_RIGHT,
          },
        });
        setMapInstance(map);
        window.mapInstance = map; // Ensure window.mapInstance is set
        if (mapInstanceRef) {
          mapInstanceRef.current = map;
        }
        fetchLocations();
      })
      .catch((error) =>
        console.error("Error loading Google Maps script:", error)
      );
  }, [fetchLocations]);

  useEffect(() => {
    if (mapInstance) {
      const geocoder = new googleMaps.maps.Geocoder();
      locations.forEach((location) => {
        const address = location.address;
        if (!address) {
          console.error("Invalid address:", address);
          return;
        }
        geocoder.geocode({ address: address }, (results, status) => {
          if (status === "OK" && results[0]) {
            const position = results[0].geometry.location;

            const pinSvg = createCustomPin();
            const pinElement = new DOMParser().parseFromString(
              pinSvg,
              "text/html"
            ).body.firstChild;

            const markerView = new googleMaps.maps.marker.AdvancedMarkerElement(
              {
                map: mapInstance,
                position: position,
                title: location.name,
                content: pinElement,
              }
            );

            const infoWindowContent = `
              <div style="
                padding: 10px;
                max-width: 200px;
                font-family: Arial, sans-serif;
              ">
                <h3 style="
                  margin: 0;
                  font-size: 16px;
                  font-weight: bold;
                  color: #333;
                  padding-right: 20px;
                ">${location.name}</h3>
                <p style="
                  margin: 0;
                  font-size: 14px;
                  color: #666;
                ">${location.address}</p>
                <p style="
                  margin: 0;
                  font-size: 14px;
                  color: #666;
                ">${location.openingHours}</p>
                <p style="
                  margin: 0;
                  font-size: 14px;
                  color: #666;
                "><a href="${location.webLink}" target="_blank" rel="noopener noreferrer">${location.webLink}</a></p>
              </div>
            `;

            const infoWindow = new googleMaps.maps.InfoWindow({
              content: infoWindowContent,
              pixelOffset: new googleMaps.maps.Size(0, -40),
            });

            // Add click event listener to marker
            markerView.addListener("click", () => {
              if (openInfoWindow) {
                openInfoWindow.close();
              }

              infoWindow.open({
                map: mapInstance,
                anchor: markerView,
                shouldFocus: false,
              });

              setOpenInfoWindow(infoWindow);

              smoothPan(mapInstance, position, 1000);
            });

            // Save marker and infoWindow to state
            setMarkers((prevMarkers) => ({
              ...prevMarkers,
              [location.id]: { markerView, infoWindow, position },
            }));
          } else {
            console.error(
              "Geocode was not successful for the following reason: " + status
            );
          }
        });
      });
    }
  }, [mapInstance, locations, googleMaps, openInfoWindow]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userPos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setUserLocation(userPos);

        // Add a blue dot for the user's location
        if (mapInstance && googleMaps) {
          const userLocationElement = document.createElement("div");
          userLocationElement.style.width = "16px";
          userLocationElement.style.height = "16px";
          userLocationElement.style.backgroundColor = "red";
          userLocationElement.style.borderRadius = "50%";
          userLocationElement.style.border = "2px solid #ffffff";

          new googleMaps.maps.marker.AdvancedMarkerElement({
            map: mapInstance,
            position: userPos,
            title: "Vaše lokace",
            content: userLocationElement,
          });

          new googleMaps.maps.Circle({
            strokeColor: "#0072ef",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#0072ef",
            fillOpacity: 0.35,
            map: mapInstance,
            center: userPos,
            radius: 1300,
          });
        }
      },
      (error) => {
        console.error("Error getting user location:", error);
      }
    );
  }, [mapInstance, googleMaps]);

  useEffect(() => {
    if (mapInstanceRef.current) {
      window.mapInstance = mapInstanceRef.current;
    }
  }, [mapInstance]);

  const smoothPan = (map, endPosition, duration = 1000) => {
    const startPosition = map.getCenter();
    const startLat = startPosition.lat();
    const startLng = startPosition.lng();
    const endLat =
      typeof endPosition.lat === "function"
        ? endPosition.lat()
        : endPosition.lat;
    const endLng =
      typeof endPosition.lng === "function"
        ? endPosition.lng()
        : endPosition.lng;
    const latDiff = endLat - startLat;
    const lngDiff = endLng - startLng;
    const startTime = new Date().getTime();

    const animate = () => {
      const now = new Date().getTime();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = 0.5 - Math.cos(progress * Math.PI) / 2;
      const newLat = startLat + latDiff * easedProgress;
      const newLng = startLng + lngDiff * easedProgress;
      map.setCenter({ lat: newLat, lng: newLng });
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  };

  const createCustomPin = (fillColor = "#0072ef") => {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="30" height="40">
        <path fill="${fillColor}" d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"/>
      </svg>
    `;
  };

  const handleAddressSubmit = (address) => {
    if (!googleMaps || !mapInstance) return;

    const geocoder = new googleMaps.maps.Geocoder();
    geocoder.geocode({ address: address }, (results, status) => {
      if (status === "OK" && results[0]) {
        const position = results[0].geometry.location;

        const pinSvg = createCustomPin();
        const pinElement = new DOMParser().parseFromString(pinSvg, "text/html")
          .body.firstChild;

        const markerView = new googleMaps.maps.marker.AdvancedMarkerElement({
          map: mapInstance,
          position: position,
          title: address,
          content: pinElement,
        });

        const infoWindowContent = `
          <div style="
            padding: 10px;
            max-width: 200px;
            font-family: Arial, sans-serif;
          ">
            <h3 style="
              margin: 0;
              font-size: 16px;
              font-weight: bold;
              color: #333;
              padding-right: 20px;
            ">${address}</h3>
          </div>
        `;

        const infoWindow = new googleMaps.maps.InfoWindow({
          content: infoWindowContent,
          pixelOffset: new googleMaps.maps.Size(0, -40),
        });

        markerView.addListener("click", () => {
          if (openInfoWindow) {
            openInfoWindow.close();
          }

          infoWindow.open({
            map: mapInstance,
            anchor: markerView,
            shouldFocus: false,
          });

          setOpenInfoWindow(infoWindow);

          smoothPan(mapInstance, position, 1000);
        });

        // Save marker and infoWindow to state
        setMarkers((prevMarkers) => ({
          ...prevMarkers,
          [address]: { markerView, infoWindow, position },
        }));

        // Open the info window immediately
        infoWindow.open({
          map: mapInstance,
          anchor: markerView,
          shouldFocus: false,
        });

        setOpenInfoWindow(infoWindow);
        smoothPan(mapInstance, position, 1000);
      } else {
        console.error(
          "Geocode was not successful for the following reason: " + status
        );
      }
    });
  };

  const openInfoWindowForMarker = (locationId) => {
    const markerData = markers[locationId];
    if (markerData) {
      const { markerView, infoWindow, position } = markerData;
      if (openInfoWindow) {
        openInfoWindow.close();
      }
      infoWindow.open({
        map: mapInstance,
        anchor: markerView,
        shouldFocus: false,
      });
      setOpenInfoWindow(infoWindow);
      smoothPan(mapInstance, position, 1000);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar
        onAddressSubmit={handleAddressSubmit}
        locations={locations}
        userLocation={userLocation}
        googleMaps={googleMaps} // Pass Google Maps object to Sidebar
        openInfoWindowForMarker={openInfoWindowForMarker} // Pass function to Sidebar
      />
      <div style={{ flex: 1 }}>
        <div id="map" style={{ width: "100%", height: "600px" }}></div>
      </div>
    </div>
  );
};

export default Map;
