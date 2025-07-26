const express = require('express');
const fetch = require('node-fetch');
const axios = require('axios');

const router = express.Router();

// Your n8n webhook URL
const N8N_WEBHOOK_URL = 'https://n8n-dzxs.onrender.com/webhook/medicine';

router.post('/medicine', async (req, res) => {
  try {
    const { medicine } = req.body;

    // Send POST request to n8n webhook
    const response = await axios.post(N8N_WEBHOOK_URL, { medicine });

    // Log the response from AI Agent
    console.log('AI Agent Response:', response.data);

    // Return it to frontend (for now)
    res.json(response.data);
  } catch (error) {
    console.error('Error calling n8n webhook:', error.message);
    res.status(500).json({ error: 'Failed to fetch medicine info' });
  }
});

// Route: POST /api/search/medicine
router.post('/medicine', async (req, res) => {
  const { medicine } = req.body;

  if (!medicine) {
    return res.status(400).json({ error: 'Medicine name is required' });
  }

  try {
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ medicine })
    });

    if (!response.ok) {
      throw new Error(`n8n responded with status: ${response.status}`);
    }

    const n8nData = await response.json();

    // Normalize structure for frontend
    res.json({
      success: true,
      medicineInfo: n8nData.medicineInfo || n8nData
    });

  } catch (error) {
    console.error('Error fetching from n8n:', error);
    res.status(500).json({ error: 'Failed to get medicine info from AI agent' });
  }
});

module.exports = router;
