import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxVCy8D0cibmK6UfcDwnoznFGwZv0xUQ3eyLRgf3__GBCCkBzX2eNEPt6yw1osPSLvP/exec";

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

app.listen(port, () => {
  console.log(`Proxy server running at http://localhost:${port}`);
});
