import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
const PORT = 3000;

// Enable CORS for all routes
app.use(cors());

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

app.listen(PORT, () => {
  console.log(`Proxy server listening at http://localhost:${PORT}`);
});
