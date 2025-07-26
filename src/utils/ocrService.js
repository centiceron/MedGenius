import Tesseract from 'tesseract.js';

/**
 * OCR Service using Tesseract.js for text extraction from images
 * In a real implementation, you would use TensorFlow.js with a trained model
 * For now, we're using Tesseract.js as it's more reliable for text extraction
 */

class OCRService {
  constructor() {
    this.isProcessing = false;
  }

  /**
   * Extract text from image using OCR
   * @param {File|string} imageSource - Image file or image URL
   * @param {Function} progressCallback - Callback for progress updates
   * @returns {Promise<Object>} - OCR result with text and confidence
   */
  async extractText(imageSource, progressCallback = null) {
    try {
      this.isProcessing = true;
      
      const result = await Tesseract.recognize(imageSource, 'eng', {
        logger: (m) => {
          if (progressCallback && m.status === 'recognizing text') {
            progressCallback(Math.round(m.progress * 100));
          }
        }
      });

      this.isProcessing = false;
      
      return {
        text: result.data.text.trim(),
        confidence: result.data.confidence,
        words: result.data.words
      };
    } catch (error) {
      this.isProcessing = false;
      throw new Error(`OCR processing failed: ${error.message}`);
    }
  }

  /**
   * Extract medicine name from OCR text
   * This function tries to identify medicine names from the extracted text
   * @param {string} text - Raw OCR text
   * @returns {string} - Extracted medicine name
   */
  extractMedicineName(text) {
    // Clean the text
    const cleanText = text.replace(/[^\w\s]/g, ' ').trim();
    
    // Split into words and filter
    const words = cleanText.split(/\s+/).filter(word => word.length > 2);
    
    // Common medicine name patterns (you can expand this)
    const medicinePatterns = [
      /crocin/i,
      /paracetamol/i,
      /disprin/i,
      /aspirin/i,
      /brufen/i,
      /ibuprofen/i,
      /augmentin/i,
      /amoxicillin/i,
      /glucon/i,
      /dextrose/i
    ];
    
    // Try to find medicine names
    for (const word of words) {
      for (const pattern of medicinePatterns) {
        if (pattern.test(word)) {
          return word;
        }
      }
    }
    
    // If no specific medicine found, return the first meaningful word
    return words[0] || text.split(' ')[0] || 'Unknown';
  }

  /**
   * Process image and extract medicine information
   * @param {File} imageFile - Image file to process
   * @param {Function} progressCallback - Progress callback
   * @returns {Promise<Object>} - Processed result with medicine name
   */
  async processMedicineImage(imageFile, progressCallback = null) {
    try {
      // Validate image file
      if (!imageFile || !imageFile.type.startsWith('image/')) {
        throw new Error('Please provide a valid image file');
      }

      // Extract text using OCR
      const ocrResult = await this.extractText(imageFile, progressCallback);
      
      if (!ocrResult.text) {
        throw new Error('No text detected in the image');
      }

      // Extract medicine name from the text
      const medicineName = this.extractMedicineName(ocrResult.text);
      
      return {
        detectedText: ocrResult.text,
        medicineName: medicineName,
        confidence: ocrResult.confidence,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      throw new Error(`Failed to process medicine image: ${error.message}`);
    }
  }

  /**
   * Check if OCR is currently processing
   * @returns {boolean} - Processing status
   */
  isCurrentlyProcessing() {
    return this.isProcessing;
  }
}

// Export singleton instance
export default new OCRService();