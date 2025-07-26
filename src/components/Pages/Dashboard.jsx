import React, { useState, useEffect } from 'react';
import { 
  Camera, 
  Search, 
  Bell, 
  History, 
  TrendingUp, 
  Clock,
  Brain,
  Sparkles,
  AlertCircle,
  CheckCircle,
  Zap,
  Shield,
  Award,
  ArrowRight
} from 'lucide-react';

const Dashboard = ({ onPageChange }) => {
  const [stats, setStats] = useState({
    totalScans: 0,
    totalSearches: 0,
    savedMoney: 0,
    medicinesFound: 0
  });

  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    // Load stats from localStorage or API
    loadDashboardData();
  }, []);

  const loadDashboardData = () => {
    // Mock data for demonstration
    setStats({
      totalScans: 12,
      totalSearches: 28,
      savedMoney: 450,
      medicinesFound: 35
    });

    setRecentActivity([
      {
        id: 1,
        type: 'scan',
        medicine: 'Crocin',
        savings: 20,
        timestamp: '2 hours ago'
      },
      {
        id: 2,
        type: 'search',
        medicine: 'Brufen',
        savings: 30,
        timestamp: '5 hours ago'
      },
      {
        id: 3,
        type: 'scan',
        medicine: 'Disprin',
        savings: 17,
        timestamp: '1 day ago'
      }
    ]);
  };

  const quickActions = [
    {
      title: 'AI Scanner',
      description: 'Scan medicine with camera',
      icon: Camera,
      gradient: 'from-emerald-500 to-teal-600',
      onClick: () => onPageChange('scan')
    },
    {
      title: 'Smart Search',
      description: 'Find medicines & alternatives',
      icon: Search,
      gradient: 'from-purple-500 to-indigo-600',
      onClick: () => onPageChange('search')
    },
    {
      title: 'Reminders',
      description: 'Set medication alerts',
      icon: Bell,
      gradient: 'from-orange-500 to-amber-600',
      onClick: () => onPageChange('reminders')
    }
  ];

  const statCards = [
    {
      title: 'AI Scans',
      value: stats.totalScans,
      icon: Camera,
      gradient: 'from-emerald-500 to-teal-600',
      bgGradient: 'from-emerald-50 to-teal-50'
    },
    {
      title: 'Smart Searches',
      value: stats.totalSearches,
      icon: Search,
      gradient: 'from-purple-500 to-indigo-600',
      bgGradient: 'from-purple-50 to-indigo-50'
    },
    {
      title: 'Money Saved',
      value: `₹${stats.savedMoney}`,
      icon: TrendingUp,
      gradient: 'from-green-500 to-emerald-600',
      bgGradient: 'from-green-50 to-emerald-50'
    },
    {
      title: 'Medicines Found',
      value: stats.medicinesFound,
      icon: Award,
      gradient: 'from-blue-500 to-indigo-600',
      bgGradient: 'from-blue-50 to-indigo-50'
    }
  ];

  const aiFeatures = [
    { icon: Brain, title: 'Advanced OCR', desc: '99.5% accuracy in text recognition' },
    { icon: Zap, title: 'Real-time Analysis', desc: 'Instant medicine identification' },
    { icon: Shield, title: 'Privacy Protected', desc: 'Your data stays secure' },
    { icon: Award, title: 'Trusted by 10K+', desc: 'Healthcare professionals' }
  ];

  return (
    <div className="p-6 space-y-8 bg-gradient-to-br from-gray-50 to-blue-50/30 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-2 rounded-lg">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              AI Dashboard
            </h1>
            <div className="bg-gradient-to-r from-emerald-400 to-teal-500 px-3 py-1 rounded-full">
              <span className="text-white text-xs font-bold">SMART</span>
            </div>
          </div>
          <p className="text-gray-600">Welcome back! Your AI-powered health assistant is ready.</p>
        </div>
        <div className="flex items-center space-x-3 bg-white/60 backdrop-blur-sm rounded-xl px-4 py-2 border border-gray-200/50">
          <Clock className="h-5 w-5 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className={`bg-gradient-to-br ${stat.bgGradient} p-6 rounded-2xl border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 group hover-lift`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div>
        <div className="flex items-center space-x-3 mb-6">
          <Sparkles className="h-6 w-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">Quick Actions</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={index}
                onClick={action.onClick}
                className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-200/50 hover:shadow-xl transition-all duration-300 text-left group hover:-translate-y-1"
              >
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${action.gradient} text-white mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{action.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{action.description}</p>
                <div className="flex items-center text-blue-600 font-medium">
                  <span className="text-sm">Get Started</span>
                  <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* AI Features Showcase */}
      <div className="bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20"></div>
        
        <div className="relative z-10">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">Powered by Advanced AI</h3>
              <p className="text-blue-100">Experience the future of healthcare technology</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {aiFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <Icon className="h-8 w-8 text-white mb-3" />
                  <h4 className="font-bold text-lg mb-2">{feature.title}</h4>
                  <p className="text-blue-100 text-sm">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Scans */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-lg">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 flex items-center">
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-2 rounded-lg mr-3">
                <Camera className="h-5 w-5 text-white" />
              </div>
              Recent AI Scans
            </h3>
          </div>
          <div className="p-6">
            {recentActivity.filter(item => item.type === 'scan').length > 0 ? (
              <div className="space-y-4">
                {recentActivity.filter(item => item.type === 'scan').map((scan) => (
                  <div key={scan.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-100">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{scan.medicine}</p>
                      <p className="text-sm text-gray-500">{scan.timestamp}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-emerald-500" />
                      <span className="text-sm font-medium text-emerald-700">₹{scan.savings} saved</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="bg-gradient-to-br from-emerald-100 to-teal-100 p-4 rounded-full w-16 h-16 mx-auto mb-4">
                  <Camera className="h-8 w-8 text-emerald-600 mx-auto mt-2" />
                </div>
                <p className="text-gray-500 mb-3">No scans yet</p>
                <button
                  onClick={() => onPageChange('scan')}
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-2 rounded-lg hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 font-medium"
                >
                  Start AI Scanning
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Recent Searches */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-lg">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 flex items-center">
              <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-2 rounded-lg mr-3">
                <Search className="h-5 w-5 text-white" />
              </div>
              Recent Searches
            </h3>
          </div>
          <div className="p-6">
            {recentActivity.filter(item => item.type === 'search').length > 0 ? (
              <div className="space-y-4">
                {recentActivity.filter(item => item.type === 'search').map((search) => (
                  <div key={search.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-purple-100">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{search.medicine}</p>
                      <p className="text-sm text-gray-500">{search.timestamp}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-purple-500" />
                      <span className="text-sm font-medium text-purple-700">₹{search.savings} saved</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="bg-gradient-to-br from-purple-100 to-indigo-100 p-4 rounded-full w-16 h-16 mx-auto mb-4">
                  <Search className="h-8 w-8 text-purple-600 mx-auto mt-2" />
                </div>
                <p className="text-gray-500 mb-3">No searches yet</p>
                <button
                  onClick={() => onPageChange('search')}
                  className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 font-medium"
                >
                  Start Smart Search
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Health Tips */}
      <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-2xl border border-blue-200/50 p-8">
        <div className="flex items-start space-x-4">
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-3 rounded-xl shadow-lg">
            <AlertCircle className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-blue-900 mb-3 flex items-center">
              AI Health Insight
              <Sparkles className="h-5 w-5 ml-2 text-blue-600" />
            </h3>
            <p className="text-blue-800 leading-relaxed">
              Our AI analyzes your medicine patterns and suggests optimal timing for maximum effectiveness. 
              Always consult with your healthcare provider before making changes to your medication routine. 
              Generic alternatives can save up to 80% on costs while maintaining the same therapeutic benefits.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;