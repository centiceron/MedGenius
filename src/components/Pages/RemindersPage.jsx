import React from 'react';
import { Bell, Clock, Calendar, Plus, Sparkles } from 'lucide-react';

const RemindersPage = () => {
  return (
    <div className="p-6 space-y-8 bg-gradient-to-br from-gray-50 to-orange-50/30 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <div className="bg-gradient-to-br from-orange-600 to-amber-700 p-3 rounded-xl shadow-lg">
              <Bell className="h-7 w-7 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Smart Reminders
            </h1>
            <div className="bg-gradient-to-r from-orange-400 to-amber-500 px-3 py-1 rounded-full">
              <span className="text-white text-xs font-bold">COMING SOON</span>
            </div>
          </div>
          <p className="text-gray-600">Never miss your medication with AI-powered reminders</p>
        </div>
      </div>

      {/* Coming Soon Content */}
      <div className="max-w-4xl mx-auto">
        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-orange-500 to-amber-600 p-8 text-white text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full">
                <Bell className="h-12 w-12 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-bold mb-2">Smart Reminders</h2>
            <p className="text-orange-100 text-lg">Coming Soon to MedGenius</p>
          </div>
          
          <div className="p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Revolutionary Medication Management
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
                We're developing an intelligent reminder system that will help you never miss a dose. 
                Our AI will learn your routine and provide personalized medication schedules.
              </p>
            </div>

            {/* Features Preview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-6 bg-orange-50 rounded-xl border border-orange-100">
                <div className="bg-gradient-to-br from-orange-500 to-amber-600 p-3 rounded-full w-fit mx-auto mb-4">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Smart Scheduling</h4>
                <p className="text-gray-600 text-sm">
                  AI-powered scheduling that adapts to your daily routine and lifestyle
                </p>
              </div>
              
              <div className="text-center p-6 bg-orange-50 rounded-xl border border-orange-100">
                <div className="bg-gradient-to-br from-orange-500 to-amber-600 p-3 rounded-full w-fit mx-auto mb-4">
                  <Bell className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Multi-Platform Alerts</h4>
                <p className="text-gray-600 text-sm">
                  Receive notifications on your phone, email, and smart devices
                </p>
              </div>
              
              <div className="text-center p-6 bg-orange-50 rounded-xl border border-orange-100">
                <div className="bg-gradient-to-br from-orange-500 to-amber-600 p-3 rounded-full w-fit mx-auto mb-4">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Flexible Timing</h4>
                <p className="text-gray-600 text-sm">
                  Set one-time, daily, weekly, or custom recurring reminders
                </p>
              </div>
            </div>

            {/* Upcoming Features */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
              <h4 className="font-bold text-blue-900 mb-4 flex items-center">
                <Sparkles className="h-5 w-5 mr-2" />
                Upcoming Features
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Voice-activated reminders
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Family member notifications
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Medication interaction alerts
                  </li>
                </ul>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Refill reminders
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Doctor appointment scheduling
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Health progress tracking
                  </li>
                </ul>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center mt-8">
              <button className="bg-gradient-to-r from-orange-500 to-amber-600 text-white px-8 py-4 rounded-xl hover:from-orange-600 hover:to-amber-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center space-x-2 mx-auto">
                <Plus className="h-5 w-5" />
                <span>Get Notified When Available</span>
              </button>
              <p className="text-gray-500 text-sm mt-3">
                Be the first to know when Smart Reminders launches
              </p>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="mt-8 bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Development Timeline</h3>
          <div className="flex justify-center">
            <div className="flex items-center space-x-8">
              <div className="text-center">
                <div className="w-4 h-4 bg-green-500 rounded-full mx-auto mb-2"></div>
                <p className="text-sm font-medium text-gray-900">Planning</p>
                <p className="text-xs text-gray-500">Completed</p>
              </div>
              <div className="w-8 h-0.5 bg-green-500"></div>
              <div className="text-center">
                <div className="w-4 h-4 bg-orange-500 rounded-full mx-auto mb-2"></div>
                <p className="text-sm font-medium text-gray-900">Development</p>
                <p className="text-xs text-gray-500">In Progress</p>
              </div>
              <div className="w-8 h-0.5 bg-gray-300"></div>
              <div className="text-center">
                <div className="w-4 h-4 bg-gray-300 rounded-full mx-auto mb-2"></div>
                <p className="text-sm font-medium text-gray-900">Testing</p>
                <p className="text-xs text-gray-500">Q2 2024</p>
              </div>
              <div className="w-8 h-0.5 bg-gray-300"></div>
              <div className="text-center">
                <div className="w-4 h-4 bg-gray-300 rounded-full mx-auto mb-2"></div>
                <p className="text-sm font-medium text-gray-900">Launch</p>
                <p className="text-xs text-gray-500">Q3 2024</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemindersPage;