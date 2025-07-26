import React, { useState } from "react";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) {
      setError("Please enter a medicine name.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("http://localhost:3001/api/n8n/medicine", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ chatInput: query }),
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      const data = await response.json();
      console.log("Response from backend:", data);

      if (data && data.medicines && Array.isArray(data.medicines)) {
        setResult(data.medicines);
      } else {
        setError("No data found for this medicine.");
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to fetch data from server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-purple-600 text-center">
          Medicine Info Search
        </h1>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="flex mb-6 space-x-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter medicine name"
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
          <button
            type="submit"
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
          >
            Search
          </button>
        </form>

        {/* Loading */}
        {loading && <p className="text-gray-600 text-center">Searching...</p>}

        {/* Error */}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* Results */}
        {result && result.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-700 text-center">
              Generic Medicine
            </h2>

            <div className="grid grid-cols-1x gap-6">
              {result.map((med, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-4 rounded-lg shadow border"
                >
                  {/* <h3 className="text-lg font-bold text-purple-600 mb-2">
                    {index === 0 ? "Brand Medicine" : "Generic Medicine"}
                  </h3> */}
                  <p className="mb-2">
                    <span className="font-semibold">Name:</span>{" "}
                    {med.medicine_name}
                  </p>

                  {med.usage && med.usage.length > 0 && (
                    <div className="mb-2">
                      <span className="font-semibold">Usage:</span>
                      <ul className="list-disc list-inside text-gray-700">
                        {med.usage.map((use, i) => (
                          <li key={i}>{use}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {med.warnings && (
                    <p className="mb-2">
                      <span className="font-semibold">Warnings:</span>{" "}
                      {med.warnings}
                    </p>
                  )}

                  {med.price_in_india && (
                    <p className="mb-2">
                      <span className="font-semibold">Price in India:</span>{" "}
                      {med.price_in_india}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
