const express = require('express');
const router = express.Router();
const axios = require('axios');


const N8N_WEBHOOK_URL = 'https://n8n-dzxs.onrender.com/webhook/medicine';

let lastResult = null; // Temporary in-memory storage

// GET route for homepage
router.get('/', (req, res) => {
  res.render('index', { error: null, result: lastResult });
});

// POST route to call N8N
router.post('/medicine', async (req, res) => {
  const { chatInput } = req.body;
  if (!chatInput) {
    return res.status(400).json({ success: false, message: 'Medicine name is required' });
  }

  try {
    const response = await axios.post(N8N_WEBHOOK_URL, { chatInput });
    console.log('Response from n8n:', response.data);

    // Handle response
    let rawData = Array.isArray(response.data) ? response.data : [response.data];

    // Extract and clean JSON from `output`
    const parsedData = rawData.map(item => {
      if (item.output) {
        let cleaned = item.output
          .replace(/```json/g, '') // remove ```json
          .replace(/```/g, '')     // remove ```
          .trim();

        try {
          return JSON.parse(cleaned);
        } catch (err) {
          console.error('Failed to parse JSON:', err.message);
          return null;
        }
      }
      return null;
    }).filter(Boolean);

    res.json({ medicines: parsedData });

  } catch (error) {
    console.error('Error calling n8n:', error.message);
    res.status(500).json({ success: false, message: 'Failed to fetch medicine info' });
  }
});


module.exports = router;
