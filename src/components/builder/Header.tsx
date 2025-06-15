
import React from 'react';
import { FileText, Award, Users, TrendingUp } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Professional Resume Builder</h1>
              <p className="text-sm text-gray-600">Create ATS-friendly resumes that get noticed</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Award className="w-4 h-4 text-blue-600" />
              <span>ATS Optimized</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Users className="w-4 h-4 text-green-600" />
              <span>Professional Templates</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <TrendingUp className="w-4 h-4 text-purple-600" />
              <span>Career Success</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
