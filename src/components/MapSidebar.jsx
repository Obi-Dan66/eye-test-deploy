import React, { useState, useEffect } from "react";
import loadGoogleMapsApi from "./loadGoogleMapsApi";

const Sidebar = ({ onAddressSubmit, locations, userLocation }) => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  //const [isCollapsed, setIsCollapsed] = useState(false);
  const [markers, setMarkers] = useState({});
  const [openInfoWindow, setOpenInfoWindow] = useState(null);
  const [autocompleteService, setAutocompleteService] = useState(null);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY; // Replace with your actual API key
    loadGoogleMapsApi(apiKey)
      .then((google) => {
        setAutocompleteService(new google.maps.places.AutocompleteService());
      })
      .catch((error) => {
        console.error("Error loading Google Maps JavaScript API:", error);
      });
  }, []);

  const handleInputChange = (e) => {
    setInput(e.target.value);
    if (e.target.value.length > 2 && autocompleteService) {
      autocompleteService.getPlacePredictions(
        { input: e.target.value },
        (predictions, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            setSuggestions(predictions);
          } else {
            console.error("Autocomplete service error:", status);
          }
        }
      );
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

  const handleLocationClick = (location) => {
    const map = window.mapInstance; // Assuming mapInstance is globally accessible
    if (!map) {
      console.error("Map instance is not available.");
      return;
    }

    // Check if marker already exists
    if (markers[location.id]) {
      const existingMarker = markers[location.id];
      smoothPan(map, existingMarker.position, 1000);
      if (openInfoWindow) {
        openInfoWindow.close();
      }
      existingMarker.infoWindow.open({
        map: map,
        anchor: existingMarker.markerView,
        shouldFocus: false,
      });
      setOpenInfoWindow(existingMarker.infoWindow);
      return;
    }

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: location.address }, (results, status) => {
      if (status === "OK" && results[0]) {
        const position = results[0].geometry.location;

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

        const pinSvg = `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="30" height="40">
            <path fill="#0072ef" d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"/>
          </svg>
        `;
        const pinElement = new DOMParser().parseFromString(pinSvg, "text/html")
          .body.firstChild;

        const markerView = new window.google.maps.marker.AdvancedMarkerElement({
          map: map,
          position: position,
          title: location.name,
          content: pinElement,
        });

        const infoWindow = new window.google.maps.InfoWindow({
          content: infoWindowContent,
          pixelOffset: new window.google.maps.Size(0, -40),
        });

        if (openInfoWindow) {
          openInfoWindow.close();
        }

        smoothPan(map, position, 1000);

        setTimeout(() => {
          infoWindow.open({
            map: map,
            anchor: markerView,
            shouldFocus: false,
          });

          setOpenInfoWindow(infoWindow);

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
        }, 500);

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
    //     <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
    <div className={`sidebar`}>
      {/*<button
        className="defaultButton"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? "Rozšířit" : "Skrýt"}
      </button>*/}
      {/*{!isCollapsed && (*/}
      <div>
        <form onSubmit={handleSubmit} style={{ position: "relative" }}>
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Zadejte vaši polohu"
            className="form-input"
          />
          {/*<button className="defaultButton" type="submit">
              Vyhledat
            </button>*/}
          {suggestions.length > 0 && (
            <ul className="suggestions-dropdown">
              {suggestions.map((suggestion) => (
                <li
                  key={suggestion.place_id}
                  onClick={() => onAddressSubmit(suggestion.description)}
                >
                  {suggestion.description}
                </li>
              ))}
            </ul>
          )}
        </form>
        <div>
          {sortedLocations.map((location) => (
            <div
              key={location.id}
              className="location-item"
              onClick={() => handleLocationClick(location)}
            >
              <h3>{location.name}</h3>
              <p>{location.address}</p>
              <p>{location.distance} km</p>
            </div>
          ))}
        </div>
      </div>
      {/*)}*/}
    </div>
  );
};

export default Sidebar;
