import React from 'react';
import { 
  Home, 
  Camera, 
  Search, 
  Bell, 
  User, 
  Brain,
  Sparkles,
  Pill
} from 'lucide-react';

const Sidebar = ({ currentPage, onPageChange }) => {
  const menuItems = [
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      icon: Home, 
      gradient: 'from-blue-500 to-blue-600',
      bgGradient: 'from-blue-50 to-blue-100'
    },
    { 
      id: 'scan', 
      label: 'AI Scanner', 
      icon: Camera, 
      gradient: 'from-emerald-500 to-teal-600',
      bgGradient: 'from-emerald-50 to-teal-100'
    },
    { 
      id: 'search', 
      label: 'Smart Search', 
      icon: Search, 
      gradient: 'from-purple-500 to-indigo-600',
      bgGradient: 'from-purple-50 to-indigo-100'
    },
    { 
      id: 'reminders', 
      label: 'Reminders', 
      icon: Bell, 
      gradient: 'from-orange-500 to-amber-600',
      bgGradient: 'from-orange-50 to-amber-100'
    },
    { 
      id: 'profile', 
      label: 'Profile', 
      icon: User, 
      gradient: 'from-gray-500 to-slate-600',
      bgGradient: 'from-gray-50 to-slate-100'
    },
  ];

  return (
    <div className="bg-white h-full shadow-xl border-r border-gray-100 flex flex-col relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100/30 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-indigo-100/30 to-transparent rounded-full translate-y-12 -translate-x-12"></div>
      
      <div className="relative z-10 flex flex-col h-full">
        {/* Logo */}
        <div className="p-6 border-b border-gray-100/50">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-3 rounded-xl shadow-lg">
                <Brain className="h-7 w-7 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center">
                <Sparkles className="h-2 w-2 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                MedGenius
              </h1>
              <p className="text-sm text-gray-500 font-medium">Smart Healthcare</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={`group w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 hover-lift ${
                  isActive 
                    ? 'bg-white shadow-lg shadow-blue-100/50 border border-blue-100' 
                    : 'hover:bg-white/60 hover:shadow-md'
                }`}
              >
                <div className={`p-2 rounded-lg transition-all duration-300 ${
                  isActive 
                    ? `bg-gradient-to-br ${item.gradient} shadow-lg` 
                    : 'bg-gray-100 group-hover:bg-gray-200'
                }`}>
                  <Icon className={`h-5 w-5 transition-colors duration-300 ${
                    isActive ? 'text-white' : 'text-gray-600 group-hover:text-gray-700'
                  }`} />
                </div>
                <span className={`font-medium transition-colors duration-300 ${
                  isActive ? 'text-gray-900' : 'text-gray-700 group-hover:text-gray-900'
                }`}>
                  {item.label}
                </span>
                {isActive && (
                  <div className="ml-auto w-2 h-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full"></div>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100/50">
          <div className="bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 rounded-xl p-4 text-white text-center">
            <div className="flex justify-center mb-2">
              <Pill className="h-6 w-6" />
            </div>
            <p className="text-sm font-semibold mb-1">AI-Powered</p>
            <p className="text-xs text-blue-100">Medicine Scanner</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;