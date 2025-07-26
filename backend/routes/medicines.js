const express = require('express');
const router = express.Router();

// Mock medicine database (in production, this would be a real database)
const medicineDatabase = [
  {
    id: 1,
    brandName: "Crocin",
    genericName: "Paracetamol",
    brandPrice: 30,
    genericPrice: 10,
    dosage: "500mg",
    category: "Pain Relief",
    brandSideEffects: ["Nausea", "Stomach upset", "Skin rash"],
    genericSideEffects: ["Nausea", "Stomach upset", "Skin rash"],
    brandDescription: "Crocin is a trusted pain reliever and fever reducer",
    genericDescription: "Paracetamol is the generic equivalent with same effectiveness",
    manufacturer: "GSK",
    genericManufacturer: "Various",
    image: "https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    id: 2,
    brandName: "Disprin",
    genericName: "Aspirin",
    brandPrice: 25,
    genericPrice: 8,
    dosage: "325mg",
    category: "Pain Relief",
    brandSideEffects: ["Stomach irritation", "Heartburn", "Dizziness"],
    genericSideEffects: ["Stomach irritation", "Heartburn", "Dizziness"],
    brandDescription: "Disprin provides fast relief from headaches and body pain",
    genericDescription: "Aspirin is the cost-effective generic alternative",
    manufacturer: "Reckitt Benckiser",
    genericManufacturer: "Various",
    image: "https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    id: 3,
    brandName: "Brufen",
    genericName: "Ibuprofen",
    brandPrice: 45,
    genericPrice: 15,
    dosage: "400mg",
    category: "Anti-inflammatory",
    brandSideEffects: ["Stomach pain", "Nausea", "Dizziness"],
    genericSideEffects: ["Stomach pain", "Nausea", "Dizziness"],
    brandDescription: "Brufen is an effective anti-inflammatory pain reliever",
    genericDescription: "Ibuprofen provides the same relief at a lower cost",
    manufacturer: "Abbott",
    genericManufacturer: "Various",
    image: "https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    id: 4,
    brandName: "Augmentin",
    genericName: "Amoxicillin + Clavulanate",
    brandPrice: 120,
    genericPrice: 40,
    dosage: "625mg",
    category: "Antibiotic",
    brandSideEffects: ["Diarrhea", "Nausea", "Vomiting", "Allergic reactions"],
    genericSideEffects: ["Diarrhea", "Nausea", "Vomiting", "Allergic reactions"],
    brandDescription: "Augmentin is a powerful antibiotic for bacterial infections",
    genericDescription: "Generic combination offers same efficacy at lower cost",
    manufacturer: "GSK",
    genericManufacturer: "Various",
    image: "https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    id: 5,
    brandName: "Glucon-D",
    genericName: "Dextrose",
    brandPrice: 35,
    genericPrice: 12,
    dosage: "25g",
    category: "Energy Supplement",
    brandSideEffects: ["Hyperglycemia in diabetics"],
    genericSideEffects: ["Hyperglycemia in diabetics"],
    brandDescription: "Glucon-D provides instant energy and hydration",
    genericDescription: "Dextrose powder offers same energy boost economically",
    manufacturer: "Heinz",
    genericManufacturer: "Various",
    image: "https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=400"
  }
];

// GET /api/medicines/search - Search medicines
router.get('/search', (req, res) => {
  try {
    const { q: query } = req.query;
    
    if (!query) {
      return res.status(400).json({ 
        error: 'Query parameter is required',
        example: '/api/medicines/search?q=crocin'
      });
    }

    const searchTerm = query.toLowerCase().trim();
    const results = medicineDatabase.filter(medicine => 
      medicine.brandName.toLowerCase().includes(searchTerm) ||
      medicine.genericName.toLowerCase().includes(searchTerm) ||
      medicine.category.toLowerCase().includes(searchTerm)
    );

    res.json({
      query: query,
      results: results,
      count: results.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Search failed', 
      message: error.message 
    });
  }
});

// GET /api/medicines/suggestions - Get autocomplete suggestions
router.get('/suggestions', (req, res) => {
  try {
    const { q: query } = req.query;
    
    if (!query || query.length < 2) {
      return res.json({ suggestions: [] });
    }

    const searchTerm = query.toLowerCase().trim();
    const suggestions = medicineDatabase
      .filter(medicine => 
        medicine.brandName.toLowerCase().includes(searchTerm) ||
        medicine.genericName.toLowerCase().includes(searchTerm)
      )
      .map(medicine => medicine.brandName)
      .slice(0, 5);

    // Remove duplicates
    const uniqueSuggestions = [...new Set(suggestions)];

    res.json({
      query: query,
      suggestions: uniqueSuggestions,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to get suggestions', 
      message: error.message 
    });
  }
});

// GET /api/medicines/details/:brandName - Get medicine details by brand name
router.get('/details/:brandName', (req, res) => {
  try {
    const { brandName } = req.params;
    
    const medicine = medicineDatabase.find(med => 
      med.brandName.toLowerCase() === brandName.toLowerCase()
    );

    if (!medicine) {
      return res.status(404).json({ 
        error: 'Medicine not found',
        brandName: brandName
      });
    }

    res.json({
      medicine: medicine,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to get medicine details', 
      message: error.message 
    });
  }
});

// GET /api/medicines - Get all medicines
router.get('/', (req, res) => {
  try {
    res.json({
      medicines: medicineDatabase,
      count: medicineDatabase.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to get medicines', 
      message: error.message 
    });
  }
});

module.exports = router;