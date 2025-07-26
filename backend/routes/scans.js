const express = require('express');
const router = express.Router();

// In-memory storage for demo (in production, use a real database)
let scanResults = [];
let scanIdCounter = 1;

// POST /api/scans - Save scan result
router.post('/', (req, res) => {
  try {
    const { detectedText, medicineName, confidence, medicines } = req.body;
    
    if (!detectedText || !medicineName) {
      return res.status(400).json({ 
        error: 'detectedText and medicineName are required' 
      });
    }

    const scanResult = {
      id: scanIdCounter++,
      detectedText,
      medicineName,
      confidence: confidence || 0,
      medicines: medicines || [],
      timestamp: new Date().toISOString(),
      userId: 'demo-user' // In production, get from authentication
    };

    scanResults.unshift(scanResult); // Add to beginning
    
    // Keep only last 50 scans
    if (scanResults.length > 50) {
      scanResults = scanResults.slice(0, 50);
    }

    res.status(201).json({
      message: 'Scan result saved successfully',
      scanResult: scanResult
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to save scan result', 
      message: error.message 
    });
  }
});

// GET /api/scans/recent - Get recent scan results
router.get('/recent', (req, res) => {
  try {
    const { limit = 10 } = req.query;
    const recentScans = scanResults.slice(0, parseInt(limit));
    
    res.json({
      scans: recentScans,
      count: recentScans.length,
      total: scanResults.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to get recent scans', 
      message: error.message 
    });
  }
});

// GET /api/scans/:id - Get specific scan result
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const scan = scanResults.find(s => s.id === parseInt(id));
    
    if (!scan) {
      return res.status(404).json({ 
        error: 'Scan not found',
        id: id
      });
    }

    res.json({
      scan: scan,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to get scan', 
      message: error.message 
    });
  }
});

// DELETE /api/scans/:id - Delete scan result
router.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const index = scanResults.findIndex(s => s.id === parseInt(id));
    
    if (index === -1) {
      return res.status(404).json({ 
        error: 'Scan not found',
        id: id
      });
    }

    const deletedScan = scanResults.splice(index, 1)[0];
    
    res.json({
      message: 'Scan deleted successfully',
      deletedScan: deletedScan
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to delete scan', 
      message: error.message 
    });
  }
});

// GET /api/scans - Get all scans with pagination
router.get('/', (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const startIndex = (parseInt(page) - 1) * parseInt(limit);
    const endIndex = startIndex + parseInt(limit);
    
    const paginatedScans = scanResults.slice(startIndex, endIndex);
    
    res.json({
      scans: paginatedScans,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(scanResults.length / parseInt(limit)),
        totalScans: scanResults.length,
        hasNext: endIndex < scanResults.length,
        hasPrev: startIndex > 0
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to get scans', 
      message: error.message 
    });
  }
});

module.exports = router;