
import React from 'react';
import { FileText, Award, Users, TrendingUp } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center py-4 gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                Professional Resume Builder
              </h1>
              <p className="text-sm text-gray-600 hidden sm:block">
                Create ATS-friendly resumes that get noticed
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center sm:justify-end items-center gap-4 sm:gap-6">
            <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600 bg-blue-50 px-3 py-2 rounded-full">
              <Award className="w-4 h-4 text-blue-600" />
              <span className="font-medium">ATS Optimized</span>
            </div>
            <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600 bg-green-50 px-3 py-2 rounded-full">
              <Users className="w-4 h-4 text-green-600" />
              <span className="font-medium hidden sm:inline">Professional</span>
              <span className="font-medium sm:hidden">Pro</span>
            </div>
            <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600 bg-purple-50 px-3 py-2 rounded-full">
              <TrendingUp className="w-4 h-4 text-purple-600" />
              <span className="font-medium hidden sm:inline">Career Success</span>
              <span className="font-medium sm:hidden">Success</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
