import React, { useState } from 'react';
import Sidebar from './components/Layout/Sidebar';
import Dashboard from './components/Pages/Dashboard';
import ScanPage from './components/Pages/ScanPage';
import SearchPage from './components/Pages/SearchPage';
import RemindersPage from './components/Pages/RemindersPage';
import ProfilePage from './components/Pages/ProfilePage';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onPageChange={handlePageChange} />;
      case 'scan':
        return <ScanPage />;
      case 'search':
        return <SearchPage />;
      case 'reminders':
        return <RemindersPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <Dashboard onPageChange={handlePageChange} />;
    }
  };

  return (
    <div className="h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0">
        <Sidebar 
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {renderCurrentPage()}
      </div>
    </div>
  );
}

const getMedicineInfo = async (medicineName) => {
  const res = await fetch('http://localhost:5000/get-medicine-info', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ medicine: medicineName })
  });
  const data = await res.json();
  console.log(data);
};


export default App;