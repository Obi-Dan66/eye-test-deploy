import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import Sidebar from "../MapSidebar";

const Map = () => {
  const [mapInstance, setMapInstance] = useState(null);
  const [locations, setLocations] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [openInfoWindow, setOpenInfoWindow] = useState(null);
  const [error, setError] = useState(null);
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

  const createCustomPin = (fillColor = "#FF0000") => {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="30" height="40">
        <path fill="${fillColor}" d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"/>
      </svg>
    `;
  };

  const handleAddressSubmit = (address) => {
    // Logic to move the map camera to the inputted address
    if (mapInstanceRef.current) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: address }, (results, status) => {
        if (status === "OK" && results[0]) {
          const position = results[0].geometry.location;
          mapInstanceRef.current.setCenter(position);
          mapInstanceRef.current.setZoom(15);
        } else {
          console.error(
            "Geocode was not successful for the following reason:",
            status,
            "Address:",
            address
          );
          if (status === "INVALID_REQUEST") {
            setError(
              "Invalid address request. Please check the address format."
            );
          }
        }
      });
    }
  };

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
              mapTypeControl: false,
              streetViewControl: false,
              fullscreenControl: false,
              zoomControlOptions: {
                position: window.google.maps.ControlPosition.TOP_RIGHT,
              },
            }
          );
          setMapInstance(map);
          if (mapInstanceRef) {
            mapInstanceRef.current = map;
          }
          resolve(map);
        };

        googleMapScript.addEventListener("load", () => {});
        googleMapScript.addEventListener("error", reject);

        document.body.appendChild(googleMapScript);
      });
    };

    loadMapScript()
      .then(() => {
        fetchLocations();
      })
      .catch((error) =>
        console.error("Error loading Google Maps script:", error)
      );
  }, [fetchLocations]);

  useEffect(() => {
    if (mapInstance) {
      const geocoder = new window.google.maps.Geocoder();
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

            const markerView =
              new window.google.maps.marker.AdvancedMarkerElement({
                map: mapInstance,
                position: position,
                title: location.name,
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
                ">${location.name}</h3>
                <p style="
                  margin: 0;
                  font-size: 14px;
                  color: #666;
                ">${location.address}</p>
              </div>
            `;

            const infoWindow = new window.google.maps.InfoWindow({
              content: infoWindowContent,
              pixelOffset: new window.google.maps.Size(0, -40),
            });

            infoWindow.addListener("domready", () => {
              const iwOuter = document.querySelector(".gm-style-iw-c");
              if (!iwOuter) return;

              iwOuter.style.padding = "20";
              iwOuter.style.boxShadow = "0 1px 6px rgba(0, 0, 0, 0.3)";
              iwOuter.style.borderRadius = "8px";

              const iwContent = iwOuter.querySelector(".gm-style-iw-d");
              if (iwContent) {
                iwContent.style.padding = "0";
                iwContent.style.overflow = "hidden";
              }

              const closeButton = iwOuter.querySelector(
                "button.gm-ui-hover-effect"
              );
              if (closeButton) {
                closeButton.style.top = "0";
                closeButton.style.right = "0";
                closeButton.style.width = "30px";
                closeButton.style.height = "30px";
                closeButton.style.opacity = "1";
                closeButton.style.background = "white";
                closeButton.style.borderRadius = "0 8px 0 0";
                closeButton.style.boxShadow = "none";
                closeButton.style.border = "none";

                const xIcon = closeButton.querySelector("img");
                if (xIcon) {
                  xIcon.style.width = "16px";
                  xIcon.style.height = "16px";
                  xIcon.style.marginTop = "5px";
                  xIcon.style.marginRight = "40px";
                  xIcon.style.marginBottom = "9px";
                  xIcon.style.marginLeft = "7px";
                  xIcon.style.position = "absolute";
                }
              }

              const iwBackground = iwOuter.previousElementSibling;
              if (iwBackground) {
                iwBackground.style.display = "none";
              }
            });

            markerView.addListener("click", () => {
              if (openInfoWindow) {
                openInfoWindow.close();
              }

              smoothPan(mapInstance, position, 1000);

              setTimeout(() => {
                infoWindow.open({
                  map: mapInstance,
                  anchor: markerView,
                  shouldFocus: false,
                });
                setOpenInfoWindow(infoWindow);
              }, 500);
            });

            markerView.addListener("mouseover", () => {
              if (!openInfoWindow || openInfoWindow !== infoWindow) {
                infoWindow.open({
                  map: mapInstance,
                  anchor: markerView,
                  shouldFocus: false,
                });
              }
            });

            markerView.addListener("mouseout", () => {
              if (!openInfoWindow || openInfoWindow !== infoWindow) {
                infoWindow.close();
              }
            });
          } else {
            console.error(
              "Geocode was not successful for the following reason: " + status,
              "Address:",
              address
            );
            if (status === "INVALID_REQUEST") {
              setError(
                "Invalid address request. Please check the address format."
              );
            }
          }
        });
      });
    }
  }, [mapInstance, locations, openInfoWindow]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Error getting user location:", error);
      }
    );
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar
        onAddressSubmit={handleAddressSubmit}
        locations={locations}
        userLocation={userLocation}
      />
      <div style={{ flex: 1 }}>
        {error && <p>{error}</p>}
        <div id="map" style={{ width: "100%", height: "600px" }}></div>
      </div>
    </div>
  );
};

export default Map;
