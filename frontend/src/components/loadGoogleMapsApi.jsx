let googleMapsPromise;

const loadGoogleMapsApi = () => {
  if (!googleMapsPromise) {
    googleMapsPromise = new Promise((resolve, reject) => {
      const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY; // Use environment variable for API key
      if (!apiKey) {
        reject(
          new Error(
            "Google Maps API key is not defined in environment variables"
          )
        );
        return;
      }

      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,marker&callback=initMap&loading=async`;
      script.async = true;
      script.onerror = reject;
      document.head.appendChild(script);

      window.initMap = () => {
        resolve(window.google);
      };
    });
  }
  return googleMapsPromise;
};

export default loadGoogleMapsApi;
