import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.post("/proxy", async (req, res) => {
  console.log("Received POST request at /proxy");
  console.log("Request body:", req.body);

  try {
    const response = await axios.post(
      "https://script.google.com/macros/s/AKfycbywJmAR9vPMwKsutiq45j_chrxrQhA7knOPDjdiaKJarmyqLVUejLWNPMISPd9uHcXg/exec",
      req.body,
      {
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
      }
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
