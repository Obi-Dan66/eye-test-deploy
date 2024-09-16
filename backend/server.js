import express from "express";
import axios from "axios";
import cors from "cors";
import bodyParser from "body-parser";
import Stripe from "stripe";
import dotenv from "dotenv";
import path from "path";

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080; // Use the PORT environment variable or default to 8080
const YOUR_DOMAIN = process.env.API_CALL_ORIGIN; // Update with your frontend domain
const GOOGLE_SCRIPT_URL = process.env.DATABASE_SHEET_URL;

// Log environment variables to check if they are loaded
const logEnvVars = () => {
  console.log("Environment Variables:");
  console.log("PORT:", process.env.PORT ? "Loaded" : "Not Loaded");
  console.log(
    "API_CALL_ORIGIN:",
    process.env.API_CALL_ORIGIN ? "Loaded" : "Not Loaded"
  );
  console.log(
    "DATABASE_SHEET_URL:",
    process.envGOOGLE_SCRIPT_URL ? "Loaded" : "Not Loaded"
  );
  console.log(
    "STRIPE_SECRET_KEY:",
    process.env.STRIPE_SECRET_KEY ? "Loaded" : "Not Loaded"
  );
  console.log(
    "VITE_GOOGLE_MAPS_API_KEY:",
    process.env.VITE_GOOGLE_MAPS_API_KEY ? "Loaded" : "Not Loaded"
  );
  console.log(
    "VITE_GOOGLE_CLIENT_ID:",
    process.env.VITE_GOOGLE_CLIENT_ID ? "Loaded" : "Not Loaded"
  );
  console.log(
    "VITE_MAP_ID:",
    process.env.VITE_MAP_ID ? "Loaded" : "Not Loaded"
  );
  console.log(
    "VITE_DATABASE_SHEET_URL:",
    process.env.VITE_DATABASE_SHEET_URL ? "Loaded" : "Not Loaded"
  );
  console.log(
    "VITE_STRIPE_PUBLISHABLE_KEY:",
    process.env.VITE_STRIPE_PUBLISHABLE_KEY ? "Loaded" : "Not Loaded"
  );
  console.log(
    "VITE_STRIPE_SECRET_KEY:",
    process.env.VITE_STRIPE_SECRET_KEY ? "Loaded" : "Not Loaded"
  );
  console.log(
    "VITE_API_CALL_ORIGIN:",
    process.env.VITE_API_CALL_ORIGIN ? "Loaded" : "Not Loaded"
  );
  console.log(
    "STRIPE_PUBLISHABLE_KEY:",
    process.env.STRIPE_PUBLISHABLE_KEY ? "Loaded" : "Not Loaded"
  );
  console.log("MAP_ID:", process.env.MAP_ID ? "Loaded" : "Not Loaded");
  console.log(
    "GOOGLE_MAPS_API_KEY:",
    process.env.GOOGLE_MAPS_API_KEY ? "Loaded" : "Not Loaded"
  );
  console.log(
    "GOOGLE_CLIENT_ID:",
    process.env.GOOGLE_CLIENT_ID ? "Loaded" : "Not Loaded"
  );
};

// Function to wait for environment variables to be available
const waitForEnvVars = async () => {
  return new Promise((resolve) => {
    const checkEnvVars = () => {
      if (
        process.env.STRIPE_SECRET_KEY &&
        process.env.API_CALL_ORIGIN &&
        process.env.DATABASE_SHEET_URL &&
        process.env.VITE_GOOGLE_MAPS_API_KEY &&
        process.env.VITE_GOOGLE_CLIENT_ID &&
        process.env.VITE_MAP_ID &&
        process.env.VITE_DATABASE_SHEET_URL &&
        process.env.VITE_STRIPE_PUBLISHABLE_KEY &&
        process.env.VITE_STRIPE_SECRET_KEY &&
        process.env.VITE_API_CALL_ORIGIN &&
        process.env.STRIPE_PUBLISHABLE_KEY &&
        process.env.MAP_ID &&
        process.env.GOOGLE_MAPS_API_KEY &&
        process.env.GOOGLE_CLIENT_ID
      ) {
        resolve();
      } else {
        console.log("Waiting for environment variables...");
        setTimeout(checkEnvVars, 10000); // Retry in 10 seconds
      }
    };
    checkEnvVars();
  });
};

// Initialize Stripe and start the server
const initializeApp = async () => {
  await waitForEnvVars();
  logEnvVars();

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  console.log("Stripe initialized successfully.");

  // Enable CORS for all routes
  app.use(cors());
  app.use(bodyParser.json());

  // Define __dirname for ES modules
  const __dirname = path.resolve();

  // Serve static files from the 'dist' directory
  app.use(express.static(path.join(__dirname, "dist")));

  // Business Listings Route
  app.get("/business-listings", async (req, res) => {
    const { accountId, token } = req.query;

    const parent = `accounts/${accountId}`;
    const requestUrl = `https://mybusiness.googleapis.com/v4/${parent}/locations`;
    console.log(`Request URL: ${requestUrl}`);
    console.log(`Authorization Token: ${token}`);

    try {
      const response = await axios.get(requestUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log("Business listings response:", response.data);
      res.json(response.data);
    } catch (error) {
      console.error("Error fetching business listings:", error.message);
      res
        .status(error.response ? error.response.status : 500)
        .send("Error fetching business listings");
    }
  });

  // Create Checkout Session Route
  app.post("/create-checkout-session", async (req, res) => {
    try {
      const returnUrl = `${YOUR_DOMAIN}/payment-success?session_id={CHECKOUT_SESSION_ID}`;
      console.log(`Creating checkout session with return_url: ${returnUrl}`);

      const session = await stripe.checkout.sessions.create({
        ui_mode: "embedded",
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: "price_1PpzWADnEGKgYgS9JTENOYwO", // Replace with your price ID
            quantity: 1,
          },
        ],
        mode: "payment",
        return_url: returnUrl,
      });

      console.log(`Checkout session created: ${session.id}`);
      res.send({ clientSecret: session.client_secret });
    } catch (error) {
      console.error("Error creating checkout session:", error);
      res.status(500).send({ error: error.message });
    }
  });

  // Session Status Route
  app.get("/session-status", async (req, res) => {
    try {
      console.log(
        `Retrieving session status for session_id: ${req.query.session_id}`
      );
      const session = await stripe.checkout.sessions.retrieve(
        req.query.session_id
      );

      res.send({
        status: session.status,
        payment_intent: session.payment_intent,
        customer_email: session.customer_details.email,
      });
    } catch (error) {
      console.error("Error retrieving session status:", error);
      res.status(500).send({ error: error.message });
    }
  });

  // Proxy Routes
  app.post("/proxy", async (req, res) => {
    console.log("Received POST request at /proxy");
    console.log("Request body:", req.body);

    try {
      const response = await axios.post(GOOGLE_SCRIPT_URL, req.body, {
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
      });
      console.log("Response from Google Apps Script:", response.data);
      res.json(response.data);
    } catch (error) {
      console.error("Error forwarding request:", error);
      res.status(500).json({ message: "Error forwarding request" });
    }
  });

  app.get("/proxy", async (req, res) => {
    console.log("Received GET request at /proxy");
    console.log("Query parameters:", req.query);

    try {
      const response = await axios.get(
        `${GOOGLE_SCRIPT_URL}?${new URLSearchParams(req.query)}`
      );
      console.log("Response from Google Apps Script:", response.data);
      res.json(response.data);
    } catch (error) {
      console.error("Error forwarding request:", error);
      res.status(500).json({ message: "Error forwarding request" });
    }
  });

  // Handle root URL
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
  });

  // Start the server
  app
    .listen(PORT, "0.0.0.0", () => {
      console.log(`Server running at http://localhost:${PORT}`);
    })
    .on("error", (err) => {
      console.error("Failed to start server:", err);
    });
};

initializeApp();
