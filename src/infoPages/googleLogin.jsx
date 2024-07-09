import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import env from "./env"; // Import for development only

const GoogleLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const onSuccess = (response) => {
      const token = response.credential; // Extract the JWT ID token from the response
      localStorage.setItem("JWT_ID_TOKEN", token); // Store the token in local storage with key "JWT_ID_TOKEN"
      console.log("Token received:", token);
      navigate("/auth/callback"); // Redirect to your desired route
    };

    const onFailure = (error) => {
      console.error("Google Sign-In failed:", error);
      // Optionally, display an error message to the user
      alert("Google Sign-In failed: " + JSON.stringify(error));
    };

    const initGoogleSignIn = () => {
      window.google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: onSuccess,
      });

      window.google.accounts.id.renderButton(
        document.getElementById("google-signin-button"),
        { theme: "outline", size: "large", onFailure: onFailure } // Pass the onFailure callback here
      );

      window.google.accounts.id.prompt(); // Automatically prompt for sign-in
    };

    const loadGoogleScript = () => {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.onload = initGoogleSignIn;
      document.body.appendChild(script);
    };

    loadGoogleScript();

    return () => {
      const scriptElement = document.querySelector(
        'script[src="https://accounts.google.com/gsi/client"]'
      );
      if (scriptElement) {
        document.body.removeChild(scriptElement);
      }
    };
  }, [navigate]);

  return (
    <div className="login-container">
      <h1>
        Prosím přihlaste se pomocí vašeho Google účtu, ve kterém máte aktivovaný
        Google Business Profile.
      </h1>
      <div id="google-signin-button">Sign in with Google</div>
    </div>
  );
};

export default GoogleLogin;
