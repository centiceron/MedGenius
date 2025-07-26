// Static medicine database for demo purposes
export const medicineDatabase = [
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

// Function to search medicines by name
export const searchMedicine = (query) => {
  const searchTerm = query.toLowerCase().trim();
  return medicineDatabase.filter(medicine => 
    medicine.brandName.toLowerCase().includes(searchTerm) ||
    medicine.genericName.toLowerCase().includes(searchTerm)
  );
};

// Function to get medicine suggestions for autocomplete
export const getMedicineSuggestions = (query) => {
  const searchTerm = query.toLowerCase().trim();
  if (searchTerm.length < 2) return [];
  
  const suggestions = medicineDatabase
    .filter(medicine => 
      medicine.brandName.toLowerCase().includes(searchTerm) ||
      medicine.genericName.toLowerCase().includes(searchTerm)
    )
    .map(medicine => medicine.brandName)
    .slice(0, 5);
    
  return [...new Set(suggestions)]; // Remove duplicates
};

// Function to get medicine by exact brand name
export const getMedicineByBrandName = (brandName) => {
  return medicineDatabase.find(medicine => 
    medicine.brandName.toLowerCase() === brandName.toLowerCase()
  );
};