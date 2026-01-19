import express from "express";
import axios from "axios";

const router = express.Router();

const N8N_WEBHOOK_URL = "https://n8n-dzxs.onrender.com/webhook/medicine";

let lastResult = null;

// GET route for homepage
router.get("/", (req, res) => {
  res.render("index", { error: null, result: lastResult });
});

// POST route to call N8N
router.post("/medicine", async (req, res) => {
  const { chatInput } = req.body;
  if (!chatInput) {
    return res
      .status(400)
      .json({ success: false, message: "Medicine name is required" });
  }

  try {
    const response = await axios.post(N8N_WEBHOOK_URL, { chatInput });
    console.log("Response from n8n:", response.data);

    let rawData = response.data;
    let medicines = [];

    // Case 1: n8n already returns structured array of { summary, metadata }
    if (Array.isArray(rawData) && rawData.every((item) => item.summary)) {
      medicines = rawData;
    }
    // Case 2: n8n sends { output: "stringified JSON" }
    else if (rawData.output) {
      try {
        const parsed = JSON.parse(rawData.output);
        medicines = Array.isArray(parsed) ? parsed : [parsed];
      } catch (err) {
        console.error("❌ Failed to parse JSON from n8n:", err.message);
        return res
          .status(500)
          .json({ success: false, message: "Invalid JSON format from n8n" });
      }
    }
    // Unexpected format
    else {
      return res.status(500).json({
        success: false,
        message: "Unexpected response format from n8n",
      });
    }

    // Store latest result for homepage
    lastResult = medicines;

    // Always return consistent response
    return res.json({ success: true, medicines });
  } catch (error) {
    console.error("Error calling n8n:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch medicine info" });
  }
});

export default router;
