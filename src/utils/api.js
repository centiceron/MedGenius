import axios from 'axios';

// API base URL - adjust based on your backend server
const API_BASE_URL = 'http://localhost:3001/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API service functions
export const apiService = {
  // Search medicines
  searchMedicines: async (query) => {
    try {
      const response = await api.get(`/medicines/search?q=${encodeURIComponent(query)}`);
      return response.data;
    } catch (error) {
      console.error('Search API error:', error);
      throw new Error('Failed to search medicines');
    }
  },

  // Get medicine suggestions for autocomplete
  getMedicineSuggestions: async (query) => {
    try {
      const response = await api.get(`/medicines/suggestions?q=${encodeURIComponent(query)}`);
      return response.data;
    } catch (error) {
      console.error('Suggestions API error:', error);
      return [];
    }
  },

  // Get medicine details by brand name
  getMedicineDetails: async (brandName) => {
    try {
      const response = await api.get(`/medicines/details/${encodeURIComponent(brandName)}`);
      return response.data;
    } catch (error) {
      console.error('Medicine details API error:', error);
      throw new Error('Failed to get medicine details');
    }
  },

  // Save scan result
  saveScanResult: async (scanData) => {
    try {
      const response = await api.post('/scans', scanData);
      return response.data;
    } catch (error) {
      console.error('Save scan API error:', error);
      throw new Error('Failed to save scan result');
    }
  },

  // Get recent scans
  getRecentScans: async () => {
    try {
      const response = await api.get('/scans/recent');
      return response.data;
    } catch (error) {
      console.error('Recent scans API error:', error);
      return [];
    }
  },

  // Get search history
  getSearchHistory: async () => {
    try {
      const response = await api.get('/search/history');
      return response.data;
    } catch (error) {
      console.error('Search history API error:', error);
      return [];
    }
  },

  // Save search to history
  saveSearchHistory: async (searchData) => {
    try {
      const response = await api.post('/search/history', searchData);
      return response.data;
    } catch (error) {
      console.error('Save search history API error:', error);
      // Don't throw error for history saving
      return null;
    }
  }
};

export default api;