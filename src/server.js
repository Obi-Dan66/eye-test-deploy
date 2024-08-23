import express from "express";
import axios from "axios";
import cors from "cors";
import bodyParser from "body-parser";
import Stripe from "stripe";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT; // Use the PORT environment variable or default to 3000
const stripe = new Stripe(process.env.VITE_STRIPE_SECRET_KEY); // Replace with your Stripe secret key
const YOUR_DOMAIN = process.env.VITE_API_CALL_ORIGIN; // Update with your frontend domain
const GOOGLE_SCRIPT_URL = process.env.VITE_DATABASE_SHEET_URL;
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

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
