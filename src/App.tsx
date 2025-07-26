// import React, { useState, useEffect } from 'react';
// import AuthService from './utils/auth';
// import NotificationService from './utils/notifications';
// import LoginForm from './components/Auth/LoginForm';
// import SignupForm from './components/Auth/SignupForm';
// import Sidebar from './components/Layout/Sidebar';
// import Dashboard from './components/Dashboard/Dashboard';
// import MedicineScanner from './components/Scanner/MedicineScanner';
// import MedicineSearch from './components/Search/MedicineSearch';
// import RemindersPage from './components/Reminders/RemindersPage';
// import HistoryPage from './components/History/HistoryPage';
// import ProfilePage from './components/Profile/ProfilePage';

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [showSignup, setShowSignup] = useState(false);
//   const [currentPage, setCurrentPage] = useState('dashboard');

//   useEffect(() => {
//     const authService = AuthService.getInstance();
//     setIsAuthenticated(authService.isAuthenticated());
    
//     // Request notification permission on app start
//     if (authService.isAuthenticated()) {
//       NotificationService.getInstance().requestPermission();
//     }
//   }, []);

//   const handleLogin = () => {
//     setIsAuthenticated(true);
//     setCurrentPage('dashboard');
//   };

//   const handleLogout = () => {
//     AuthService.getInstance().logout();
//     setIsAuthenticated(false);
//     setCurrentPage('dashboard');
//   };

//   const handleNavigation = (page: string) => {
//     setCurrentPage(page);
//   };

//   // Authentication screens
//   if (!isAuthenticated) {
//     return showSignup ? (
//       <SignupForm 
//         onSignup={handleLogin}
//         onSwitchToLogin={() => setShowSignup(false)}
//       />
//     ) : (
//       <LoginForm 
//         onLogin={handleLogin}
//         onSwitchToSignup={() => setShowSignup(true)}
//       />
//     );
//   }

//   // Main application
//   return (
//     <div className="h-screen bg-gray-50 flex">
//       {/* Sidebar */}
//       <div className="w-64 flex-shrink-0">
//         <Sidebar 
//           currentPage={currentPage}
//           onNavigate={handleNavigation}
//           onLogout={handleLogout}
//         />
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 overflow-auto">
//         {currentPage === 'dashboard' && <Dashboard onNavigate={handleNavigation} />}
//         {currentPage === 'scan' && <MedicineScanner />}
//         {currentPage === 'search' && <MedicineSearch />}
//         {currentPage === 'reminders' && <RemindersPage />}
//         {currentPage === 'history' && <HistoryPage />}
//         {currentPage === 'profile' && <ProfilePage />}
//       </div>
//     </div>
//   );
// }

// export default App;