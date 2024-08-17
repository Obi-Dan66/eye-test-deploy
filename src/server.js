import express from "express";
import axios from "axios";
import cors from "cors";
import bodyParser from "body-parser";
import Stripe from "stripe";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = 3000;
const stripe = new Stripe(process.env.VITE_STRIPE_SECRET_KEY); // Replace with your Stripe secret key
const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzq1vXutVZGfphaW0oC5-0uzS15Pjo15-NI3pcOpUzJLWRkhi6hOSHoxG1U_Gz86FKs/exec";

// Enable CORS for all routes
app.use(cors());
app.use(bodyParser.json());

// Business Listings Route
app.get("/business-listings", async (req, res) => {
  const { accountId, token } = req.query;

  const parent = `accounts/${accountId}`;
  const requestUrl = `https://mybusiness.googleapis.com/v4/${parent}/locations`;
  console.log(`Request URL: ${requestUrl}`);

  try {
    const response = await axios.get(requestUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching business listings:", error.message);
    res
      .status(error.response ? error.response.status : 500)
      .send("Error fetching business listings");
  }
});

// Payment Intent Route
app.post("/create-payment-intent", async (req, res) => {
  const { payment_method } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1500, // Amount in cents (15 CZK)
      currency: "czk",
      payment_method,
      confirmation_method: "manual",
      confirm: true,
      return_url: "http://localhost:5173/eye-test-deploy/payment-success", // Updated return URL
    });

    console.log("Payment Intent created:", paymentIntent);

    res.send({
      client_secret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    console.error(
      "Error details:",
      error.raw ? error.raw.message : error.message
    );
    res
      .status(500)
      .send({ error: error.raw ? error.raw.message : error.message });
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

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
