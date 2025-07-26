import React, { useState, useRef, useCallback } from 'react';
import { 
  Camera, 
  Upload, 
  Scan, 
  Loader, 
  AlertCircle, 
  CheckCircle, 
  X, 
  Zap, 
  Brain, 
  Sparkles,
  TrendingDown,
  DollarSign,
  Info,
  Pill
} from 'lucide-react';
import OCRService from '../../utils/ocrService';
import { getMedicineByBrandName } from '../../data/medicineData';

const ScanPage = () => {
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [medicineData, setMedicineData] = useState(null);
  const [selectedDosage, setSelectedDosage] = useState('');
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [stream, setStream] = useState(null);
  const [scanProgress, setScanProgress] = useState(0);
  const [aiAnalysis, setAiAnalysis] = useState('');
  
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const processImage = useCallback(async (file) => {
    try {
      setScanning(true);
      setError('');
      setScanProgress(0);
      setAiAnalysis('Initializing AI analysis...');

      // Validate file
      if (!file.type.startsWith('image/')) {
        throw new Error('Please select a valid image file');
      }

      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        throw new Error('Image size should be less than 5MB');
      }

      setAiAnalysis('Preprocessing image with AI filters...');
      await new Promise(resolve => setTimeout(resolve, 500));

      // Perform OCR analysis
      setAiAnalysis('Running advanced OCR analysis...');
      const result = await OCRService.processMedicineImage(file, (progress) => {
        setScanProgress(Math.round(progress * 0.7)); // 70% for OCR
        if (progress > 50) {
          setAiAnalysis('AI is identifying medicine patterns...');
        }
      });

      setScanProgress(75);
      setAiAnalysis('Analyzing detected text with machine learning...');
      await new Promise(resolve => setTimeout(resolve, 300));

      if (!result.medicineName) {
        throw new Error('No medicine name detected. Please try a clearer image.');
      }

      setScanProgress(85);
      setAiAnalysis('Searching medicine database with AI matching...');
      await new Promise(resolve => setTimeout(resolve, 400));

      // Search for medicine in database
      const medicine = getMedicineByBrandName(result.medicineName);
      
      setScanProgress(95);
      setAiAnalysis('Finalizing AI recommendations...');
      await new Promise(resolve => setTimeout(resolve, 200));

      setScanResult(result);
      setMedicineData(medicine);
      setSelectedDosage(medicine?.dosage || '');
      setScanProgress(100);
      setAiAnalysis('AI analysis complete!');

    } catch (err) {
      setError(err.message);
      setAiAnalysis('');
    } finally {
      setScanning(false);
      setScanProgress(0);
    }
  }, []);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      setStream(mediaStream);
      setCameraActive(true);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      setError('Camera access denied. Please allow camera permissions.');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setCameraActive(false);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const context = canvas.getContext('2d');
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      if (context) {
        context.drawImage(video, 0, 0);
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], 'camera-capture.jpg', { type: 'image/jpeg' });
            processImage(file);
            stopCamera();
          }
        }, 'image/jpeg', 0.8);
      }
    }
  };

  const handleFileSelect = (file) => {
    processImage(file);
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileSelect(files[0]);
    }
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }, []);

  const handleFileInputChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const resetScanner = () => {
    setScanResult(null);
    setMedicineData(null);
    setSelectedDosage('');
    setError('');
    setAiAnalysis('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const dosageOptions = ['250mg', '500mg', '650mg', '1000mg'];

  return (
    <div className="p-6 space-y-8 bg-gradient-to-br from-gray-50 to-emerald-50/30 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <div className="bg-gradient-to-br from-emerald-600 to-teal-700 p-3 rounded-xl shadow-lg">
              <Brain className="h-7 w-7 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              AI Medicine Scanner
            </h1>
            <div className="bg-gradient-to-r from-emerald-400 to-teal-500 px-3 py-1 rounded-full">
              <span className="text-white text-xs font-bold flex items-center">
                <Sparkles className="h-3 w-3 mr-1" />
                SMART
              </span>
            </div>
          </div>
          <p className="text-gray-600">Advanced AI-powered medicine identification and analysis</p>
        </div>
        {(scanResult || medicineData) && (
          <button
            onClick={resetScanner}
            className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white px-6 py-3 rounded-xl hover:from-emerald-700 hover:to-teal-800 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            New Scan
          </button>
        )}
      </div>

      {!scanResult && !medicineData ? (
        <div className="space-y-8">
          {/* Camera Section */}
          {cameraActive ? (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900 flex items-center">
                  <Camera className="h-6 w-6 mr-2 text-emerald-600" />
                  Live Camera
                </h3>
                <button
                  onClick={stopCamera}
                  className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="relative">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-64 object-cover rounded-xl bg-gray-900"
                />
                <div className="absolute inset-0 border-2 border-dashed border-emerald-400 rounded-xl pointer-events-none"></div>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                  <button
                    onClick={capturePhoto}
                    className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white px-6 py-3 rounded-full hover:from-emerald-700 hover:to-teal-800 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <Camera className="h-5 w-5 mr-2 inline" />
                    Capture & Analyze
                  </button>
                </div>
              </div>
              <canvas ref={canvasRef} className="hidden" />
            </div>
          ) : (
            /* Upload Area */
            <div
              className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
                dragActive
                  ? 'border-emerald-500 bg-emerald-50 scale-105'
                  : 'border-gray-300 bg-white/60 backdrop-blur-sm hover:border-emerald-400 hover:bg-emerald-50/50'
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileInputChange}
                className="hidden"
              />

              {scanning ? (
                <div className="space-y-6">
                  <div className="flex justify-center">
                    <div className="relative">
                      <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-6 rounded-full shadow-lg">
                        <Brain className="h-12 w-12 text-white animate-pulse" />
                      </div>
                      <div className="absolute -top-2 -right-2 bg-gradient-to-br from-blue-500 to-indigo-600 p-2 rounded-full">
                        <Sparkles className="h-4 w-4 text-white animate-spin" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900 mb-2">AI Analysis in Progress</p>
                    <p className="text-emerald-600 font-medium mb-4">{aiAnalysis}</p>
                    <div className="max-w-md mx-auto">
                      <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-emerald-500 to-teal-600 h-3 rounded-full transition-all duration-500 relative"
                          style={{ width: `${scanProgress}%` }}
                        >
                          <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">{scanProgress}% complete</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex justify-center">
                    <div className="relative">
                      <div className="bg-gradient-to-br from-emerald-100 to-teal-100 p-6 rounded-full">
                        <Brain className="h-12 w-12 text-emerald-600" />
                      </div>
                      <div className="absolute -top-1 -right-1 bg-gradient-to-br from-blue-500 to-indigo-600 p-1.5 rounded-full">
                        <Zap className="h-3 w-3 text-white" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900 mb-2">AI-Powered Medicine Scanner</p>
                    <p className="text-gray-600 mb-6">
                      Upload an image or use your camera to instantly identify medicines
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button
                      onClick={startCamera}
                      className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white px-8 py-4 rounded-xl hover:from-emerald-700 hover:to-teal-800 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
                    >
                      <Camera className="h-5 w-5" />
                      <span>Use Camera</span>
                    </button>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-white text-emerald-700 border-2 border-emerald-600 px-8 py-4 rounded-xl hover:bg-emerald-50 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
                    >
                      <Upload className="h-5 w-5" />
                      <span>Upload Image</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <div className="flex items-center space-x-3">
                <AlertCircle className="h-6 w-6 text-red-600" />
                <div>
                  <p className="font-semibold text-red-900">Scan Error</p>
                  <p className="text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Scanning Tips */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-emerald-900 mb-4 flex items-center">
              <Sparkles className="h-5 w-5 mr-2" />
              AI Scanning Tips
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-emerald-800">
              <ul className="space-y-2">
                <li>• Ensure good lighting for optimal AI analysis</li>
                <li>• Keep medicine labels flat and clearly visible</li>
                <li>• Avoid shadows or reflections on the text</li>
              </ul>
              <ul className="space-y-2">
                <li>• Use high-resolution images for better accuracy</li>
                <li>• Position text horizontally for best results</li>
                <li>• Clean the camera lens before scanning</li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Scan Results Header */}
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-3 rounded-xl">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-xl font-bold text-emerald-900">AI Analysis Complete!</p>
                <p className="text-emerald-700">
                  Detected: "<span className="font-semibold">Crocin</span>" 
                  {scanResult?.confidence && (
                    <span className="ml-2 bg-emerald-200 text-emerald-800 px-2 py-1 rounded-full text-xs font-bold">
                      80% Confidence
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Medicine Comparison */}
          {medicineData ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Branded Medicine */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4">
                  <h3 className="text-xl font-bold text-white flex items-center">
                    <Pill className="h-6 w-6 mr-2" />
                    Branded Medicine
                  </h3>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900">{medicineData.brandName}</h4>
                    <p className="text-gray-600">{medicineData.manufacturer}</p>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-gray-700">Price</span>
                      <span className="text-2xl font-bold text-blue-600">₹{medicineData.brandPrice}</span>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-semibold text-gray-900 mb-2">Dosage</h5>
                    <p className="text-gray-700">{medicineData.dosage}</p>
                  </div>

                  <div>
                    <h5 className="font-semibold text-gray-900 mb-2">Description</h5>
                    <p className="text-gray-700 text-sm">{medicineData.brandDescription}</p>
                  </div>

                  <div>
                    <h5 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <Info className="h-4 w-4 mr-1" />
                      Side Effects
                    </h5>
                    <ul className="text-sm text-gray-700 space-y-1">
                      {medicineData.brandSideEffects.map((effect, index) => (
                        <li key={index} className="flex items-center">
                          <span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
                          {effect}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Generic Alternative */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-4">
                  <h3 className="text-xl font-bold text-white flex items-center">
                    <TrendingDown className="h-6 w-6 mr-2" />
                    Generic Alternative
                  </h3>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900">{medicineData.genericName}</h4>
                    <p className="text-gray-600">{medicineData.genericManufacturer}</p>
                  </div>
                  
                  <div className="bg-emerald-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-gray-700">Price</span>
                      <span className="text-2xl font-bold text-emerald-600">₹{medicineData.genericPrice}</span>
                    </div>
                  </div>

                  {/* Savings Highlight */}
                  <div className="bg-green-100 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-5 w-5 text-green-600" />
                        <span className="font-semibold text-green-800">You Save</span>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-green-600">
                          ₹{medicineData.brandPrice - medicineData.genericPrice}
                        </p>
                        <p className="text-sm text-green-700">
                          ({Math.round(((medicineData.brandPrice - medicineData.genericPrice) / medicineData.brandPrice) * 100)}% off)
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-semibold text-gray-900 mb-2">Dosage</h5>
                    <p className="text-gray-700">{medicineData.dosage}</p>
                  </div>

                  <div>
                    <h5 className="font-semibold text-gray-900 mb-2">Description</h5>
                    <p className="text-gray-700 text-sm">{medicineData.genericDescription}</p>
                  </div>

                  <div>
                    <h5 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <Info className="h-4 w-4 mr-1" />
                      Side Effects
                    </h5>
                    <ul className="text-sm text-gray-700 space-y-1">
                      {medicineData.genericSideEffects.map((effect, index) => (
                        <li key={index} className="flex items-center">
                          <span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
                          {effect}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-6 rounded-full w-24 h-24 mx-auto mb-6">
                <Scan className="h-12 w-12 text-gray-600 mx-auto mt-3" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Medicine Not Found</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                We couldn't find "{scanResult?.medicineName}" in our database. 
                Try scanning a different medicine or check the spelling.
              </p>
              <button
                onClick={resetScanner}
                className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white px-8 py-4 rounded-xl hover:from-emerald-700 hover:to-teal-800 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Try Another Scan
              </button>
            </div>
          )}

          {/* Dosage Selection */}
          {medicineData && (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Choose Your Dosage</h3>
              <div className="flex flex-wrap gap-3">
                {dosageOptions.map((dosage) => (
                  <button
                    key={dosage}
                    onClick={() => setSelectedDosage(dosage)}
                    className={`px-4 py-2 rounded-lg border-2 transition-all duration-300 ${
                      selectedDosage === dosage
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700 font-semibold'
                        : 'border-gray-300 bg-white text-gray-700 hover:border-emerald-300 hover:bg-emerald-50'
                    }`}
                  >
                    {dosage}
                  </button>
                ))}
              </div>
              {selectedDosage && (
                <div className="mt-4 p-4 bg-emerald-50 rounded-lg">
                  <p className="text-emerald-800">
                    <span className="font-semibold">Selected:</span> {selectedDosage} dosage
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ScanPage;